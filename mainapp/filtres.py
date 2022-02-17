from django_filters import rest_framework as filters
from todoapp.models import ToDO, Project
from todoapp.serializers import ProjectModelSerializer
from rest_framework.generics import ListAPIView

class TodoFilter(filters.FilterSet):
    create = filters.DateFromToRangeFilter()

    class Meta:
        model = ToDO
        fields = ['project', 'create']



class FilterProject(ListAPIView):
    serializer_class = ProjectModelSerializer
    
    def get_queryset(self):
       name = self.kwargs['name']
       return Project.objects.filter(name__contains=name)