from src.database.connection import SessionLocal


def get_session():
    """ Used as a route dependency,
            provide a temporary session that will be closed
            no matter what would happen during a request
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()