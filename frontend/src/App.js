import './App.css';
import HeroPage from './page/HeroPage/HeroPage';
import {Route,Routes} from 'react-router-dom'
import MainPage from './page/MainPage/MainPage';
import HeroPageB from './page/HeroPageB/HeroPageB';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HeroPageB />}></Route>
        <Route path="/mainpage" element={<MainPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
