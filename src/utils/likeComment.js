import { api } from "../services/api_base";

export default async function likeComment (comment_id){

    let result = await api.put(`api/user/comments/${comment_id}`, {user_liked: true})
    .then(response => {
        //let result = response.data.data
        //console.log("liked comment ",response.data.data)
        
      return response.data.data
    })
    .catch(error => {
      //console.log("Error", error.response);

    })
    return result
  }