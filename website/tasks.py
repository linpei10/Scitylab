from django.conf import settings
from django.core.mail import EmailMessage
from Scitylab.celery import app
import os

path = ''.join([os.path.dirname(os.getcwd()).replace('\\', '/'), 'Scitylab/static/file/{filename}.pdf'])

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


@app.task
def send_mail():
# def send_mail(user_select, to_mail_list):

    print('**************开始生成消息*****************')
    subject = 'test'
    text_content = '这是一封重要的报告邮件.'
    from_email = settings.EMAIL_HOST_USER
    msg = EmailMessage(subject,
                       text_content,
                       from_email,
                       ['1005819387@qq.com', ])

    # for i in user_select:
    #     msg.attach_file(path.format(filename=files_list[i]))
    #     print(path.format(filename=files_list[i]))

    msg.send(fail_silently=False)