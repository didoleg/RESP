from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Project
from .models import ToDO


class ProjectModelSerializer(ModelSerializer):
   class Meta:
       model = Project
       fields = '__all__'


class ToDOModelSerializer(ModelSerializer):
   class Meta:
       model = ToDO
       fields = '__all__'


