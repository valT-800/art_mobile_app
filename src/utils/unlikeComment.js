import { api } from "../services/api_base";

export default async function unlikeComment (comment_id){

    let result = await api.put(`api/user/comments/${comment_id}`, {user_unliked: true})
    .then(response => {
        console.log(response.data.data)
      return response.data.data
    })
    .catch(error => {
      console.log("Error", error.response);

    })
    return result
  }