from rest_framework.serializers import HyperlinkedIdentityField, ModelSerializer, HyperlinkedRelatedField
from .models import Project
from .models import ToDO


class ProjectModelSerializer(HyperlinkedIdentityField):
    class Meta:
       model = Project
       fields = '__all__'


class ToDOModelSerializer(HyperlinkedIdentityField):
    class Meta:
       model = ToDO
       fields = '__all__'


