//Поиск Знаменитости. Метод двух указателей
//https://www.youtube.com/watch?v=xGvQN_g-JCI

import React, {useState} from 'react';
import {isNumeric} from '../utils/utils';
import './algorithms.css';

type StackInfo = {
    temp: number,
    day: number,
}

const TaskStackTemperature: React.FC = () => {
    const [inputDataText, setInputDataText] = useState<string>('');
    const [temperatures, setTemperatures] = useState<number[]>([]);
    const [dayDifference, setDayDifference] = useState<string>('');
    const [warning, setWarning] = useState<string>('');

    const handleInputDataText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setWarning('');
        //setDayDifference('');
        setInputDataText(e.target.value);
    };

    const handleInputDataTextOnBlur = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setWarning('');
        const value = e.target.value;
        const strings = value.split('\n');

        if (strings.filter(item => !isNumeric(item)).length === 0) {
            const numbers = strings.map(item => parseInt(item));
            setTemperatures(numbers);
        } else {
            setWarning('Некорректные данные в массиве.');
        }
    };

    const handleFindArray = () => {
        const temperatureDiffs: Array<number> = new Array(temperatures.length - 1);
        const stackInfoArr: StackInfo[] = [];

        let currDay = temperatures.length - 1;

        while (currDay >= 0) {
            let found = false;

            if (stackInfoArr.length > 0) {
                //пройдем по стеку и удалим те элементы, где температура ниже температуры текущего дня или
                //найдем элемент в стеке с более высокой температурой
                for (let i = stackInfoArr.length-1; i >= 0 && !found; i --) {
                    if (temperatures[currDay] < stackInfoArr[i].temp) {
                        found = true; //нашли в стеке день с более высокой температурой
                    } else {
                        stackInfoArr.pop(); //удалим верхний эелемент из стека
                    }
                }
            }
            
            if (stackInfoArr.length > 0) {
                //находим разницу между днем в стеке с более высокой температурой и текущим днем
                temperatureDiffs[currDay] = stackInfoArr[stackInfoArr.length - 1].day - currDay;
                //console.log('вставка stackInfoArr[stackInfoArr.length - 1].day - ind => ', 'dayArr[', currDay, ']=', temperatureDiffs[currDay])
            } else {
                temperatureDiffs[currDay] = 0; //дней с более высокой теспературой в стеке нет
                //console.log('обнуление. dayArr[', currDay, ']=', temperatureDiffs[currDay]);
            }

            //сохраняем текущий день и температуру в стеке. push т.к. наверху даты более близкие к текущей и проверка идет сверху массива
            stackInfoArr.push({temp: temperatures[currDay], day: currDay}); 
            //console.log('added to stack=', stackInfoArr[stackInfoArr.length-1], ' now stack size=', stackInfoArr.length);

            currDay --;
        }
        
        setDayDifference(temperatureDiffs.join(', '));
    };

    return (
            <div>
                <div className='space'></div>
                <div><b>Задача: вычислить сколько дней до ближайшего более теплого дня</b></div>
                <div className='space'></div>
                <div>Задайте массив произвольных целых чисел (температура последовательных дней). </div>
                <div className='space'></div>
                <div>Пример:</div>
                <div>15</div>
                <div>13</div>
                <div>9</div>
                <div>14</div>
                <div>Найдите для каждого дня через сколько дней будет более теплый день</div>
                <div>Примечание: 0 означает, что такого дня нет.</div>
                <div>Ответ: [0, 2, 1, 0]</div>
                <div className='space'></div>
                <div>Задайте массив чисел: </div>
                <div><textarea value={inputDataText} 
                        onClick={() => setDayDifference('')}
                        onChange={e => handleInputDataText(e)} 
                        onBlur={handleInputDataTextOnBlur} 
                        style={{height: '200px'}} /></div>
                {warning && (<div style={{color: 'red'}}>{warning}</div>)}
                <div><button onClick={handleFindArray} disabled={warning.length > 0}>Найти массив более теплых дней!</button></div>
                {dayDifference.length > 0 && (
                    <div>
                        Ответ:{dayDifference}
                    </div>
                )}
            </div>
    )
}
 
export default TaskStackTemperature;
