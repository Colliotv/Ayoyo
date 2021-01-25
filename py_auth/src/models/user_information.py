from pydantic import (
    BaseModel,
    EmailStr,
)


class UserBase(BaseModel):
    login: str
    email: EmailStr


class User(UserBase):
    password: str

    class Config:
        orm_mode = True


class ContactInformationUpdate(BaseModel):
    email: EmailStr

