from pydantic import BaseModel, Field, validator
from typing import Optional
from uuid import UUID


class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    password: str = Field(min_length=8, max_length=72)
    favorite_team: Optional[str] = None

    @validator("password")
    def password_length_limit(cls, value: str):
        if len(value.encode("utf-8")) > 72:
            raise ValueError("Password must be at most 72 bytes")
        return value


class UserLogin(BaseModel):
    username: str
    password: str

    @validator("password")
    def password_length_limit(cls, value: str):
        if len(value.encode("utf-8")) > 72:
            raise ValueError("Password must be at most 72 bytes")
        return value


class UserUpdate(BaseModel):
    password: Optional[str] = Field(default=None, min_length=8, max_length=72)
    favorite_team: Optional[str] = None

    @validator("password")
    def password_length_limit(cls, value: Optional[str]):
        if value is None:
            return value
        if len(value.encode("utf-8")) > 72:
            raise ValueError("Password must be at most 72 bytes")
        return value


class UserResponse(BaseModel):
    id: UUID
    username: str
    favorite_team: Optional[str] = None

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
