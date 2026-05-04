import uuid
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError
from sqlalchemy.orm import Session

from .database import engine, get_db
from . import models, schemas, crud
from .security import hash_password, verify_password, create_access_token, decode_access_token

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="F1 Auth Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()


def raise_error(status_code: int, detail: str, code: str):
    raise HTTPException(
        status_code=status_code,
        detail={"detail": detail, "code": code},
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(_, exc: HTTPException):
    if isinstance(exc.detail, dict) and "detail" in exc.detail and "code" in exc.detail:
        payload = exc.detail
    else:
        payload = {"detail": str(exc.detail), "code": "http_error"}

    return JSONResponse(status_code=exc.status_code, content=payload)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_, __):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": "Invalid request data", "code": "validation_error"},
    )


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    token = credentials.credentials

    try:
        payload = decode_access_token(token)
    except JWTError:
        raise_error(status.HTTP_401_UNAUTHORIZED, "Invalid token", "invalid_token")

    user_id = payload.get("sub")

    if not user_id:
        raise_error(status.HTTP_401_UNAUTHORIZED, "Invalid token", "invalid_token")

    try:
        user_uuid = uuid.UUID(user_id)
    except ValueError:
        raise_error(status.HTTP_401_UNAUTHORIZED, "Invalid token", "invalid_token")

    user = crud.get_user_by_id(db, user_uuid)

    if not user:
        raise_error(status.HTTP_404_NOT_FOUND, "User not found", "user_not_found")

    return user


@app.post("/register", response_model=schemas.UserResponse)
def register(payload: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = crud.get_user_by_username(db, payload.username)

    if existing_user:
        raise_error(status.HTTP_409_CONFLICT, "Username already exists", "username_taken")

    user = crud.create_user(
        db,
        username=payload.username,
        hashed_password=hash_password(payload.password),
        favorite_team=payload.favorite_team,
    )

    return user


@app.post("/login", response_model=schemas.TokenResponse)
def login(payload: schemas.UserLogin, db: Session = Depends(get_db)):
    user = crud.get_user_by_username(db, payload.username)

    if not user or not verify_password(payload.password, user.hashed_password):
        raise_error(
            status.HTTP_401_UNAUTHORIZED,
            "Invalid username or password",
            "invalid_credentials",
        )

    token = create_access_token(str(user.id))

    return schemas.TokenResponse(access_token=token)


@app.get("/me", response_model=schemas.UserResponse)
def me(current_user=Depends(get_current_user)):
    return current_user


@app.put("/update-profile", response_model=schemas.UserResponse)
def update_profile(
    payload: schemas.UserUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    if payload.password is None and payload.favorite_team is None:
        raise_error(status.HTTP_400_BAD_REQUEST, "No updates provided", "no_changes")

    hashed_password = hash_password(payload.password) if payload.password else None

    updated_user = crud.update_user(
        db,
        current_user,
        hashed_password=hashed_password,
        favorite_team=payload.favorite_team,
    )

    return updated_user


@app.delete("/account")
def delete_account(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    crud.delete_user(db, current_user)

    return {"detail": "Account deleted", "code": "account_deleted"}
