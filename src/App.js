import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/Not-Found/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';

function App() {
    return (
        <div className="App">
            <Router>
                <Header></Header>

                <Switch>
                    <Route path="/shop">
                        <Shop></Shop>
                    </Route>
                    <Route path="/review">
                        <Review></Review>
                    </Route>
                    <Route path="/inventory">
                        <Inventory></Inventory>
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
        </div>
    );
}

export default App;
