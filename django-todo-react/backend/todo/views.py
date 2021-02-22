from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializer, FilterSerializer
from .models import Todo, Filter

# Create your views here.

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

class FilterView(viewsets.ModelViewSet):
    serializer_class = FilterSerializer
    queryset = Filter.objects.all()