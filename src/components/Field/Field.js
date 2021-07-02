import React, { useContext } from 'react';
import './Field.css';

import { Context } from '../../context';

export default function Field({ field }) {

    const { type, img, rotate, x, y } = field;
    const { map, setMap, currentCards, addMoreFields, setCards, cards } = useContext(Context);

    let clx = ['field', type];

    const addTopLine = arr => {
        let width = arr[0].length;
        let height = arr.length + 1;
        const newArr = [];
        for (let y = 0; y < height; y++) {
            newArr.push([]);
            for (let x = 0; x < width; x++) {
                const id = (y + "") + (x + "");
                if (y === 0) {
                    newArr[y].push({
                        id,
                        x,
                        y,
                        type: 'empty',
                        scheme: null,
                    });
                } else {
                    newArr[y].push({
                        id,
                        x,
                        y,
                        type: arr[y - 1][x].type,
                        img: arr[y - 1][x].img,
                        scheme: arr[y - 1][x].scheme,
                        rotate: arr[y - 1][x].rotate,
                    });
                }
            }
        }
        return newArr;
    }

    const addBottomLine = arr => {
        let width = arr[0].length;
        let height = arr.length + 1;
        const newArr = [];
        for (let y = 0; y < height; y++) {
            newArr.push([]);
            for (let x = 0; x < width; x++) {
                const id = (y + "") + (x + "");
                if (y === height - 1) {
                    newArr[y].push({
                        id,
                        x,
                        y,
                        type: 'empty',
                        scheme: null,
                    });
                } else {
                    newArr[y].push({
                        id,
                        x,
                        y,
                        type: arr[y][x].type,
                        img: arr[y][x].img,
                        scheme: arr[y][x].scheme,
                        rotate: arr[y][x].rotate,
                    });
                }
            }
        }
        return newArr;
    }

    const addLefttLine = arr => {
        let width = arr[0].length + 1;
        let height = arr.length;
        const newArr = [];
        for (let y = 0; y < height; y++) {
            newArr.push([]);
            for (let x = 0; x < width; x++) {
                const id = (y + "") + (x + "");
                if (x === 0) {
                    newArr[y].push({
                        id,
                        x,
                        y,
                        type: 'empty',
                        scheme: null,
                    });
                } else {
                    newArr[y].push({
                        id,
                        x,
                        y,
                        type: arr[y][x - 1].type,
                        img: arr[y][x - 1].img,
                        scheme: arr[y][x - 1].scheme,
                        rotate: arr[y][x - 1].rotate,
                    });
                }
            }
        }
        return newArr;
    }

    const addRighttLine = arr => {
        let width = arr[0].length + 1;
        let height = arr.length;
        const newArr = [];
        for (let y = 0; y < height; y++) {
            newArr.push([]);
            for (let x = 0; x < width; x++) {
                const id = (y + "") + (x + "");
                if (x === width - 1) {
                    newArr[y].push({
                        id,
                        x,
                        y,
                        type: 'empty',
                        scheme: null,
                    });
                } else {
                    newArr[y].push({
                        id,
                        x,
                        y,
                        type: arr[y][x].type,
                        img: arr[y][x].img,
                        scheme: arr[y][x].scheme,
                        rotate: arr[y][x].rotate,
                    });
                }
            }
        }
        return newArr;
    }

    const selectField = field => {
        if (field.type !== 'more') return;
        let flag = false;
        let m = [...map];
        m[field.y][field.x] = {
            id: new Date().getTime(),
            x: field.x,
            y: field.y,
            type: 'card',
            img: currentCards.img,
            rotate: currentCards.rotate,
            scheme: currentCards.scheme,
        }

        while (!flag) {
            loop:
            for (let y = 0; y < m.length; y++) {
                for (let x = 0; x < m[0].length; x++) {
                    if (m[y][x].type === 'card') {
                        if (typeof m[y - 1] === "undefined") {
                            flag = false;
                            m = addTopLine(m);
                            console.log(m);
                            break loop;
                        }
                        if (typeof m[y + 1] === "undefined") {
                            flag = false;
                            m = addBottomLine(m);
                            console.log(m);
                            break loop;
                        }
                        if (typeof m[y][x - 1] === "undefined") {
                            flag = false;
                            m = addLefttLine(m);
                            console.log(m);
                            break loop;
                        }
                        if (typeof m[y][x + 1] === "undefined") {
                            flag = false;
                            m = addRighttLine(m);
                            console.log(m);
                            break loop;
                        }
                    }
                }
            }
            flag = true;
        }

        m = addMoreFields(m, currentCards);

        setMap(m);

        let c = [...cards];
        c = c.map(el => {
            if (el.img === currentCards.img) {
                el.deck = false;
            }
            return el;
        });

        setCards(c);
    }

    return (
        <div className={clx.join(' ')} onClick={() => selectField(field)}>
            {type === 'card' && (
                <>
                    <img src={img} alt={img} style={{ transform: 'rotate(' + rotate + 'deg)' }} />
                    <div className="cord">
                        <div>x: {x}</div>
                        <div>y: {y}</div>
                    </div>
                </>
            )}
        </div>
    )
}
