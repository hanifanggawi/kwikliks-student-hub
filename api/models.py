from django.db import models

class Course(models.Model):
    title = models.CharField(max_length=50, default = "Course title")
    description = models.CharField(max_length=100, null=True)
    url = models.CharField(max_length=200, default="#")

    def __str__(self):
        return self.title

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=70)
    completed = models.BooleanField(default=False, blank=True, null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    duedate = models.DateTimeField(null=True)

    def __str__(self):
        return self.title

class Link(models.Model):
    class LINK_TYPE(models.TextChoices):
        MAT = 'M', "Material"
        ASG = 'A', "Assignment"
    
    title = models.CharField(max_length=30)
    url = models.CharField(max_length=200, default="#")
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    link_type = models.CharField(max_length = 1, choices=LINK_TYPE.choices, default= LINK_TYPE.MAT)

    def __str__(self):
        return self.title