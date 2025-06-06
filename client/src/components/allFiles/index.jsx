import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register"
import {store} from "../../store/index"
import AuthLayout from "../auth/AuthLayout";
import NotFoundPage from "../notFoundPage/NotFoundPage";
import LoadingSkeleton from "../loadingSkeleton/LoadingSkeleton";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import Navbar from "../navbar/Navbar";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminViewLayout from "../adminView/AdminViewLayout";
import ProductScrollBar from "../adminView/ProductScrollBar";
import AppSidebar from "../sidebar/AppSidebar";
import Footer from "../footer/Footer";
import Home from "@/pages/shop/Home";
import HomeHeroSection from "../shop/HomeHeroSection";
import UsableProduct from "@/utils/UsableProduct";
import ShopProductScrollBar from "../shop/ShopProductScrollbar";
import HomeHeroSectionSecond from "../shop/HomeHeroSectionSecond";
import DiscountBanner from "../shop/DiscountBanner";
import ProductLayout from "../shop/ProductLayout";
import ProductCategory from "@/pages/shop/ProductCategory";
import { footerItems,menuItems, size } from "@/data/Data";
import Explore from "@/pages/shop/Explore";
import ProductView from "@/pages/shop/ProductView";
import CartProduct from "../shop/CartProduct";
import CartLayout from "@/components/shop/CartLayout";
import Cart from "@/pages/shop/Cart";
import Favourite from "@/pages/shop/Favourite";
import FavouriteLayout from "../shop/FavouriteLayout";
import FavouriteProduct from "../shop/FavouriteProduct";
import Profile from "@/pages/userView/Profile";
import Address from "../userView/Address";
import AccountOverview from "../userView/AccountOverview";
import AddressCard from "../userView/AddressCard";
import UserOrder from "../userView/UserOrder";
import AdminOrder from "../adminView/AdminOrder";
import AdminOrderDetails from "../adminView/AdminOrderDetails";
import UserOrderDetails from "../userView/UserOrderDetails";
import Checkout from "@/pages/shop/Checkout";
import LoadScript from "@/utils/LoadScript";
import { RAZORPAY_KEY_ID } from "@/config/config";
import OrderConfirmationPage from "@/pages/shop/OrderConfirmationPage";
import SearchDialog from "../searchDialog/SearchDialog";
export { SearchDialog,RAZORPAY_KEY_ID,OrderConfirmationPage,LoadScript,Checkout,UserOrderDetails,AdminOrderDetails,AdminOrder,AddressCard,AccountOverview,Address,UserOrder,Profile,FavouriteProduct,FavouriteLayout,Favourite,Cart,CartLayout,CartProduct,ProductView,size,Explore,menuItems,footerItems,ShopProductScrollBar,UsableProduct,HomeHeroSection,Home,Footer,AppSidebar,ProductScrollBar,AdminViewLayout,AdminProducts,Login,  store, AuthLayout, NotFoundPage, LoadingSkeleton, ProtectedRoute, Navbar, Register,HomeHeroSectionSecond,DiscountBanner, ProductLayout,ProductCategory };