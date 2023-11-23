import { api } from "../services/api_base"

export default async function newAlbum (title, description) {
    await api.post('api/user/albums', {title, description})
    .then((response) => {
        //console.log(response.data.data)
    }).catch((err) => console.log(err))
}