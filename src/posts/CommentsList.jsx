const CommentsList = ({ comments }) => {
  console.log(comments); // For debugging purposes

  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start space-x-4 my-8">
          <div className="avater-img bg-orange-600 text-white w-8 h-8 flex items-center justify-center rounded-full">
            <span>{comment?.author?.firstName[0]}</span>
          </div>
          <div className="w-full">
            <h5 className="text-slate-500 font-bold">
              {comment?.author?.firstName}
              {} {comment?.author?.lastName}
            </h5>
            <p className="text-slate-300">{comment?.content}</p>
          </div>
          <button className="bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg hover:from-red-600 hover:to-red-800 transform hover:scale-105 transition-transform duration-300 ease-in-out">
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

export default CommentsList;
