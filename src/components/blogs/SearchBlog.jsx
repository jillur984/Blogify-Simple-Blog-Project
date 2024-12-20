import { Link } from "react-router-dom";
import closeIcon from "../../assets/icons/close.svg";
import { useBlog } from "../../hooks/useBlog";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import blogImage from '../../assets/blog.png'

const SearchBlog = () => {
  const { state } = useBlog();
  const { api } = useAxios();
  const [searchParam, setSearchParam] = useState("");
  const [data, setData] = useState([]);

  const searchBlogSubmit = async () => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/search?q=${searchParam}`
      );
      if (response.status === 200) {
        setData(response.data["searchData"]);
      }
    } catch (error) {
      console.error("Search request failed:", error);
    }
  };

  return (
    <>
      <section className="fixed inset-0 z-50 flex items-center justify-center bg-slate-800/70 backdrop-blur-md">
        <div className="relative w-full max-w-3xl mx-auto bg-slate-900 p-6 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
          <button
            className="absolute top-4 right-4 text-white focus:outline-none"
            onClick={() => window.history.back()}
          >
            <img src={closeIcon} alt="Close" className="w-6 h-6" />
          </button>
          <div>
            <h3 className="font-bold text-2xl text-slate-100 mb-4">
              Search for Your Desired Blogs
            </h3>
            <div className="flex space-x-4 mb-4">
              <input
                type="text"
                placeholder="Start Typing to Search"
                className="flex-grow bg-slate-800 p-3 text-base text-white rounded-lg focus:outline-none focus:ring focus:ring-indigo-600"
                value={searchParam}
                onChange={(e) => setSearchParam(e.target.value)}
              />
              <button
                onClick={searchBlogSubmit}
                className="bg-indigo-500 text-white px-6 py-3 rounded-lg"
              >
                Search
              </button>
            </div>
          </div>

          <h3 className="text-slate-400 font-bold mb-4">Search Results</h3>
          <div className="max-h-80 overflow-y-auto">
            {data?.length > 0 ? (
              data.map((blog) => (
                <Link key={blog.id} to={`/single-blog/${blog.id}`}>
                  <div className="flex gap-4 py-3 border-b border-slate-700">
                    <img
                      className="h-65 w-60 object-cover rounded-lg"
                      // src={blog.author.avatar}
                      src={blogImage}
                      alt={blog.title}
                    />
                    <div>
                      <h3 className="text-slate-300 text-lg font-bold">
                        {blog.title}
                      </h3>
                      <p className="text-slate-500 text-sm mt-1">
                        {blog.content}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-slate-400">No blogs found</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchBlog;
