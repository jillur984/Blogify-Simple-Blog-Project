import BlogCard from "./BlogCard";


const BlogList = ({blogs}) => {
 console.log(blogs)

  return (
   <BlogCard blogs={blogs}/>
  )
}

export default BlogList