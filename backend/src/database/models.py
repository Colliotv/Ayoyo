from sqlalchemy import DateTime, Column, Integer, String
from .connection import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    login = Column(String, unique=True, index=True)
    password = Column(String)

    email = Column(String)


class Token(Base):
    """ This table will store temporary tokens,
            not the best solution,
            but one that works and that is quick to code
    """
    __tablename__ = "tokens"

    id = Column(Integer, primary_key=True, index=True)

    value = Column(String)
    ttl = Column(Integer)
    created_at = Column(DateTime)

    user_id = Column(Integer)
