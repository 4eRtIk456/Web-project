from django.contrib import admin
from .models import Tour, Booking, Review, UserProfile

admin.site.register(Tour)
admin.site.register(Booking)
admin.site.register(Review)
admin.site.register(UserProfile)