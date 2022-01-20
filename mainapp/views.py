from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from users.models import User
from rest_framework.response import Response
from users.serializers import UserModelSerializer


class UsersAPIVIew(APIView):
    render_classes = [JSONRenderer]

    def get(self, request):
        users = User.objects.all()
        serializer = UserModelSerializer(users, many=True)
        return Response(serializer.data)