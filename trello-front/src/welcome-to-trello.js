import React from "react";
import "./welcome_to_trello.css";

export function WelcomeToTrello() {
    return<>
    <div className="main-box">       
        
        <div className="cookie-warn">
            <div className="warn-text">Atlassian использует файлы cookie для повышения удобства пользования, проведения анализа и исследований,
            а также для размещения рекламы. Примите все файлы cookie, чтобы подтвердить свое согласие на их использование на вашем устройстве. 
            <a>Уведомление Atlassian об использовании файлов cookie и отслеживании</a></div>
            <div className="cookie-warn-buttons-box">
                <button className="warn-buttons">Настройки</button>
                <button className="warn-buttons">Только необходимые</button>
                <button className="warn-buttons">✔ Принять все</button>
            </div>
        </div>
        <div className="header">
            <h1>Trello</h1>
        </div>
    </div>
    </>
}