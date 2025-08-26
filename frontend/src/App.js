import './App.css';
import HeroPage from './page/HeroPage/HeroPage';
import { Route, Routes } from 'react-router-dom'
import MainPage from './page/MainPage/MainPage';
import HeroPageB from './page/HeroPageB/HeroPageB';


const experienceData = [
  {
    id: 'apple-picking',              // ← 이 id로 릴스를 매칭합니다
    title: '막걸리 만들기 체험c',
    image: process.env.PUBLIC_URL+'/assets/images/uiseong_mak.jpeg',   // 카드 썸네일 (선택)
    description: '막걸리만들기',
    detailImage: '/assets/images/uiseong_mak.jpeg', // 릴스 없으면 대체 이미지 (선택)
    detailList: [
      { title: '예약', subtitle: '사전 예약 추천' },
      { title: '소요시간', subtitle: '약 60분' },
    ],
    tags: ['가족', '계절']
  }
];

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
                'https://www.instagram.com/p/DN1IrnM5sHG/'
              ]
            },
            exp: {
              'apple-picking': [
                'https://www.instagram.com/p/DN0N8pVZlAY/'   // 공개 릴스 URL
              ],
              // 다른 체험도 같은 방식으로 추가
            },
          }}
          experiences={experienceData}
        />}></Route>
        <Route path="/mainpage" element={<MainPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
