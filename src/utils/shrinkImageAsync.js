import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';  

const reduceImageAsync = async (uri) =>{
  const result = manipulateAsync(
    uri, 
    [{ resize: { width: 500 } }], 
    {compress: 0.5 }
    );
    return result
}
export default reduceImageAsync;

const compressImage = async (uri, format = SaveFormat.JPEG) => { // SaveFormat.PNG
    const result = await manipulateAsync(
        uri,
        [{ resize: { width: 1200 } }],
        { compress: 0.7, format }
    );

    //return  { uri: result, name: `${Date.now()}.${format}`, type: `image/${format}`};
    return result
};
