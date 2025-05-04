import { Button } from '@ant-design/react-native';
import { MaterialIcons } from '@expo/vector-icons'

export default function DeleteButton({onClick}:{onClick: ()=>void}){
    return (
        <Button onPress={onClick}>
            <MaterialIcons name='delete' size={20} color='red'></MaterialIcons>
        </Button>
    )
}