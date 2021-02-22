from rest_framework import serializers
from .models import Todo, Filter

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'completed', 'time_sensitive', 'on_hold', 'low_energy')

class FilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filter
        fields = ('time_sensitive', 'on_hold', 'low_energy')
