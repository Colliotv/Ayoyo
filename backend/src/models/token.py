from pydantic import BaseModel
import datetime as dt


class Token(BaseModel):
    """ A Token providing identity for a User. """
    value: str
    ttl: int
    created_at: dt.datetime

    class Config:
        orm_mode = True