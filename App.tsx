import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { Provider as AntDesignProvider } from '@ant-design/react-native';
import { store } from './store/store';
import MainPage from './components/page/mainPage';
import enUS from '@ant-design/react-native/lib/locale-provider/en_US'
import AntDesignIcons from '@ant-design/icons-react-native'
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
      <Provider store={store}>
        <PaperProvider>
          <AntDesignProvider locale={enUS}>
            <MainPage />
          </AntDesignProvider>
        </PaperProvider>
      </Provider>
  );
}
