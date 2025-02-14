from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

pwd_hasher = PasswordHasher(
    memory_cost=262144,
    time_cost=3,
    parallelism=4,
)


class User:
    def __init__(self, username):
        self.username = username

    @staticmethod
    def is_authenticated():
        return True

    @staticmethod
    def is_active():
        return True

    @staticmethod
    def is_anonymous():
        return True

    def get_id(self):
        return self.username

    @staticmethod
    def verify_password(password_hash, password):
        try:
            return pwd_hasher.verify(hash=password_hash, password=password)
        except VerifyMismatchError:
            return False
