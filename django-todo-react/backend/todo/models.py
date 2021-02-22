from django.db import models
# Create your models here.

class Todo(models.Model):
  title = models.CharField(max_length=120)
  description = models.TextField()
  completed = models.BooleanField(default=False)

  time_sensitive = models.BooleanField(default=False)
  on_hold = models.BooleanField(default=False)
  low_energy = models.BooleanField(default=False)

  def _str_(self):
    return self.title

class Filter(models.Model):
  title = "Filters"
  time_sensitive = models.BooleanField(default=False)
  on_hold = models.BooleanField(default=False)
  low_energy = models.BooleanField(default=False)

  def _str_(self):
    return self.title