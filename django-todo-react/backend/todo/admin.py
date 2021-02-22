# todo/admin.py

from django.contrib import admin
from .models import Todo, Filter

class TodoAdmin(admin.ModelAdmin):  
  list_display = ('title', 'description', 'completed', 'time_sensitive', 'on_hold', 'low_energy')

class FilterAdmin(admin.ModelAdmin):
  list_display = ('time_sensitive', 'on_hold', 'low_energy')

# Register your models here.
admin.site.register(Todo, TodoAdmin)
admin.site.register(Filter, FilterAdmin)
