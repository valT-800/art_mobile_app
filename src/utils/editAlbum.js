import { api } from "../services/api_base";

export default async function editAlbum(id, title, description){
    await api.put(`api/user/albums/${id}`, {title, description}).then(response => { 
      console.log(response.data.data)
    }).catch(error => {
      
      console.log("Error", error.response);
    });
  }