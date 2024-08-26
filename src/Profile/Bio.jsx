import { useState } from 'react'
import checkIcon from '../assets/icons/check.svg'
import EditIcon from '../assets/icons/edit.svg'
import { useAuth } from '../hooks/useAuth'
const Bio = () => {
    const{auth}=useAuth()
    const[editMode,setEditMode]=useState(false)
    const[bio,setBio]=useState(auth.user.bio)
  return (
    <>
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
            <div className="flex-1">
            {!editMode ? (
            <p className="leading-[188%] text-gray-400 lg:text-lg">
            {auth.user?.bio}
          </p>
          ):(
            <textarea className='p-2 className="leading-[188%] text-gray-600 lg:text-lg rounded-md'
            value={bio}
            onChange={(e)=>setBio(e.target.value)}
            cols={55}
            rows={4} 
            >
            </textarea>
          )}
            </div>
            {
                !editMode ? (
                    <button className="flex-center h-7 w-7 rounded-full"  onClick={()=>setEditMode(true)}>
              <img src={EditIcon} alt="Edit" />
            </button>
                ):(
                    <button className="flex-center h-7 w-7 rounded-full">
              <img src={checkIcon} alt="Edit"  />
            </button>
                )
            }
            
            
          </div>
         
         
    </>
  )
}

export default Bio