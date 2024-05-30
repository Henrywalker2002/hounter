from base import BaseTestCase   
import os 


class TestCreatePost(BaseTestCase):
    
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.data = cls.load_data_xlsx(sheet_name= "create_post")
        cls.login_with_account(username = "hungnguyen", password= "string")
    
    def input_data(self, data):
        self.command.execute_open(target  = f"{self.base_url}user/create-post")
        self.command.execute_wait_for_element_present(target = "id=title")
        input_data = {
            "street" : data["street"],
            "title" : data["title"],
            "description" : data["description"],
            "area" : data["area"],
            "price" : data["price"],
            "phone" : data["phone"],
            "days" : data["days"],
        }
        self.command.execute_input(input_data)
        self.command.execute_upload_file(target = "xpath=//input[@type='file']", value = os.path.join(os.getcwd(), "assets", data["image"]))
        self.command.execute_click(target = "xpath=//button[@type='submit']")
        self.command.execute_pause(amount = 1)
    
    def check_error(self, expect_error):
        field, value = expect_error.split(":")
        if value == "required":
            self.command.execute_assert_message_error(target = f"id={field}", value = "Please fill out this field.")
        elif value == "invalid":
            if field == "phone":
                self.command.execute_assert_text(target = f"id={field}-helper-text", value = "Số điện thoại không hợp lệ")
            elif field == "area":
                self.command.execute_assert_text(target = f"id={field}-helper-text", value = "Diện tích không hợp lệ")
            elif field == "price":
                self.command.execute_assert_text(target = f"id={field}-helper-text", value = "Giá không hợp lệ")
        elif value == "not less than":
            self.command.execute_assert_text(target= f"id={field}-helper-text", value = "Số ngày nhỏ nhất là 3")
    
    def check_success(self):
        self.command.execute_wait_for_element_present(target = "xpath=//*[contains(text(), 'Thêm thành công')]")
    
    def test(self):
        super().test()
        self.write_data_xlsx(sheet_name="create_post", data = self.data)