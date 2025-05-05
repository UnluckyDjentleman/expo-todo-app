import {
  Form,
  Input,
  Toast,
  Button,
  View,
  Flex,
} from "@ant-design/react-native";
import { Modal, Portal } from "react-native-paper";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import TodoItem from "../../../constants/todoItem";
import { useEffect, useState } from "react";
import { CreateTodoItem } from "../../../utils/functions/createTodoItem";
import { useAppDispatch } from "../../../utils/hooks/useRedux";
import {
  addTodoItem,
  updateTodoItem,
} from "../../../store/reducers/todoItemReducer";
import { UpdateTodoItem } from "../../../utils/functions/updateTodoItem";
import { StyleSheet, Text } from "react-native";

export default function ModalComponent({
  item,
  isOpened,
  setIsOpened,
}: {
  item: TodoItem | undefined;
  isOpened: boolean;
  setIsOpened: (x: boolean) => void;
}) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onConfirmDate = (params: { date?: Date }) => {
    setShowDatePicker(false);
    if (params.date) {
      const newDate = new Date(params.date);
      form.setFieldsValue({ deadline_date: newDate });
    }
    setShowTimePicker(true);
  };

  const onConfirmTime = ({
    hours,
    minutes,
  }: {
    hours: number;
    minutes: number;
  }) => {
    setShowTimePicker(false);
    const currentDate = form.getFieldValue("deadline_date");
    if (currentDate) {
      const newDateTime = new Date(currentDate);
      newDateTime.setHours(hours);
      newDateTime.setMinutes(minutes);
      // Обновляем форму
      form.setFieldsValue({ deadline_date: newDateTime });
    }
  };

  useEffect(() => {
    console.log(typeof item?.deadline_date);
    if (isOpened) {
      form.setFieldsValue({
        title: item?.title || "",
        description: item?.description || "",
        deadline_date: item?.deadline_date
          ? item.deadline_date.toLocaleString()
          : undefined,
      });
    }
  }, [item, isOpened, form]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    console.log(values);
    if (item) {
      const data: Partial<TodoItem> = {
        title: values.title,
        description: values.description,
        deadline_date: new Date(values.deadline_date),
      };
      UpdateTodoItem(item.id, data)
        .then((data: TodoItem) => {
          dispatch(updateTodoItem({ item: data }));
          Toast.success("Item is updated successfully");
          setIsOpened(false);
        })
        .catch((err) => Toast.fail(err.response.data.message));
    } else {
      const data: Omit<TodoItem, "id" | "start_date" | "status"> = {
        title: values.title,
        description: values.description,
        deadline_date: new Date(values.deadline_date),
      };
      CreateTodoItem(data)
        .then((data: TodoItem) => {
          dispatch(addTodoItem({ item: data }));
          Toast.success("Item is created successfully");
          setIsOpened(false);
        })
        .catch((err) => Toast.fail(err.response.data.message));
    }
  };

  const getCurrentDate = form.getFieldValue("deadline_date")
    ? new Date(form.getFieldValue("deadline_date"))
    : new Date();

  return (
    <Portal>
      <Modal
        visible={isOpened}
        onDismiss={() => setIsOpened(false)}
        contentContainerStyle={{
          backgroundColor: "white",
          padding: 10,
          margin: 5,
        }}
      >
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 18, marginBottom: 20 }}>
            {item ? "Edit Item" : "Add Item"}
          </Text>

          <Form form={form} layout="vertical">
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input placeholder="Title" style={styles.input} />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <Input placeholder="Description" style={styles.input} />
            </Form.Item>

            <Form.Item
              name="deadline_date"
              label="Deadline"
              rules={[{ required: true }]}
            >
              <Input
                placeholder="Deadline"
                editable={false}
                style={styles.input}
              />
            </Form.Item>
            <Button
              onPress={() => setShowDatePicker(true)}
              style={{
                justifyContent: "flex-start",
                borderColor: "transparent",
                paddingTop: 10,
              }}
            >
              <Text
                style={{
                  color: "#663399",
                  textDecorationLine: "underline",
                  fontSize: 16,
                }}
              >
                Pick Deadline Date
              </Text>
            </Button>
          </Form>
          <Flex
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
              backgroundColor: "transparent",
            }}
          >
            <Button
              type="primary"
              onPress={() => setIsOpened(false)}
              style={styles.cancelButton}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onPress={handleSubmit}
              style={styles.submitButton}
            >
              {item ? "Update" : "Create"}
            </Button>
          </Flex>
          {/* Модальные окна выбора даты и времени */}
          <DatePickerModal
            locale="en"
            mode="single"
            visible={showDatePicker}
            onDismiss={() => setShowDatePicker(false)}
            date={getCurrentDate as Date}
            onConfirm={onConfirmDate}
          />

          <TimePickerModal
            visible={showTimePicker}
            onDismiss={() => setShowTimePicker(false)}
            onConfirm={onConfirmTime}
            hours={getCurrentDate?.getHours() || 12}
            minutes={getCurrentDate?.getMinutes() || 0}
          />
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  cancelButton: {
    backgroundColor: "#E44C4C",
    fontSize: 16,
    borderColor: "#E44C4C",
    borderTopEndRadius: 25,
    borderBottomEndRadius: 25,
    borderTopStartRadius: 25,
    borderBottomStartRadius: 25,
    paddingVertical: 12,
  },
  submitButton: {
    backgroundColor: "#1890ff",
    fontSize: 16,
    fontWeight: "500",
    borderTopEndRadius: 25,
    borderBottomEndRadius: 25,
    borderTopStartRadius: 25,
    borderBottomStartRadius: 25,
    paddingVertical: 12,
  },
  form: {
    marginTop: 16,
  },
  formItem: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 4,
    paddingHorizontal: 2,
    paddingVertical: 2,
    fontSize: 14,
  },
});
