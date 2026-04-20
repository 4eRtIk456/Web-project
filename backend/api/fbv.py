from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from api.models import Tour
from api.serializers import TourSerializer
from rest_framework.permissions import AllowAny


# Create your views here.

@api_view(['GET', 'POST'])
def tours(request):
    if request.method == 'GET':
        tours = Tour.objects.all()
        serializer = TourSerializer(tours, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        if not (request.user.is_staff or request.user.is_superuser):
            return Response(
                {"error": "Only admin or manager can create tours"},
                status=403
            )
        serializer = TourSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE', 'PATCH'])
def tour_detail(request, id):
    try:
        tour = Tour.objects.get(id=id)
    except Tour.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TourSerializer(tour)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = TourSerializer(tour, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        tour.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PATCH':
        serializer = TourSerializer(tour, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

