import './App.css';
import {Provider} from 'react-redux';
import Flow from './Components/Flow';
import store from './Components/utils/store';

function App() {
  return (
    <Provider store={store}>
      <Flow />
    </Provider>


  );
}

export default App;
