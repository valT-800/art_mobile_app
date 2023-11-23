export default function postIsSaved (post, user_id) {

    return post.users_saved && post.users_saved.some((user) => user.id === user_id);
    
  };