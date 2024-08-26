import { useState } from "react";
import CommentsList from "./CommentsList";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../hooks/useAuth";

const PostComments = ({ singleId, id }) => {
  const [comments, setComments] = useState(singleId?.comments || []);
  const [comment, setComment] = useState("");
  const { auth } = useAuth();
  const { authToken } = auth;
  const { api } = useAxios();

  const postComment = async () => {
    if (!comment.trim()) {
      console.error("Comment content is required.");
      return;
    }

    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${id}/comment`,
        { content: comment }, // Ensure the payload matches the expected API structure
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Blog Comment success", response.data);
        setComments([...comments, response.data?.comments]); // Directly add the new comment to the state
        setComment(""); // Clear the textarea after submission
      }
    } catch (error) {
      console.error("Failed to post comment:", error.response ? error.response.data : error);
    }
  };

  return (
    <section id="comments">
      <div className="mx-auto w-full md:w-10/12 container">
        <h2 className="text-3xl font-bold my-8">
          Comments {comments.length} {/* Use the comments state for the count */}
        </h2>
        <div className="flex items-center space-x-4">
          <div className="avatar-img bg-indigo-600 text-white">
            <span className="">{singleId?.author?.firstName[0]}</span>
          </div>
          <div className="w-full">
            <textarea
              className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
              placeholder="Write a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                onClick={postComment}
              >
                Comment
              </button>
            </div>
          </div>
        </div>
        <CommentsList comments={comments} id={id} /> {/* Pass the updated comments to the list */}
      </div>
    </section>
  );
};

export default PostComments;
