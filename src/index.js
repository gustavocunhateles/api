import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppPt from './pages/AppPt';
import AppEn from './pages/AppEn';      

ReactDOM.render(
    (
        <Router>
            <App>
                <Switch>
                    <Route exact path="/" component={AppPt}/>
                    <Route path="/pt" component={AppPt}/>
                    <Route path="/en" component={AppEn}/>
                </Switch>
            </App>
        </Router>
    ),
    document.getElementById('root')
);

serviceWorker.unregister();
