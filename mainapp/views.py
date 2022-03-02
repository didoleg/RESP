from rest_framework.viewsets import ViewSet, ModelViewSet
from rest_framework.renderers import JSONRenderer
from rest_framework import permissions
from users.models import User
from todoapp.models import Project, ToDO
from rest_framework.response import Response
from users.serializers import UserModelSerializer
from todoapp.serializers import ProjectModelSerializer, ToDOModelSerializer
from rest_framework.generics import get_object_or_404, ListAPIView
from rest_framework.pagination import LimitOffsetPagination

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


class FilterProject(ListAPIView):
    serializer_class = ProjectModelSerializer

    def get_queryset(self):
       name = self.kwargs['name']
       return Project.objects.filter(name__contains=name)

class ToDOViewSet(ModelViewSet):
    serializer_class = ToDOModelSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = ToDO.objects.all()

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

class FilterToDO(ListAPIView):
    serializer_class = ToDOModelSerializer

    def get_queryset(self):
       name = self.kwargs['name']
       return ToDO.objects.filter(name__contains=name)