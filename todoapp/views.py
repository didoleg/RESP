from rest_framework.viewsets import ModelViewSet
from .serializers import ProjectModelSerializer, ToDOModelSerializer
from .models import Project, ToDO


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectModelSerializer
    queryset = Project.objects.all()


class ToDOViewSet(ModelViewSet):
    serializer_class = ToDOModelSerializer
    queryset = ToDO.objects.all()




