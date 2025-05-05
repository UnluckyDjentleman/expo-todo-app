import { Button } from "@ant-design/react-native";
import { Text , StyleSheet } from "react-native";


export default function ButtonComponent({ text, onClick }:{text: string, onClick:()=>void}) {
    return (
        <Button onPress={onClick} style={styles.button}>
            <Text style={styles.text}>{text}</Text>
        </Button>
    );
}

const styles=StyleSheet.create({
    button:{
        backgroundColor: '#785899',
        borderWidth: 1,
        borderColor: '#665a6f',
        borderRadius: 4,
        paddingVertical: 12,
        paddingHorizontal: 16,
        justifyContent: 'center',
        marginVertical: 12,
        borderTopEndRadius: 25, 
        borderBottomEndRadius: 25, 
        borderTopStartRadius: 25, 
        borderBottomStartRadius: 25,
    },
    text:{
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    }
})