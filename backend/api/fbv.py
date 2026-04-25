from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from api.models import Tour
from api.serializers import TourSerializer
from rest_framework.permissions import AllowAny


# Create your views here.

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
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
@permission_classes([AllowAny])
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

@api_view(['POST'])
@permission_classes([AllowAny])
def search_tours(request):
    from_city = request.data.get('from')
    to_country = request.data.get('to')
    date = request.data.get('date')
    travelers = int(request.data.get('travelers', 1))

    if not date:
        return Response({'error': 'Date required'}, status=400)

    day = int(date.split('-')[2])
    is_even = day % 2 == 0

    tours = Tour.objects.filter(country__icontains=to_country)

    result = []

    for tour in tours:
        valid_date = any(
            (d % 2 == 0 if is_even else d % 2 != 0)
            for d in tour.available_dates
        )

        if valid_date and travelers <= tour.max_people:
            result.append(tour)

    serializer = TourSerializer(result, many=True)
    return Response(serializer.data)