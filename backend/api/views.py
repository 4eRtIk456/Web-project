from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Tour
from .serializers import TourSerializer


@api_view(['GET'])
def tours(request):
    tours = Tour.objects.all()
    serializer = TourSerializer(tours, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def tour_detail(request, id):
    try:
        tour = Tour.objects.get(id=id)
    except Tour.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)

    serializer = TourSerializer(tour)
    return Response(serializer.data)

