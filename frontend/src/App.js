import './App.css';
import Home from './component/Home/Home';
import WebFont from "webfontloader";
import { useEffect } from 'react';
// import store from './store';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    
    // store.dispatch(loadUser());
    
    // getStripeApiKey();

  }, []);
  return (
    <div className="App">
    <Home/>
    </div>
  );
}

export default App;
