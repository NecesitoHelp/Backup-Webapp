import './App.css';
import UserOnboarding from './components/user/onboarding';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { Provider } from 'react-redux';
import { store  as UserStore } from './stores/userstore'

function App() {
  return (
    <Provider store={UserStore}>
    <Router>
    <div className="App">
      <header className="App-header">
        Help.
      </header>
      <div className="App-content">
        <UserOnboarding />
      </div>
    </div>
    </Router>
    </Provider>
  );
}

export default App;
