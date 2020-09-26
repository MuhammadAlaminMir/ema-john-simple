import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/Not-Found/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App(props) {
    const [loggedInUser, setLoggedInUser] = useState({});
    return (
        <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
            <Router>
                <Header></Header>

                <Switch>
                    <Route path="/shop">
                        <Shop></Shop>
                    </Route>
                    <Route path="/review">
                        <Review></Review>
                    </Route>
                    <PrivateRoute path="/inventory">
                        <Inventory></Inventory>
                    </PrivateRoute>
                    <PrivateRoute path="/shipment">
                        <Shipment></Shipment>
                    </PrivateRoute>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/">
                        <Shop></Shop>
                    </Route>
                    <Route exact path="/product/:productKey">
                        <ProductDetail></ProductDetail>
                    </Route>
                    <Route path="*">
                        <NotFound></NotFound>
                    </Route>
                </Switch>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
