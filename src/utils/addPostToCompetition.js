import { api } from "../services/api_base";

export default async function AddPostToCompetition(post_id, competition_id){
    api.put(`api/user/posts/${post_id}`, {competition_id: competition_id.id}).then(response => {       
        
        //console.log('Competition', competition_id)
      }).catch(error => {
        
        //console.log("Error", error.response);
      });
}