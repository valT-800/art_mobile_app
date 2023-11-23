import * as PostPicker from 'expo-post-picker'

const options = {
    mediaTypes: PostPicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [3, 4],
    quality: 0.7,
};
export default takePhoto = async () => {
    let result = await PostPicker.launchCameraAsync(options);
    //console.log(result);
    if (!result.canceled) {
        return result.assets[0].uri
    }
    else {takePhoto}
    
};