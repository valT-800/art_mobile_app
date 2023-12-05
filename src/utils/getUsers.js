import { api } from "../services/api_base";

export default async function getUsers(){
    let result = await api.get('api/users').then(response => {
    let apidata = response.data;
    if (apidata.length !== 0) {
        //console.log(apidata.data);
    return apidata.data;
    }    
  }).catch(error => {
    //console.log(error);
  });

  return result
}
