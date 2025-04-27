import React from "react";
import wtt from "./welcome_to_trello.module.css";
import logo from './trello-logo-white.png';

export function WelcomeToTrello() {
    return<>
    <div className={wtt.main_box}>       
        <div className={wtt.cookie_warn}>
            <div className={wtt.warn_text}>Atlassian использует файлы cookie для повышения удобства пользования, проведения анализа и 
                исследований, а также для размещения рекламы. Примите все файлы cookie, чтобы подтвердить свое согласие на их использование
                на вашем устройстве. <a>Уведомление Atlassian об использовании файлов cookie и отслеживании</a></div>
            <div className={wtt.cookie_warn_buttons_box}>
                <button className={wtt.warn_buttons}>Настройки</button>
                <button className={wtt.warn_buttons}>Только необходимые</button>
                <button className={wtt.warn_buttons}>✔ Принять все</button>
            </div>
        </div>
        <div className={wtt.header}>
            <img src={logo}/>
            <h1>Trello</h1>
        </div>
        <div className={wtt.content}>
            <div className={wtt.choise}>.</div>
            <div className={wtt.trello_screenshot}>m</div>
        </div>
    </div>
    </>
}