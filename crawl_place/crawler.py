import threading
from constant import *
from handle import Handle


class Crawler:
    def __init__(self, command = None) -> None:
        if not command:
            self.type_lst = [HCM_TRUNG_TAM_THUONG_MAI, HCM_SIEU_THI, HCM_CHO, HCM_CUA_HANG_TIEN_LOI, HCM_TIEU_HOC, HCM_THCS, HCM_THPT, HCM_BENH_VIEN]
        else :
            self.type_lst = [command]
        
    def handle(self, type):
        handle = Handle(type)
        handle.run()
    
    def run(self):
        thread_lst = []
        for type in self.type_lst:
            thread = threading.Thread(target=self.handle, args=(type,))
            thread_lst.append(thread)   
            thread.start()
        
        for thread in thread_lst:
            thread.join()
        
        print("Done")