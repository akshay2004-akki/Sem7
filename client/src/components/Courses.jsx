import React from "react";
import SplitText from "./SplitText";
import {CardCarousel} from "@/components/ui/card-carousel"; // Import your carousel
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function Courses() {

  const [courses, setCourses] = useState([])
  const handleNavigate = (courseId) => {
    // Later you can replace this with react-router navigate(`/courses/${courseId}`)
    console.log(`Navigate to course with ID: ${courseId}`);
    window.location.href = `/courses/${courseId}`; // Simple redirect for now
  };

  useEffect(()=>{
    const fetchCourses = async()=>{
      try {
        const  res = await axios.get("http://localhost:8000/api/v1/courses/getAllCourses", {withCredentials:true});
        console.log(res.data);
        setCourses(res.data.courses)
      } catch (error) {
        console.log(error.message); 
        
      }
    }

    fetchCourses();
  },[])




  // Group courses by category
  const coursesByCategory = courses.reduce((acc, course) => {
    if (!acc[course.category]) {
      acc[course.category] = [];
    }
    acc[course.category].push(course);
    return acc;
  }, {});

  return (
    <section className="min-h-screen bg-black sm:pb-16 lg:pb-20 xl:pb-24">
      <div className="mx-auto p-5 w-full relative sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col mt-16 items-center justify-center">
          {/* Heading */}
          <div className="flex flex-col items-center">
            <SplitText
              text="Discover Courses That Empower You"
              className="text-3xl text-white font-semibold text-center"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />

            {/* Underlines */}
            <span className="relative mt-3">
              <span className="block h-[2px] w-16 bg-cyan-400 mx-auto relative before:content-[''] before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:h-[2px] before:w-8 before:bg-cyan-300"></span>
            </span>
          </div>

          {/* Courses by category */}
          <div className="mt-12 space-y-12 w-full">
            {Object.keys(coursesByCategory).map((category) => (
              <div key={category}>
                <h2 className="text-xl font-semibold text-white mb-4">{category}</h2>
                <CardCarousel
                  courses={coursesByCategory[category]}
                  autoplayDelay={3000}
                  showPagination={true}
                  showNavigation={true}
                  onNavigate={handleNavigate} // 👈 Pass the navigation handler
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Courses;
