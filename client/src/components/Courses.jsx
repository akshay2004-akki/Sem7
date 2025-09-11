import React from "react";
import SplitText from "./SplitText";
import {CardCarousel} from "@/components/ui/card-carousel"; // Import your carousel

function Courses() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  const handleNavigate = (courseId) => {
    // Later you can replace this with react-router navigate(`/courses/${courseId}`)
    console.log(`Navigate to course with ID: ${courseId}`);
  };

  // Example courses array
  const courses = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, and React from scratch.",
    category: "Development",
    thumbnail: "/assets/logo.png",
    price: 499,
    currency: "INR",
  },
  {
    id: 2,
    title: "Data Structures & Algorithms",
    description: "Master problem-solving and coding interview preparation.",
    category: "Programming",
    thumbnail: "/assets/student.png",
    price: 799,
    currency: "INR",
  },
  {
    id: 3,
    title: "Machine Learning Essentials",
    description: "Build ML models and understand core AI concepts.",
    category: "AI/ML",
    thumbnail: "/assets/herologo.png",
    price: 999,
    currency: "INR",
  },
  {
    id: 4,
    title: "UI/UX Design Masterclass",
    description: "Learn to design stunning user interfaces and experiences.",
    category: "Design",
    thumbnail: "/assets/logo.png",
    price: 599,
    currency: "INR",
  },
  {
    id: 5,
    title: "Advanced JavaScript",
    description: "Deep dive into ES6+, async programming, and performance.",
    category: "Programming",
    thumbnail: "/assets/student.png",
    price: 699,
    currency: "INR",
  },
  {
    id: 6,
    title: "React & Redux Mastery",
    description: "Build scalable front-end apps using React and Redux.",
    category: "Development",
    thumbnail: "/assets/herologo.png",
    price: 899,
    currency: "INR",
  },
  {
    id: 7,
    title: "Python for Beginners",
    description: "Get started with Python basics and real-world projects.",
    category: "Programming",
    thumbnail: "/assets/logo.png",
    price: 399,
    currency: "INR",
  },
  {
    id: 8,
    title: "Node.js & Express Guide",
    description: "Master backend development with Node.js and Express.",
    category: "Development",
    thumbnail: "/assets/student.png",
    price: 749,
    currency: "INR",
  },
  {
    id: 9,
    title: "Database Management with MongoDB",
    description: "Learn MongoDB for modern NoSQL applications.",
    category: "Database",
    thumbnail: "/assets/herologo.png",
    price: 699,
    currency: "INR",
  },
  {
    id: 10,
    title: "Full Stack Development",
    description: "Become a MERN stack developer with hands-on projects.",
    category: "Development",
    thumbnail: "/assets/logo.png",
    price: 1299,
    currency: "INR",
  },
  {
    id: 11,
    title: "Cybersecurity Fundamentals",
    description: "Understand ethical hacking, security tools, and defense.",
    category: "Security",
    thumbnail: "/assets/student.png",
    price: 899,
    currency: "INR",
  },
  {
    id: 12,
    title: "Cloud Computing with AWS",
    description: "Learn AWS services and deploy scalable applications.",
    category: "Cloud",
    thumbnail: "/assets/herologo.png",
    price: 1099,
    currency: "INR",
  },
  {
    id: 13,
    title: "Android Development",
    description: "Build native Android apps using Java and Kotlin.",
    category: "Mobile Development",
    thumbnail: "/assets/logo.png",
    price: 899,
    currency: "INR",
  },
  {
    id: 14,
    title: "iOS Development with Swift",
    description: "Learn to create iOS apps using Swift and Xcode.",
    category: "Mobile Development",
    thumbnail: "/assets/student.png",
    price: 999,
    currency: "INR",
  },
  {
    id: 15,
    title: "Artificial Intelligence Basics",
    description: "Introduction to AI, neural networks, and applications.",
    category: "AI/ML",
    thumbnail: "/assets/herologo.png",
    price: 1099,
    currency: "INR",
  },
  {
    id: 16,
    title: "Deep Learning with TensorFlow",
    description: "Train neural networks using TensorFlow & Keras.",
    category: "AI/ML",
    thumbnail: "/assets/logo.png",
    price: 1299,
    currency: "INR",
  },
  {
    id: 17,
    title: "Data Science with Python",
    description: "Learn data analysis, visualization, and pandas.",
    category: "Data Science",
    thumbnail: "/assets/student.png",
    price: 999,
    currency: "INR",
  },
  {
    id: 18,
    title: "Big Data Analytics",
    description: "Analyze large datasets using Hadoop and Spark.",
    category: "Data Science",
    thumbnail: "/assets/herologo.png",
    price: 1399,
    currency: "INR",
  },
  {
    id: 19,
    title: "DevOps Essentials",
    description: "Master CI/CD, Docker, Kubernetes, and monitoring tools.",
    category: "DevOps",
    thumbnail: "/assets/logo.png",
    price: 1199,
    currency: "INR",
  },
  {
    id: 20,
    title: "Blockchain & Web3",
    description: "Understand blockchain fundamentals and smart contracts.",
    category: "Blockchain",
    thumbnail: "/assets/student.png",
    price: 1499,
    currency: "INR",
  },
];

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
              onLetterAnimationComplete={handleAnimationComplete}
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
