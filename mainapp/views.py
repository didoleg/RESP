from rest_framework.viewsets import ViewSet
from rest_framework.renderers import JSONRenderer
from users.models import User
from rest_framework.response import Response
from users.serializers import UserModelSerializer
from todoapp.serializers import ProjectModelSerializer, ToDOModelSerializer
from rest_framework.generics import get_object_or_404, ListAPIView, UpdateAPIView
from rest_framework.mixins import UpdateModelMixin, CreateModelMixin

class UserMyViewSet(ViewSet):
    render_classes = [JSONRenderer]
    serializer_class = UserModelSerializer
    
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


class ProjectMyViewSet(ViewSet):
    render_classes = [JSONRenderer]