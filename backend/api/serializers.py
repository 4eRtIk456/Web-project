from rest_framework import serializers
from .models import *

class TourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    tour_title = serializers.CharField(source='tour.title', read_only=True)
    tour_price = serializers.IntegerField(source='tour.price', read_only=True)
    tour_image = serializers.ImageField(source='tour.photo', read_only=True)

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
        fields = ['username', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)