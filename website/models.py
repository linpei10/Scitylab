from django.db import models

# Create your models here.
import django.utils.timezone as timezone


class Customer(models.Model):
    name = models.CharField(max_length=32)
    phone = models.CharField(max_length=32)
    email = models.EmailField(max_length=64)
    post = models.CharField(max_length=32)
    company = models.CharField(max_length=64)


class UserInfo(models.Model):
    createDate = models.DateTimeField(default=timezone.now)  # 创建日期
    modifyDate = models.DateTimeField(auto_now=True)    # 修改日期
    email = models.EmailField(max_length=64, unique=True)  # 邮箱
    phone = models.CharField(max_length=32, unique=True)   # 手机号
    password = models.CharField(max_length=32)  # 密码
    company = models.CharField(max_length=32)   # 公司
    posotion = models.CharField(max_length=32)   # 职位
    name = models.CharField(max_length=32)     # 姓名
    wechat = models.CharField(max_length=32)  # 微信


