import { Provider } from 'react-redux';
import './App.css';
import SearchJobs from './components/SearchJobs';
import { StoreManager } from './redux/storeManager';

function App() {
    // using StoreManager to make store available for whole application
    const store = StoreManager()

    return (
        <Provider store={store}>
            <SearchJobs/>
        </Provider>
    )
}

export default App;
