import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";

const CreateBlog = () => {
  const navigate = useNavigate();
  const uploadImageRef = useRef();
  const { api } = useAxios();
  const { auth } = useAuth();
  const { authToken } = auth;
  console.log(authToken);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogTags, setBlogTags] = useState("");

  const handleImageUpload = () => {
    uploadImageRef.current.click();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitBlogForm = async (blogFormData) => {
    console.log(blogFormData);
    const formData = new FormData();
    formData.append("title", blogTitle);
    formData.append("tags", blogTags);
    formData.append("content", blogContent);
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs`, // http://localhost:3000/search?q=qury
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Blog created successfully!");
        setBlogContent("");
        setBlogTags("");
        setBlogTitle("");
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitBlogForm)} className="createBlog">
        <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
          <div className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
            <p onClick={handleImageUpload}>Upload Your Image</p>
            <input ref={uploadImageRef} type="file" id="file" hidden />
          </div>
        </div>
        <div className="mb-6">
          <input
            {...register("title", { required: "Blog Title Must Give " })}
            type="text"
            id="title"
            name="title"
            placeholder="Enter your blog title"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <input
            {...register("tags", { required: "Must Give You Tags" })}
            type="text"
            id="tags"
            name="tags"
            placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
            value={blogTags}
            onChange={(e) => setBlogTags(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <textarea
            {...register("content", { required: "Minimum 50 Words Required" })}
            id="content"
            name="content"
            placeholder="Write your blog content"
            rows="8"
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
        >
          Create Blog
        </button>
      </form>
    </>
  );
};

export default CreateBlog;
