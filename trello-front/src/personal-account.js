import {react, useState, useRef, useEffect} from "react";
import wp from './workpage.module.css';
import search from './search.png';
import inbox from './inbox.png';
import calendar from './calendar.png';
import table from './tablet.png';
import fuck from './fuck.png';
import pattern from './pattern.png';



export function WorkPage() {
    const [myCard, setMyCard] = useState([
        {id: 1, 
        title: "первая" ,
        text: "Начать использовать Trello",
        background: "url('https://avatars.mds.yandex.net/i?id=c552bcf757884267499c5180ceda6b74_l-5233530-images-thumbs&n=13')",
        tables: [
                    {id: 1, title: "Сделать сегодня", cards:[
                        {id: 1, text: "Начать использовать Trello"}
                    ]}, 
                    {id: 2, title: "Сделать завтра", cards:[
                        {id: 1, text: "Удалить трелло"}, 
                        {id: 2, text: "Удалить трелло"}
                    ]}
                ]
        },

        {id: 2, title: "second" , text: "qwertyuio", background: "green"}, 
        {id: 3, title: "third" , text: "сделать треллло", background: "linear-gradient(135deg, #FFD700 0%, #FF4500 50%, #8A2BE2 100%)"},
        {id: 4, title: "четвертая" , text: "Начать использовать Trello", background: "#fff"},
        {id: 5, title: "пяth" , text: "Начать использовать Trello", background: "rgb(152, 151, 151)"},
        {id: "set_c_id", title: "Создать доску" , text: "Осталось:", background: "#63697a"},
    ])
    const [checkedcard, setCheckedCard] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [currentCard, setCurrentCard] = useState();
    const [isVisibleAdding, setIsVisibleAdding] = useState({});
    const [cardValue, setCardValue] = useState("");
    //--------------------------------------SPLITTER---TEST------------------------------------------------//
    
    //--------------------------------------SPLITTER---TEST------------------------------------------------//

//---------------------------------------------------------------------------------------------------------------//

    const cardChRefs = useRef([]);
    const cardMyRefs = useRef([]);

    const setCardChRef = (el, index) => {
        cardChRefs.current[index] = el;
    };

    const setCardMyRef = (el, index) => {
        cardMyRefs.current[index] = el;
    };

    useEffect(() => {
        if (cardChRefs.current[0] && cardMyRefs.current.length > 0) {
            const rect = cardChRefs.current[0].getBoundingClientRect();
            cardMyRefs.current.forEach((card) => {
                if (card) {
                    card.style.width = `${rect.width}px`;
                    card.style.height = `${rect.height}px`;
                }
            });
        }else{
            cardMyRefs.current.forEach((card) => {
                if (card) {
                    card.style.width = `${23}%`;
                    card.style.height = `${34}%`;   
                }
            });
        }
    }, [checkedcard]);

    const addCard = (tableId) => {
        setIsVisibleAdding(prev => {
    if (prev[tableId]) {
      return {};
    }
    return { [tableId]: true };
  });
    }





const setCard = (e, tableId) => {
    if(e.key === "Enter"){
        if (!cardValue.trim()){setIsVisibleAdding(false); return}; 
            const updatedCards = myCard.map((card) => {
            if (card.id !== currentCard.id) return card;

            const updatedTables = card.tables.map((table) => {
      if (table.id !== tableId) return table;

      const newCard = {
        id: Date.now(), 
        text: cardValue, 
      };

      return {
        ...table,
        cards: [...table.cards, newCard]
      };
    });

    return {
      ...card,
      tables: updatedTables
    };
  });
  setMyCard(updatedCards); 
  const updatedCurrentCard = updatedCards.find((card) => card.id === currentCard.id);
  setCurrentCard(updatedCurrentCard);
  setCardValue(""); 
  setIsVisibleAdding({}); }else{return}
}


//---------------------------------------------------------------------------------------------------------------//


    const handleCheck = () => {
        const card = getRandomCard();

        setCheckedCard(prev => {
        const newArr = [card, ...prev]; 
        if (newArr.length > 4) {
            return newArr.slice(0, 4); 
        }
        return newArr;
    });
    }

    const handleClick = (card) => {
        setCurrentCard(card);
        setIsActive(!isActive);
        console.log('currentcard', currentCard);
        console.log('card', card);
    }

//---------------------------------------------------------------------------------------------------------------//

    const getRandomCard = () => {
        const maxLength  = myCard.length - 1;
        const randomIndex = Math.floor(Math.random() * maxLength);
        return myCard[randomIndex];
    }

//---------------------------------------------------------------------------------------------------------------//

    return<div className={wp.background}>
        <div className={wp.header}>
            <div className={wp.logo}>
                <div className={wp.anim_cube}>
                    <div className={wp.white}></div>
                    <div className={wp.white}></div>
                </div>
                <div className={wp.text_logo}>Trello</div>
            </div>
            <div className={wp.search}>
                <img src={search}/>
                <input placeholder="Поиск"></input>
            </div>
        </div>
        {/*card-view - огромный общий блок */}
        {isActive && currentCard ? <div className={wp.card_view} style={{background: currentCard.background,
                                backgroundSize: currentCard.background.includes("url(") && "cover", 
                                backgroundPosition: currentCard.background.includes("url(") && "center", 
                                backgroundRepeat: currentCard.background.includes("url(") && "no-repeat", }}>
                                    <div className={wp.mainblock}>
                                        {currentCard.tables.map((table, index) => <div className={wp.current_tables}>
                                            <div className={wp.c_header}>{table.title}</div>
                                            {table.cards.map((card, index) => <div className={wp.current_cards}>{card.text}</div>)}
                                            
                                            {isVisibleAdding[table.id] ? <div className={wp.add_card}>
                                                <textarea placeholder="Введите название или вставьте&#10;ссылку" 
                                                onChange={(e) => setCardValue(e.target.value)}
                                                onKeyDown={(e) => setCard(e, table.id)}
                                                ></textarea>
                                                <div className={wp.two_but}>
                                                    <button onClick={() => setCard(table.id)}>Добавить карточку</button>
                                                    <button onClick={() => setIsVisibleAdding(false)}>✖</button>
                                                </div>
                                            </div> : <div className={wp.c_footer}>
                                                <button onClick={() => addCard(table.id)}>➕ Добавить карточку</button>
                                                <button><img src={pattern}/></button>
                                            </div>}

                                        </div>)}
                                    </div>
                                    <div className={wp.panel}>
                                        <button><img src={inbox}/></button>
                                        <button><img src={calendar}/></button>
                                        <button><img src={table}/></button>
                                        <button><img src={fuck}/></button>
                                    </div>
                    </div> : <div className={wp.box}>
            <div className={wp.navbar}>
                <div className={wp.nav_box}>
                    <button>Доски</button>
                    <button>Шаблоны</button>
                    <button>Главная страница</button>
                    <div className={wp.line}></div>
                </div>
            </div>
            <div className={wp.workspace}>
                <div className={wp.checked_line}>
                    <h1>Недавно просмотренные 
                        
{//---------------------------------------------------------------------------------------------------------------//  

                        <button onClick={handleCheck}>qwertyu</button>
                        
//---------------------------------------------------------------------------------------------------------------//
}



                        </h1>
                    <div className={wp.road}>
                        {checkedcard.map((card, index) => <div 
                        key={index} 
                        className={wp.card_ch} 
                        ref={(el) => setCardChRef(el, index)}
                        onClick={() => handleClick(card)}
                        style={{ 
                            background: card.background,
                            backgroundSize: card.background.includes("url(") && "cover", 
                            backgroundPosition: card.background.includes("url(") && "center", 
                            backgroundRepeat: card.background.includes("url(") && "no-repeat", 
                            }}>
                            <div>{card.title}</div>
                        </div>)}
                    </div>
                </div>
                <div className={wp.w_spaces}>
                            <hi className={wp.w_sh1}>Ваши рабочие пространства</hi>
                            <div className={wp.info_line}>
                                <div className={wp.p}>P</div>
                                <h1>Рабочее пространство trello</h1>
                                <div className={wp.but_box}>
                                    <button></button>
                                    <button></button>
                                    <button></button>
                                    <button></button>
                                </div>
                            </div>
                            <div className={wp.super_map}>
                                {myCard.map((card, index) =>  card.id === "set_c_id" ? <div 
                                className={wp.set_c}
                                ref={(el) => setCardMyRef(el, index)}
                                >
                                    <div>
                                        <h5>{card.title}</h5>
                                        <h6>{card.text}</h6>
                                    </div>
                                </div> : <div key={index} 
                                className={wp.card_my} 
                                ref={(el) => setCardMyRef(el, index)} 
                                onClick={() => handleClick(card)}
                                style={{ 
                                background: card.background,
                                backgroundSize: card.background.includes("url(") && "cover", 
                                backgroundPosition: card.background.includes("url(") && "center", 
                                backgroundRepeat: card.background.includes("url(") && "no-repeat", 
                                }}>
                                <div>{card.title}</div>
                                </div>)}
                            </div>
                </div>
            </div>
        </div>}
    </div>
}