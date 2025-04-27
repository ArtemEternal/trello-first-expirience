import react from "react";
import background from './left.png';
import logo from './trello-logo.png';
import { Link } from "react-router-dom";
import google from './google.png';
import slack from './slack.png';
import apple from './apple.png';
import microsoft from './microsofttt.png';
import './signup.css';
import logo2 from './atlassian.png';

export function SignUpPage() {
    return<>
    <div className="signup_page">
        <div className="signup_form">
                <div className="logo_signup">
                    <img src={logo} className="trello-logo"/>
                    <h1>Trello</h1>                
                </div>
                <div className="content_signup">
                    <h1>Зарегистируйтесь, чтобы продолжить</h1>
                    <input placeholder="Введите ваш адрес электронной почты"></input>
                    <h2>Регистрируясь, я соглашаюсь с <a target="_blank" href="https://trello.com">Условиями использования продуктов Cloud⎘</a>,
                    и принимаю <a>Политику конфиденциальности Atlassian⎘</a>.</h2>
                    <Link to="/welcome-to-trello" className="link"><button>Зарегистироваться</button></Link>
                    <h3>Или продолжить с помощью:</h3>
                    <ul>
                        <li><button><img src={google}/>Google</button></li>
                        <li><button><img src={microsoft}/>Microsoft</button></li>
                        <li><button><img src={apple}/>Apple</button></li>
                        <li><button><img src={slack}/>Slack</button></li>
                    </ul>
                    <h3><a>Уже есть аккаунт Atlassian? Войти</a></h3>
                    <span></span>
                    <div className="logo_signup2"><img src={logo2}/><h1>ATLASSIAN</h1></div>
                    <h4 className="last_h2">Один аккаунт для Trello, Jira, Confluence и <a>не только⎘</a>.</h4>
                    <h4 className="last_h2">Для защиты сайта используется система reCAPTCHA. Кроме того, действуют положения <a>
                    Политики конфиденциальности⎘</a> и <a>Условий использования Google⎘</a>.</h4>
                </div>
        </div>
        <img src={background} className="background"/>
    </div>
    </>
}