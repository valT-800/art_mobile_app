
import * as ImagePicker from 'expo-image-picker';

const options = {
  mediaTypes: ImagePicker.MediaTypeOptions.All,
  allowsEditing: true,
  aspect: [3, 4],
  quality: 0.7,
};

export default async function pickPostFromGallery (){
    // No permissions request is necessary for launching the post library
let result = await ImagePicker.launchImageLibraryAsync(options);

//console.log(result);

if (!result.canceled) {
    return result.assets[0].uri
}
else{
  pickPostFromGallery
}

};