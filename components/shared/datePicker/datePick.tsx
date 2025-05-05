import { Button, Flex } from "@ant-design/react-native";
import { DatePickerModal } from "react-native-paper-dates";
import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function DatePick({
  placeholder,
  value,
  setValue,
}: {
  placeholder: string;
  value: Date | undefined;
  setValue: (x: Date) => void;
}) {
  const [show, setShow] = useState<boolean>(false);

  const handleChange = (newValue: Date | undefined) => {
    if (newValue) {
      setValue(newValue);
      setShow(false);
    } else {
      setValue(undefined!);
    }
  };

  return (
    <View>
      <Button
        onPress={() => {
          setShow(!show);
        }}
        style={styles.button}
      >
        <Flex style={{ gap: 5 }}>
          <MaterialIcons name="edit-calendar" size={20}></MaterialIcons>
          <Text>{value ? value.toLocaleDateString() : placeholder}</Text>
        </Flex>
      </Button>
      {!!show && (
        <DatePickerModal
          locale="en"
          mode="single"
          visible={show}
          onDismiss={() => setShow(false)}
          date={value}
          onConfirm={(params) => {
            if (params.date) {
              handleChange(params.date);
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginBottom: 10,
    borderTopEndRadius: 25,
    borderBottomEndRadius: 25,
    borderTopStartRadius: 25,
    borderBottomStartRadius: 25,
    borderColor: "rgb(240, 219, 255)",
  },
});
