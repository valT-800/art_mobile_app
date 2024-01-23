import { api } from "../services/api_base";

export default async function deletePost(id){
    await api.delete(`api/user/posts/${id}`).then(response => {
      console.log("Post deleted succesfully",response.data);
    }).catch(error => {
      
      console.log("Error", error.response);
    });
  }