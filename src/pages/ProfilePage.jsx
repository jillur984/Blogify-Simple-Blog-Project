import EditIcon from "../assets/icons/edit.svg";
import Bio from "../Profile/Bio";
import { useAuth } from "../hooks/useAuth";
import { useRef } from "react";
import useAxios from "../hooks/useAxios";
import BlogCard from "../components/blogs/BlogCard";
import { useBlog } from "../hooks/useBlog";
import { useProfile } from "../hooks/useProfile";
import { actions } from "../actions";

const ProfilePage = () => {
  const { auth } = useAuth();
  const { state } = useBlog();
  const { api } = useAxios();
  const { state: profile, dispatch } = useProfile();
  const uploadImageRef = useRef();
  console.log(state)

  const handleImageUpload = (e) => {
    e.preventDefault();
    uploadImageRef.current.click();
  };

  const updateImageDisplay = async () => {
    try {
      const formData = new FormData();
      for (const file of uploadImageRef.current.files) {
        formData.append("avatar", file);
      }

      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth.user.avatar}`,
        formData
      );

      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_IMAGE_UPDATED,
          data: response.data,
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  const firstLetter = auth?.user?.firstName
    ? auth?.user?.firstName.charAt(0)
    : "";

    
  return (
    <>
      <div className="flex flex-col items-center py-8 text-center">
        <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
          <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
            <span className="">{firstLetter}</span>
          </div>

          <button
            className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
            onClick={handleImageUpload}
          >
            <img src={EditIcon} alt="Edit" />
          </button>
          <input
            type="file"
            id="file"
            ref={uploadImageRef}
            onChange={updateImageDisplay}
            hidden
          />
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
            {auth?.user?.firstName} {auth?.user?.lastName}
          </h3>
          <p className="leading-[231%] lg:text-lg">{auth?.user?.email}</p>
        </div>

        <Bio />

        <BlogCard blogs={state?.blogs} />
      </div>
    </>
  );
};

export default ProfilePage;
