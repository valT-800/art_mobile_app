export default function imageIsLiked (image, user_id) {

    return image.users_liked && image.users_liked.some((user) => user.id === user_id);
    
  };