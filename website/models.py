from django.db import models

# Create your models here.
import django.utils.timezone as timezone
class Customer(models.Model):
    name = models.CharField(max_length=32)
    phone = models.CharField(max_length=32)
    email = models.EmailField(max_length=64)
    post = models.CharField(max_length=32)
    company = models.CharField(max_length=64)



class Admin(models.Model):
    createDate = models.DateTimeField(default=timezone.now)  # 创建日期
    modifyDate = models.DateTimeField(auto_now=True)    # 修改日期
    email = models.EmailField(max_length=64)  # 邮箱

