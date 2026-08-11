"""
One-time bootstrap: creates the first SUPER_ADMIN account.

Usage:
    python -m app.scripts.create_admin --email you@corestonetech.com --name "Fernandes"

Prompts for a password interactively (never accepted as a CLI arg, so it
never ends up in shell history or process listings). Refuses to run if an
admin with that email already exists.
"""
import argparse
import getpass
import sys

from app.core.security import hash_password
from app.db.session import get_db
from app.models.admin import AdminRole, AdminUser
from app.repositories.admin_repository import AdminRepository


def main() -> None:
    parser = argparse.ArgumentParser(description="Bootstrap the first CoreStone admin user.")
    parser.add_argument("--email", required=True)
    parser.add_argument("--name", required=True)
    parser.add_argument(
        "--role",
        choices=[r.value for r in AdminRole],
        default=AdminRole.SUPER_ADMIN.value,
    )
    args = parser.parse_args()

    password = getpass.getpass("Password: ")
    confirm = getpass.getpass("Confirm password: ")
    if password != confirm:
        print("Passwords do not match.", file=sys.stderr)
        sys.exit(1)
    if len(password) < 12:
        print("Password must be at least 12 characters.", file=sys.stderr)
        sys.exit(1)

    db = next(get_db())
    try:
        repo = AdminRepository(db)
        if repo.get_by_email(args.email) is not None:
            print(f"An admin with email {args.email} already exists.", file=sys.stderr)
            sys.exit(1)

        admin = AdminUser(
            full_name=args.name,
            email=args.email,
            hashed_password=hash_password(password),
            role=AdminRole(args.role),
            is_active=True,
        )
        db.add(admin)
        db.commit()
        print(f"Created admin '{args.email}' with role '{args.role}'.")
    finally:
        db.close()


if __name__ == "__main__":
    main()
