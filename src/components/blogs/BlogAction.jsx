import { useState } from "react";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import ThreeDotsAction from "../../assets/icons/3dots.svg";
import { useAuth } from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { actions } from "../../actions";
import { useBlog } from "../../hooks/useBlog";

const BlogAction = ({ blog }) => {
  const { auth } = useAuth();
  const{api}=useAxios()
  const{state,dispatch}=useBlog()
  console.log(auth.user.id);
  console.log(blog.author.id);
  const [actionModal, setActionModal] = useState(false);
  // const isMe = blog?.author?.id === auth?.user?.id;

const handleDeleteBlog=async()=>{
  
  try{
    const response = await api.delete(
      `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog.id}`
    );
 if(response.status===200){
  dispatch({
    type:actions.blogs.POST_DATA_DELETED,
    
  })
 }
  }
  catch(error){
    dispatch({
      type:actions.blogs.DATA_FETCH_ERROR,
      error:error.message
    })
  }
}


  return (
    <div className="absolute right-0 top-0">
      {/* {isMe ? (
        <button onClick={() => setActionModal(!actionModal)}>
          <img src={ThreeDotsAction} alt="3dots of Action" />
        </button>
      ): <p>Not the Author</p>
      } */}
      <button onClick={() => setActionModal(!actionModal)}>
          <img src={ThreeDotsAction} alt="3dots of Action" />
        </button>

      {actionModal && (
        <div className="action-modal-container">
          <button className="action-menu-item hover:text-lwsGreen">
            <img src={EditIcon} alt="Edit" />
            Edit
          </button>
          <button className="action-menu-item hover:text-red-500" onClick={handleDeleteBlog}>
            <img src={DeleteIcon} alt="Delete" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogAction;
