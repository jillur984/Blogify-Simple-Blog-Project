import { Link } from "react-router-dom";
import BlogAction from "./BlogAction";
import blogImage from "../../assets/blog.png";


const BlogCard = ({ blogs }) => {
  
  console.log("Is blogs an array:", Array.isArray(blogs));

 

  return (
    <div className="space-y-3 md:col-span-5">
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-card">
          <Link to={`/single-blog/${blog.id}`}>
            <img
              // className="blog-thumb"
              className="w-30 h-40 mt-4"
              // src={`${blog.thumbnail}`} // blog api problem thats why i give one manual image
              src={blogImage}
              alt={blog.title}
            />
          </Link>
          <div className="mt-2 relative">
            <Link to={`/single-blog/${blog.id}`}>
              <h3 className="text-slate-300 text-xl lg:text-2xl">
                {blog.title}
              </h3>
            </Link>
            <Link to={`/single-blog/${blog.id}`}>
              <p className="mb-6 text-base text-slate-500 mt-1">
                {blog.content}
              </p>
            </Link>

            <div className="flex justify-between items-center">
              <div className="flex items-center capitalize space-x-2">
                <div className="avatar-img bg-indigo-600 text-white">
                  <div>
                    <Link to="/profile">
                      <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-500 ">
                        {blog.author.firstName[0]}
                      </span>
                    </Link>
                  </div>
                </div>

                <div>
                  <h5 className="text-slate-500 text-sm">
                    <Link to="/profile">
                      {blog.author.firstName} {blog.author.lastName}
                    </Link>
                  </h5>
                  <div className="flex items-center text-xs text-slate-700">
                    <span>{blog.date}</span>
                  </div>
                </div>
              </div>

              <div className="text-sm px-2 py-1 text-slate-700">
                <span>{blog.likes.length} Likes</span>
              </div>
            </div>
            <BlogAction blog={blog} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;
