from rest_framework.serializers import ModelSerializer
from .models import Project, ToDO
from users.serializers import UserModelSerializer


class ProjectModelSerializer(ModelSerializer):
    class Meta:
       model = Project
       fields = '__all__'


class ToDOModelSerializer(ModelSerializer):
    class Meta:
       model = ToDO
       fields = '__all__'

class ToDOModelSerializer_new(ModelSerializer):
    user = UserModelSerializer()
    class Meta:
        model = ToDO
        fields = '__all__'


