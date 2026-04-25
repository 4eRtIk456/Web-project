from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from api.models import UserProfile
from rest_framework.permissions import AllowAny

class RegisterView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        phone = request.data.get('phone')
        password = request.data.get('password')

        if not name or not email or not password:
            return Response({'error': 'Missing fields'}, status=400)

        user = User.objects.create_user(
            username=name,
            email=email,
            password=password
        )

        UserProfile.objects.create(
            user=user,
            phone=phone
        )

        return Response({'message': 'User created'}, status=201)