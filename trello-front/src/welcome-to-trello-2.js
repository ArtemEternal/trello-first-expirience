import { React, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from './trello-logo.png';
import wtt from './welcome-to-trello-second.module.css';
import inbox from './inbox.png';
import dogg from './dogg.png';
import st1 from './st1.png';
import nd2 from './nd2.png';
import rd3 from './rd3.png';
import stt from './qwert.png';
import ndd from './qwerty.png';
import rdd from './qwertyu.png';
import o_arrow from './orange_arr.png';
import { tab } from "@testing-library/user-event/dist/tab";


export function WelcomeToTrelloSecond() {
    const [stage, setStage] = useState(1);
    const divs = [{id: 1}, {id: 3}, {id: 4}, {id: 6} ];
    const [tables, setTable] = useState([{id: 1, header: "Сегодня", items: []},
        {id: 2, header: "На этой неделе", items: []},
        {id: 3, header: "Позже", items: []}])
    const [plan, setPlan] = useState("Начать использовать Trello");
    const [finalCard, setFinalCard] = useState([]);
    const [done, setDone] = useState(false);
    const [currentCard, setCurrentCard] = useState(null);
    const [currentTable, setCurrentTable] = useState(null);

    const navigate = useNavigate();

    //{id: 1, text: "Начать использовать Trello"}
    const text = [{
        first: <>
        <h2>Добро пожаловать в Trello! Познакомьтесь с <b>Inbox</b></h2>
        <h3>Это пространство для добавления задач, которые можно создавать вручную или импортировать из приложений в виде карточек.</h3>
        </>,
        second: <>
        <h2>Начнем с добавления первой задачи в виде <b>карточки</b> в <b>Inbox</b></h2>
        </>,
        trird: <>
        <h2>Вы также можете добавлять <b>карточки</b> в <b>Inbox</b> с помощью приложений</h2>
        <h3>Фиксируйте все данные, где бы вы ни были — из электронной почты, мобильного приложения Trello, Slack и Microsoft Teams.</h3>
        </>,
        fourth: <>
        <h2>Итак, вот ваша первая <b>доска</b>, на которой вы будете организовывать свои задачи</h2>
        <h3>Давайте начнем с трех <b>списков</b>: «Сегодня», «На этой неделе», «Позже».</h3>
        </>,
        fifth: <>
        <h2>Давайте начнем упорядочивать ваши задачи</h2>
        </>,
        sixth: <>
        <h2>Вы выполнили свою первую задачу, отметьте ее выполненной!</h2>
        </>
        }]

        const handleClick = () => {
            if(stage === 2){
                if(finalCard.length === 0){
                    return
                }
            }
            if(stage === 5){
                if(finalCard.length !== 0){
                    return
                }
            }
            if(stage === 6){
                if(done === false){
                    return
                }
            }
            setStage(stage +1);
            if(stage === 7){
                navigate('/workpage');
            }
        }

        const Activate = () => {
            if(plan !== ""){
            setFinalCard([...finalCard, {id: Date.now(), text: plan}])
            setPlan("");
            }
        }

        const Enter = (e) => {
            if(e.key === "Enter"){
                e.preventDefault();
                if(plan !== ""){
                setFinalCard([...finalCard, {id: Date.now(), text: plan}])
                setPlan("");
            }
            }
        }


        const handleDragStart = (e, card, tableId) => {
            setCurrentCard(card);
            setCurrentTable(tableId);
            e.dataTransfer.setData("text/plain", card.id);
        }
        
        const handleDragEnd = (e) => {
            setCurrentCard(null); 
            setCurrentTable(null);
        }

        const handleDrop = (e, targetTableId) => {
            e.preventDefault();
            if (!currentCard || !currentTable) return;
            if(currentTable === targetTableId){return}

            if(currentTable === "inbox"){
                const updatedFinalCard = finalCard.filter((card) => card.id !== currentCard.id);
                setFinalCard(updatedFinalCard);
                setTable((prev) => prev.map((table) => table.id === targetTableId ? { ...table, items: [...table.items, currentCard] } : table));
            }else{
                setTable((prev) => {
                    const updatedTables = prev.map((table) => {
                        if(table.id === targetTableId){
                            return{...table, items: [...table.items, currentCard]};
                        }
                        if(table.id === currentTable){
                            return{...table, items: table.items.filter((item) => item.id !== currentCard.id)}
                        }                        
                        return table;
                    });
                    return updatedTables;
                });
            }
                setCurrentCard(null);
                setCurrentTable(null);
            }
            
        

        const handleDragOver = (e) => {
            e.preventDefault();

            console.log("dragover")
        }

        const Back = () => {
            if(stage !== 1){
                setStage(stage -1);
            } else{
                navigate('/welcome-to-trello');
            }
        }

//<Link to="/welcome-to-trello" className={wtt.link}>Назад</Link>

    return<div className={wtt.main_box}>
    <div className={wtt.header}>
            <img src={logo}/>
            <h1>Trello</h1>
            <button className={wtt.link} onClick={Back}>Назад</button>
            <div className={wtt.span_box}>
                {divs.map((div) => <div key={div.id} className={`${div.id <= stage ? wtt.blue_div : ''}`}></div>)}
            </div>
            <div className={wtt.cross_container}>
                <button>
                    ✖
                </button>
            </div>
    </div>
    <div className={wtt.content}>
        <div className={wtt.text}>
            {text.map((text,index) => <>{text[Object.keys(text)[stage - 1]]}</>)}
            <button onClick={handleClick}>Продолжить</button>
        </div>
        <img className={`${stage < 3 ? wtt.dogg : wtt.none}`} src={dogg}/>
        <div className={`${stage === 3 ? wtt.img_box : wtt.none}`}>
            <img className={wtt.none2} src={st1}/>
            <img className={wtt.none2} src={nd2}/>
            <img className={wtt.none2} src={rd3}/>
        </div>
        <div className={`${stage === 3 ? wtt.img_box2 : wtt.none}`}>
            <img className={wtt.none22} src={stt}/>
            <img className={wtt.none22} src={ndd}/>
            <img className={wtt.none22} src={rdd}/>
        </div>
        {/*<div className={`${stage < 3 ? wtt.inbox : wtt.inbox_active}`}>*/}

        <div className={`${wtt.inbox} ${wtt[`move_inbox${stage}`]}`}>
            <div className={wtt.mini_header}>
                <div>
                    <img src={inbox}/>
                    <h1>Inbox {stage}</h1>
                </div>
            </div>
            {stage >= 2 && <><div className={wtt.card}>
                {stage < 3 ? <><textarea 
                className={wtt.card_input} 
                placeholder="Добавьте задачу, например:&#10;«Забронировать билеты»"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                onKeyDown={Enter}
                ></textarea>
                <button className={wtt.add_card} onClick={Activate}>Добавить карточку</button></> : <></>}
            </div>

            {finalCard.map((card, index) => <div 
            draggable={stage === 5 ? true : false}
            className={`${wtt.f_card} ${wtt[`shake${stage}`]}`}
    
            onDragStart={(e) => handleDragStart(e, card, "inbox")}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "inbox")}

            >{stage >= 6 && <div className={`${done ? wtt.done : wtt.undone}`}></div>}{card.text}</div>)}</>
            }
        </div>






            <img src={o_arrow} className={`${stage === 5 ? wtt.oarrow : wtt.none}`}/>
        <div className={`${stage > 3 ? wtt.violet : wtt.none}`}>
            <div className={wtt.v_header}>
                Моя доска Trello                
                <div className={wtt.divss}>
                    <div></div>
                    <div></div>
                </div>
                <div className={wtt.divsss}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>  
            </div> 
            <div className={wtt.v_content}>


                {tables.map((table, index) => <div className={wtt.table}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, table.id)}>
                    <div key={index} className={wtt.ddiivv}>{table.header}</div>
                    {table.items.map((item, index) => <div 
                    className={wtt.f_card}
                    draggable={true}
                    key={index}
                    onDragStart={(e) => handleDragStart(e, item, table.id)}
                    onDragEnd={handleDragEnd}
                    >{stage >= 6 && <div className={`${done ? wtt.done : wtt.undone}`} onClick={() => setDone(!done)}></div>}{item.text}</div>)}
                </div>)}


            </div>
        </div>
    </div>
</div>
}


/*{if(stage === index + 1 ){
                return <>{text[Object.keys(text)[0]]}</>
                }}
                */