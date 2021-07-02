import React, { useContext } from 'react';
import { Context } from '../../context';

import './Map.css';
import Field from '../Field/Field';

export default function Map() {

    const { map } = useContext(Context);

    const fields = map.map(row => {
        return row.map(el => {
            return (
                <Field key={el.id} field={el} />
            )
        })
    });

    return (
        <div className="map" style={{ width: map[0].length * 75 }}>
            {fields}
        </div>
    )
}
