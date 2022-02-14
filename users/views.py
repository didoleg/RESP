from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import UserModelSerializer, UserModelSerializer_personal


class UserViewSet(ModelViewSet):
    serializer_class = UserModelSerializer
    queryset = User.objects.all()


    def get_serializer_class(self):
        if self.request.version == '2':
            return UserModelSerializer_personal
        return UserModelSerializer

