import { api } from "../services/api_base";

export default async function getAlbums(){
    let result = await api.get('api/albums').then(response => {
    let apidata = response.data;
    if (apidata.length !== 0) {
    return apidata.data;
    }    
  }).catch(error => {
    //console.log(error);
  });

  return result
}
