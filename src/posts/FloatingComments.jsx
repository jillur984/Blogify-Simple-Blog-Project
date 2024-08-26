import heartIcon from '../assets/icons/heart.svg'
import CommentIcon from '../assets/icons/comment.svg'
import LikeIcon from '../assets/icons/like.svg'
const FloatingComments = () => {
  return (
    <div className="floating-action">
      <ul className="floating-action-menus">
        <li>
          <img src={LikeIcon} alt="like" />
          <span>10</span>
        </li>

        <li>
        
          <img src={heartIcon} alt="Favourite" />
        </li>
        <a href="#comments">
          <li>
            <img src={CommentIcon} alt="Comments" />
            <span>3</span>
          </li>
        </a>
      </ul>
    </div>
  )
}

export default FloatingComments