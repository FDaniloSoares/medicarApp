import os

from config.base import *  # noqa f403
from config.base import BASE_DIR, env

env.read_env(os.path.join(BASE_DIR, ".envs/.django"))
env.read_env(os.path.join(BASE_DIR, ".envs/.postgres"))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("DJANGO_SECRET_KEY")


# Database
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": env("POSTGRES_DB"),
        "USER": env("POSTGRES_USER"),
        "PASSWORD": env("POSTGRES_PASSWORD"),
        "HOST": env("POSTGRES_HOST_TEST"),
        "PORT": env("POSTGRES_PORT"),
    }
}
