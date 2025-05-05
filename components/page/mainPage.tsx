import { useRef, useState } from "react";
import useGetTodoItems from "../../utils/hooks/useGetTodoItems";
import { useAppSelector } from "../../utils/hooks/useRedux";
import TodoItem from "../../constants/todoItem";
import FilterString from "../../constants/filterString";
import { List } from "@ant-design/react-native";
import Header from "../header/header";
import ButtonComponent from "../shared/button/buttonComponent";
import ModalComponent from "../shared/modal/modalComponent";
import Loader from "../shared/loader/loader";
import TodoItemComponent from "../todoItem/todoItemComponent";
import { View, Text, ScrollView } from "react-native";

export default function MainPage() {
  const filter = useAppSelector((state) => state.filter.filter);
  const { error, load, items } = useGetTodoItems(filter);
  const defaultItems = useRef<TodoItem[]>(items);
  const defaultFilter = useRef<FilterString>(filter);

  if (load === false) {
    defaultItems.current = items;
  } else if (load === true) {
    if (
      defaultFilter.current.from !== filter.from ||
      defaultFilter.current.status !== filter.status ||
      defaultFilter.current.to !== filter.to
    ) {
      defaultItems.current = [];
      defaultFilter.current = filter;
    }
  }

  const [isOpenedModal, setIsOpenedModal] = useState(false);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Header />
      <ButtonComponent
        text="Add New TodoItem"
        onClick={() => setIsOpenedModal(true)}
      />
      <ModalComponent
        isOpened={isOpenedModal}
        setIsOpened={() => setIsOpenedModal(false)}
        item={undefined}
      />
      {!!load ? (
        <View style={{ padding: 20 }}>
          <Loader />
        </View>
      ) : null}
      {!!defaultItems.current.length ? (
        <ScrollView>
          {defaultItems.current.map((el) => (
            <TodoItemComponent key={el.id} item={el} />
          ))}
        </ScrollView>
      ) : null}
      {error ? (
        <List>
          <List.Item>
            <Text style={{ color: "red" }}>{error}</Text>
          </List.Item>
        </List>
      ) : null}
    </View>
  );
}
