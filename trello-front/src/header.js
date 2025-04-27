import { useEffect, useState } from "react";
import trello_logo from './trello-logo.png';
import arrow from './arrow.png';
import { Link, NavLink } from "react-router-dom";
import app from './App.module.css';

function Header() {

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 100) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
    }, [])


    return<>
        <div className={`${app.header} ${isScrolled ? app.shadow : ''}` }>
            <div className={app.trello_logo_block}>
                <div className={app.d1}>
                    <img src={trello_logo} className={app.trello_logo} alt="logo"/>
                </div>
                <div className={app.d2}>ATLASSIAN</div>
                <div className={app.d3}>Trello</div>
            </div>
            <div className={app.header_navigation}>
                <ul className={app.header_menu}>
                  <li className={app.header_menu_item}>
                    <a href="#">Features<img src={arrow} className={app.arrow} alt="logo"/></a>
                  </li>
                  <li className={app.header_menu_item}>
                    <a href="#">Solutions<img src={arrow} className={app.arrow} alt="logo"/></a>
                  </li>
                  <li className={app.header_menu_item}>
                    <a href="#">Plans<img src={arrow} className={app.arrow} alt="logo"/></a>
                  </li>
                  <li className={app.header_menu_item}>
                    <NavLink to="/pricingpage">Pricing</NavLink>
                  </li>
                  <li className={app.header_menu_item}>
                    <a href="#">Resources<img src={arrow} className={app.arrow} alt="logo"/></a>
                  </li>
                </ul>
            </div>
            <div className={app.header_button_box}>
                <button className={app.header_button_1}>Log in</button>
                <Link to="/signup">
                  <button className={app.header_button_2}>Get Trello for free</button>
                </Link>
            </div>
        </div>
    </>
}

export default Header;