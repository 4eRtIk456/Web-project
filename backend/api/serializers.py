from rest_framework import serializers
from .models import *

class TourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

class ReviewSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    tour_id = serializers.IntegerField()
    rating = serializers.IntegerField()
    comment = serializers.CharField()

class UserProfileSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    phone = serializers.CharField()
    country = serializers.CharField()

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user