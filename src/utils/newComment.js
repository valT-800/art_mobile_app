import { api } from "../services/api_base";

export default async function newComment(content, post_id, parent){
    
    await api.post('/api/user/comments', {
        content,
        post_id,
        parent_id: parent ? parent.id : null,
      }).then(res => {
        //console.log(res.data.data)
      }).catch(error => {
        //console.log(error);
      });
}