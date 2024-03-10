<<<<<<< HEAD
import {Home} from './Home';
function App() {
  return (
    <div className="App">
      <Home></Home>
    </div>
  );
}

=======
import React from 'react';
import { Routes,Route} from 'react-router-dom';
import { Home as Interference_Home} from './Page_Interference/Home';
import {Home as Home} from './Page_Home/Home';
import {Home as Page_Video} from './Page_Video/Home';
//import {Home as WaveDraw} from './Page_WaveDraw/Home';
import { ApolloProvider } from '@apollo/client';
import { combinedLink } from './API/apolloConfig';
import { ApolloClient, InMemoryCache } from '@apollo/client';
const PrimaryClient = new ApolloClient({
  link: combinedLink,
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={PrimaryClient}>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/interference" element={<Interference_Home/>}/>
        <Route exact path="/video" element={<Page_Video/>}/>
        
      </Routes>
    </div>
    </ApolloProvider>
  );
}
//<Route exact path="/wavedraw" element={<WaveDraw/>}/>
>>>>>>> b1d7be79716fd5cd30330465c1e0ac7664171dd5
export default App;
