import './App.css';
import HeroPage from './page/HeroPage/HeroPage';
import { Route, Routes } from 'react-router-dom'
import MainPage from './page/MainPage/MainPage';
import HeroPageB from './page/HeroPageB/HeroPageB';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HeroPageB
          instagramByType={{
            route: {
              jomunguk: [
               'https://www.instagram.com/p/DNx0E4b5vlK/'
              ],
              'historic-churches': [
                'https://www.instagram.com/p/DNs2FWP5rXm/'
              ]
            }
          }}
        />}></Route>
        <Route path="/mainpage" element={<MainPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
