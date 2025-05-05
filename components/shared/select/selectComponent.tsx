import { Status } from "../../../constants/status";
import { Text } from "react-native";
import { Menu, Button } from "react-native-paper";
import { useState } from "react";

export default function SelectComponent({value, onChange}:{value: Status|undefined, onChange:(x: Status|undefined)=>void}){
  const [visible, setVisible] = useState(false);
  
  const statusOptions = [
    { label: 'Select Status', value: null }, 
    ...Object.values(Status).map(v => ({
      label: v,
      value: v
    }))
  ];

  const selectedLabel = statusOptions.find(opt => opt.value === value)?.label || 'Select Status';

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <Button 
          mode="outlined" 
          onPress={() => setVisible(true)}
          style={{ justifyContent: 'space-between', borderColor: 'rgb(240, 219, 255)'}}
          contentStyle={{ flexDirection: 'row-reverse', width: '100%' }}
          icon="menu-down"
        >
          <Text style={{color: 'black', fontFamily: 'Segoe UI, sans-serif'}}>{selectedLabel}</Text>
        </Button>
      }
      contentStyle={{ backgroundColor: 'white' }}
    >
      {statusOptions.map((item) => (
        <Menu.Item
          key={item.value || 'empty'}
          onPress={() => {
            onChange(item.value as Status);
            setVisible(false);
          }}
          title={item.label}
          titleStyle={{ color: !item.value ? '#999' : '#000', fontFamily: 'Segoe UI' }}
        />
      ))}
    </Menu>
  );
}