export default function postIsLiked (post, user_id) {

    return post.users_liked && post.users_liked.some((user) => user.id === user_id);
    
  };