import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
# from mixer.backend.django import mixer
from django.contrib.auth.models import User
from users.views import UserViewSet
from users.models import User

class TestAPIRequestFactory(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/Users/')
        view = UserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    

    def test_update(self):
        factory = APIRequestFactory()
        request = factory.post('/api/authors/', {'uuid': '84e2f56ef27e42f3ac6057ea9ab2daec', 'user_name': 'pupkin_spb', 'first_name': 'Vasiy', 'last_name': 'Pupkin', 'email': 'pupkin@mail.ru'}, format='json')
        view = UserViewSet.as_view({'post': 'update'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
         
class TestAPIClient(TestCase):
    def test_create(self):
        user = User.objects.create(uuid='84e2f56ef27e42f3ac6057ea9ab2da34', user_name='pupkin_spb2', first_name='Vasiy', last_name='Pupkin2', email='pupkin2@mail.ru')
        client = APIClient()
        response = client.get(f'/api/Users/{user.uuid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update(self):
        user = User.objects.create(uuid='84e2f56ef27e42f3ac6057ea9ab2da34', user_name='pupkin_spb2', first_name='Vasiy', last_name='Pupkin2', email='pupkin2@mail.ru')
        client = APIClient()
        response = client.get(f'/api/Users/{user.uuid}/', {'user_name': 'pupkin_spb2_new', 'email': 'pupkin2@mail.ru_new'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestAPITestCase(TestCase):
    pass