from django.test import TestCase

# Create your tests here.
# from multiprocessing import Process
# import time
#
#
# class MyProcess(Process):
#     def __init__(self):
#         super(MyProcess, self).__init__()
#
#     def run(self):
#         time.sleep(1)
#         print('hello',self.name,time.ctime())
#
#
# if __name__ == '__main__':
#     p_list = []
#     for i in range(3):
#         p = MyProcess()
#         p_list.append(p)
#         p.start()
#
#     for i in p_list:
#         i.join()
#
#     print('ok')

import time
import threading

start = time.time()

def foo(n):                  #子线程
    print('foo%s'%n)
    time.sleep(2)
    print('end foo')

def bar(n):                  #子线程
    print('bar%s'%n)
    time.sleep(8)
    print('end bar')

t1 = threading.Thread(target = foo,args = (1,))
t2 = threading.Thread(target = bar,args = (2,))

t1.start()
t2.start()

print('======================')  #主进程

t1.join()
t2.join()
end = time.time()
print(end - start)
"""
#IO 密集型任务或函数（转换次数非常多） 计算密集型任务或函数
"""
import time
begin = time.time()

def add(n):
    sum = 0
    for i in range(n):
        sum += i
    print(sum)

add(100000000)
add(100000000)

# t1 = threading.Thread(target = add,args = (100000000,))
# t1.start()
# t2 = threading.Thread(target = add,args = (100000000,))
# t2.start()
# t1.join()
# t2.join()
end = time.time()
print(end - begin)
#12.32570505142212
#12.405709505081177