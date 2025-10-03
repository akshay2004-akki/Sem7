import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Plus, Pencil, Trash, X, MoreVertical } from "lucide-react";
import axios from "axios";

function ManageCourse() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  // Modals
  const [showLectureModal, setShowLectureModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [lectureData, setLectureData] = useState({
    title: "",
    type: "text",
    duration: "",
    content: "",
    file: null,
  });

  const [showSectionModal, setShowSectionModal] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");

  // Track open dropdown (sectionId or lectureId)
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/courses/getCourseById/${courseId}`,
          { withCredentials: true }
        );
        setCourse(res.data.course);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCourse();
  }, [courseId]);

  // ---------------- Add Lecture ----------------
  const handleAddLecture = (sectionId) => {
    setSelectedSection(sectionId);
    setLectureData({
      title: "",
      type: "text",
      duration: "",
      content: "",
      file: null,
    });
    setShowLectureModal(true);
  };

  const submitLecture = async () => {
    try {
      const formData = new FormData();
      formData.append("title", lectureData.title);
      formData.append("type", lectureData.type);
      formData.append("duration", lectureData.duration);

      if (lectureData.type === "video" && lectureData.file) {
        formData.append("video", lectureData.file);
      }
      if (lectureData.type === "text") {
        formData.append("content", lectureData.content);
      }

      const res = await axios.post(
        `http://localhost:8000/api/v1/lectures/addlecture/${selectedSection}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Update UI
      setCourse((prev) => {
        const updatedSections = prev.sections.map((sec) =>
          sec._id === selectedSection
            ? { ...sec, lectures: [...sec.lectures, res.data] }
            : sec
        );
        return { ...prev, sections: updatedSections };
      });

      setShowLectureModal(false);
      alert("Lecture added successfully!");
    } catch (err) {
      console.error(err);
      alert("Error adding lecture");
    }
  };

  const deleteLecture = async (lectureId) => {
    const res = await axios.delete(
      `http://localhost:8000/api/v1/lectures/deleteLecture/${lectureId}`,
      { withCredentials: true }
    );
    console.log(res.data);
    
    setCourse((prev) => {
      const updatedSections = prev.sections.map((sec) => {
        return {
          ...sec,
          lectures: sec.lectures.filter((lec) => lec._id !== lectureId),
        };
      });
      return { ...prev, sections: updatedSections };
    });
  };

  // ---------------- Add Section ----------------
  const openAddSectionModal = () => {
    setNewSectionTitle("");
    setShowSectionModal(true);
  };

  const submitSection = async () => {
    if (!newSectionTitle) return;
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/sections/addSection/${course._id}`,
        { title: newSectionTitle },
        { withCredentials: true }
      );

      setCourse((prev) => ({
        ...prev,
        sections: [...prev.sections, res.data.newSection],
      }));

      setShowSectionModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to add section");
    }
  };

  // ---------------- Close dropdown on outside click ----------------
  const menuRef = useRef();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSectionDelete = async(sectionId)=>{
    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/sections/deleteSection/${sectionId}`, {withCredentials:true});
      console.log(res.data);
        setCourse((prev) => {
            const updatedSections = prev.sections.filter((sec) => sec._id !== sectionId);
            return { ...prev, sections: updatedSections };
        });
    } catch (error) {
        console.log(error.message);
        alert("Failed to delete section");
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      {/* Course Header */}
      <div className="flex gap-6 items-start border-b pt-10 border-zinc-700 pb-6">
        <img
          src={course?.thumbnail}
          alt={course?.title}
          className="w-40 h-28 object-cover rounded-lg shadow-md"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{course?.title}</h1>
          <p className="text-gray-400 mt-2">{course?.description}</p>
          <div className="flex gap-6 mt-3 text-sm text-gray-300">
            <span>💰 Price: {course?.price} INR</span>
            <span>🌐 Language: {course?.language}</span>
            <span>📌 Course ID: {courseId}</span>
          </div>
        </div>
      </div>

      {/* Sections and Lectures */}
      <div className="mt-8 space-y-6" ref={menuRef}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Course Sections</h2>
          <button
            onClick={openAddSectionModal}
            className="flex items-center gap-2 bg-cyan-500 text-black px-4 py-2 rounded-lg hover:bg-cyan-400 transition"
          >
            <Plus size={16} /> Add Section
          </button>
        </div>

        {course?.sections.map((section) => (
          <div
            key={section._id}
            className="bg-zinc-800 rounded-lg p-4 shadow space-y-4"
          >
            {/* Section Header */}
            <div className="flex justify-between items-center relative">
              <h3 className="text-lg font-semibold">{section.title}</h3>

              <div className="relative">
                <button
                  onClick={() =>
                    setOpenMenu(
                      openMenu === `section-${section._id}`
                        ? null
                        : `section-${section._id}`
                    )
                  }
                  className="p-2 bg-zinc-700 rounded hover:bg-zinc-600"
                >
                  <MoreVertical size={16} />
                </button>

                {openMenu === `section-${section._id}` && (
                  <div className="absolute right-0 mt-2 w-28 bg-zinc-800 border border-zinc-700 rounded shadow-lg z-10">
                    <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-zinc-700 text-sm">
                      <Pencil size={14} /> Edit
                    </button>
                    <button onClick={()=>handleSectionDelete(section._id)} className="flex items-center gap-2 w-full px-3 py-2 text-red-400 hover:bg-zinc-700 text-sm">
                      <Trash size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Lectures */}
            <div className="pl-4 space-y-2">
              {section.lectures.map((lecture) => (
                <div
                  key={lecture._id}
                  className="flex justify-between items-center bg-zinc-700 p-2 rounded relative"
                >
                  <span>{lecture.title}</span>

                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenu(
                          openMenu === `lecture-${lecture._id}`
                            ? null
                            : `lecture-${lecture._id}`
                        )
                      }
                      className="p-1 bg-zinc-600 rounded hover:bg-zinc-500"
                    >
                      <MoreVertical size={14} />
                    </button>

                    {openMenu === `lecture-${lecture._id}` && (
                      <div className="absolute right-0 mt-2 w-28 bg-zinc-800 border border-zinc-700 rounded shadow-lg z-10">
                        <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-zinc-700 text-sm">
                          <Pencil size={14} /> Edit
                        </button>
                        <button
                          onClick={() => deleteLecture(lecture._id)}
                          className="flex items-center gap-2 w-full px-3 py-2 text-red-400 hover:bg-zinc-700 text-sm"
                        >
                          <Trash size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <button
                onClick={() => handleAddLecture(section._id)}
                className="flex items-center gap-2 mt-2 text-cyan-400 hover:text-cyan-300"
              >
                <Plus size={14} /> Add Lecture
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- Add Lecture Modal ---------------- */}
      {showLectureModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-md space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Add Lecture</h2>
              <button onClick={() => setShowLectureModal(false)}>
                <X className="text-gray-400 hover:text-white" />
              </button>
            </div>

            <input
              type="text"
              placeholder="Lecture Title"
              className="w-full p-2 rounded bg-zinc-700 text-white"
              value={lectureData.title}
              onChange={(e) =>
                setLectureData({ ...lectureData, title: e.target.value })
              }
            />

            <select
              className="w-full p-2 rounded bg-zinc-700 text-white"
              value={lectureData.type}
              onChange={(e) =>
                setLectureData({ ...lectureData, type: e.target.value })
              }
            >
              <option value="text">Text</option>
              <option value="video">Video</option>
              <option value="quiz">Quiz</option>
            </select>

            <input
              type="number"
              placeholder="Duration (mins)"
              className="w-full p-2 rounded bg-zinc-700 text-white"
              value={lectureData.duration}
              onChange={(e) =>
                setLectureData({ ...lectureData, duration: e.target.value })
              }
            />

            {lectureData.type === "text" && (
              <textarea
                placeholder="Enter lecture content..."
                className="w-full p-2 rounded bg-zinc-700 text-white"
                value={lectureData.content}
                onChange={(e) =>
                  setLectureData({ ...lectureData, content: e.target.value })
                }
              />
            )}

            {lectureData.type === "video" && (
              <input
                type="file"
                accept="video/*"
                className="w-full text-sm text-gray-300"
                onChange={(e) =>
                  setLectureData({ ...lectureData, file: e.target.files[0] })
                }
              />
            )}

            <button
              onClick={submitLecture}
              className="w-full bg-cyan-500 text-black py-2 rounded hover:bg-cyan-400 transition"
            >
              Add Lecture
            </button>
          </div>
        </div>
      )}

      {/* ---------------- Add Section Modal ---------------- */}
      {showSectionModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-md space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Add Section</h2>
              <button onClick={() => setShowSectionModal(false)}>
                <X className="text-gray-400 hover:text-white" />
              </button>
            </div>

            <input
              type="text"
              placeholder="Section Title"
              className="w-full p-2 rounded bg-zinc-700 text-white"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
            />

            <button
              onClick={submitSection}
              className="w-full bg-cyan-500 text-black py-2 rounded hover:bg-cyan-400 transition"
            >
              Add Section
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageCourse;
