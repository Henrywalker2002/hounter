import { useRoutes } from "react-router-dom";
import Layout from "./layouts/layout";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import HomePage from "./pages/homePage";
import Motel from "./pages/motel";
import Login from "./pages/login";
import Register from "./pages/register";
import Detail from "./pages/detail";
import LikePage from "./pages/likePage";
import AddNewPost from "./pages/newPost";
import UseDetail from "./pages/userDetail";
import PostManage from "./pages/userPosted";
import UpdatePost from "./pages/updatePost";
import AdminManagePost from "./pages/Admin/PostManage";
import PostDetailAdmin from "./pages/Admin/PostDetail";
import AdminManageReport from "./pages/Admin/reportManage";
import AdminManagePayment from "./pages/Admin/paymentManage";

import UserPaymentHistory from "./pages/userPayment";
import FeedbackList from "./pages/Admin/Feedback";
import FeedbackDetail from "./pages/Admin/FeedbackDetail";
import AccountList from "./pages/Admin/AccountList";
import AccountDetail from "./pages/Admin/AccountDetail";
import TestMap from "./pages/testmap";
import PaymentSuccessPage from "./pages/userPayment/notiSuccess";
import PaymentFailurePage from "./pages/userPayment/notiFailure";
import ChangePassword from "./pages/changePass";
import Homestay from "./pages/homestay";
import ManageAccount from "./pages/Admin/AccountManage";
import StaffLayout from "./layouts/StaffLayout";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/motel", element: <Motel /> },
        { path: "/homestay", element: <Homestay /> },
        { path: "/detail/:id", element: <Detail /> }
      ],
    },
    { path: "/login", element: <Login /> },

    { path: "/register", element: <Register /> },
    {path: "/payment-success", element: <PaymentSuccessPage/>},
    {path: "/payment-failure", element: <PaymentFailurePage/>},
    {
      path: "/user",
      element: <UserLayout />,
      children: [
        {
          index: true,
          path: "/user/detail",
          element: <UseDetail />,
        },
        {
          path: "/user/posts",
          element: <PostManage />,
        },
        {
          path: "/user/blance-history",
          element: <UseDetail />,
        },
        {
          path: "/user/payment-history",
          element: <UserPaymentHistory />,
        },
        {
          path: "/user/edit-post/:id",
          element: <UpdatePost />,
        },
        {
          path: "/user/create-post",
          element: <AddNewPost />,
        },
        {
          path: "/user/favorite-post",
          element: <LikePage />,
        },
        {
          path: "/user/change-password",
          element: <ChangePassword/>
        }
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin/posts",
          element: <AdminManagePost />,
        },
        {
          path: "/admin/posts/:id",
          element: <PostDetailAdmin />,
        },
        {
          path: "/admin/feedbacks",
          element: <FeedbackList />
        },
        {
          path: "/admin/feedbacks/:id",
          element: <FeedbackDetail />
        },
        {
          path: "/admin/accounts",
          element: <AccountList />
        },
        {
          path: "/admin/report",
          element: <AdminManageReport/>,
        },
        {
          path: "/admin/payment",
          element: <AdminManagePayment/>,
        },
        {
          path: "/admin/accounts/:id",
          element: <AccountDetail />
        },
        {
          index: true,
          path: "/admin/detail",
          element: <UseDetail />,
        },
        {
          path: "/admin/change-password",
          element: <ChangePassword/>
        }
      ]
    },
    {
      path: "/staff",
      element: <StaffLayout />,
      children: [
        {
          path: "/staff/posts",
          element: <AdminManagePost />,
        },
        {
          path: "/staff/posts/:id",
          element: <PostDetailAdmin />,
        },
        {
          path: "/staff/feedbacks",
          element: <FeedbackList />
        },
        {
          path: "/staff/feedbacks/:id",
          element: <FeedbackDetail />
        },
        {
          path: "/staff/accounts",
          element: <ManageAccount />
        },
        {
          path: "/staff/report",
          element: <AdminManageReport/>,
        },
        {
          path: "/staff/payment",
          element: <AdminManagePayment/>,
        },
        {
          path: "/staff/accounts/:id",
          element: <AccountDetail />
        },
        {
          index: true,
          path: "/staff/detail",
          element: <UseDetail />,
        },
        {
          path: "/staff/change-password",
          element: <ChangePassword/>
        }
      ]
    }
  ]);
  return routes;
}
