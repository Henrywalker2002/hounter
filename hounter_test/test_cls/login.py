from base import BaseTestCase


class TestLogin(BaseTestCase):
    
    @classmethod
    def setUpClass(cls):
        super().setUpClass()    
        cls.data = cls.load_data_xlsx(sheet_name= "login")
    
    def input_data(self, data : dict):
        self.command.execute_open(target = self.login_url)
        input_data = {
            "username": data["username"],
            "password": data["password"]
        }
        self.command.execute_input(value = input_data)
        self.command.execute_click(target = "xpath=//button[@type='submit']")
        self.command.execute_pause(amount = 1)
    
    def check_error(self, expect_error):
        field, value = expect_error.split(":")
        if value == "required":
            self.command.execute_assert_message_error(target = f"id={field}", value = "Please fill out this field.")
        elif value == "invalid":
            self.command.execute_wait_for_element_present(target= "xpath=//*[contains(text(),'Thông tin tài khoản hoặc mật khẩu không chính xác.')]")
    
    def check_success(self):
        self.wait_until_url_is_not(self.login_url)
    
    def test(self):
        super().test()
        self.write_data_xlsx(sheet_name="login", data = self.data)