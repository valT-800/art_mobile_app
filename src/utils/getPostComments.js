import { api } from "../services/api_base";

export default async function getPostComments(post_id){
    //console.log('Post id', post_id);
    let result = await api.get(`api/comments/post/${post_id}`).then(response => {
      let apidata = response.data;
      //console.log(apidata);
      if (apidata.length !== 0) {
        return apidata.data    
      }
    }).catch(error => {
      //console.log(error);
    });
    return result
  }