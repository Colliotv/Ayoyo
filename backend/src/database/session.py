from src.database.connection import SessionLocal


def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()