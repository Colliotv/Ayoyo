from fastapi import HTTPException
from fastapi.params import Depends
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from sqlalchemy.orm.exc import (
    NoResultFound,
    MultipleResultsFound,
)

from src.database import models
from src.database.session import get_session
from src.models.user_information import (
    User,
    ContactInformationUpdate,
)


class UserManagement:
    """ This class handle all interaction with the User table """

    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def get_user_by_login_password(
            self,
            login: str,
            password: str,
    ):
        """ Used to validate a login/password pair and get back a User object """
        try:
            db_user: models.User = (
                self.session.query(models.User)
                    .filter(models.User.login == login)
                    .one()
            )
        except NoResultFound:
            raise HTTPException(status_code=404, detail='Unknown user')
        else:
            if db_user.password != password:
                raise HTTPException(status_code=401, detail='Invalid Password')
            return db_user

    def get_user_by_id(self, user_id: int):
        """ Get a user object by its internal db reference. """
        try:
            db_user: models.User = (
                self.session.query(models.User)
                    .filter(models.User.id == user_id)
                    .one()
            )
        except NoResultFound:
            raise HTTPException(status_code=404, detail='Unknown user')
        else:
            return db_user

    def create_user(self, user: User) -> User:
        """ Insert a new User in the local db. """
        try:
            db_user = models.User(
                **user.dict()
            )
            self.session.add(db_user)
            self.session.commit()
            self.session.refresh(db_user)
        except SQLAlchemyError:
            raise HTTPException(status_code=403, detail='user already exist')
        return db_user

    def update_contact_informations(
            self, user_id: int, contact_information: ContactInformationUpdate
    ):
        """ Update a user with the information stored in the Contact Information update object """
        try:
            db_user: models.User = (
                self.session.query(models.User)
                    .filter(models.User.id == user_id)
                    .one()
            )
        except NoResultFound:
            raise HTTPException(status_code=404, detail='Unknown user')
        else:
            db_user.email = contact_information.email
            self.session.commit()