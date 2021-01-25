import datetime as dt
import uuid

from fastapi import HTTPException
from fastapi.params import (
    Depends,
    Header,
)
from sqlalchemy.orm import Session
from sqlalchemy.orm.exc import (
    NoResultFound,
)

from src.database import models
from src.database.session import get_session
from src.models.token import Token

DEFAULT_TTL_IN_S = 600


class SessionManager:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def generate_token_for_user(self, user_id: int) -> Token:
        try:
            db_token: models.Token = (
                self.session.query(models.Token)
                    .filter(models.Token.user_id == user_id)
                    .one()
            )
        except NoResultFound:
            db_token: models.Token = models.Token(
                value=str(uuid.uuid4()),
                user_id=user_id,
                ttl=DEFAULT_TTL_IN_S,
                created_at=dt.datetime.now()
            )
            self.session.add(db_token)
            self.session.commit()
            self.session.refresh(db_token)
        return Token.from_orm(db_token)

    @staticmethod
    def require_authentication(
            session: Session = Depends(get_session),
            authorization: str = Header(...)
    ) -> int:
        if not authorization:
            raise HTTPException(status_code=401, detail="you may not use this resource")

        try:
            db_token: models.Token = (
                session.query(models.Token)
                    .filter(models.Token.value == authorization[len("Bearer "):])
                    .one()
            )
        except NoResultFound:
            raise HTTPException(status_code=401, detail="you may not use this resource")
        else:
            return db_token.user_id
