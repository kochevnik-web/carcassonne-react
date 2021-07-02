import React, {useContext} from 'react';
import "./MyplsBoard.css";
import { Context } from '../../context';

export default function MyplsBoad() {

    const {myplSelect, setMyplSelect} = useContext(Context);

    return (
        <div
            className={"mypls-board" + (myplSelect ? " select" : '')}
            onClick={()=>setMyplSelect(!myplSelect)}
        ></div>
    )
}
