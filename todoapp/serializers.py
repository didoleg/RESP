from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import ModelSerializer, StringRelatedField, PrimaryKeyRelatedField, CurrentUserDefault, HiddenField
from .models import Project, ToDO
from users.serializers import UserModelSerializer


class ProjectModelSerializer(ModelSerializer):
    users = PrimaryKeyRelatedField(many=True, required=False, read_only=True)

    class Meta:
       model = Project
       fields = '__all__'


class ProjectReadSerializer(ModelSerializer):
    users = UserModelSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDOModelSerializer(ModelSerializer):
    creator = HiddenField(default=CurrentUserDefault())
    class Meta:
       model = ToDO
       fields = '__all__'

class ToDOModelSerializer_new(ModelSerializer):
    project = StringRelatedField()
    creator = StringRelatedField()
    
    class Meta:
        model = ToDO
        fields = '__all__'


