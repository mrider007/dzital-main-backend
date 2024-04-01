import React, { useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import { toast } from "react-toastify";    
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../components/firebase/Firebase";   

const baseURL = "http://13.201.212.185:4200";
 
const AppContextProvider = ({ children }) => {
  const [isLogIn, setIsLogIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [cmsData, setCmsData] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [subServiceList, setSubServiceList] = useState([]);
  const [subServiceLoading, setSubServiceLoading] = useState(false);
  const [goodsList, setGoodsList] = useState([]);
  const [packagesList, setPackagesList] = useState([]);
  const [goodsItems, setGoodsItems] = useState({isLoad: false, data: {}});
  const [electronicsItems, setElectronicsItems] = useState({data: {}, isLoad: false});
  const [electronicsList, setElectronicsList] = useState([]);
  const [tk, setTk] = useState("");
  const [loading, setLoading] = useState(false);
  const [mainscreenLoading, setMainscreenLoading] = useState(false);
  const [jobDetail, setJobDetail] = useState({data: {}, isLoad:false});
  const [lessonDetail, setlessonDetail] = useState({data: {}, isLoad: false});

  // i added useState here
  const [freelancerList, setFreelancerList] = useState([]);
  const [freelancerDetail, setFreelancerDetail] = useState({data: {}, isLoad: false});
  const [fashion, setFashion] = useState([]);
  const [fashionDetail, setFashionDetail] = useState({data: {}, isLoad: false});
  const [lesson, setLesson] = useState([]);
  const [property, setProperty] = useState([]);
  const [propertyDetail, setPropertyDetail] = useState({data: [], isLoad: false});
  const [jobList, setJobList] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [faq, setFaq] = useState([]);
  const [skeleton, setSkeleton] = useState(false);
  const [attributeList , setAttributeList] = useState([])
  const [productId, setProductId] = useState([])
  const [mypost, setMyPost] = useState([])
  const [totalItem, SetTotalItem] = useState({
    goods: 0,
    job: 0,
    freelancer: 0,
    RealEstate: 0,
    Lessons: 0,
    Fashion: 0,
    Electronics: 0,
    post: 0,
  });

  const [listLoading, SetListLoading] = useState({
    goods: false,
    job: false,
    freelancer: false,
    RealEstate: false,
    Lessons: false,
    Fashion: false,
    Electronics: false,
    WishList: false,
    Post : false
  });

  const navigate = useNavigate();
  const location = useLocation()
  const token = localStorage.getItem("token");       


  const checkTokenValidity = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    if (tk || token) {
      try {
        const response = await fetch(`${baseURL}/api/profile/details`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: tk || token,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUserData(data.data);
          setIsLogIn(true);
        } else {
          setIsLogIn(false);
        }
      } catch (error) {
        setIsLogIn(false);
      }
    } else {
      setIsLogIn(false);
    }
    setLoading(false);
  };

  const handleLogin = async (token, message) => {
    const searchParams = new URLSearchParams(location.search);
    const paramValue = searchParams.get('redirect');
    setTk(token);
    localStorage.setItem("token", token);
    await checkTokenValidity();
    toast.success(message);
    if(paramValue){
      navigate(`/${paramValue}`)
    }else{
      navigate("/account");
    }
  };

  const RegisterUser = async (name, email, password) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      const response = await axios.post(`${baseURL}/api/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data;
      if (response.status === 200) {
        handleLogin(data.token, data.message);
        setIsLogIn(true);
      } else {
        setIsLogIn(false);
        toast.error(data.message);
      }
    } catch (error) {
      setIsLogIn(false);
    }
  };

  const LoginUser = async (email, password) => {
    try {
      setLoading(true);
      const req = await fetch(`${baseURL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await req.json();
      if (req.ok) {
        handleLogin(data.token, data.message);
        setIsLogIn(true);
      } else {
        setIsLogIn(false);
        toast.error(data.message);
      }
    } catch (error) {
      setIsLogIn(false);
      toast.error("Server Down");
    } finally {
      setLoading(false);
    }
  };

  const ChnagePassword = async (currentpass, newpassword) => {
    try {
      const req = await fetch(`${baseURL}/api/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          currentPassword: currentpass,
          newPassword: newpassword,
        }),
      });
      const data = await req.json();
      console.log('data', data)
      if (req.ok) {
        toast.success(data.message);
        // LogOut();
        navigate("/account");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Server Down");
    }
  };
 
  const SocialLoginUser = async (email, socialId, provider, name, photo) => {
    try {
      setLoading(true);
      const req = await fetch(`${baseURL}/api/social-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          social_id: socialId,
          register_type: provider,
          image: photo,
          name: name,
        }),
      });
      const data = await req.json();
      if (req.ok) {
        handleLogin(data.token, data.message);
        setIsLogIn(true);
      } else {
        setIsLogIn(false);
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Server Down");
    } finally {
      setLoading(false);
    }
  };

  const LogOut = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${baseURL}/api/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem("token");
        setUserData({});
        setIsLogIn(false);
        signOut(auth);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("Server Down");
    }
  };

  const getUser = async () => {
    await checkTokenValidity();
  };

  const updateProfile = async (name, email, image, mobile, bio, address) => {
    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    form.append("image", image);
    form.append("mobile", mobile);
    form.append("bio", bio);
    form.append("address", address);
    try {
      const req = await axios.post(`${baseURL}/api/profile/update`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });
      const res = req.data;
      toast(res.message)
      getUser();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const getCms = async () => {
    try {
      const response = await fetch(`${baseURL}/api/cms/getAll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setCmsData(data.data);
      }
    } catch (error) {
      toast.error("Server Down");
    }
  };

  const getServiceList = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/api/service/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setServiceList(data.data);
      }
    } catch (error) {
      // toast.error("Server Down");
      console.log(error);
    }
    setLoading(false);
  };

  const getSubServiceList = async (parentId) => {
    try {
      setSubServiceLoading(true)
      const response = await fetch(`${baseURL}/api/service/sub-category/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parentId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubServiceList(data.data);
      }
    } catch (error) {
      // toast.error("Server Down");
      console.log(error);
    }finally{
      setSubServiceLoading(false)
    }
  };

  const AddTitleDes = async (formdata) => {
    try {
      const response = await fetch(`${baseURL}/api/user/product/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({...formdata}),
      });
      const data = await response.json();
      // console.log('data', data)
      if (response.ok) {
        toast.success(data.message)
        setProductId(data.data._id)
      }
      return data;
    } catch (error) {
      // toast.error("Server Down");
      toast.error(error)
      console.log(error);
    }
  };

  const AddRealEstate = async (formdata) => {
    try {
      const response = await axios.post(`${baseURL}/api/property/add`,formdata ,{
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });
      const data =  response;
      toast.success(data.message|| 'Success')
      navigate('/my-post')
      return data;
    } catch (error) {
      // toast.error("Server Down");
      toast.error(error)
      console.log(error);
    }
  };

  const AddGoodsProduct = async (formdata) => {
    try {
      const response = await axios.post(`${baseURL}/api/product/goods/add`,formdata ,{
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });
      const data =  response;
      toast.success(data.message|| 'Success')
      navigate('/my-post')
      return data;
    } catch (error) {
      toast.error(error)
      // console.log(error);
    }
  };
     
  const AddCourse = async (formdata) => {
    try {
      const response = await axios.post(`${baseURL}/api/product/lesson-course/add`,formdata ,{
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });
      const data =  response;
      toast.success(data.message|| 'Success')
      navigate('/my-post')
      return data;
    } catch (error) {
      toast.error(error)
      // console.log(error);
    }
  };

  const AddElectronics = async (formdata) => {
    try {
      const response = await axios.post(`${baseURL}/api/product/electronics/add`,formdata ,{
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });
      const data =  response;
      toast.success(data.message|| 'Success')
      navigate('/my-post')
      return data;
    } catch (error) {
      toast.error(error)
      // console.log(error);
    }
  };

  const AddFreelancer = async (formdata) => {
    try {
      const response = await axios.post(`${baseURL}/api/product/freelancer/add`,formdata ,{
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });
      const data =  response;
      toast.success(data.message|| 'Success')
      navigate('/my-post')
      return data;
    } catch (error) {
      toast.error(error)
      // console.log(error);
    }
  };

  const AddJob = async (formdata) => {
    try {
      const response = await axios.post(`${baseURL}/api/job/post`,formdata ,{
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });
      const data =  response;
      toast.success(data.message|| 'Success')
      navigate('/my-post')
      return data;
    } catch (error) {
      toast.error(error)
      // console.log(error);
    }
  };

  const AddFashionProduct = async (formdata) => {
    try {
      const response = await axios.post(`${baseURL}/api/product/fashion/add`,formdata ,{
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });
      const data =  response;
      toast.success(data.message|| 'Success')
      navigate('/my-post')
      return data;
    } catch (error) {
      toast.error(error)
      // console.log(error);
    }
  };

  const getGoodsProduct = async (searchData) => {
    try {
      SetListLoading({ ...listLoading, goods: true });
      const { keyword_search, page, limit } = searchData;
      const response = await fetch(`${baseURL}/api/product/goods/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword_search: keyword_search || "",
          page: page,
          limit: limit,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSkeleton(true);
        setGoodsList(data.data);
        SetTotalItem({ ...totalItem, goods: data.total });
      }
    } catch (error) {
      // toast.error("Server Down");
      console.log(error);
    } finally {
      setSkeleton(false);
      SetListLoading({ ...listLoading, goods: false });
    }
  };

  const getGoodsProductDetails = async (id) => {
    try {
      setGoodsItems({data: {}, isLoad: true});
      const response = await fetch(
        `${baseURL}/api/product/goods/details/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setGoodsItems({data: data.data, isLoad: false});
      }else{
        setGoodsItems({data: {}, isLoad: false});
      }
    } catch (error) {
      setGoodsItems({data: {}, isLoad: false});
      // toast.error("Server Down");
      console.log(error);
    }
  };

  const getElectronicsProduct = async (searchData) => {
    try {
      SetListLoading({ ...listLoading, Electronics: true });
      const { keyword_search, page, limit } = searchData;
      const response = await fetch(`${baseURL}/api/product/electronics/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword_search: keyword_search || "",
          page: page,
          limit: limit,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setElectronicsList(data.data);
        SetTotalItem({ ...totalItem, Electronics: data.total });
      }
    } catch (error) {
      // toast.error("Server Down");
      console.log(error);
    } finally {
      SetListLoading({ ...listLoading, Electronics: false });
    }
  };

  const getElectronicsProductDetails = async (id) => {
    try {
      setElectronicsItems({data: {}, isLoad: true})
      const response = await fetch(
        `${baseURL}/api/product/electronics/details/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setElectronicsItems({data: data.data, isLoad: false});
      }else{
        setElectronicsItems({data: {}, isLoad: false});
      }
    } catch (error) {
      setElectronicsItems({data: {}, isLoad: false})
      // toast.error("Server Down");
      console.log(error);
    }
  };

  // i started creating function from here
  const getFreelancer = async (searchData) => {
    try {
      SetListLoading({ ...listLoading, freelancer: true });
      const { keyword_search, page, limit } = searchData;
      const response = await fetch(`${baseURL}/api/product/freelancer/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword_search: keyword_search || "",
          page: page,
          limit: limit,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setFreelancerList(data.data);
        SetTotalItem({ ...totalItem, freelancer: data.total });
      }
    } catch (error) {
      // toast.error("Server Down");
      console.log(error);
    } finally {
      SetListLoading({ ...listLoading, freelancer: false });
    }
  };

  const getFreelancerDetails = async (id) => {
    try {
      setFreelancerDetail({data: {}, isLoad: true});
      const response = await fetch(
        `${baseURL}/api/product/freelancer/details/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      // console.log("data", data);
      if (response.ok) {
        setFreelancerDetail({data: data.data, isLoad: false});
      }else {
        setFreelancerDetail({data: {}, isLoad: false});
      }
    } catch (error) {
      setFreelancerDetail({data: {}, isLoad: false});
      // toast.error("Server Down");
      console.log(error);
    }
  };

  const getFashionBeauty = async (searchData) => {
    try {
      SetListLoading({ ...listLoading, Fashion: true });
      const { keyword_search, page, limit } = searchData;
      const response = await fetch(`${baseURL}/api/product/fashion/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword_search: keyword_search || "",
          page: page,
          limit: limit,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setFashion(data.data);
        SetTotalItem({ ...totalItem, Fashion: data.total });
      }
    } catch (error) {
      // toast.error("Server Down");
      console.log(error);
    } finally {
      SetListLoading({ ...listLoading, Fashion: false });
    }
  };

  const getFashionBeautyDetails = async (id) => {
    try {
      setFashionDetail({data: {}, isLoad: true});
      const response = await fetch(
        `${baseURL}/api/product/fashion/details/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setFashionDetail({data: data.data, isLoad: false});
      }else{
        setFashionDetail({data: {}, isLoad: false});
      }
    } catch (error) {
      setFashionDetail({data: {}, isLoad: false});
      // toast.error("Server Down");
      console.log(error);
    }
  };

  const getProperty = async (searchData) => {
    try {
      SetListLoading({ ...listLoading, RealEstate: true });
      const { keyword_search, page, limit } = searchData;
      const response = await fetch(`${baseURL}/api/property/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword_search: keyword_search || "",
          page: page,
          limit: limit,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setProperty(data.data);
        SetTotalItem({ ...totalItem, RealEstate: data.total });
      }
    } catch (error) {
      // toast.error("Server Down");
      console.log(error);
    } finally {
      SetListLoading({ ...listLoading, RealEstate: false });
    }
  };

  const getPropertyDetail = async (id) => {
    try {
      setPropertyDetail({data: [], isLoad: true});
      const response = await fetch(`${baseURL}/api/property/details/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setPropertyDetail({data: data.data, isLoad: false});
      }else{
        setPropertyDetail({data: [], isLoad: false});
      }
    } catch (error) {
      setPropertyDetail({data: [], isLoad: false});
      // toast.error("Server Down");
      console.log(error);
    }
  };
  
  const getLesson = async (searchData) => {
    try {
      SetListLoading({ ...listLoading, Lessons: true });
      const { keyword_search, page, limit } = searchData;
      const response = await fetch(
        `${baseURL}/api/product/lesson-courses/list`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            keyword_search: keyword_search || "",
            page: page,
            limit: limit,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setLesson(data.data);
        SetTotalItem({ ...totalItem, Lessons: data.total });
      }
    } catch (error) {
      // toast.error("Server Down");
      console.log(error);
    } finally {
      SetListLoading({ ...listLoading, Lessons: false });
    }
  };

  const getLessonDetail = async (id) => {
    try {
      setlessonDetail({data: {}, isLoad: true});
      const response = await fetch(
        `${baseURL}/api/product/lesson-course/detail/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      // console.log('data', data)
      if (response.ok) {
        setlessonDetail({data: data.data, isLoad: false});
      }else{
        setlessonDetail({data: {}, isLoad: false});
      }
    } catch (error) {
      setlessonDetail({data: {}, isLoad: false});
      // toast.error("Server Down");
      console.log(error);
    }
  };

  const getJobList = async (searchData) => {
    try {
      SetListLoading({ ...listLoading, job: true });
      const { keyword_search, page, limit } = searchData;
      const response = await fetch(`${baseURL}/api/product/job/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword_search: keyword_search || "",
          page: page,
          limit: limit,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setJobList(data.data);
        SetTotalItem({ ...totalItem, job: data.total });
      }
    } catch (error) {
      // toast.error("Server Down");
      console.log(error);
    } finally {
      SetListLoading({ ...listLoading, job: false });
    }
  };

  const getJobListDetail = async (id) => {
    try {
      setJobDetail({data: {}, isLoad: true});
      const response = await fetch(`${baseURL}/api/job/details/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // console.log('jobdetail', data)
      if (response.ok) {
        setJobDetail({data: data.data, isLoad: false});
      }else{
        setJobDetail({data: {}, isLoad: false});
      }
    } catch (error) {
      setJobDetail({data: {}, isLoad: false});
      // toast.error("Server Down");
      console.log(error);
    }
  };

  const getMyPost = async (searchData) => {
    try {
      SetListLoading({ ...listLoading, Post: true });
      const { keyword_search, page, limit } = searchData;
      const response = await fetch(`${baseURL}/api/user/product/list`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({
          keyword_search: keyword_search || "",
          page: page,
          limit: limit,
        }),
      });
      const data = await response.json();
      // console.log('setMyPost', data)
      if (response.ok) {
        setMyPost(data.data);
        SetTotalItem({ ...totalItem, post: data.total });
      }
    } catch (error) {
      toast.error("Server Down");
      // console.log(error);
    } finally{
      SetListLoading({ ...listLoading, Post: false });
    }
  };

  const getWishList = async () => {
    try {
      SetListLoading({ ...listLoading, WishList: true });
      const response = await fetch(`${baseURL}/api/user/product/wishlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      const data = await response.json();
      // console.log('wishlist', data.data.wishlist)
      if (response.ok) {
        setWishList(data.data.wishlist);
      }
    } catch (error) {
      toast.error("Server Down");
      // console.log(error);
    }finally{
      SetListLoading({ ...listLoading, WishList: false });

    }
  };

  const wishListAdd = async (id) => {
    try {
      if (!isLogIn) {
        toast.info("Login first");
        navigate("/login");
        return;
      } else {
        const response = await fetch(
          `${baseURL}/api/user/product/wishlist/add`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
            body: JSON.stringify({
              product_id: id,
            }),
          }
        );
        const data = await response.json();
        // const wishListData = data.data[0]
        if (response.ok) {
          toast.success(data.message);
          getWishList();
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      // toast.error("Server Down");
      console.log(error);
    }
  };

  const wishListRemove = async (id) => {
    try {
      const response = await fetch(
        `${baseURL}/api/user/product/wishlist/remove`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
            product_id: id,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        getWishList();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      // toast.error("Server Down");
      console.log(error);
    }
  };

  const getFaq = async () => {
    try {
      const response = await fetch(`${baseURL}/api/all-faq`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setFaq(data.data);
      }
    } catch (error) {
      // toast.error("Server Down");
      console.log(error);
    }
  };

  const getUserplan = async () => {
    try {
      const response = await fetch(`${baseURL}/api/user/membership/plan/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setPackagesList(data.data);
      }
    } catch (error) {
      toast.error("Server Down");
    }
  };

  const getAttributeList = async (attributeData) => {
    try {
      const response = await axios.post(`${baseURL}/api/attribute/list`,{
        "category_id": attributeData.category_id || "",
        "sub_category_id": attributeData.sub_category_id || ""
      } ,{
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      const data =  response;
      setAttributeList(data.data.data)
      return data;
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setMainscreenLoading(true);
      try {
        await getUser();
        await getServiceList();
        
      } catch (error) {
      } finally {
        setMainscreenLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if(location.pathname === '/'){
      getElectronicsProduct({});
      getGoodsProduct({});
      getFreelancer({});
      getFashionBeauty({});
      getProperty({});
      getLesson({});
      getJobList({});
      getCms();  
    }
    if(location.pathname === '/wishlist'){
      getWishList()
   }
    
  },[location.pathname])

  const contextValues = {
    RegisterUser,
    LoginUser,
    isLogIn,
    LogOut,
    userData,
    cmsData,
    checkTokenValidity,
    loading,
    SocialLoginUser,
    serviceList,
    goodsList,
    electronicsList,
    getGoodsProductDetails,
    goodsItems,
    getElectronicsProductDetails,
    electronicsItems,
    getUserplan,
    packagesList,
    ChnagePassword,
    mainscreenLoading,
    updateProfile,
    setMainscreenLoading,

    // i passed here
    getFreelancer,
    freelancerList,
    freelancerDetail,
    getFreelancerDetails,
    fashion,
    wishListAdd,
    wishListRemove,
    wishList,
    faq,
    getFaq,
    skeleton,
    property,
    getPropertyDetail,
    propertyDetail,
    lesson,
    jobList,
    getGoodsProduct,
    totalItem,
    getJobList,
    getLesson,
    getElectronicsProduct,
    getFashionBeauty,
    getProperty,
    listLoading,
    jobDetail,
    getJobListDetail,
    lessonDetail,
    getLessonDetail,
    fashionDetail,
    getFashionBeautyDetails,
    getSubServiceList,
    subServiceList,
    subServiceLoading,
    AddTitleDes,
    AddRealEstate,
    getAttributeList,
    attributeList,
    productId,
    AddJob,
    AddFashionProduct,
    AddFreelancer,
    AddElectronics,
    AddCourse,
    AddGoodsProduct, 
    getMyPost,                                                                     
    mypost
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
    