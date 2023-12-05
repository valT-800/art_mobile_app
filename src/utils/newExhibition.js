import { api } from "../services/api_base"

export default async function newExhibition (title, description, startTime, endTime) {
    await api.post('api/gallery/exhibitions', {title, description, startTime, endTime})
    .then((response) => {
        //console.log(response.data.data)
    }).catch((err) => console.log(err))
}