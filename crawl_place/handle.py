from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from constant import *
import sys
import requests
import json
import pandas as pd 
import os 
import time

class Handle:
    def __init__(self, type : str) -> None:
        option = Options()
        option.add_argument("--window-size=1920,1080")
        option.add_argument("--log-level=3")
        service = Service(DRIVER_PATH)
        self.driver = webdriver.Edge(options=option, service=service)
        self.token = None 
        self.type = type
        
    def get_token(self, delay = 10):
        print("Start to get token")
        self.driver.get("https://bando.tphcm.gov.vn/gis-portal")
        try :
            present = EC.presence_of_element_located((By.CLASS_NAME, "map-tool-bar-container"))
            el = WebDriverWait(self.driver, 10).until(present)
            time.sleep(2)
            self.token = self.driver.get_cookie('vdmsPublicAccesstoken')['value']
            print("Get token success")
            self.driver.quit()
        except TimeoutException as e:
            print("Loading took too much time!")
            sys.exit(0)
            
    def handle_response(self, type, data):
        if not os.path.isfile(f"{type}.csv"):
            df = pd.read_json(json.dumps(data))
            df.to_csv(f"{type}.csv", index = False)
        else :
            df = pd.read_csv(f"{type}.csv")
            df = pd.concat([df, pd.read_json(json.dumps(data))])
            df.to_csv(f"{type}.csv", index = False)
    
    def get_list_place(self, type , limit = 100):
        print(f"Start to get list place type {type}")
        data = {
            "IsInTree": True,
            "skip": 0,
            "take": limit,
            "select": [
                "*"
            ]
        }
        url = f"https://bando.tphcm.gov.vn/api/vdms-data/{type}/query"
        header = {
            "Authorization": f"Bearer {self.token}",
            "Content-Type": "application/json",
        }
        response = requests.post(url, data = json.dumps(data) , headers = header)
        js = response.json()
        assert "errorMessages" not in js, js.get("errorMessages")
        self.handle_response(data = js.get('data'), type = type)
        while js.get("total", 0) > limit + data["skip"]:
            data["skip"] = data["skip"] + limit
            response = requests.post(url, data = json.dumps(data) , headers = header)
            js = response.json()
            self.handle_response(data = js.get('data'), type = type)
        
        print(f"Get list place type {type} success")
    
    def run(self, delay = 15):
        self.get_token(delay)
        self.get_list_place(self.type)