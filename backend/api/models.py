from django.db import models
from django.contrib.auth.models import User
class Tour(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.IntegerField()
    country = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    date = models.DateField()
    photo = models.ImageField(upload_to='tours/')
    photo_url = models.URLField(blank=True, null=True)
    duration = models.IntegerField()
    max_people = models.IntegerField(default=5)
    available_dates = models.JSONField(default=list) 
    def __str__(self):
        return self.title

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, default="pending")

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()
    date = models.DateField(auto_now_add=True)
    

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20)
    country = models.CharField(max_length=200)