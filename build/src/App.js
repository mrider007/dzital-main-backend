import './App.css';
import './assets/css/custom.css'
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import AboutUs from './screen/cms/AboutUs';
import Home from './screen/Home';
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Flip, ToastContainer } from "react-toastify";
import ProductList from './screen/ProductList';
import Login from './screen/auth/Login';
import LoginWithEmail from './screen/auth/LoginWithEmail';
import Account from './screen/auth/Account';
import ProductDetail from './screen/ProductDetail';
import ProtectedRoute from './screen/auth/ProtactRoute';
import Realstate from './screen/Realstate';
import RealstateDetail from './screen/RealstateDetail';
import SignupWithEmail from './screen/auth/SignupWithEmail';
import UserUpdate from './screen/auth/UserUpdate';
import JobList from './screen/JobList';
import JobDetail from './screen/JobDetail';
import FashionBeauty from './screen/FashionBeauty';
import Freelancer from './screen/Freelancer';
import FreelancerDetail from './screen/FreelancerDetail';
import LessonCourses from './screen/LessonCourses';
import LessonCoursesDetail from './screen/LessonCoursesDetail';
import MyPost from './screen/auth/account-action/MyPost';
import PostUpdate from './screen/auth/account-action/PostUpdate';
import Chnagepassword from './screen/auth/account-action/Chnagepassword';
import AddPost from './screen/auth/account-action/AddPost';
import Wishlist from './screen/auth/account-action/Wishlist';
import Packages from './screen/auth/account-action/Packages';
import ContactUs from './screen/cms/ContactUs';
import PrivacyPolicy from './screen/cms/PrivacyPolicy';
import TermAndConditions from './screen/cms/TermAndConditions';
import ElectronicsList from './screen/ElectronicsList';
import ElectronicsDetail from './screen/ElectronicsDetail';
import MainLoaidng from './components/loading/MainLoaidng';
import { useAppContext } from './contextApi/AppContext';
import FashionBeautyDetails from './components/fashion-beauty/FashionBeautyDetails';
import Faq from './screen/cms/Faq';
import ScrollToTop from './components/ScrollToTop';
import VideoCall from './components/videocall/VideoCall';
import VoiceCall from './components/voiceCall/VoiceCall';
import ChatApp from './components/videocall/ChatApp ';
import AddProduct from './screen/auth/account-action/AddProduct';
import AddTitle from './screen/auth/account-action/AddTitle';
import Disclaimer from './screen/cms/Disclaimer';
import CustomerSupport from './screen/cms/CustomerSupport';




function App() {
  const { mainscreenLoading } = useAppContext()
  return (
    <div className="App ">
      {
        mainscreenLoading ? (
          <MainLoaidng />
        ) : (
          <>
            <Header />
            <ScrollToTop />
            <ToastContainer
              position="top-center"
              autoClose={2000}
              closeOnClick
              transition={Flip}
            />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermAndConditions />} />
              <Route path="/goods_of_all_kinds" element={<ProductList />} />
              <Route path="/electronics" element={<ElectronicsList />} />
              <Route path="/Electronics-detail/:id" element={<ElectronicsDetail />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Login-with-email" element={<LoginWithEmail />} />
              <Route path="/product-detail/:id" element={<ProductDetail />} />
              <Route path="/real_estate" element={<Realstate />} />
              <Route path="/realstate-detail/:id" element={<RealstateDetail />} />
              <Route path="/singup" element={<SignupWithEmail />} />
              <Route path="/jobs" element={<JobList />} />
              <Route path="/job-detail/:id" element={<JobDetail />} />
              <Route path="/fashion_beauty" element={<FashionBeauty />} />
              <Route path="/Fashion-Beauty-Details/:id" element={<FashionBeautyDetails />} />
              <Route path="/freelancer" element={<Freelancer />} />
              <Route path="/freelancer-detail/:id" element={<FreelancerDetail />} />
              <Route path="/lesson_courses" element={<LessonCourses />} />
              <Route path="/lessons-courses-detail/:id" element={<LessonCoursesDetail />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/videocall" element={<VideoCall />} />
              <Route path="/voice-call" element={<VoiceCall />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/customer_support" element={<CustomerSupport />} />
              <Route path="*" element={<div>page not found</div>} />

              <Route path="/message" element={<ProtectedRoute />}>
                <Route index element={<ChatApp />} />
              </Route>

              <Route path="/account" element={<ProtectedRoute />}>
                <Route index element={<Account />} />
              </Route>

              <Route path="/my-post" element={<ProtectedRoute />}>
                <Route index element={<MyPost />} />
              </Route>

              <Route path="/updateProduct/:id" element={<ProtectedRoute />}>
                <Route index element={<PostUpdate />} />
              </Route>

              <Route path="/add-post" element={<ProtectedRoute />}>
                <Route index element={<AddPost />} />
              </Route>

              <Route path="/add-title" element={<ProtectedRoute />}>
                <Route index element={<AddTitle />} />
              </Route>

              <Route path="/add-product" element={<ProtectedRoute />}>
                <Route index element={<AddProduct />} />
              </Route>

              <Route path="/wishlist" element={<ProtectedRoute />}>
                <Route index element={<Wishlist />} />
              </Route>

              <Route path="/packages" element={<ProtectedRoute />}>
                <Route index element={<Packages />} />
              </Route>

              <Route path="/change-password" element={<ProtectedRoute />}>
                <Route index element={<Chnagepassword />} />
              </Route>

              <Route path="/user-update" element={<ProtectedRoute />}>
                <Route index element={<UserUpdate />} />
              </Route>
              
            </Routes>
            <Footer />
          </>

        )
      }
    </div>
  );
}

export default App;
