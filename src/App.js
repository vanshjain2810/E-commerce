import React from 'react';
import {Route, Switch} from 'react-router-dom';
import ShopPage from './pages/Shop/Shop.component';
import HomePage from './pages/homepage/homepage-compo';
import './App.css';



function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop/hats' component={ShopPage} />
      </Switch>
      
    
    </div>
  );
}

export default App;
