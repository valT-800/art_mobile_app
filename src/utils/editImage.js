import { api } from "../services/api_base";

export default async function editImage(id, description){
    await api.put(`api/user/images/${id}`, {edited: true, description}).then(response => {
      console.log("Imageeeeeeeeeeee",response.data);
    }).catch(error => {
      console.log("Error", error.response);
    });
  }