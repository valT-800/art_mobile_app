import { StyleSheet } from "react-native";

const Styles  = StyleSheet.create(
{
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 20,
        paddingTop: 30,
        backgroundColor: 'aliceblue'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        backgroundColor: '#f0ffff',
        borderWidth: 1,
        borderColor: '#000000',
        borderStyle: 'solid'
    },
    buttonLabel: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        color: 'rgba(80,180,120,1)'
    },
    header: {
        backgroundColor: 'turquoise'

    },
    label: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'darkslategrey',
        
    },
    input: {
        fontSize: 18,
        textAlign: 'left',
        color: 'darkslategrey',
        
        flexShrink: 10

    },
    bigInput: {
        width: 270,
        height: 300,
        backgroundColor: '#ededed',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 9,
        marginBottom: 10,
        
    },
    listItem: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(90,110,150,0.1)',
        height: 100,
        width: 300,
        borderWidth: 3,
        borderColor: 'rgba(200,200,200,0.5)',
        borderStyle: 'solid'
    },
    image:{
        resizeMode: 'contain',
        width: 200,
        height: 200,
    },
    icon: {
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        borderBottomColor: 'black'
    }
    
}
)
export default Styles;