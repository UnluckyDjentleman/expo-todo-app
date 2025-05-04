import DatePick from "../shared/datePicker/datePick";
import SelectComponent from "../shared/select/selectComponent";
import ButtonComponent from "../shared/button/buttonComponent";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/useRedux";
import { setFilter } from "../../store/reducers/filterReducer";
import { View,StyleSheet } from "react-native";
import { Flex, Grid } from "@ant-design/react-native";

export default function Header() {
    const filters = useAppSelector(state => state.filter.filter);
    const dispatch = useAppDispatch();
  
    return (
    <View style={styles.headerContainer}>
        <View style={[styles.filterItem]}>
            <DatePick
            placeholder="From"
            value={filters.from ? new Date(filters.from) : undefined}
            setValue={(dateFrom: Date) => {
                dispatch(setFilter({ filter: { ...filters, from: dateFrom } }));
            }}
            />
        </View>
        <View style={[styles.filterItem]}>
            <DatePick
            placeholder="To"
            value={filters.to ? new Date(filters.to) : undefined}
            setValue={(dateTo: Date) => {
                dispatch(setFilter({ filter: { ...filters, to: dateTo } }));
            }}
            />
        </View>
        <View style={styles.filterItem}>
            <View style={[styles.selectItem]}>
                <SelectComponent
                    value={filters.status}
                    onChange={(status) => dispatch(setFilter({ filter: { ...filters, status } }))}
                    />
            </View>
        </View>
        <View style={styles.actionRow}>
            <ButtonComponent onClick={() => dispatch(setFilter({
                        filter: { from: undefined, to: undefined, status: undefined }
                    }))} text={"Reset Filters"}>
            </ButtonComponent>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#dee2e6',
    },
    dateRow: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 16,
    },
    filterItem: {
        flex: 1,
        marginHorizontal: 4,
    },
    actionRow: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10
    },
    selectItem: {
        marginBottom: 18,
    },
});