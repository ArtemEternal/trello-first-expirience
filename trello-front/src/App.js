import BMW from './BMW.svg';
import app from'./App.module.css';
import { useEffect, useState, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import Pricingpage from './pricingpage.js';
import BuisnessCard from './buisnesscard.js';
import HomePage from './home.js';
import { SignUpPage } from './signup.js';
import { WelcomeToTrello } from './welcome-to-trello.js';
import { WelcomeToTrelloSecond } from './welcome-to-trello-2.js';
import { WorkPage } from './personal-account.js';

function SplashScreen({ onFinish }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3500); 
    return () => clearTimeout(timer);
  }, [onFinish]);


  return (
    <div className={app.app}>
      <header className={app.app_header}>
        <img src={BMW} className={app.app_logo} alt="logo"/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className={app.app_link}
          href="http://localhost:3000/buisnesscard"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Artem Eternal
        </a>
      </header>
    </div>
  );
}

function App() {


  useEffect(() => {
    document.title = "Trello.ako.rensky";
  }, []);

  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const handleSplashFinish = () => {
    setIsSplashVisible(false); 
  };

  return (
    <div className={app.app}>
      {isSplashVisible ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <div className={app.main_content}>
          {/*<Header/>*/}
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/pricingpage' element={<Pricingpage/>}/>
            <Route path='/buisnesscard' element={<BuisnessCard/>}/>
            <Route path='/signup' element={<SignUpPage/>}/>
            <Route path='/welcome-to-trello' element={<WelcomeToTrello/>}/>
            <Route path='/welcome-to-trello-2' element={<WelcomeToTrelloSecond/>}/>
            <Route path='/workpage' element={<WorkPage/>}/>
          </Routes>
          {/*<Footer/>*/}
        </div>
      )}
    </div>
  );
}

export default App;
