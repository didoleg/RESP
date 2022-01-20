from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer
from users.models import User
from rest_framework.response import Response
from users.serializers import UserModelSerializer
from rest_framework.generics import CreateAPIView
from authors.serializers import AuthorModelSerializer


class UsersAPIVIew(APIView):
    render_classes = [JSONRenderer]

    def get(self, request):
        users = User.objects.all()
        serializer = UserModelSerializer(users, many=True)
        return Response(serializer.data)


class AuthorViewCreate(CreateAPIView):
    render_classes = [JSONRenderer]
    queryset = User.objects.all()
    serializer_class = AuthorModelSerializer

        
    
