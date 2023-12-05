import { api } from "../services/api_base";

export default async function editPost(id, description){
    await api.put(`api/user/posts/${id}`, {edited: true, description}).then(response => {
      //console.log("Posteeeeeeeeeee",response.data);
    }).catch(error => {
      //console.log("Error", error.response);
    });
  }