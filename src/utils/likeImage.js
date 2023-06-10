import { api } from "../services/api_base";

export default async function likeImage (image_id){

    let result = await api.put(`api/user/images/${image_id}`, {user_liked: true})
    .then(response => {

      return response.data.data
    })
    .catch(error => {
      console.log("Error", error.response);
    })
    return result
  }