import { useContext } from "react";
import { api } from "../services/api_base";
import { AuthContext } from "../AuthProvider";

  
export default async function uploadPost(post, description, album_id, competition_id, {tags}){

    //console.log(tags)
    let filename = post.toString();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `post/${match[1]}` : `post`;
    let formData = new FormData();
    formData.append('post', { uri:post, name: filename, type });
    formData.append('description', description)
    if(album_id!=null || album_id!=undefined) formData.append('album_id', album_id)
    if(competition_id!=null || competition_id!=undefined) formData.append('competition_id', competition_id)
    if (tags != null && tags != undefined && tags.length > 0) {
        tags.forEach((item, index) => {
            //console.log(JSON.stringify(item))
          formData.append(`tags[${index}]`, item);
        });}
    let result = await api.post('api/user/posts', formData, 
    {headers: { 'Content-Type': 'multipart/form-data',}})
    .then((response) => {
        //console.log('Post uploaded successfully.', response.data)
        return response.data.data
          
    }).catch((err) => console.log('Error', err))
    return result
}