from pydantic import (
    BaseModel,
    EmailStr,
)


class UserBase(BaseModel):
    """ A Basic sum of information to describe a User,
            that can be communicated to an authenticated client without risk
    """
    login: str
    email: EmailStr


class User(UserBase):
    """ A full User, used only for INSERT/UPDATE validation """
    password: str

    class Config:
        orm_mode = True


class ContactInformationUpdate(BaseModel):
    """ Model use for contact update validation """
    email: EmailStr

