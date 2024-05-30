import unittest
from test_cls.login import TestLogin
from test_cls.register import TestRegister
from test_cls.create_post import TestCreatePost
from test_cls.payment import TestPayment


if __name__ == '__main__':
    suite = unittest.TestSuite()
    # suite.addTests(unittest.TestLoader().loadTestsFromTestCase(TestRegister))
    # suite.addTests(unittest.TestLoader().loadTestsFromTestCase(TestLogin))
    # suite.addTests(unittest.TestLoader().loadTestsFromTestCase(TestCreatePost))
    suite.addTests(unittest.TestLoader().loadTestsFromTestCase(TestPayment))
    unittest.TextTestRunner(verbosity=2).run(suite)
