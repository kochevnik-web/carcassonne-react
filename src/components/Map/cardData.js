import card_1 from '../../img/card-1.jpg';
import card_2 from '../../img/card-2.jpg';
import card_3 from '../../img/card-3.jpg';
import card_4 from '../../img/card-4.jpg';
import card_5 from '../../img/card-5.jpg';
import card_6 from '../../img/card-6.jpg';


const cards = [
    {
        deck: false,
        id: 0,
        scheme: [0, 1, 2, 1],
        center: 'road',
        x: 0,
        y: 0,
        rotate: 0,
        img: card_1
    },
    {
        deck: true,
        id: 1,
        scheme: [1, 0, 0, 1],
        center: 'road',
        x: 0,
        y: 0,
        rotate: 0,
        img: card_2
    },
    {
        deck: true,
        id: 2,
        scheme: [1, 0, 1, 0],
        center: 'road',
        x: 0,
        y: 0,
        rotate: 0,
        img: card_3
    },
    {
        deck: true,
        id: 3,
        scheme: [2, 2, 0, 2],
        center: 'castle',
        x: 0,
        y: 0,
        rotate: 0,
        img: card_4
    },
    {
        deck: true,
        id: 4,
        scheme: [0, 2, 0, 2],
        center: 'field',
        x: 0,
        y: 0,
        rotate: 0,
        img: card_5
    },
    {
        deck: true,
        id: 5,
        scheme: [0, 0, 1, 0],
        center: 'monastery',
        x: 0,
        y: 0,
        rotate: 0,
        img: card_6
    },
];

export default cards;