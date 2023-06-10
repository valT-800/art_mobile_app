import { useContext } from "react";
import { api } from "../services/api_base";

  
export default async function uploadImage(image, description, album_id, challenge_id, {tags}){

    console.log(tags)
    let filename = image.toString();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    let formData = new FormData();
    formData.append('image', { uri:image, name: filename, type });
    formData.append('description', description)
    if(album_id!=null || album_id!=undefined) formData.append('album_id', album_id)
    if(challenge_id!=null || challenge_id!=undefined) formData.append('challenge_id', challenge_id)
    if (tags != null && tags != undefined && tags.length > 0) {
        tags.forEach((item, index) => {
            console.log(JSON.stringify(item))
          formData.append(`tags[${index}]`, item);
        });}
    let result = await api.post('api/user/images', formData, 
    {headers: { 'Content-Type': 'multipart/form-data',}})
    .then((response) => {
        console.log('Image uploaded successfully.', response.data)
        return response.data.data
          
    }).catch((err) => console.log('Error', err))
    return result
}