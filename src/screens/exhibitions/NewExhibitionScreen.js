import React, {useContext, useEffect, useState} from 'react';
import {
 View,
 StyleSheet,
 SafeAreaView,
 Text,
 ScrollView,
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
    const [error, setError] = useState([]);
    const now = new Date()
    const maxStartTime = new Date()
    const minEndTime = new Date()
    const maxEndTime = new Date()
    const minStartTime = new Date()

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

    async function newExhibition (title, description, start_time, end_time) {

        api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`; 
        console.log({title, description, start_time, end_time})
        await api.post('api/gallery/exhibitions', {title, description, start_time, end_time})
        .then((response) => {
            console.log(response.data.message)
            navigate('Profile')
        }).catch((err) => {
            console.log(err.response.data.message)
            setError(err.response.data.message)})
    }
    
    useEffect(()=>{
        setMinMax(startTime)
    },[startTime])

    return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
        <View style={{padding: 10, width: '100%', alignItems: 'center'}}>
        { error && error.title &&
            <Text style={{ color: 'red', marginBottom: 24 }}>{error.title}</Text>
            }
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
                    }
                    setShowEnd(false)}}
                />}
        </View>
        </ScrollView>
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
