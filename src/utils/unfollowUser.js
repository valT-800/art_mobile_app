import { api } from "../services/api_base"

export default unfollowUser = async(id)=>{
    await api.put(`api/user/users/${id}`,{
      unfollow: true,
      following_id: id
    }).then(response => {
      //console.log('Unfollowed')
    })
    .catch(error => {
      //console.log(error)
  })
}