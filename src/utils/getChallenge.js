import { api } from "../services/api_base";

export default async function getCompetition(id){
    let result = await api.get('api/competitions/'+id).then(response => {
    let apidata = response.data;
    if (apidata.length !== 0) {
    return apidata.data;
    }    
  }).catch(error => {
    //console.log(error);
  });

  return result
}
