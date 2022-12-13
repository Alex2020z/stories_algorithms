//Динамическое Программирование: Количество Уникальных Путей
//https://www.youtube.com/watch?v=GhiRlhPlJ9Q

import React, {useState} from 'react';
import './algorithms.css';

const TaskPathNumber: React.FC = () => {
    const [sizeN, setSizeN] = useState<number>(1);
    const [sizeM, setSizeM] = useState<number>(1);
    const [pathNumber, setPathNumber] = useState<number>(-1);

    const handleSizeN = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSizeN(checkSizeValue(true, e.target.value));
    }; 

    const handleSizeM = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSizeM(checkSizeValue(false, e.target.value));
    }; 

    const checkSizeValue = (isN: boolean, value: any): number => {
        const regexNumber = /[0-9]+/;
        const regex = new RegExp(regexNumber, 'g');

        if (regex.test(value) && parseInt(value) > 0) {
            const val = parseInt(value);
            setPathNumber(-1);
            return val;
        }

        return isN ? sizeN : sizeM;
    };

    const calc = (n: number, m: number, arr: Array<Array<number>>): number => {
        if (n < 1 || m < 1) {
            return 0;
        }

        if (n === 1 && m === 1) {
            return 1;
        }

        if (arr[n-1][m-1] !== -1) {
            return arr[n-1][m-1];
        }

        arr[n-1][m-1] = calc(n-1, m, arr) + calc(n, m -1, arr);
        return arr[n-1][m-1];
    }


    const handleCalculate = () => {
        const arr = new Array(sizeN);
        
        for (let i = 0; i < sizeN; i++) {
            arr[i] = new Array(sizeM);
            for (let j = 0;j < sizeM ; j++)
                arr[i][j] = -1;
        }

        const num = calc(sizeN, sizeM, arr);
        setPathNumber(num);
    }; 

    return (
            <div>
                <div className='space'></div>
                <div><b>Задача: поиск максимального числа путей в прямоугольнике</b></div>
                <div className='space'></div>
                <div>Сколько способов добраться из левого нижнего угла матрицы до ее правого верхнего угла, если размер матрицы M x N (идти налево или вниз запрещено):</div>
                <div className='space'></div>
                <div>Установите N: <input type='text' value={sizeN} onChange={handleSizeN} /></div>
                <div>Установите M: <input type='text' value={sizeM} onChange={handleSizeM} /></div>
                <div className='space'></div>
                <div><button onClick={handleCalculate}>Вычислить!</button></div>
                <div className='space'></div>
                <div>Ответ: {pathNumber > -1 && (<span> {pathNumber} </span>)} </div>
            </div>
    )    
}
 
export default TaskPathNumber;