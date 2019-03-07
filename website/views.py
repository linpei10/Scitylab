from django.shortcuts import render, redirect
# Create your views here.
from website import models
from .tasks import send_mail
# 用户登陆前的页面url
before_url = '/html/'


def auth(func):
    def inner(request, *args, **kwargs):
        is_login = request.session.get('is_login')
        if is_login:
            return func(request, *args, **kwargs)
        else:
            return redirect('/login/')
    return inner


@auth
def download(req):
    email_list = []
    if req.method == "POST":
        current_user = req.session.get('username')
        email_list.append(current_user)
        file_num_list = req.POST.getlist('file_num')
        print(file_num_list)
        if current_user:
            # send_mail.delay(file_num_list, email_list)
            send_mail.delay()
            return redirect('/html/download/')
    return render(req, "download.html")


def login(req):
    message = ''
    name = ''
    if req.method == 'POST':
        user = req.POST.get('email')
        pwd = req.POST.get('password')
        print(user, pwd)

        check = models.UserInfo.objects.filter(email=user, password=pwd).count()
        if check:
            print(111)
            req.session['is_login'] = True
            req.session['username'] = user
            name = models.UserInfo.objects.filter(email=user).values('name')[0]['name']
            req.session['name'] = name
            print(name)
            rep = redirect(before_url)
            return rep
        else:
            message = "用户名或密码错误"
            print(message)
    print(222)
    obj = render(req, 'login.html', {'msg': message, 'username': name})
    return obj


def home(req):
    return render(req, "html.html")


def news(req):
    return render(req, "news.html")


def pm6(req):
    return render(req, "pm6.html")


def pmc1(req):
    return render(req, "pmc1.html")


