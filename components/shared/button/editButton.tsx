import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "@ant-design/react-native";

export default function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onPress={onClick}>
      <MaterialIcons name="edit" size={20} color="green"></MaterialIcons>
    </Button>
  );
}
