import { api } from "../services/api_base";

export default async function unlikeImage (image_id){

    let result = await api.put(`api/user/images/${image_id}`, {user_unliked: true})
    .then(response => {

      return response.data.data
    })
    .catch(error => {
      console.log("Error", error.response);
    })
    return result
  }