import { api } from "../services/api_base";

export default async function deleteImage(id){
    await api.delete(`api/user/images/${id}`).then(response => {
      console.log("Image deleted succesfully",response.data);
    }).catch(error => {
      
      console.log("Error", error.response);
    });
  }