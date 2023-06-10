import * as ImagePicker from 'expo-image-picker'
const options = {
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [3, 4],
    quality: 1,
};
export default takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync(options);
    console.log(result);
    if (!result.canceled) {
        return result.assets[0].uri
    }
    else {takePhoto}
    
};