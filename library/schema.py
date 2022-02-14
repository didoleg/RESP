import graphene
from graphene_django import DjangoObjectType
from todoapp.models import ToDO, Project
from users.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'
class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDO
        fields = '__all__'

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'

class Query(graphene.ObjectType):
    all_user = graphene.List(UserType)
    all_todo = graphene.List(ToDoType)
    all_project = graphene.List(ProjectType)

    def resolve_all_user(root, info):
        return User.objects.all()

    def resolve_all_todo(root, info):
        return ToDO.objects.all()

    def resolve_all_project(root, info):
        return Project.objects.all()


schema = graphene.Schema(query=Query)
