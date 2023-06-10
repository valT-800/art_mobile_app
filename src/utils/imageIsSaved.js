export default function imageIsSaved (image, user_id) {

    return image.users_saved && image.users_saved.some((user) => user.id === user_id);
    
  };