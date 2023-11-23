
import * as PostPicker from 'expo-post-picker';

const options = {
  mediaTypes: PostPicker.MediaTypeOptions.All,
  allowsEditing: true,
  aspect: [3, 4],
  quality: 0.7,
};

export default async function pickPostFromGallery (){
    // No permissions request is necessary for launching the post library
let result = await PostPicker.launchPostLibraryAsync(options);

//console.log(result);

if (!result.canceled) {
    return result.assets[0].uri
}
else{
  pickPost
}

};