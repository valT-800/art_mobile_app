import { api } from "../services/api_base"

export default followUser=async(id)=>{
    await api.put(`api/user/users/${id}`,{
      follow: true,
      following_id: id
    }).then(response => {
      
      console.log('Followed')
        
    })
    .catch(error => {
      console.log(error)
  })
  }