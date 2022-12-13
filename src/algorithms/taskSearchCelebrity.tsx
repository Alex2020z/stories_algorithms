//Поиск Знаменитости. Метод двух указателей
//https://www.youtube.com/watch?v=xGvQN_g-JCI

import React, {useState} from 'react';
import {isNumeric} from '../utils/utils';
import './algorithms.css';

const TaskSearchCelebrity: React.FC = () => {
    const [peopleNum, setPeopleNum] = useState<number>(3);
    const [relationMatrix, setRelationMatrix] = useState<string>('');
    const [celebrity, setCelebrity] = useState<number>(-2);
    const [warning, setWarning] = useState<string>('');

    const handlePeopleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
            
        if (isNumeric(value) && parseInt(value) > 0) {
            setPeopleNum(parseInt(value));
        }
    };

    const handleRelations = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setWarning('');
        const value = e.target.value;
        if (value.split('').filter(item => item !== '0' && item !== '1' && item !== '\n').length === 0) {
            setRelationMatrix(value);
        }
    };

    const handleCheckRelations = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        const arr = value.split('\n');

        if (arr.length !== peopleNum) {
            setWarning(`Некорректное число рядов в матрице. Должно быть ${peopleNum}`);
        }

        for (let i = 0; i < peopleNum; i ++) {
            if (arr[i].length !== peopleNum) {
                setWarning(`Ряд ${i+1} содержит некорректное число элементов. Должно быть ${peopleNum}`);
            }
        }
    };
    
    const handleCalculate = () => {
        const relations = new Array(peopleNum);
        const arr = relationMatrix.split('\n');

        for (let i = 0; i < peopleNum; i++) {
            relations[i] = new Array(peopleNum);
            const iArr = arr[i].split('');

            for (let j = 0; j < peopleNum; j++) {
                relations[i][j] = parseInt(iArr[j]);
            }
        }

        let firstPerson = 0;
        let lastPerson = peopleNum - 1;
        let res = false;

        //шаг 1: если current firstPerson не знает никого, то он может быть знаменитостью:
        while (!res) {
            const isFirstKnowLast = firstKnowLast(firstPerson, lastPerson, relations);
            if (isFirstKnowLast) {
                firstPerson ++;
            }
            else {
                //console.log('lastPerson go from ', lastPerson, ' to previous');
                lastPerson --;
            }

            res = firstPerson === lastPerson;
        }

        //шаг 2: если this firstPerson не знает никого, то может быть знаменитостью:
        for (let i = 0; i < peopleNum && i !== firstPerson; i++) {
            if (firstKnowLast(firstPerson, i, relations)) {
                setCelebrity(-1); //он знает кого-то, завершаем - знаменитости нет.
                return;
            }
        }

        //шаг 3: если все знают firstPerson, то он знаменитость:
        for (let i = 0; i < peopleNum && i !== firstPerson; i++) {
            if (!firstKnowLast(i, firstPerson, relations)) { //oops, 'i' doesnt know firstPerson
                setCelebrity(-1);
                return;
            }
        }

        setCelebrity(firstPerson);
    };

    const firstKnowLast = (first: number, last: number, relations: number[][]): boolean => {
        if (relations[first][last] === 1) {
            //console.log('first', first, ' knows last ', last)
            return true; //first knows last (first is not a celebrity)
        } else {
            //console.log('first', first, ' doesnt know last ', last)
            return false; //first doesn't know last (first can be celebrity)
        }
    };

    return (
            <div>
                <div className='space'></div>
                <div><b>Задача: поиск знаменитости</b></div>
                <div className='space'></div>
                <div>Задайте количество людей N и матрицу [N x N] связей между людьми: 1 - знает, 0 - не знает.</div>
                <div>Условия: знаменитость знают все. Знаменитость не знает никого.</div>
                <div>1-строка - кого знает 1й человек, 2я строка - кого знает 2й человек и т.д.</div> 
                <div className='space'></div>
                <div>Пример:</div>
                <div>Значения на главной диагонали не имеют значения (это знания человека о самом себе).</div>
                <div>100</div>
                <div>110</div>
                <div>011</div>
                <div className='space'></div>
                <div>Человек (в примере строка 1), который никого не знает, является знаменитостью. </div>
                <div className='space'></div>
                <div>Задайте число людей: <input type='text' value={peopleNum} onChange={handlePeopleNumber} /></div>
                <div>Установите связи между людьми (матрицу [{peopleNum} x {peopleNum}]): </div>
                <div><textarea value={relationMatrix} onChange={handleRelations} onClick={() => {setCelebrity(-2)}} onBlur={handleCheckRelations} style={{height: '200px'}} /></div>
                {warning && (<div style={{color: 'red'}}>{warning}</div>)}
                <div><button onClick={handleCalculate}>Определить знаменитость!</button></div>
                { celebrity > -2 && (
                    <div>
                    Ответ: 
                    {celebrity === -1 && (<span> Знаменитости нет. </span>)} 
                    {celebrity > -1 && (<span> Знаменитость N {celebrity+1} </span>)} 
                </div>
                )}
            </div>
    )
}
 
export default TaskSearchCelebrity;