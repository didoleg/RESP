from rest_framework.viewsets import ViewSet, ModelViewSet
from rest_framework.renderers import JSONRenderer
from rest_framework import permissions
from users.models import User
from todoapp.models import Project, ToDO
from rest_framework.response import Response
from users.serializers import UserModelSerializer
from todoapp.serializers import ProjectModelSerializer, ProjectReadSerializer,ToDOModelSerializer, ToDOModelSerializer_new
from rest_framework.generics import get_object_or_404
from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from .filtres import TodoFilter, FilterProject
from django_filters.rest_framework import DjangoFilterBackend


class ProjectLimitOffsetPagination(LimitOffsetPagination):
   default_limit = 10

class ToDoLimitOffsetPagination(LimitOffsetPagination):
   default_limit = 20

class UserMyViewSet(ViewSet):
    render_classes = [JSONRenderer]
    serializer_class = UserModelSerializer
    queryset = User.objects.all()
        
    def list(self, request):
        users = User.objects.all()
        serializer = UserModelSerializer(users, many=True)
        return Response(serializer.data)
    

    def retrieve(self, request, pk=None):
        user = get_object_or_404(User, pk=pk)
        serializer = UserModelSerializer(user)
        return Response(serializer.data)


    def update(self, request, pk=None, *args, **kwargs):
        user = get_object_or_404(User, pk=pk)
        serializer = UserModelSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "user update"})

        else:
            return Response({"message": "failed", "details": serializer.errors})


class ProjectMyViewSet(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    render_classes = [JSONRenderer]
    pagination_class = ProjectLimitOffsetPagination
    serializer_class = ProjectModelSerializer
    queryset = Project.objects.all()
    serializer = ProjectModelSerializer(queryset, many=True)


    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ProjectReadSerializer
        return ProjectModelSerializer

    def get_queryset(self):
        queryset = Project.objects.all()
        name = self.request.query_params.get('name', None)
        if name:
            queryset = queryset.filter(name__contains=name)
        return queryset



class ToDOViewSet(ModelViewSet):
    serializer_class = ToDOModelSerializer
    queryset = ToDO.objects.all()
    pagination_class = ProjectLimitOffsetPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = TodoFilter

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ToDOModelSerializer_new
        return ToDOModelSerializer

   
    def destroy(self, request, pk=None):
        try:
            instance = self.get_object()
            instance.is_active = False
            instance.save()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)