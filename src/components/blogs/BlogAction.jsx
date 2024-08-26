import { useState } from "react";
import EditIcon from '../../assets/icons/edit.svg'
import DeleteIcon from '../../assets/icons/delete.svg'
import ThreeDotsAction from '../../assets/icons/3dots.svg'
const BlogAction = () => {
const[actionModal,setActionModal]=useState(false)

  return (
    <div className="absolute right-0 top-0">
      <button onClick={()=>setActionModal(!actionModal)}>
        <img src={ThreeDotsAction} alt="3dots of Action" />
      </button>
  {
    actionModal && (
        <div className="action-modal-container">
        <button className="action-menu-item hover:text-lwsGreen">
          <img src={EditIcon} alt="Edit" />
          Edit
        </button>
        <button className="action-menu-item hover:text-red-500">
          <img src={DeleteIcon} alt="Delete" />
          Delete
        </button>
      </div>
    )
  }
      
    </div>
  );
};

export default BlogAction;
