from django.db import models
from users.models import User

class Project(models.Model):
    name = models.CharField(max_length=40, unique=True)
    users = models.ManyToManyField(User)
    repository = models.URLField(blank=True)

    def __str__(self):
        return self.name


class ToDO(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    create = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now_add=True)
    user_create = models.ForeignKey(User, on_delete=models.PROTECT)
    is_active = models.BooleanField(default=True)
