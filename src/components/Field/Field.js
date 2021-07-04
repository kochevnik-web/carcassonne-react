import React, { useContext } from 'react';
import './Field.css';
import { Context } from '../../context';

export default function Field({ field }) {

    const { type, img, rotate, x, y, last, pl } = field;
    const { map, setMap, currentCards, addMoreFields, setCards, cards, myplSelect, setMyplSelect, setNextTurn } = useContext(Context);

    //Добавляем вверх строку пустых полей
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
                    let elem = {...arr[y - 1][x]}
                    elem.x = x;
                    elem.y = y;
                    newArr[y].push(elem);
                }
            }
        }
        return newArr;
    }

    //Добавляем вниз строку пустых полей
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
                    let elem = {...arr[y][x]}
                    elem.x = x;
                    elem.y = y;
                    newArr[y].push(elem);
                }
            }
        }
        return newArr;
    }

    //Добавляем влево колонку пустых полей
    const addLeftLine = arr => {
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
                    let elem = {...arr[y][x - 1]}
                    elem.x = x;
                    elem.y = y;
                    newArr[y].push(elem);
                }
            }
        }
        return newArr;
    }

    //Добавляем вправо колонку пустых полей
    const addRightLine = arr => {
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
                    let elem = {...arr[y][x]}
                    elem.x = x;
                    elem.y = y;
                    newArr[y].push(elem);
                }
            }
        }
        return newArr;
    }

    //На вход приходит объект поля карты, по которому произвели клик
    const selectField = field => {
        //Если поле, по каторому кликнули для добавления
        //не является с типом more, не выполняем действие
        if (field.type !== 'more') return;

        //Обнуляем свойство последнего элемента для
        //каждого поля card перед добавлением нового поля,
        //у котрого как раз будет нужно сделать это свойсво true
        //Так же вернется новый массив, готовый для добавления в state
        let m = map.map(row => {
            return row.map(el =>{
                el.last = false;
                return el;
            });
        })

        //Добавляем в массив карты новое поле по кординатам клика
        //А так же добавляем значения из активного игрового поля (currentCards)
        m[field.y][field.x] = {
            id: new Date().getTime(),
            x: field.x,
            y: field.y,
            type: 'card',
            img: currentCards.img,       //Картинка поля
            rotate: currentCards.rotate, //Поворот поля
            scheme: currentCards.scheme, //Схема поля
            center: currentCards.center, //Центр поля
            last: 1,                     //Последнее поле на карте
            pl: [false, false, false, false, false]
        }

        //Цикл, с помощью которого определяем с какой стороны
        //требуется добавить колонку или строку с пустыми полями
        //для расширения игрового поля. Так же в цыкле запускаем функции добавления
        //строк или колонок до тех пор пока флаг false
        let flag = false;
        while (!flag) {
            loop:
            for (let y = 0; y < m.length; y++) {
                for (let x = 0; x < m[0].length; x++) {
                    if (m[y][x].type === 'card') {
                        if (typeof m[y - 1] === "undefined") {
                            flag = false;
                            m = addTopLine(m);
                            break loop;
                        }
                        if (typeof m[y + 1] === "undefined") {
                            flag = false;
                            m = addBottomLine(m);
                            break loop;
                        }
                        if (typeof m[y][x - 1] === "undefined") {
                            flag = false;
                            m = addLeftLine(m);
                            break loop;
                        }
                        if (typeof m[y][x + 1] === "undefined") {
                            flag = false;
                            m = addRightLine(m);
                            break loop;
                        }
                    }
                }
            }
            flag = true;
        }

        //Пропускаем массив полей на карте через функцию addMoreFields,
        //что бы перерисовать поля, на каторые разрешается
        //ставить карту
        m = addMoreFields(m, currentCards);

        //Обновляем стейт игрового поля
        setMap(m);

        //Проходим по массиву игровых тайлов, что бы убрать возомжность
        //повторного выпадания тайла. И обновляем стейт
        let c = [...cards];
        c = c.map(el => {
            if (el.img === currentCards.img) {
                el.deck = false;
            }
            return el;
        });
        setCards(c);

        //Убераем выделения мипла игрока
        setMyplSelect(false);

        //После установки тайла на поле даем возможность перехода хода
        setNextTurn(true);
    }

    const addMyPosition = (id, field) => {
        const m = [...map];
        m[field.y][field.x].last = false;
        m[field.y][field.x].pl[id] = 1;

        setMap(m);
        setMyplSelect(false);
    }

    const setPosition = ['top', 'right', 'bottom', 'left', 'center'];
    const setPositionField = setPosition.map((el, indx) => {
        return (
            <span
                key={indx}
                className={el}
                onClick={() => addMyPosition(indx, field)}
            ></span>
        )
    });

    let clx = ['field', type];
    pl?.map((el, indx) => {
        if(el) clx.push(setPosition[indx] + ' blue');
        return el;
    })

    return (
        <div className={clx.join(' ')} onClick={() => selectField(field)}>
            {type === 'card' && (
                <>
                    <img src={img} alt={img} style={{ transform: 'rotate(' + rotate + 'deg)' }} />
                    {/* <div className="cord">
                        <div>x: {x}</div>
                        <div>y: {y}</div>
                    </div> */}
                    {myplSelect && last && (
                        <div className="my-field">
                            {setPositionField}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
