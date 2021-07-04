import React, {useContext} from 'react';
import './App.css';
import {Context} from '../../context';

import Map from '../Map/Map';
import NextCard from '../NextCard/NextCard';
import MyplsBoard from '../MyplsBoard/MyplsBoard';

function App() {

    const {nextTurn, setNextTurn, players, setPlayers} = useContext(Context);

    const updateNextTurn = () => {

        const p = players.filter(el => el.inGame);
        for(let i = 0; i < p.length; i++){
            if(p[i].current) {
                let index = i + 1;
                p[i].current = false;
                if(i === p.length - 1) {
                    index = 0;
                }
                p[index].current = true;
                break;
            }
        }

        setPlayers(p);
        setNextTurn(false);
    }

    return (
        <div className="App">
            <Map />
            <NextCard />
            <MyplsBoard />
            <button
                className="next-turn"
                disabled={!nextTurn}
                onClick={updateNextTurn}
            >Следующий ход</button>
        </div>
    );
}

export default App;
