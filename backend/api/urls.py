from django.contrib.auth.views import LoginView
from django.urls import path
from .cbv import BookingAPIView, ReviewAPIView, LogoutAPIView, ProfileAPIView
from .fbv import tours, tour_detail, search_tours
from .generics import RegisterView
from .auth_views import login_view
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
urlpatterns = [
    # FBV (Tour)
    path('tours/', tours),
    path('tour/<int:id>/', tour_detail),

    # CBV
    path('bookings/', BookingAPIView.as_view()),
    path('bookings/<int:user_id>/', BookingAPIView.as_view()),
    path('profile/', ProfileAPIView.as_view()),
    path('reviews/', ReviewAPIView.as_view()),

    #register||login
    path('auth/login/', login_view),
    path('register/', RegisterView.as_view()),
    path('logout/', LogoutAPIView.as_view()),

    #tokens
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),

    path('tours/search/', search_tours),



]