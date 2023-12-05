import { api } from "../services/api_base";

export default async function getUserAlbums(id,currentPage){
  console.log(id,currentPage)
  await api.get(`api/albums/user/${id}/?page=${currentPage}`).then(response => {
    console.log(response.data)
    return(response.data)
  }).catch(error => {
    console.log("Error", error);
});
}
