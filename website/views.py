from django.shortcuts import render,redirect
# Create your views here.
from website import models
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from email.header import make_header
import os
from email.header import Header
import zipfile

path =

def send_mail(receive_email_addr,file_path):
    '''
        发送带附件邮件函数
        parameter:
            receive_email_addr: 邮箱地址list    ['***@163.com','***@qq.com',...]
            file_path:          附件绝对路径地址
    '''
    print('**************开始生成消息*********************')
    subject = '报告邮件'
    text_content = '这是一封重要的报告邮件.'
    html_content = '<p>这是一封<strong>重要的报告邮件</strong>.</p>'
    from_email = settings.DEFAULT_FROM_EMAIL
    msg = EmailMultiAlternatives(subject, text_content, from_email, receive_email_addr)
    msg.attach_alternative(html_content, "text/html")
    # 发送附件
    print('********************发送附件********************')
    text = open(file_path, 'rb').read()
    file_name = os.path.basename(file_path)
    # 对文件进行编码处理
    b = make_header([(file_name, 'utf-8')]).encode('utf-8')
    msg.attach(b, text)
    # msg.attach_file(file_path)
    msg.send()
    if msg.send():
        print('******************发送成功*********************')
    else:
        print('******************发送失败*********************')
    print('********************发送完成********************')



def home(req):
    return render(req,"home.html")


def news(req):
    return render(req, "news.html")


def base_news(req):
    return render(req, "base_news.html")


def pm6(req):
    return render(req, "pm6.html")


def pmc1(req):
    return render(req, "pmc1.html")


def download(req):
    if req.method == "POST":
        name = req.POST.get("name")
        phone = req.POST.get("phone")
        email = req.POST.get("email")
        post = req.POST.get("post")
        company = req.POST.get("company")

        info = {"name": name,
                "phone": phone,
                "email": email,
                "post": post,
                "company": company}
        models.Customer.objects.create(**info)






        return render(req,"download.html")

    return render(req, "download.html")
