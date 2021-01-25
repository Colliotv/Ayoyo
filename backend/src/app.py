import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.params import (
    Form,
    Depends,
    Query,
)

from src.auth.session import SessionManager
from src.models.token import Token
from src.models.user_information import (
    UserBase,
    ContactInformationUpdate,
    User,
)
from src.user_management.user import UserManagement

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/authenticate")
def authenticate(
        login: str = Query(...), password: str = Query(...),
        user_management: UserManagement = Depends(),
        session_manager: SessionManager = Depends(),
) -> Token:
    user = user_management.get_user_by_login_password(login, password)
    return session_manager.generate_token_for_user(user.id)


@app.post("/register")
def register(
        user: User,
        user_management: UserManagement = Depends(),
        session_manager: SessionManager = Depends(),
) -> Token:
    user = user_management.create_user(user)
    return session_manager.generate_token_for_user(user.id)

@app.get("/get_user_information")
def get_user_information(
        user_id: int = Depends(SessionManager.require_authentication),
        user_management: UserManagement = Depends()
) -> UserBase:
    return user_management.get_user_by_id(user_id)

@app.post("/updateSettings")
def update_contact_settings(
        contact_information: ContactInformationUpdate,
        user_id: int = Depends(SessionManager.require_authentication),
        user_management: UserManagement = Depends()
):
    user_management.update_contact_informations(user_id, contact_information)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
