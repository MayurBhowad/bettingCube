import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//redux
import { Provider } from 'react-redux';
import store from './redux/store.redux';

import BetingTable from './components/Bet/BetingTable.component';
import Home from './components/Home/Home.component';


function App() {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
          <Switch>
            <Route exact path="/betting_table" component={BetingTable} />
          </Switch>
        </Router>

      </div>
    </Provider>
  );
}

export default App;
