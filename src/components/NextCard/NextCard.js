import React, { useContext } from 'react';
import { Context } from '../../context';
import './NextCard.css';

export default function NextCard() {

    const { currentCards, setCurrentCards, map, addMoreFields, setMap } = useContext(Context);

    const turnCard = () => {
        const card = { ...currentCards };
        card.rotate = card.rotate + 90;
        const last = card.scheme.pop();
        card.scheme.unshift(last);
        setCurrentCards(card);
        setMap(addMoreFields([...map], card));
    }

    return (
        <div className="nextcard">
            <img src={currentCards?.img} style={{ transform: 'rotate(' + currentCards?.rotate + 'deg)' }} />
            <span onClick={turnCard}>Поворот</span>
        </div>
    )
}
