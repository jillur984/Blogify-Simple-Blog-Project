import likeIcon from "../assets/icons/like.svg";
import likeFilledIcon from "../assets/icons/like-filled.svg";
import FavouriteIcon from "../assets/icons/heart.svg";
import CommentIcon from "../assets/icons/comment.svg";
import { useState } from "react";
import { useBlog } from "../hooks/useBlog";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
const PostAction = ({ comments, id }) => {
  const { state } = useBlog();
  const { auth } = useAuth();
  const { authToken } = auth;
  const { api } = useAxios();
  const blog = state.blogs.find((blog) => blog.id === id);
  const [like, setLike] = useState(blog?.likes?.includes(auth?.user?.id));

  const handleLike = async () => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`, 
          },
        }
      );
      if (response.status === 200) {
        setLike(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <div className="floating-action">
        <ul className="floating-action-menus">
          <button
            className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
            onClick={handleLike}
          >
            <li>
              <img src={like ? likeFilledIcon : likeIcon} alt="like" />
              <span onClick={() => setLike(!like)}>
                {like ? "Liked" : "Like"}
              </span>
            </li>
          </button>

          <li>
            <img src={FavouriteIcon} alt="Favourite" />
          </li>
          <a href="#comments">
            <li>
              <img src={CommentIcon} alt="Comments" />
              <span>{comments.length}</span>
            </li>
          </a>
        </ul>
      </div>
    </>
  );
};

export default PostAction;
