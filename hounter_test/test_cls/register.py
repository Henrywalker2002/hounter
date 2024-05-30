from base import BaseTestCase


class TestRegister(BaseTestCase):
    
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.data = cls.load_data_xlsx('register')
    
    def input_data(self, data):
        self.command.execute_open(target = f"{self.base_url}register")
        self.command.execute_wait_for_element_present(target= "id=username")
        input_data = {
            "username": data["username"],
            "password": data["password"],
            "confirmPassword": data["confirmPassword"],
            "email": data["email"],
            "fullname": data["fullname"],   
        }
        self.command.execute_input(input_data)
        self.command.execute_click(target = "xpath=//button[@type='submit']")
        self.command.execute_pause(amount = 1)
    
    def check_error(self, expect_error):
        field, value = expect_error.split(':')
        if value == 'required':
            self.command.execute_assert_message_error(target = f"id={field}", value= "Please fill out this field.")
        elif value == 'invalid':
            if field == "email":
                ele = self.command.find_target(target = f"id={field}")
                message = ele.get_attribute("validationMessage")
                assert "Please include an '@'" in message
        elif value == "duplicate":
            self.command.execute_assert_text(target= "id=user-helper-text", value = "Tên người dùng đã tồn tại")
        elif value == "short than 8":
            self.command.execute_assert_text(target= "id=password-helper-text", value = "Mật khẩu phải có ít nhất 8 ký tự")
        elif value == "not match":
            self.command.execute_assert_text(target= "id=confirmPassword-helper-text", value = "Mật khẩu không khớp")    
    
    def check_success(self):
        self.command.execute_wait_for_element_present(target = "xpath=//*[contains(text(), 'Tạo tài khoản thành công.')]")
    
    def test(self):
        super().test()
        self.write_data_xlsx('register', self.data)