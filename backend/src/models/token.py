from pydantic import BaseModel
import datetime as dt


class Token(BaseModel):
    value: str
    ttl: int
    created_at: dt.datetime

    class Config:
        orm_mode = True

class InternalToken(Token):
    user_id: int