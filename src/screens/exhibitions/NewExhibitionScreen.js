import React, {useContext, useEffect, useState} from 'react';
import {
 View,
 StyleSheet,
 SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {NormalText} from "../../components/AppTextComponents";
import CustomInput from "../../components/CustomInput";
import CustomButton from '../../components/CustomButton';
import { format } from 'date-fns';
import { AuthContext } from '../../AuthProvider';
import { api } from '../../services/api_base';
import CustomMultilineInput from '../../components/CustomMultilineInput';

export default function NewExhibitionScreen({navigation: {navigate, setOptions}}){
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);
    const [mode, setMode] = useState('date');
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const{user} = useContext(AuthContext)

    const maxStartDate = new Date()
    const minEndDate = new Date()
    const maxEndDate = new Date()
    const minStartDate = new Date()

    const setMinMax =(time)=>{
        minStartDate.setDate(time.getDate()+1)
        maxStartDate.setDate(time.getDate() + 15);
        minEndDate.setDate(time.getDate() + 2)
        maxEndDate.setDate(time.getDate() + 30);
        if(startTime<minStartDate) setStartTime(minStartDate)
        if(endTime<minEndDate) setEndTime(minEndDate)
    }

    async function newExhibition (title, description, start_time, end_time) {

        api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`; 
        console.log({title, description, start_time, end_time})
        await api.post('api/gallery/exhibitions', {title, description, start_time, end_time})
        .then((response) => {
            console.log(response.data.message)
            navigate('Profile')
        }).catch((err) => console.log(err))
    }
    setOptions({
        headerRight: () =>
        <CustomIcon name='checkmark' size={30}
        event={async() => {
            console.log(startTime,endTime)
            console.log(format(startTime,'yyyy-MM-dd HH:mm:ss'),format(endTime,'yyyy-MM-dd HH:mm:ss'))
            await newExhibition(title, description,format(startTime,'yyyy-MM-dd HH:mm:ss'),format(endTime,'yyyy-MM-dd HH:mm:ss'))
            
            }}
        />
    });
    useEffect(()=>{
        setMinMax(startTime)
    },[startTime])

    return (
    <SafeAreaView style={styles.container}>
        <View style={{padding: 10, width: '100%', alignItems: 'center'}}>
            <NormalText text='Title'/>
            <CustomInput
                onChangeText={(text)=>setTitle(text)}
                placeholder="Enter Title"
                value={title}
            />
            <NormalText text='Description'/>
            <CustomMultilineInput
                onChangeText={(text)=>setDescription(text)}
                value={description}
                placeholder="Enter Description"
            />
            <NormalText text='Start time'/>
            <View style={{flexDirection:'row'}}>
                <CustomButton title={startTime.getMonth().toString()+'m-'+startTime.getDate().toString()+'d'} onPress={()=>{
                    setShowStart(true)
                    setMode('date')
                    }}/>
                    <CustomButton title={startTime.getHours().toString()+':'+startTime.getMinutes().toString()} onPress={()=>{
                        setShowStart(true)
                        setMode('time')
                        }}/>

                </View>
                {showStart && <DateTimePicker
                value={startTime}
                //maximumDate={maxStartDate}
                //minimumDate={minStartDate}
                mode={mode}
                onChange={(event, selectedTime) => {
                    if (event.type === "set") {
                      // Handle the date change only if the user presses "Set"
                      setStartTime(selectedTime);
                    }
                    setShowStart(false)}
                }/>}
            <NormalText text='End time'/>
            <View style={{flexDirection:'row'}}>
                <CustomButton title={endTime.getMonth().toString()+'m-'+endTime.getDate().toString()+'d'} onPress={()=>{
                    setShowEnd(true)
                    setMode('date')
                    }}/>
                    <CustomButton title={endTime.getHours().toString()+':'+endTime.getMinutes().toString()} onPress={()=>{
                        setShowEnd(true)
                        setMode('time')
                        }}/>

                </View>
            
            {showEnd && <DateTimePicker
                value={endTime}
                //maximumDate={maxEndDate}
                //minimumDate={minEndDate}
                mode={mode}
                onChange={(event, selectedTime) => {
                    if (event.type === "set") {
                      // Handle the date change only if the user presses "Set"
                      setEndTime(selectedTime);
                    }
                    setShowEnd(false)}}
                />}
        </View>
    </SafeAreaView>
 );
};

const styles = StyleSheet.create({
    container:{
      flex: 1,
      paddingVertical:20,
      marginTop: 20
    },
    item: {
        marginBottom: 16,
    }
 })
