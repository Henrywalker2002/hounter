from base import BaseTestCase


class TestPayment(BaseTestCase):
    
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.login_with_account("hungnguyen", "string")
        cls.data = cls.load_data_xlsx('payment')
    
    def handle_pay_vnpay(self, data : dict):
        self.command.execute_pause(amount= 2)
        input_data = {
            "card_number_mask" : data.get('card_number'),
            "cardHolder" : data.get('card_holder'),
            "cardDate" : data.get('card_date'),    
        }
        self.command.execute_input(value = input_data)
        self.command.execute_pause(amount = 2)
        self.command.execute_wait_for_element_clickable(target = "id=btnContinue")
        self.command.execute_click(target = "id=btnContinue")
        self.command.execute_wait_for_element_present(target = "xpath=//div[@role='dialog']", amount=5)
        self.command.execute_pause(amount = 2)
        self.command.execute_click(target = "id=btnAgree")
        self.command.execute_wait_for_element_present(target= "id=otpvalue")
        self.command.execute_pause(amount = 2)
        self.command.execute_type(target = "id=otpvalue", value = data.get('otp'))
        self.command.execute_click(target = "id=btnConfirm")
        self.command.execute_pause()
    
    def input_data(self, data: dict):
        self.command.execute_open(target = f"{self.base_url}user/posts")
        self.command.execute_wait_for_element_present(target = f"id=post-{data.get('post-id')}")
        self.command.execute_click(target = f"xpath=//*[@id='post-{data.get('post-id')}']//button")
        self.handle_pay_vnpay(data)

    def check_error(self, expect_error):
        return super().check_error(expect_error)
    
    def check_success(self):
        url = self.driver.current_url
        assert self.base_url in url 
    
    def test(self):
        super().test()
        self.write_data_xlsx('payment', self.data)