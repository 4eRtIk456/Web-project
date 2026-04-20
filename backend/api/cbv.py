from .models import *
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import BookingSerializer, ReviewSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class BookingAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user = request.user
        tour_id = request.data.get('tour_id')

        try:
            tour = Tour.objects.get(id=tour_id)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

        booking = Booking.objects.create(user=user, tour=tour)
        return Response({'Booking created. Booking_id': booking.id, 'tour_id': tour.id})

    def get(self, request):
        if request.user.is_superuser or request.user.is_staff:
            bookings = Booking.objects.all()
            serializer = BookingSerializer(bookings, many=True)
            return Response(serializer.data)
        else:
            user = request.user
            bookings = Booking.objects.filter(user=user)
            serializer = BookingSerializer(bookings, many=True)
            return Response(serializer.data)



class ReviewAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        user = request.user
        tour_id = request.data.get('tour_id')
        rating = request.data.get('rating')
        comment = request.data.get('comment')
        try:
            tour = Tour.objects.get(id=tour_id)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
        Review.objects.create(
            user=user,
            tour=tour,
            rating=rating,
            comment=comment
        )
        return Response({'message': 'Review created'})
    def get(self, request):
        tour_id = request.query_params.get('tour_id')

        if tour_id:
            reviews = Review.objects.filter(tour_id=tour_id)
        else:
            reviews = Review.objects.all()

        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)



class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "is_staff": user.is_staff,
        })

    def put(self, request):
        user = request.user

        if "username" in request.data:
            user.username = request.data["username"]

        if "email" in request.data:
            user.email = request.data["email"]

        if "name" in request.data:
            user.first_name = request.data["name"]

        if "surname" in request.data:
            user.last_name = request.data["surname"]

        user.save()

        return Response({
            "message": "Profile updated"
        })