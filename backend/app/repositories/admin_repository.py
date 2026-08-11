from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.admin import AdminUser


class AdminRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_email(self, email: str) -> AdminUser | None:
        stmt = select(AdminUser).where(AdminUser.email == email)
        return self.db.execute(stmt).scalar_one_or_none()

    def get_by_id(self, admin_id: int) -> AdminUser | None:
        return self.db.get(AdminUser, admin_id)
