import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import 'bootstrap/dist/css/bootstrap.min.css';
import PokemonDetailPage from './Pages/PokemonDetailPage';

function App() {


  return <>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='/pokemon/:name' element={<PokemonDetailPage></PokemonDetailPage>} ></Route>
      </Routes>
    </BrowserRouter>

  </>
}

export default App
