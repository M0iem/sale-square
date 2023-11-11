import { Navigate, Route, Routes} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ActivationPage from "./pages/ActivationPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
// import { server } from "./server";
// import axios from "axios";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import Home from './pages/Home'
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./routes/ProtectedRoute";

import ShopActivation from "./components/shop/ShopActivation";
import ShopSignUpPage from "./pages/ShopSignUpPage";
import ShopLoginPage from "./pages/ShopLoginPage";
import ShopDashboardPage from "./pages/ShopDashboardPage";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import ShopeHomePage from "./pages/ShopeHomePage";
import { getAllProducts } from "./redux/actions/product";
import AddnewProduct from "./components/shop/AddnewProduct";
import CheckoutPage from "./pages/CheckoutPage";
import axios from "axios";
import { server } from "./server";
import PaymentPage from "./pages/PaymentPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccessPage from "./components/checkout/OrderSuccessPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import UserInbox from "./components/messages/UserInbox";
import ShopAllOrders from "./components/shop/ShopAllOrders";
import ShopAllProducts from "./components/shop/ShopAllProducts";
import ShopInboxPage from "./components/shop/ShopInboxPage";
import ShopSettingPage from "./pages/ShopSettingPage";
import ShopOrderDetails from "./pages/ShopOrderDetails";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import AdminPage from "./pages/AdminPage";
import AdminOrderPage from "./pages/AdminOrderPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminAllSellers from "./components/admin/AdminAllSellers";
import AdminSellerPage from "./pages/AdminSellerPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import ShopPreviewPage from "./components/shop/ShopPreviewPage";


function App() {
  const { isAuthenticated} = useSelector((state) => state.user);
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
   
  }
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    
    getStripeApikey();
  }, []);

  return (
    <div className="App">
    <Navbar/>
    {stripeApikey && (
        <Elements stripe={loadStripe(stripeApikey)}>
          <Routes>
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Elements>
      )} 

      <Routes>
        
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/login" element={!isAuthenticated?(<Login/>):(<Navigate to="/"/>)} />
        <Route path="/sign-up" element={!isAuthenticated?(<SignUp/>):(<Navigate to="/"/>)} />
        
        <Route
          path="/activation/:activationToken"
          element={<ActivationPage />}
        />
         <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
      <Route path="/shop-create" element={<ShopSignUpPage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route
          path="/seller/activation/:activation_token"
          element={<ShopActivation />}
        />


<Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />

<Route
          path="/dashboard-orders"
          element={
            <SellerProtectedRoute>
              <ShopAllOrders />
            </SellerProtectedRoute>
          }
        />
   <Route
          path="/dashboard-messages"
          element={
            <SellerProtectedRoute>
              <ShopInboxPage />
            </SellerProtectedRoute>
          }
        />
      <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopeHomePage />
            </SellerProtectedRoute>
          }
        />

      <Route
          path="/dashboard-create-product"
          element={
            <SellerProtectedRoute>
              <AddnewProduct />
            </SellerProtectedRoute>
          }
        />

<Route
          path="/dashboard-products"
          element={
            <SellerProtectedRoute>
              <ShopAllProducts />
            </SellerProtectedRoute>
          }
        />
<Route
          path="/dashboard-setting"
          element={
            <SellerProtectedRoute>
              <ShopSettingPage />
            </SellerProtectedRoute>
          }
        />
          <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
            <Route path="/order/success" element={<OrderSuccessPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />

            <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <UserInbox />
            </ProtectedRoute>
          }
        />
               <Route
          path="/order/:id"
          element={
            <SellerProtectedRoute>
              <ShopOrderDetails />
            </SellerProtectedRoute>
          }
        />
           <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminPage />
            </ProtectedAdminRoute>
          }
        />
           <Route
          path="/admin-all-orders"
          element={
            <ProtectedAdminRoute>
              <AdminOrderPage />
            </ProtectedAdminRoute>
          }
        />
           <Route
          path="/admin-all-products"
          element={
            <ProtectedAdminRoute>
              <AdminProductsPage />
            </ProtectedAdminRoute>
          }
        />
           <Route
          path="/admin-all-sellers"
          element={
            <ProtectedAdminRoute>
              <AdminSellerPage />
            </ProtectedAdminRoute>
          }
        />
           <Route
          path="/admin-all-users"
          element={
            <ProtectedAdminRoute>
              <AdminUsersPage />
            </ProtectedAdminRoute>
          }
        />


      </Routes>
     
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
