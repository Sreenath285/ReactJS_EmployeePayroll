import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PayrollForm from './components/payroll-form/payroll-form';
import Dashboard from './components/dashboard/dashboard';

function App() {
  return (
      <Router>
        <div className="App">
              <Switch>
                  <Route exact path="/" component={Dashboard}/>
                  <Route exact path="/payroll" component={PayrollForm}/>
                  <Route exact path="/payroll/:id" component={PayrollForm}/>
              </Switch>
        </div>
      </Router> 
  );
}

export default App;
