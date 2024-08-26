import { Link } from "react-router-dom";
import FavouriteCard from "./FavouriteCard";
import { api } from "../api";
import { useEffect, useState } from "react";

const MostPopular = () => {
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // console.log(popularBlogs);

  const fetchMostPopular = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/popular`
      );
      if (response.status === 200) {
        const blogsArray = Array.isArray(response.data)
          ? response.data
          : response.data.blogs;
        setPopularBlogs(blogsArray);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMostPopular();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="md:col-span-2 h-full w-full space-y-5">
      <div className="sidebar-card">
        <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
          Most Popular 👍️
        </h3>
        <ul className="space-y-5 my-5">
          {popularBlogs.map((popularBlog) => (
            <li key={popularBlog.id}>
              <Link to={`/single-blog/${popularBlog.id}`}>
              <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                {popularBlog.title}
              </h3>
              </Link>
              
              <p className="text-slate-600 text-sm">
                by
                <Link to="/profile">{popularBlog?.author?.firstName}</Link>
                <span> · </span>
                {popularBlog.likes.length} Likes
              </p>
            </li>
          ))}
        </ul>
      </div>
      <FavouriteCard />
    </div>
  );
};

export default MostPopular;
