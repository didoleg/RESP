from pyexpat import model
from django.db import models
from uuid import uuid4


class User(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid4, unique=True)
    user_name = models.CharField(max_length=64)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=True)
    email = models.CharField(default=uuid4, unique=True, max_length=100)

