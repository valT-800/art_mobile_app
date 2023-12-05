export default function commentIsLiked(comment, user_id){
      
    return comment.users_liked && comment.users_liked.some((user) => user.id === user_id);
      
  }