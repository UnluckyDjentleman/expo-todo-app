import { Card, Checkbox, Toast, Flex } from "@ant-design/react-native";
import TodoItem from "../../constants/todoItem";
import DeleteButton from "../shared/button/deleteButton";
import EditButton from "../shared/button/editButton";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch } from "../../utils/hooks/useRedux";
import {
  removeTodoItem,
  updateTodoItem,
} from "../../store/reducers/todoItemReducer";
import { DeleteTodoItem } from "../../utils/functions/deleteTodoItem";
import { useState } from "react";
import ModalComponent from "../shared/modal/modalComponent";
import { Status } from "../../constants/status";
import { UpdateTodoItem } from "../../utils/functions/updateTodoItem";

import { Text, View, StyleSheet } from "react-native";

export default function TodoItemComponent({ item }: { item: TodoItem }) {
  const dispatch = useAppDispatch();

  const removeItem = (id: string) => {
    DeleteTodoItem(id)
      .then((data: TodoItem) => {
        dispatch(removeTodoItem({ item: data }));
        Toast.success("Item removed successfully");
      })
      .catch((err) => {
        Toast.fail(err.response?.data?.message || "Error");
      });
  };

  const updateTodoItemStatus = (item: TodoItem) => {
    const updateData: Partial<TodoItem> = {
      status:
        item.status === Status.FINISHED ? Status.PUBLISHED : Status.FINISHED,
    };

    UpdateTodoItem(item.id, updateData)
      .then((data: TodoItem) => {
        dispatch(updateTodoItem({ item: data }));
        Toast.success("Status updated");
      })
      .catch((err) => {
        Toast.fail(err.response?.data?.message || "Error");
      });
  };

  const formatDate = (dateString: Date) => {
    return dateString
      .toLocaleString()
      .replace("T", " ")
      .replace("Z", "")
      .slice(0, -7);
  };

  const [isOpenedModal, setIsOpenedModal] = useState(false);

  return (
    <View style={{ marginBottom: 16 }}>
      <ModalComponent
        item={item}
        isOpened={isOpenedModal}
        setIsOpened={setIsOpenedModal}
      />

      <Card style={styles.card}>
        <Card.Header
          title={<Text style={styles.cardTitle}>{item.title}</Text>}
          style={styles.cardHeader}
          extra={
            <Flex style={styles.actions}>
              <EditButton onClick={() => setIsOpenedModal(true)}></EditButton>
              <DeleteButton onClick={() => removeItem(item.id)}></DeleteButton>
            </Flex>
          }
        />
        <Card.Body>
          <Text style={styles.description}>{item.description}</Text>
          <Flex
            align="center"
            justify="between"
            style={{ paddingHorizontal: 10 }}
          >
            <Flex>
              <MaterialIcons name="timer" size={20} color={"#8c8c8c"} />
              <Text style={styles.dateText}>
                {formatDate(item.start_date)} - {formatDate(item.deadline_date)}
              </Text>
            </Flex>
            <Flex style={{ gap: 7, justifyContent: "flex-end" }}>
              <Checkbox
                checked={item.status === Status.FINISHED}
                onChange={() => updateTodoItemStatus(item)}
              ></Checkbox>
            </Flex>
          </Flex>
        </Card.Body>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginBottom: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 0,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 0,
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "500",
    color: "#333",
  },
  cardBody: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 2,
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  description: {
    color: "#080808",
    fontSize: 18,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    color: "#8f8f8f",
    fontSize: 13,
    marginLeft: 6,
  },
});
