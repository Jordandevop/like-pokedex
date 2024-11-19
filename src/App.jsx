import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './Pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PokemonDetailPage from './Pages/PokemonDetailPage';
import NavBar from './Components/Navbar';

function App() {


  return <>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='/pokemon/:name' element={<PokemonDetailPage></PokemonDetailPage>} ></Route>
      </Routes>
    </BrowserRouter>

  </>
}

export default App
