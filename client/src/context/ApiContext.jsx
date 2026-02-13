import axios from "axios";
import { createContext, useContext, useState, useCallback } from "react";

const ApiCOntext = createContext();

export const ApiProvider = ({ children }) => {
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const axiosClient = axios.create({
    baseURL: "https://sem7-pux8.onrender.com/api/v1", 
    withCredentials: true,
  });

  axiosClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem("accessToken");
    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;

  },
  (error) => Promise.reject(error)
)

  const callApi = useCallback(async (method, url, data = {}, conifg) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axiosClient({
        method,
        url,
        data,
        ...conifg,
      });
      return res.data;
    } catch (error) {
      setError(error.message || "Something went wrong");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const get = (url, config) => callApi("GET", url, {}, config);
  const post = (url, data, config) => callApi("POST", url, data, config);
  const put = (url, data, config) => callApi("PUT", url, data, config);
  const remove = (url, config) => callApi("DELETE", url, {}, config);

  const api = {
    // ---------------- USER ----------------
    user: {
      register: (data) => post("/users/registerUser", data),
      login: (data) => post("/users/loginUser", data),
      logout: () => post("/users/logoutUser"),
      refreshToken: () => post("/users/refreshAccessToken"),
      getProfile: () => get("/users/getUserDetails"),
      updateProfile: (data) => put("/users/updateUserDetails", data),
    },

    // ---------------- COURSE ----------------
    course: {
      create: (data) =>
        post("/courses/createCourse", data, {
          headers: { "Content-Type": "multipart/form-data" },
        }),

      update: (courseId, data) =>
        put(`/courses/updateCourse/${courseId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        }),

      getAll: () => get("/courses/getAllCourses"),
      getById: (courseId) => get(`/courses/getCourseById/${courseId}`),
      delete: (courseId) => remove(`/courses/deleteCourse/${courseId}`),

      browse: () => get("/courses/browseCourses"),
      getInstructorCourses: (instructorId) =>
        get(`/courses/getInstructorCourses/${instructorId}`),

      enroll: (courseId) => put(`/courses/enroll/${courseId}`),
      isEnrolled: (courseId) => get(`/courses/isEnrolled/${courseId}`),
    },

    // ---------------- LECTURE ----------------
    lecture: {
      add: (data) => post("/lectures/addLecture", data),
      update: (lectureId, data) =>
        put(`/lectures/updateLecture/${lectureId}`, data),
      delete: (lectureId) => remove(`/lectures/deleteLecture/${lectureId}`),
      getBySection: (sectionId) =>
        get(`/lectures/getLecturesBySection/${sectionId}`),
    },

    // ---------------- SECTION ----------------
    section: {
      add: (data) => post("/sections/addSection", data),
      update: (sectionId, data) =>
        put(`/sections/updateSection/${sectionId}`, data),
      delete: (sectionId) => remove(`/sections/deleteSection/${sectionId}`),
      getByCourse: (courseId) =>
        get(`/sections/getSectionsByCourse/${courseId}`),
    },

    // ---------------- INSTRUCTOR ----------------
    instructor: {
      getAll: () => get("/instructor/getAllInstructor"),
      getById: (id) => get(`/instructor/getInstructorById/${id}`),
      getProfile: (id) => get(`/instructor/${id}`),
      getCourses : (instructorId, page=1) =>get(`/instructor/courses/${instructorId}?page=${page}&limit=3`),
      hasRated : (instructorId, currentUserId) => get(`/instructor/hasRated/${instructorId}/${currentUserId}`),
    },

    // ---------------- DASHBOARD ----------------
    dashboard: {
      overview: (userId) => get(`/dashboard/${userId}`),
    },

    // ---------------- WISHLIST ----------------
    wishlist: {
      add: (courseId) => post(`/wishlist/addTowishList/${courseId}`),
      get: () => get("/wishlist/getWishlistItems"),
      remove: (courseId) =>
        remove(`/wishlist/removeFromWishlist/${courseId}`),
    },

    // ---------------- FOLLOW ----------------
    follow: {
      followUnFollowUser: (currentUserId, instructorId) => post(`/follow/followUnfollow/${currentUserId}/${instructorId}`),
      followers: (userId) => get(`/follow/followers/${userId}`),
      following: (userId) => get(`/follow/getFollowing/${userId}`),
    },

    // ---------------- REVIEW ----------------
    review: {
      add: (data) => post("/reviews/addReview", data),
      avgRating : (courseId)=>get(`/reviews/average/${courseId}`),
      update: (reviewId, data) =>
        put(`/reviews/updateReview/${reviewId}`, data),
      delete: (reviewId) => remove(`/reviews/deleteReview/${reviewId}`),
      getByCourse: (courseId, pageNum=1) =>
        get(`/reviews/${courseId}?page=${pageNum}&limit=2`),
    },

    // ---------------- PAYMENT ----------------
    payment: {
      checkout: (courseId) => post(`/payment/checkout/${courseId}`),
      verifyPayment: (data, courseId) => post(`/payment/verification/${courseId}`, data),
    },

    // ---------------- TRANSACTION ----------------
    transaction: {
      getAll: () => get("/transaction/getAllTransaction"),
      getByUser: (userId) =>
        get(`/transaction/getUserTransactions/${userId}`),
    },

    // ---------------- PROGRESS ----------------
    progress: {
      update: (data) => post("/progress/updateProgress", data),

      // based on your final route:
      // GET /progress/:userId/:courseId
      get: (userId, courseId) => get(`/progress/${userId}/${courseId}`),
    },

    // ---------------- NOTIFICATIONS ----------------
    notifications: {
      getAll: () => get("/notifications/getNotifications"),
      markRead: (id) => put(`/notifications/markAsRead/${id}`),
    },
  };

  return (
    <ApiCOntext.Provider value={{ api, Loading, error }}>
      {children}
    </ApiCOntext.Provider>
  );
};

export const useApi = () => useContext(ApiCOntext);
