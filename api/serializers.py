from rest_framework import serializers
from . models import *

class TaskSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Task 
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Course
        fields = '__all__'

class LinkSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Link
        fields = '__all__'