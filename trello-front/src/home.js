import Header from './header.js';
import Footer from './footer.js';
import app from './App.module.css';

function HomePage() {
    return <>
        <Header/>
            <div className={app.homepage_box}>

            </div>
        <Footer/>
    </>
}

export default HomePage;