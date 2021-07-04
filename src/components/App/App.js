import React, {useContext} from 'react';
import './App.css';
import {Context} from '../../context';

import Map from '../Map/Map';
import NextCard from '../NextCard/NextCard';
import MyplsBoard from '../MyplsBoard/MyplsBoard';

function App() {

    const {nextTurn, setNextTurn} = useContext(Context);

    const updateNextTurn = () => {
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
