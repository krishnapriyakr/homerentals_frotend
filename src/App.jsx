
import { Route, Routes } from 'react-router';
import './App.css';
import Auth from './Components/Auth';
import HomePage from './pages/HomePage';
import Explore from './pages/Explore';
import Wishlist from './pages/Wishlist';
import Property from './pages/Property';
import Triplist from './pages/Triplist';
import Addproperty from './pages/Addproperty';


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth register />} />
        <Route path='/explore' element={<Explore />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path='/property' element={<Property />} />
        <Route path='/trip' element={<Triplist />} />
        <Route path='/upload' element={<Addproperty/>}/>
      </Routes>
    </div>
  );
}

export default App;
