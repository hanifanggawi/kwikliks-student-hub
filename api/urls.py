from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('task-list/', views.tasksAll, name="task-list"),
    path('task-list/<int:fk>', views.taskList, name="task-list"),
    path('task-create/', views.taskCreate, name="task-create"),
    path('task-detail/<int:pk>/', views.taskDetail, name="task-detail"),
    path('task-update/<int:pk>/', views.taskUpdate, name="task-update"),
    path('task-delete/<int:pk>/', views.taskDelete, name="task-delete"),

    path('course-list/', views.courseList, name="course-list"),
    path('course-list/<int:pk>/', views.courseDetail, name="course-detail"),
    path('course-create/', views.courseCreate, name="course-create"),
    path('course-update/<int:pk>/', views.courseUpdate, name="course-update"),
    path('course-delete/<int:pk>/', views.courseDelete, name="course-delete"),

    path('link-list/', views.linkList, name="link-list"),
    path('link-list/<int:fk>', views.linksByCourse, name="links-by-course"),
    path('link-list/<int:fk>/<str:type>', views.linksByType, name="links-by-type"),
    path('link-create/', views.linkCreate, name="link-create"),
    path('link-update/<int:pk>/', views.linkUpdate, name="link-update"),
    path('link-delete/<int:pk>/', views.linkDelete, name="link-delete"),
]