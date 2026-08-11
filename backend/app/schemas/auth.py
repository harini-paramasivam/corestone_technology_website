from pydantic import BaseModel, ConfigDict, EmailStr

from app.models.admin import AdminRole


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RefreshRequest(BaseModel):
    refresh_token: str


class TokenPair(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class AdminRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    full_name: str
    email: EmailStr
    role: AdminRole
    is_active: bool


class LoginResponse(TokenPair):
    admin: AdminRead
