import {useEffect, useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomInput from "../../components/CustomInput";
import {NormalText} from "../../components/AppTextComponents";
import CustomMultilineInput from "../../components/CustomMultilineInput";
import { api } from "../../services/api_base";
import CustomButton from "../../components/CustomButton";

import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";

export default function EditExhibitionScreen({route, navigation:{navigate, setOptions}}){

  const{id, title, description,start_time,end_time} = route.params;
    const[newDescription, setDescription] = useState(description)
    const[newTitle, setTitle] = useState(title)
    const [error, setError] = useState([]);
    const [startTime, setStartTime] = useState(new Date(start_time));
    const [endTime, setEndTime] = useState(new Date(end_time));
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);
    const [mode, setMode] = useState('date');
    const now = new Date()
    const maxStartTime = new Date()
    const minEndTime = new Date()
    const maxEndTime = new Date()
    const minStartTime = new Date()
    
    setOptions({
      headerRight: () =>
        <CustomIcon name='checkmark' size={30}
          event={() => {
            handlePublish()}}
          />
      });
      
    minStartTime.setDate(now.getDate() + 1)
    maxStartTime.setDate(now.getDate() + 10)
    minEndTime.setDate(now.getDate() + 2)
    maxEndTime.setDate(now.getDate() + 20);

    useEffect(()=>{
        startTime<minStartTime && setStartTime(minStartTime)
        endTime<minEndTime && setEndTime(minEndTime)
    },[])
    const setMinMax =(time)=>{
      console.log('Time',time)
      minEndTime.setDate(time.getDate() + 2)
      //maxEndTime.setDate(time.getDate() + 20);   
      console.log('Start time',startTime)  
      console.log('End time',endTime)
  }
    
    async function updateExhibition(title, description, start_time, end_time, publish){
      console.log('Publish',publish)
        await api.put(`api/gallery/exhibitions/${id}`, {title, description, start_time, end_time, publish}).then(response => { 
        console.log('Exhibition',response.data)
        navigate('Exhibition', {id:id})
        }).catch(error => {
          console.log(error.response.data.message)
          setError(error.response.data.message)
        });
    }
    const handlePublish=()=>{
      Alert.alert('Publish', 'Do you want to publish exhibition?', [
        {
          text: 'No, leave as draft',
          onPress: () => updateExhibition(newTitle,newDescription,format(startTime,'yyyy-MM-dd HH:mm:ss'),format(endTime,'yyyy-MM-dd HH:mm:ss'),false),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => updateExhibition(newTitle,newDescription,format(startTime,'yyyy-MM-dd HH:mm:ss'),format(endTime,'yyyy-MM-dd HH:mm:ss'),true)},
      ],{
        cancelable: true,
      });
    }
    return(
        <SafeAreaView style= {styles.container}>
          <ScrollView>
          <View style = {{padding: 10, alignItems: 'center'}}>
          { error && error.title &&
            <Text style={{ color: 'red', marginBottom: 24 }}>{error.title}</Text>
            }
          <NormalText text='Title'/>
            {title && <CustomInput
            value={newTitle}
            onChangeText={(text)=>setTitle(text)}
            />}
            <NormalText text='Description'/>
          {description && <CustomMultilineInput
            value={newDescription}
            onChangeText={(text)=>setDescription(text)}
            />}
            { error && error.start_time &&
            <Text style={{ color: 'red', marginBottom: 24 }}>{error.start_time}</Text>
            }
            <NormalText text='Start time'/>
            <View style={{flexDirection:'row'}}>
            <CustomButton title={startTime.toLocaleDateString()} onPress={()=>{
                    setShowStart(true)
                    setMode('date')
                    }}/>
                <CustomButton title={startTime.toLocaleTimeString()} onPress={()=>{
                        setShowStart(true)
                        setMode('time')
                }}/>

                </View>
                {showStart && <DateTimePicker
                value={startTime}
                maximumDate={maxStartTime}
                minimumDate={minStartTime}
                mode={mode}
                onChange={(event, selectedTime) => {
                    if (event.type === "set") {
                      // Handle the date change only if the user presses "Set"
                      setStartTime(selectedTime);
                      setMinMax(selectedTime);
                      //if(endTime <= selectedTime) {setEndTime(maxEndTime)}
                    }
                    setShowStart(false)}
                }/>}
                
            { error && error.end_time &&
            <Text style={{ color: 'red', marginBottom: 24 }}>{error.end_time}</Text>
            }
            <NormalText text='End time'/>
            <View style={{flexDirection:'row'}}>
            <CustomButton title={endTime.toLocaleDateString()} onPress={()=>{
                setShowEnd(true)
                setMode('date')
            }}/>
            <CustomButton title={endTime.toLocaleTimeString()} onPress={()=>{
                setShowEnd(true)
                setMode('time')
            }}/>

                </View>
            
            {showEnd && <DateTimePicker
                value={endTime}
                maximumDate={maxEndTime}
                minimumDate={minEndTime}
                mode={mode}
                onChange={(event, selectedTime) => {
                    if (event.type === "set") {
                      // Handle the date change only if the user presses "Set"
                      setEndTime(selectedTime);
                      //if(startTime >= selectedTime) {setStartTime(minStartTime)}
                    }
                    setShowEnd(false)}}
                />}
          </View>
          </ScrollView>
        </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 20
  }
});
