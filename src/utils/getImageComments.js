import { api } from "../services/api_base";

export default async function getImageComments(image_id){
    console.log('Image id', image_id);
    let result = await api.get(`api/comments/image/${image_id}`).then(response => {
      let apidata = response.data;
      console.log(apidata);
      if (apidata.length !== 0) {
        return apidata.data    
      }
    }).catch(error => {
      console.log(error);
    });
    return result
  }