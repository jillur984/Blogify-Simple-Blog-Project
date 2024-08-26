import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useAxios from "../hooks/useAxios";
import PostComments from "../posts/PostComments";
import blogImage from '../assets/blog.png'

const SingleBlogPage = () => {
  const { api } = useAxios();
  const [singleId, setSingleId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchSinglePost = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${id}`
        );
        if (response.status === 200) {
          setSingleId(response.data);
          console.log(singleId);
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSinglePost();
  }, [api, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching blog: {error}</p>;
  }

  if (!singleId) {
    return <p>No blog found.</p>;
  }

  return (
    <>
      <section>
        <div className="container text-center py-8">
          <h1 className="font-bold text-3xl md:text-5xl">{singleId.title}</h1>
          <div className="flex justify-center items-center my-4 gap-4">
            <div className="flex items-center capitalize space-x-2">
              <div className="avater-img bg-indigo-600 text-white">
                <span className="">{singleId?.author?.firstName[0]}</span>
              </div>
              <h5 className="text-slate-500 text-sm">
                {singleId?.author?.firstName}
              </h5>
            </div>
            <span className="text-sm text-slate-700 dot">
              {singleId?.createdAt}
            </span>
            <span className="text-sm text-slate-700 dot">
              {" "}
              {singleId?.likes?.length || 0} Likes
            </span>
          </div>
          <img
            className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
            src={blogImage}
            alt="May Be Image APi problem"
          />

          <ul className="tags">
            {singleId.tags?.split(",").map((tag, index) => (
              <li key={index}>{tag.trim()}</li>
            ))}
          </ul>

          <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
            {singleId.content}
          </div>
        </div>
      </section>
      <PostComments singleId={singleId} id={id}/>
    </>
  );
};

export default SingleBlogPage;
