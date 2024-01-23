import { Animated, Easing, StyleSheet, Text, View } from "react-native"
import { CustomHeader2, NormalText, OtherText } from "./AppTextComponents"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "@react-navigation/native";

export default function Timer({interval,title,size})
{
  const [timeInSeconds, setTimeInSeconds] = useState(interval);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeInSeconds((prevTime) => {if (prevTime > 0) {
        return prevTime - 1; // Subtract 1 second (1000 milliseconds) from the timer
      } else {
        clearInterval(intervalId); // Clear the interval when the timer reaches zero
        return 0;
      }
    });

    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const days = Math.floor(timeInSeconds / (24 * 3600));
  const hours = Math.floor((timeInSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;
  
  if(size=='small')
  {
    return (
    <View style={styles.view}>
      <Text style={[styles.text,{fontSize: 18}]}>{`${days}d ${hours}h ${minutes}m ${seconds}s`}</Text>
    </View>
  )}
  else
  {
    return (
    <View style={[styles.view,{backgroundColor: useTheme().colors.card}]}>
      <OtherText text={title}/>
      <Text style={[styles.text,{fontSize: 25}]}>{`${days}d ${hours}h ${minutes}m ${seconds}s`}</Text>
    </View>
  )};
}
const styles = StyleSheet.create({
    view: {
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 5,
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        fontWeight: '700',
        color: 'lightgreen',
    }
})