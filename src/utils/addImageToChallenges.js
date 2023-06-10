import { api } from "../services/api_base";

export default async function addImageToChallenges(image_id, challenge_id){
    api.put(`api/user/images/${image_id}`, {challenge_id: challenge_id.id}).then(response => {       
        
        console.log('Challenge', challenge_id)
      }).catch(error => {
        
        console.log("Error", error.response);
      });
}