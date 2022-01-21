from rest_framework.serializers import ModelSerializer
from users.models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    # def update(self, instance, validated_data):
    #     user = User.objects.get(pk=instance.id)
    #     User.objects.filter(pk=instance.id)\
    #                        .update(**validated_data)
    #     return user
