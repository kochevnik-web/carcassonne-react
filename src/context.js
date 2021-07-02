import React, { useState, useEffect } from "react";
import cardData from './components/Map/cardData';

const Context = React.createContext();

export default function ContextProvider({ children }) {

    const [currentCards, setCurrentCards] = useState(null);
    const [myplSelect, setMyplSelect] = useState(false);

    const addMoreFields = (arr, currentCards = null) => {

        arr = arr.map(row => {
            return row.map(el => {
                if (typeof arr[el.y - 1] !== "undefined" && el.type !== 'card') {
                    if (typeof arr[el.y - 1][el.x] !== "undefined") {
                        if (arr[el.y - 1][el.x].type === 'card') {
                            if(currentCards?.scheme[0] === arr[el.y - 1][el.x].scheme[2]) {
                                el.type = 'more';
                            }else {
                                el.type = 'empty';
                            }
                        }
                    }
                }

                if (typeof arr[el.y + 1] !== "undefined" && el.type !== 'card') {
                    if (typeof arr[el.y + 1][el.x] !== "undefined") {
                        if (arr[el.y + 1][el.x].type === 'card') {
                            if(currentCards?.scheme[2] === arr[el.y + 1][el.x].scheme[0]) {
                                el.type = 'more';
                            }else {
                                el.type = 'empty';
                            }
                        }
                    }
                }

                if (typeof arr[el.y][el.x + 1] !== "undefined" && el.type !== 'card') {
                    if (arr[el.y][el.x + 1].type === 'card') {
                        if(currentCards?.scheme[1] === arr[el.y][el.x + 1].scheme[3]) {
                            el.type = 'more';
                        }else {
                            el.type = 'empty';
                        }
                    }
                }

                if (typeof arr[el.y][el.x - 1] !== "undefined" && el.type !== 'card') {
                    if (arr[el.y][el.x - 1].type === 'card') {
                        if(currentCards?.scheme[3] === arr[el.y][el.x - 1].scheme[1]) {
                            el.type = 'more';
                        }else {
                            el.type = 'empty';
                        }
                    }
                }

                return el;
            });
        });

        return arr;
    }

    function getStartField() {
        let arr = [];
        for (let y = 0; y < 3; y++) {
            arr.push([]);
            for (let x = 0; x < 3; x++) {
                const id = (y + "") + (x + "");
                if ((x === 1 && y === 1)) {
                    arr[y].push({
                        id,
                        x,
                        y,
                        type: 'card',
                        img: cardData[0].img,
                        scheme: [1, 2, 1, 0],
                        center: 'road',
                        rotate: 0,
                    });
                } else {
                    arr[y].push({
                        id,
                        x,
                        y,
                        type: 'empty',
                        scheme: null,
                    });
                }
            }
        }

        arr = addMoreFields(arr, currentCards);

        return arr;
    }

    function getNextCard(cards) {
        const c = cards.filter(el => el.deck);
        const rand = Math.floor(Math.random() * (c.length - 0)) + 0;
        return c[rand];
    }

    const [map, setMap] = useState(getStartField());
    const [cards, setCards] = useState([]);

    useEffect(() => {
        setCards(cardData);
    }, []);

    useEffect(() => {
        const nextCard = getNextCard(cardData);
        setCurrentCards(nextCard);
        setMap(addMoreFields([...map], nextCard));
    }, [cards]);

    return (
        <Context.Provider value={{ map, setMap, cards, currentCards, setCurrentCards, addMoreFields, setCards, myplSelect, setMyplSelect }}>
            {children}
        </Context.Provider>
    );
}

export { Context, ContextProvider };