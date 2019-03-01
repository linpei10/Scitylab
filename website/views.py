from django.shortcuts import render,redirect
# Create your views here.
from website import models
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from email.header import make_header
import os
import shutil
from email.header import Header
import zipfile

path = ''.join([os.path.dirname(os.getcwd()).replace('\\', '/'), '/static/file/{filename}.pdf'])

zip_path = ''.join([os.path.dirname(os.getcwd()).replace('\\', '/'), 'zip'])

files_list = {
    '001': '李迅—城市发展新时代、新理念、新方法',
    '002': 'Michael Mulquin—Becoming a data driven city',
    '003': '王桂新—基于队列变化的小区域人口预测及注意的问题-复制',
    '004': 'Kajishima—Direct Numerical simulation of inertial particle droplet in turbulence flow',
    '005': '刘建—城市轨道交通海绵城市抵抗暴雨效果数值模拟',
    '006': '范秦寅—深入展开城市仿真的现实意义',
    '007': '蒋紫虓_巴塞罗那大都市区风资源评估案例',
    '008': 'James LaDine—Using Causal Relationship Model to Prioritize Simulation Parameters',
    '009': '吴小毛—粒界科技gritworld-城市仿真',
    '010': '梁松—三维仿真技术在城市多领域的创新应用',
    '011': '王志永-基于多源数据融合的数据标准化',
    '012': '倪付燕—智慧水务云平台',
    '013': '吴建平—无人驾驶-未来交通与仿真研究',
    '014': '智慧水务应用',
    '015': '大数据背景下的城市空间分析-肖中发',
    '016': '阚长城—慧眼识人-基于时空大数据的人口研究',
    '017': '马琦伟—基于深度学习的街景意向识别',
    '018': '城市环境仿真服务介绍',
    '019': '中国城市科学研究会智慧城市联合实验室',
}


def send_mail(user_select, to_mail_list):
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
    from_email = settings.EMAIL_HOST_USER
    msg = EmailMultiAlternatives(subject, text_content, from_email, to_mail_list)
    msg.attach_alternative(html_content, "text/html")
    # 发送附件
    print('********************发送附件********************')
    # 将用户所选中文件复制到zip目录
    for i in user_select:
        path.format(filename=files_list[i])
        shutil.copy(path, zip_path)
    # 将zip目录进行压缩
    file_zip = 'file.zip'
    f = zipfile.ZipFile(file_zip, 'w', zipfile.ZIP_DEFLATED)
    for paths, filepath, filenames in os.walk(zip_path):
        for filename in filenames:
            f.write(os.path.join(zip_path, filename))
    f.close()
    # 读取并发送邮件
    text = open(file_zip, 'rb').read()

    file_name = os.path.basename(file_zip)
    # 对文件进行编码处理
    b = make_header([(file_zip, 'utf-8')]).encode('utf-8')
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
        # name = req.POST.get("name")
        # phone = req.POST.get("phone")
        # email = req.POST.get("email")
        # post = req.POST.get("post")
        # company = req.POST.get("company")
        #
        # info = {"name": name,
        #         "phone": phone,
        #         "email": email,
        #         "post": post,
        #         "company": company}
        # models.Customer.objects.create(**info)

        file_num_list = req.POST.getlist("file_num")

        send_mail(file_num_list, email)

        return redirect('/html/download/')

    return render(req, "download.html")
