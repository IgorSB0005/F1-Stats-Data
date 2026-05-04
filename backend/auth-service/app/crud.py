from sqlalchemy.orm import Session
from .models import User


def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()


def get_user_by_id(db: Session, user_id):
    return db.query(User).filter(User.id == user_id).first()


def create_user(db: Session, username: str, hashed_password: str, favorite_team: str | None):
    user = User(
        username=username,
        hashed_password=hashed_password,
        favorite_team=favorite_team,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def update_user(
    db: Session,
    user: User,
    hashed_password: str | None,
    favorite_team: str | None,
):
    if hashed_password:
        user.hashed_password = hashed_password
    if favorite_team is not None:
        user.favorite_team = favorite_team

    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def delete_user(db: Session, user: User):
    db.delete(user)
    db.commit()
