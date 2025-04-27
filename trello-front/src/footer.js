import react from "react";
import trello_logo from './trello.png';
import app from './App.module.css';

function Footer() {
    return<>
    <div className={app.footer}>
    <div className={app.trello_logo_block_footer}>
                <div className={app.d1_footer}>
                    <img src={trello_logo} className={app.alttrello_logo_footer} alt="logo"/>
                </div>
                <div className={app.d2_footer}>ATLASSIAN</div>
                <div className={app.d3_footer}>Trello</div>
            </div>
    </div>
    </>
}

export default Footer;