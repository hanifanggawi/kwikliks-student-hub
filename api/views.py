from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from .serializers import *
from .models import *


@api_view(["GET"])
def apiOverview(request):
    api_urls = {
        'List'          : '/task-list/',
        'Create Task'   : '/task-create/',
        'Detail View'   : '/task-detail/<str:pk>/',
        'Update Task'   : '/task-update/<int:pk>/',
        'Delete Task'   : '/task-update/<int:pk>/',
    }
    return Response(api_urls)

@api_view(["GET"])
def linkList(request):
    links = Link.objects.all()
    serializer = LinkSerializer(links, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def linksByType(request, type, fk):
    links = Link.objects.filter(course = fk, link_type = type)
    serializer = LinkSerializer(links, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def linksByCourse(request, fk):
    links = Link.objects.filter(course = fk)
    serializer = LinkSerializer(links, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def linkCreate(request):
    title = request.data.get("title")
    url = request.data.get('url')
    course_id = request.data.get("course_id")
    link_type = request.data.get("link_type")
    course = Course.objects.filter(id= course_id).first()
    link = Link.objects.create(title=title, url=url, course=course, link_type= link_type)

    serializer = LinkSerializer(link)

    return Response(serializer.data)

@api_view(["PUT"])
def linkUpdate(request, pk):
    link = Link.objects.get(id=pk)
    serializer = LinkSerializer(instance=link, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(["DELETE"])
def linkDelete(request, pk):
    link = Link.objects.get(id=pk)
    link.delete()
        
    return Response("Item Deleted")

@api_view(["GET"])
def courseList(request):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def courseDetail(request, pk):
    courses = Course.objects.filter(id = pk)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def courseCreate(request):
    title = request.data.get("title")
    description = request.data.get("description")
    url = request.data.get("url")
    
    course = Course.objects.create(title = title, description=description, url=url)

    serializer = CourseSerializer(course)

    return Response(serializer.data)

@api_view(["PUT"])
def courseUpdate(request, pk):
    course = Course.objects.get(id=pk)
    serializer = CourseSerializer(instance=course, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(["DELETE"])
def courseDelete(request, pk):
    course = Course.objects.get(id=pk)
    course.delete()
        
    return Response("Item Deleted")

@api_view(["GET"])
def tasksAll(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def taskList(request, fk):
    tasks = Task.objects.filter(course = fk)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def taskDetail(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)

@api_view(["POST"])
def taskCreate(request):
    title = request.data.get("title")
    course_id = request.data.get('course')
    course = Course.objects.filter(id= course_id).first()
    task = Task.objects.create(title = title, course=course)

    serializer = TaskSerializer(task)

    return Response(serializer.data)

@api_view(["PUT"])
def taskUpdate(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(["DELETE"])
def taskDelete(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()
        
    return Response("Item Deleted")