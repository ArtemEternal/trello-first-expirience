import {react, useState, useRef, useEffect} from "react";
import wp from './workpage.module.css';
import search from './search.png';
import inbox from './inbox.png';
import calendar from './calendar.png';
import table from './tablet.png';
import fuck from './fuck.png';
import pattern from './pattern.png';
import logo from './trello-logo-white.png';



export function WorkPage() {
    const [myCard, setMyCard] = useState([
        {id: 1, 
        title: "первая" ,
        background: "url('https://avatars.mds.yandex.net/i?id=c552bcf757884267499c5180ceda6b74_l-5233530-images-thumbs&n=13')",
        tables: [
                    {id: 101, title: "Сделать сегодня", cards:[
                        {id: 10, text: "Начать использовать Trello"}
                    ]}, 
                    {id: 202, title: "Сделать завтра", cards:[
                        {id: 111, text: "Удалить трелло"}, 
                        {id: 2222, text: "Удалить трелло"}
                    ]}, 
                    {id: "add", title: "Добавить еще одну колонку"}
                ]
        },
        {id: "set_c_id", title: "Создать доску" , text: "Осталось:", background: "#63697a"},
    ])
    const [checkedcard, setCheckedCard] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [currentCard, setCurrentCard] = useState();
    const [isVisibleAdding, setIsVisibleAdding] = useState({});
    const [cardValue, setCardValue] = useState("");
    const [position, setPosition] = useState({ x: 0 });
    const [SecondPosition, setSecondPosition] = useState({ x: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const FirstSplitterRef = useRef(null);
    const SecondSplitterRef = useRef(null);
    const containerRef = useRef(null);
    const mainRef = useRef(null);
    const [firstPaneWidth, setFirstPaneWidth] = useState(400);
    const [secondPaneWidth, setSecondPaneWidth] = useState(500);
    const [mainWidth, setMainWidth] = useState(3000);
    const [isDraggingSplitter, setIsDraggingSplitter] = useState(null); // 'first' | 'second' | null
    const [offsetX, setOffsetX] = useState(0);
    const [addT, setAddT] = useState(false);
    const [currentName, setCurrentName] = useState('');
    const [currentCardD, setCurrentCardD] = useState(null);
    const [currentTableD, setCurrentTableD] = useState(null);

    const numberOfBoards = myCard.length - 1;
    const maxNumberOfBoards = 8;
    const ostalos = maxNumberOfBoards - numberOfBoards;

    const [isVisCreatingCard, setIsVisCreatingCard] = useState(false);


    const [minWidthInbox, setMinWidthInbox] = useState(0);
    const [maxWidthInbox, setMaxWidthInbox] = useState(0);

    const [currentCardName, setCurrentCardName] = useState("");

    const [currentBackground, setCurrentBackground] = useState("linear-gradient(135deg, #FFD700 0%, #FF4500 50%, #8A2BE2 100%)");
    const gradiets = [
        "linear-gradient(135deg, #FFD700 0%, #FF4500 50%, #8A2BE2 100%)",
        "linear-gradient(135deg, #4B0082 0%, #00CED1 50%, #8A2BE2 100%)",
        "linear-gradient(45deg, #00FA9A 0%, #20B2AA 50%, #008B8B 100%)",
        "linear-gradient(180deg, #191970 0%, #00FF7F 50%, #4682B4 100%)",
        "linear-gradient(120deg, #FF1493 0%, #00B7EB 50%, #9932CC 100%)",
        "linear-gradient(30deg, #F4A460 0%, #FF7F50 50%, #CD853F 100%)"
    ]

    const pictures = [
        "url(https://avatars.mds.yandex.net/i?id=b5c9ba6179133899aa78d2a00319eb4505144fd8-10697312-images-thumbs&n=13)",
        "url(https://avatars.mds.yandex.net/i?id=0eef2174cc59d71fc6466a1a8aaec8924cc25b8d-5243680-images-thumbs&n=13)",
        "url(https://avatars.mds.yandex.net/i?id=0f051adfc7aa24b904b0d862877d882e4c81c8be-10555242-images-thumbs&n=13)",
        "url(https://avatars.mds.yandex.net/i?id=f66d929aeeaea167c725b76eabbd2a9ccc682847-12627914-images-thumbs&n=13)"
    ]



    const [Inbox, setInbox] = useState(false);
    const [Planner, setPlanner] = useState(false);
    const [Main, setMain] = useState(true);

    const [generalState, setGeneralState] = useState(0);

    useEffect(() => {
        if(Main || Planner || Inbox) setGeneralState(generalState + 1);
        if(!Main || !Planner || !Inbox) setGeneralState(generalState - 1);
    }, [Planner, Main, Inbox])

useEffect(() => {

    const handleMouseMove = (e) => {
        if (!isDraggingSplitter || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const paddingX = 30; 
        const effectiveWidth = containerWidth - paddingX;
        if(Planner && Main){
                setMinWidthInbox(containerWidth / 5)
            }else if(!Main && ! Planner){
                setMinWidthInbox(containerWidth)
        }
        const minWidthPlanner = containerWidth / 4; 
        const minWidthMain = containerWidth / 4;
        //const maxWidthInbox = containerWidth / 3.5;
        const maxWidthPlanner = containerWidth / 2.5;
        if(Planner && Main){
                setMaxWidthInbox(containerWidth / 3.5)
            }else if(!Main && ! Planner){
                setMaxWidthInbox(containerWidth)
        }

        const splitterCount = (Inbox ? 1 : 0) + (Planner ? 1 : 0);
        const splitterWidth = splitterCount * 10;

        if (isDraggingSplitter === "first" && Inbox) {
            const mouseX = Math.max(containerRect.left + 15, Math.min(e.clientX, containerRect.right - 15));
            const newWidthInbox = Math.max(minWidthInbox, Math.min(mouseX - containerRect.left - 15 - offsetX, maxWidthInbox));
            setFirstPaneWidth(newWidthInbox);
            const newMainWidth = effectiveWidth - newWidthInbox - (Planner ? secondPaneWidth : 0) - splitterWidth;
            setMainWidth(Math.max(minWidthMain, newMainWidth));
        } else if (isDraggingSplitter === "second" && Planner) {
            const mouseX = Math.max(containerRect.left + 15, Math.min(e.clientX, containerRect.right - 15));
            const newWidthPlanner = Math.max(minWidthPlanner, Math.min(mouseX - (Inbox ? firstPaneWidth : 0) - containerRect.left - 15, maxWidthPlanner));
            setSecondPaneWidth(newWidthPlanner);
            const newMainWidth = effectiveWidth - (Inbox ? firstPaneWidth : 0) - newWidthPlanner - splitterWidth;
            setMainWidth(Math.max(minWidthMain, newMainWidth));
        }
    };

    const handleMouseUp = () => {
        setIsDraggingSplitter(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };
}, [isDraggingSplitter, offsetX, firstPaneWidth, secondPaneWidth, Inbox, Planner]);




useEffect(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const splitterCount = (Inbox ? 1 : 0) + (Planner ? 1 : 0);
    const splitterWidth = splitterCount * 10;

    if(!Planner && !Main){
        setFirstPaneWidth(containerWidth); 
    }
  
    if (!Inbox && !Planner) {
        setMainWidth(containerWidth);
    } else {
        const newMainWidth = containerWidth - (Inbox ? Math.min(firstPaneWidth, containerWidth / 3.5) : 0) - (Planner ? Math.min(secondPaneWidth, containerWidth / 2.5) : 0) - splitterWidth;
        setMainWidth(Math.max(containerWidth / 4, newMainWidth));
    }
}, [Inbox, Planner, Main, firstPaneWidth, secondPaneWidth]);



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


    useEffect(() => {
    if (cardChRefs.current[0] && cardMyRefs.current.length > 0) {
        const rect = cardChRefs.current[0].getBoundingClientRect();
        cardMyRefs.current.forEach((card) => {
            if (card) {
                card.style.width = `${rect.width}px`;
                card.style.height = `${rect.height}px`;
            }
        });
    } else {
        cardMyRefs.current.forEach((card) => {
            if (card) {
                card.style.width = `200px`;
                card.style.height = `100px`;
            }
        });
    }
}, [checkedcard, myCard]);


useEffect(() => {
    if (!myCard.some(card => card.id === "set_c_id")) {
        const setCCard = {
            id: "set_c_id",
            title: "Создать доску",
            text: "Осталось:",
            background: "#63697a",
        };
        setMyCard(prev => [...prev, setCCard]);
    }
}, [myCard]);


const setCard = (tableId) => {
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
  setIsVisibleAdding({});
}


const addNewList = () => {
    if (!currentName.trim()) return;

    const newTable = {
        id: Date.now(),
        title: currentName,
        cards: [],
    };

    const updatedCards = myCard.map(card => {
        if (card.id !== currentCard.id) return card;
        return {
            ...card,
            tables: [...card.tables.filter(table => table.id !== "add"), newTable, { id: "add", title: "Добавить еще одну колонку" }],
        };
    });

    setMyCard(updatedCards);
    setCurrentCard(updatedCards.find(card => card.id === currentCard.id));
    setCurrentName("");
    setAddT(false);
};



const handleEnter = (e, tableId) => {
    if(e.key === "Enter"){
        setCard(tableId);
    }
}

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

    const MainF = () => {
        const totalOpen = [Inbox, Planner, Main].filter(Boolean).length;

        if (Main && totalOpen === 1) return;

        setMain(!Main);
    }

    const InboxF = () => {
        const totalOpen = [Inbox, Planner, Main].filter(Boolean).length;

        if (Inbox && totalOpen === 1) return;

        setInbox(!Inbox);
    }

    const PlannerF = () => {
        const totalOpen = [Inbox, Planner, Main].filter(Boolean).length;

        if (Planner && totalOpen === 1) return;

        setPlanner(!Planner);
    }


    const itemDragEnd = () => {
        setCurrentCardD(null); 
        setCurrentTableD(null);
    }

    const itemDragStart = (e, card, tableId) => {
        setCurrentCardD(card);
        setCurrentTableD(tableId);
        e.dataTransfer.setData("text/plain", card.id);
    }

    const itemDragOver = (e) => {
        e.preventDefault();
    }

   const itemDrop = (e, targetTableId) => {
    e.preventDefault();
    if (!currentCardD || !currentTableD || currentTableD === targetTableId) return;

    const updatedCards = myCard.map(card => {
        if (card.id !== currentCard.id) return card;
        const updatedTables = card.tables.map(table => {
            if (table.id === targetTableId) {
                return { ...table, cards: [...table.cards, currentCardD] };
            }
            if (table.id === currentTableD) {
                return { ...table, cards: table.cards.filter(card => card.id !== currentCardD.id) };
            }
            return table;
        });
        return { ...card, tables: updatedTables };
    });

    setMyCard(updatedCards);
    setCurrentCard(updatedCards.find(card => card.id === currentCard.id));
    setCurrentCardD(null);
    setCurrentTableD(null);
};

const getRandomCard = () => {
        const maxLength  = myCard.length - 1;
        const randomIndex = Math.floor(Math.random() * maxLength);
        return myCard[randomIndex];
    }


    const createNewCard = () => {
        if (!currentCardName.trim()) return;

        const newCard = {
            id: Date.now(),
            title: currentCardName, 
            text: "Новая доска",
            background: currentBackground,
            tables: [{id: "add", title: "Добавить еще одну колонку"}], 
        }

        setMyCard(prev => {
        const setCIndex = prev.findIndex(card => card.id === "set_c_id");
        return [...prev.slice(0, setCIndex), newCard, ...prev.slice(setCIndex)];
    });
        setCurrentBackground("linear-gradient(135deg, #FFD700 0%, #FF4500 50%, #8A2BE2 100%)");
        setCurrentCardName("");
        setIsVisCreatingCard(false);
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
        {isActive && currentCard ? <div className={wp.card_view} ref={containerRef}>
                                    {Inbox && <><div className={wp.inboxblock} style={{ width: `${firstPaneWidth}px` }}>
                                        inbox
                                    </div>
                                    <div className={wp.splitter}
                                        onMouseDown={(e) => {
                                            setIsDraggingSplitter("first");
                                            setOffsetX(e.clientX - firstPaneWidth);}}
                                    ref={FirstSplitterRef}
                                        >
                                            <div></div>
                                    </div></>}
                                    {Planner && <><div className={wp.planerblock} style={{ width: `${secondPaneWidth}px`,
                                    marginRight: !Inbox ? `${4}px` : null }}>
                                        planer
                                    </div>
                                    <div className={wp.splitter}
                                        onMouseDown={(e) => {
                                            setIsDraggingSplitter("second");
                                            setOffsetX(e.clientX - (firstPaneWidth + secondPaneWidth));}}
                                       ref={SecondSplitterRef}
                                        >
                                            <div></div>
                                    </div></>}
                                    {Main && <div className={wp.mainblock}
                                    ref={mainRef}
                                    style={{background: currentCard.background,
                                    backgroundSize: currentCard.background.includes("url(") && "cover", 
                                    backgroundPosition: currentCard.background.includes("url(") && "center", 
                                    backgroundRepeat: currentCard.background.includes("url(") && "no-repeat",
                                    width: `${mainWidth}px`, 
                                    background: currentCard.background,
                                    backgroundSize: currentCard.background.includes("url(") && "cover",
                                    backgroundPosition: currentCard.background.includes("url(") && "center",
                                    backgroundRepeat: currentCard.background.includes("url(") && "no-repeat",
                                    marginLeft: !Inbox ? `${4}px` : null
                                    }}>
                                        {currentCard.tables.map((table, index) => table.id === "add" ? <>{addT ? <div
                                        className={wp.addingTBox}
                                        >
                                            <textarea 
                                            placeholder="Введите имя колонки..."
                                            onChange={(e) => setCurrentName(e.target.value)}
                                            ></textarea>
                                            <div className={wp.two_but2}>
                                                <button onClick={addNewList}>Добавить список</button>
                                                <button onClick={() => setAddT(!addT)}>✖</button>
                                            </div>
                                        </div> : <button
                                            className={wp.add_button}
                                            onClick={() => setAddT(!addT)}
                                            >
                                            ➕ {table.title}
                                        </button>}</> : <div 
                                            className={wp.current_tables}
                                            onDrop={(e) => itemDrop(e, table.id)}
                                            onDragOver={(e) => itemDragOver(e, table.id)}>
                                            <div className={wp.c_header}>{table.title}</div>
                                            {table.cards.map((card, index) => <div 
                                            className={wp.current_cards}
                                            onDragStart={(e) => itemDragStart(e, card, table.id)}
                                            onDragEnd={itemDragEnd}
                                            onDragOver={(e) => itemDragOver(e)}
                                            draggable={true}
                                            >{card.text}</div>)}
                                            
                                            {isVisibleAdding[table.id] ? <div className={wp.add_card}>
                                                <textarea placeholder="Введите название или вставьте&#10;ссылку" 
                                                onChange={(e) => setCardValue(e.target.value)}
                                                onKeyDown={(e) => handleEnter(e, table.id)}
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
                                    </div>}
                                    <div className={wp.panel}>
                                        <button className={Inbox ? `${wp.inbox_butt}` : ''} onClick={InboxF}><img src={inbox}/></button>
                                        <button className={Planner ? `${wp.planner_butt}` : ''} onClick={PlannerF}><img src={calendar}/></button>
                                        <button className={Main ? `${wp.main_butt}` : ''} onClick={MainF}><img src={table}/></button>
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
                                {myCard.map((card, index) =>  card.id === "set_c_id" ? <><div 
                                className={`${ostalos !== 0 ? wp.set_c : wp.inactive}`}
                                ref={(el) => setCardMyRef(el, index)}
                                onClick={() => setIsVisCreatingCard(!isVisCreatingCard)}
                                >
                                    <div>
                                        <h5>{card.title}</h5>
                                        <h6>{card.text} {ostalos}</h6>
                                    </div>
                                </div>{isVisCreatingCard && <div className={wp.creating_card_block}>
                                    <div className={wp.header3}>
                                        Создать доску
                                        <button onClick={() => setIsVisCreatingCard(!isVisCreatingCard)}>✖</button>
                                    </div>
                                    <div 
                                    className={wp.imgimg}
                                    style={{background: currentBackground,
                                    backgroundSize: currentBackground.includes("url(") && "cover", 
                                    backgroundPosition: currentBackground.includes("url(") && "center", 
                                    backgroundRepeat: currentBackground.includes("url(") && "no-repeat",}}
                                    >
                                        <header><img src={logo}/></header>
                                        <div className={wp.divvv}>
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                    </div>
                                    <div className={wp.фон}>
                                        {pictures.map((pic, index) => (
                                    <div
                                        key={index}
                                        className={wp.picture}
                                        style={{
                                          background: pic,
                                          backgroundSize: pic.includes("url(") ? "cover" : "auto",
                                          backgroundPosition: pic.includes("url(") ? "center" : "initial",
                                          backgroundRepeat: pic.includes("url(") ? "no-repeat" : "initial",
                                        }}
                                        onClick={() => setCurrentBackground(pic)} 
                                      ></div>
                                    ))}
                                    {gradiets.map((gradient, index) => (
                                      <div
                                        key={`gradient-${index}`}
                                        className={wp.gradient}
                                        style={{ background: gradient }}
                                        onClick={() => setCurrentBackground(gradient)} 
                                      ></div>
                                    ))}
                                    <div className={wp.inputss}>
                                            <h1>Заголовок доски</h1>
                                            <input onChange={(e) => setCurrentCardName(e.target.value)}></input>
                                    </div>
                                    </div>
                                    <button 
                                    className={wp.setting_but}
                                    onClick={createNewCard}
                                    >Создать</button>
                                </div>}</> : <div key={index} 
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