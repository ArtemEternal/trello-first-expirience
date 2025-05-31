import React, { use, useState } from "react";
import wtt from "./welcome_to_trello.module.css";
import logo from './trello-logo-white.png';
import trello_screenshot from './trello-screenshot.png';
import trello_screenshot2 from './trello_screenshot2.png';
import { Form, Link } from "react-router-dom";
import i1 from './folder-wp.png';
import i2 from './bm-wp.png';
import i3 from './friends-wp.png';
import i4 from './stonks-wp.png';
import check from './check.png';
import blogo from './trello-logo.png';
import jira from './jira.png';
import jira_screen from './jira-screen1.png';
import jira_screen2 from './jira-screen2.png';


export function WelcomeToTrello() {

const [isVisible, setIsVisible] = useState(true);
const [isClicked, setIsClicked] = useState(false);
const [type, setType] = useState("first");
const [myChoise, setMyChoise] = useState(null);

console.log("werty", type, isClicked)

const AcceptAllCookie = () => {
        setIsVisible(false);
}
    
const AcceptNeededCookie = () => {
        setIsVisible(false);
}

const handleClick1 = () => {
    setIsClicked(true);
    setType("first");
}

const handleClick2 = () => {
    setIsClicked(true);
    setType("second");
}

return<>
    <div className={wtt.main_box}>   
        {isVisible && <div className={wtt.cookie_warn}>
            <div className={wtt.warn_text}>Atlassian использует файлы cookie для повышения удобства пользования, проведения анализа и 
                исследований, а также для размещения рекламы. Примите все файлы cookie, чтобы подтвердить свое согласие на их использование
                на вашем устройстве. <a>Уведомление Atlassian об использовании файлов cookie и отслеживании</a></div>
            <div className={wtt.cookie_warn_buttons_box}>
                <button className={wtt.warn_buttons}>Настройки</button>
                <button className={wtt.warn_buttons} onClick={AcceptNeededCookie}>Только необходимые</button>
                <button className={wtt.warn_buttons} onClick={AcceptAllCookie}>✔ Принять все</button>
            </div>
        </div>}

        <div className={wtt.header}>
            <img src={logo}/>
            <h1>Trello</h1>
        </div>
        <div className={wtt.content}>
            <div className={wtt.choise}>
                <h1>Что вы хотите сделать сегодня?</h1>
                <ul>
<li><button id={1} onClick={() =>{handleClick1(); setMyChoise(1)}} className={`${wtt.ch_but} ${myChoise === 1 ? wtt.active : ""}`}>
    {myChoise === 1 ? <img src={check}></img> : <img src={i1}/>}Организовать творческий и рабочий процесс</button></li>
<li><button id={2} onClick={() =>{handleClick1(); setMyChoise(2)}} className={`${wtt.ch_but} ${myChoise === 2 ? wtt.active : ""}`}>
    {myChoise === 2 ? <img src={check}></img> : <img src={i2}/>}Отслеживать личные задачи и дела</button></li>
<li><button id={3} onClick={() =>{handleClick2(); setMyChoise(3)}} className={`${wtt.ch_but} ${myChoise === 3 ? wtt.active : ""}`}>
    {myChoise === 3 ? <img src={check}></img> : <img src={i3}/>}Управлять командными проектами</button></li>
<li><button id={4} onClick={() =>{handleClick2(); setMyChoise(4)}} className={`${wtt.ch_but} ${myChoise === 4 ? wtt.active : ""}`}>
    {myChoise === 4 ? <img src={check}></img> : <img src={i4}/>}Создавать и автоматизировать командные и рабочие процессы</button></li>
                </ul>
                <div className={wtt.button_box}>
                    <button className={`${isClicked ? wtt.blueback : ''}`}>{type === "first" ? "Продолжить" : "Попробовать Jira"}</button>
                    <button><Link className={wtt.link} to="/welcome-to-trello-2">Пропустить</Link></button>
                </div>
            </div>
            <div className={wtt.trello_screenshot}>

                <div className={wtt.rec}>{myChoise <= 2 ? "рекомендуется" : "попробовать бесплатно"}</div>

                <div className={wtt.trellogo}>
                    {myChoise <= 2 ? <img src={blogo}/> : <img src={jira}/>}
                    <h1>{myChoise <= 2 ? "Trello" : "Jira"}</h1>
                </div>
                {myChoise <= 1 && <img src={trello_screenshot}></img> || myChoise === 2 && <img src={trello_screenshot2}/> || myChoise === 3 && 
                <img src={jira_screen}/> || myChoise === 4 && <img src={jira_screen2}/>}
            </div>
        </div>
    </div>
    </>
}