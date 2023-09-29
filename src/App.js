import React from 'react';
import { Routes,Route} from 'react-router-dom';
import { Home as Interference_Home} from './Page_Interference/Home';
import {Home as Home} from './Page_Home/Home';
import {Home as Page_Video} from './Page_Video/Home';
import {Home as WaveDraw} from './Page_WaveDraw/Home';
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
        <Route exact path="/wavedraw" element={<WaveDraw/>}/>
      </Routes>
    </div>
    </ApolloProvider>
  );
}

export default App;
