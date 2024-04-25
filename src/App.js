import { FC, PropsWithChildren } from "react";
import { OrderlyConfigProvider } from "@orderly.network/hooks";


import Home from './pages/website/home'
import About from './pages/website/about'
import Swap from './pages/account/swap'
import OrderlyApi from './pages/website/orderlyApi'

import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';


const brokerId = "orderly";





 const App: FC<PropsWithChildren> = () => {
  return (
    <OrderlyConfigProvider brokerId={brokerId} networkId="testnet">
       <Router>
         <Switch>
           <Route exact path="/" >
                     <Home/>
           </Route>
           <Route path="/about" >
                     <About/>
           </Route>
           <Route path="/swap" >
                     <Swap/>
           </Route>
           <Route path="/orderlyapi" >
                     <OrderlyApi/>
           </Route>
         </Switch>
     
     
    </Router>

    </OrderlyConfigProvider>
  );
};

export default App
