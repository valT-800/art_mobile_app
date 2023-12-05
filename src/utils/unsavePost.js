import { api } from "../services/api_base";

export default async function unsavePost (post_id){

    let result = await api.put(`api/user/posts/${post_id}`, {user_unsaved: true})
    .then(response => {

      return response.data.data
    })
    .catch(error => {
      //console.log("Error", error.response);
    })
    return result
  }