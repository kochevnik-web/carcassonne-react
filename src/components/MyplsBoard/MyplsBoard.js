import React, {useContext} from 'react';
import "./MyplsBoard.css";
import { Context } from '../../context';

export default function MyplsBoad() {

    const {players, myplSelect, setMyplSelect} = useContext(Context);
    let clx = ['mypls-board'];
    const currentPlayer = players.filter(el => el.current)[0];
    clx.push(currentPlayer.color);
    if(myplSelect) clx.push('select');

    return (
        <div
            className={clx.join(' ')}
            onClick={()=>setMyplSelect(!myplSelect)}
        >{currentPlayer.mypls}</div>
    )
}
