import './App.css';
import UserOnboarding from './components/user/onboarding';
import Helper from './components/helper/onboarding/start';
import Chamba from './components/helper/onboarding/start/Chamba';
import HelperOnboarding from './components/helper/onboarding';
import { connect, Provider } from 'react-redux';
import { store  as HelperStore } from './stores/helperstore'
import { BrowserRouter as Router, Routes,  Route, Link, NavLink, useParams} from "react-router-dom";



function App() {

  return (
    <Provider store={HelperStore}>

      <Router>

      <div className="App">
        <header className="App-header">
          Help.
          <nav className='App-header-nav'>
            <NavLink className="App-nav-NavLink" to ='/' >Home</NavLink>
            <NavLink className="App-nav-NavLink" to ='/helper' >Helper</NavLink>
            <NavLink className="App-nav-NavLink" to ='/chamba' >Chamba</NavLink>
          </nav>
        </header>
      </div>

        <div className="App-content">
          <Routes>
            <Route exact path='/helper' element={<HelperOnboarding />} />
            <Route exact path='/chamba' element={<Chamba />} />
            <Route className='User' exact path='/' element={<UserOnboarding/>} />
          </Routes>
        </div>
      
      </Router>
    </Provider>
  );
}

export default (App)