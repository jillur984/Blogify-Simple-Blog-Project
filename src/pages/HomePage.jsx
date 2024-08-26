import { useEffect } from "react"
import useAxios from "../hooks/useAxios"
import { useBlog } from "../hooks/useBlog"
import { actions } from "../actions"
import BlogList from "../components/blogs/BlogList"
import MostPopular from "../SideBar/MostPopular"

const HomePage = () => {
const{state,dispatch}=useBlog()
const{api}=useAxios()


useEffect(()=>{
  dispatch({type:actions.blogs.DATA_FETCHING})
  const fetchBlog=async()=>{
 try{
   const response=await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs?limit=20`)
   if(response.status===200){
    const blogsData = response.data.blogs || response.data;
    dispatch({type:actions.blogs.DATA_FETCHED,data:blogsData})

   }

   }
    
   catch(error){
    console.log(error)
    dispatch({
      type: actions.blogs.DATA_FETCH_ERROR,
      error: error.message,
    });
   }
  
  }

  fetchBlog()
},[])
if (state?.loading) {
  return <p>We are Working</p>;
}
if (state?.error) {
  return <p>Error in Fetching Post {state?.error?.message}</p>;
}
  return (
   <>
   <div className="container">
   <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
   <BlogList blogs={state?.blogs}/>
   <MostPopular />
   </div>
   </div>
  
   
    
   </>
  )
}

export default HomePage