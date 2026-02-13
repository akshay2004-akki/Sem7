import React, { useEffect, useState } from "react";
import { BookOpen, Clock, Users, PlayCircle, CheckCircle, ClockIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useApi } from "../context/ApiContext";

// --- Function to dynamically load the Razorpay script ---
const loadRazorpayScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const CourseDetails = () => {
  const { courseId } = useParams();
  const userId = localStorage.getItem("userId");

  const [details, setDetails] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(null);

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [avg, setAvg] = useState(0);

  // Description expand/collapse
  const [expanded, setExpanded] = useState(false);

  const {api} = useApi();

  //course details fetch
  useEffect(()=>{
    api.course.getById(courseId).then((res)=>{
      setDetails(res.course)
      
    })
  },[courseId])



  //fetch progress
  useEffect(()=>{
    api.progress.get(userId, courseId).then(res=>setProgress(res.progress))
  },[isEnrolled, userId, courseId])


  //fetch reviews
  useEffect(() => {
    api.review.getByCourse(courseId).then((res)=>{
      setReviews(res.reviews);
      setPage(res.page)
      setTotalPages(res.totalPages)})
  }, [courseId, page]);

  useEffect(() => {
    const checkLoginStatus = localStorage.getItem("isLoggedIn") === "true";
    setLoggedIn(checkLoginStatus);
  }, []);


  //check enrollment
  useEffect(()=>{
    if(loggedIn){
      api.course.isEnrolled(courseId).then((res)=>{setIsEnrolled(res.isEnrolled)})
    }
  },[courseId, loggedIn])

  const route = useNavigate();

  // --- Razorpay Payment and Enrollment Handler ---
  const handleEnrollment = async () => {
    if (!loggedIn) {
      route("/login");
      return;
    }

    const scriptLoaded = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!scriptLoaded) {
      alert("Could not load payment gateway. Please check your connection and try again.");
      return;
    }

    try {
      // 1. Create Order on Backend
      const res = await api.payment.checkout(courseId)
      console.log(res);
      
      
      // ✨ FIX: Correctly destructure the nested response data from your API
      const { order, key_id } = res;

      // 2. Open Razorpay Checkout Modal
      const options = {
        key: key_id,
        amount: order.amount,
        currency: order.currency,
        name: "Your Learning Platform",
        description: `Payment for ${details.title}`,
        image: details.thumbnail,
        order_id: order.id,
        handler: async function (response) {
          try {
            // 3. Verify Payment: Send payment details to backend for verification
            const verificationRes = await api.payment.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }, courseId);

            alert(verificationRes.message || "Enrollment successful!");
            setIsEnrolled(true);

          } catch (verificationError) {
            console.error("Payment verification failed:", verificationError);
            alert("Payment verification failed. If the amount was deducted, please contact support.");
          }
        },
        prefill: {},
        theme: {
          color: "#0891b2",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response){
        alert(response.error.description);
      });
      rzp1.open();

    } catch (error) {
      console.error("Enrollment process failed:", error);
      alert(error.response?.data?.message || "Could not initiate payment. Please try again.");
    }
  };

  const handleReviewSubmit = async () => {
    if (!loggedIn || !isEnrolled) {
      alert("You must be enrolled to leave a review.");
      return;
    }
    try {
      const res = await axios.post(
        `https://sem7-pux8.onrender.com/api/v1/reviews/${courseId}/${userId}`,
        newReview,
        { withCredentials: true }
      );
      alert(res.data.message);
      fetchReviews(1);
      setNewReview({ rating: 0, comment: "" });
    } catch (error) {
      console.log(error.message);
    }
  };

  const openLecturePage = (lecture) => {
    const url = `/course/${courseId}/lecture/${lecture._id}`;
    window.open(url, "_blank");
  };

  // --- Fetch reviews for a specific page ---
  useEffect(()=>{
    api.review.avgRating(courseId).then((res)=>setAvg(res.averageRating))
  },[courseId])

  if (!details) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading course...</p>
      </div>
    );
  }

  const formattedDescription = details.description.replace(/\r\n/g, "<br/>");
  const previewText =
    formattedDescription.slice(0, 300) +
    (details.description.length > 300 ? "..." : "");

  const getLectureStatus = (lectureId) => {
    if (!progress || !progress.completedLectures) return "not-started";
    const lectureProgress = progress.completedLectures.find(
      (l) => l.lectureId?._id === lectureId
    );
    if (!lectureProgress) return "not-started";
    return lectureProgress.status;
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" title="Completed" />;
      case "in-progress":
        return <ClockIcon className="w-4 h-4 text-yellow-400" title="In Progress" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-12 py-12">
      {/* Course Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 pt-11">
        {/* Thumbnail */}
        <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-lg relative group">
          <img
            src={details.thumbnail}
            alt="Course Preview"
            className="w-full h-72 object-contain transform group-hover:scale-105 transition duration-300"
          />
          <button className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300">
            <PlayCircle className="w-16 h-16 text-cyan-400" />
          </button>
        </div>

        {/* Course Info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-cyan-400">
            {details.title}
          </h1>

          {/* Description with See More / See Less */}
          <div className="text-gray-400">
            <p
              dangerouslySetInnerHTML={{
                __html: expanded ? formattedDescription : previewText,
              }}
            ></p>
            {details.description.length > 300 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-cyan-400 hover:underline mt-2 inline-block"
              >
                {expanded ? "See Less" : "See More"}
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span>{details.language}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <span>{details.instructorId?.fullName}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span>{details.sections?.length} Sections</span>
            </div>
          </div>

          {!isEnrolled && (
            <button
              onClick={handleEnrollment}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl shadow-md transition"
            >
              Enroll Now - {details.price} {details.currency}
            </button>
          )}
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-6">Course Content</h2>
        <div className="space-y-6">
          {details.sections?.map((section, i) => (
            <div key={section._id} className="bg-black p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4">
                {i + 1}. {section.title}
              </h3>
              <div className="space-y-3">
                {section.lectures?.map((lecture) => {
                  const status = getLectureStatus(lecture._id);
                  return (
                    <div
                      key={lecture._id}
                      className={`flex items-center justify-between bg-black p-3 rounded-lg hover:bg-gray-700 transition ${
                        status === "completed" ? "opacity-70" : ""
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {lecture.title} {renderStatusBadge(status)}
                      </span>
                      {isEnrolled && loggedIn && (
                        <button
                          onClick={() => openLecturePage(lecture)}
                          className="px-3 py-1 text-sm bg-cyan-500 hover:bg-cyan-600 rounded-md flex items-center gap-1"
                        >
                          <PlayCircle className="w-4 h-4" /> Play
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-6">
          Course Reviews : <span className="text-[25px]">{avg}</span>/<span className="text-sm">5.0</span>
        </h2>

        {/* Existing Reviews */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="bg-gray-900 p-4 rounded-lg shadow-md">
              <p className="text-sm text-gray-400">
                {review.userId?.fullName || "Anonymous"}
              </p>
              <p className="text-yellow-400">⭐ {review.rating}</p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex gap-3 mt-4">
          <button
            disabled={page === 1}
            onClick={() => fetchReviews(page - 1)}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => fetchReviews(page + 1)}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Add Review Form */}
        {isEnrolled && loggedIn && (
          <div className="mt-8 bg-gray-900 p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Leave a Review</h3>
            <input
              type="number"
              min="1"
              max="5"
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: e.target.value })
              }
              className="w-20 p-2 rounded bg-gray-800 text-white"
            />
            <textarea
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              className="w-full p-3 mt-4 rounded bg-gray-800 text-white"
              placeholder="Write your review..."
            />
            <button
              onClick={handleReviewSubmit}
              className="mt-4 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl"
            >
              Submit Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;

