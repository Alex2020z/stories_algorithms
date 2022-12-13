//Поиск Знаменитости. Метод двух указателей
//https://www.youtube.com/watch?v=xGvQN_g-JCI

import React, {useState} from 'react';
import {isNumeric} from '../utils/utils';
import './algorithms.css';

const TaskFindPairEqualN: React.FC = () => {
    const [total, setTotal] = useState<number>(3);
    const [inputDataText, setInputDataText] = useState<string>('');
    const [numbers, setnumbers] = useState<number[]>([]);
    const [answer, setAnswer] = useState<string>('');
    const [warning, setWarning] = useState<string>('');

    const handleTotal = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (isNumeric(value)) {
            setTotal(parseInt(value));
        }
    };

    const handleInputDataText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setWarning('');
        setAnswer('');
        setInputDataText(e.target.value);
    };

    const handleInputDataTextOnBlur = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setWarning('');
        const value = e.target.value;
        const strings = value.split('\n');

        if (strings.filter(item => !isNumeric(item)).length === 0) {
            const numbers = strings.map(item => parseInt(item));
            setnumbers(numbers);
        } else {
            setWarning('Некорректные данные в массиве.');
        }
    };

    const handleFindArray1 = () => {
        const checkedArr: Array<number> = [];

        for (let i = 0; i < numbers.length; i ++) {
            const searchValue = total - numbers[i];

            if (checkedArr.find(item => item === searchValue)) {
                setAnswer(getAnswer(numbers[i], searchValue)); //answer found
                return;
            }

            checkedArr.push(numbers[i]);
        }

        setAnswer('[]');
    };

    const handleFindArray2 = () => {
        for (let i = 0; i < numbers.length; i ++) {
            const searchValue = total - numbers[i];
            let isComplete = false;
            let left = i; 
            let right = numbers.length - 1;
            let middle  = Math.round((left + right) / 2);

            while (!isComplete) {
                //console.log('searchValue=', searchValue, ' left=', left, ' right=', right, ' middle=', middle, ' numbers[middle]=', numbers[middle]);
                if (numbers[middle] === searchValue) {
                    setAnswer(getAnswer(numbers[i], searchValue)); //answer found
                    return;
                } 
                
                if (right - left <= 1) {
                    isComplete = true;
                } else if (numbers[middle] < searchValue) {
                    left = middle;
                    middle = Math.round((middle + right) / 2);
                } else if (numbers[middle] > searchValue) { 
                    right = middle;
                    middle = Math.round((left + middle) / 2);
                }
            }
        }

        setAnswer('[]');
    };

    const handleFindArray3 = () => {
        let left = 0; 
        let right = numbers.length - 1;

        while (left < right) {
            const sum = numbers[left] + numbers[right];

            if (sum === total) {
                setAnswer(getAnswer(numbers[left], numbers[right])); //answer found
                return;
            } 
            
            if (sum < total) {
                left ++;
            } else { //sum > total)
                right --;
            }
        }

        setAnswer('[]');
    };

    const getAnswer = (num1: number, num2: number): string => {
        return '[' + num1 + ', ' + num2 + ']'
    };

    return (
            <div>
                <div className='space'></div>
                <div><b>Задача: найти в упорядоченном массиве пару в сумме равную заданному числу</b></div>
                <div className='space'></div>
                <div>Задайте целое число, задайте упорядоченный массив целых чисел и найдите пару из массива равную в сумме заданномму числу. Пример:</div>
                <div>Число: 3</div>
                <div>Массив: </div>
                <div>-1</div>
                <div>2</div>
                <div>4</div>
                <div>Ответ: [-1,4]</div>
                <div className='space'></div>
                <div className='space'></div>
                <div>Задайте целое число: <input type='text' className='inputbox' value={total} onChange={e => handleTotal(e)} /></div>
                <div>Задайте массив чисел: </div>
                <div><textarea value={inputDataText} 
                        onChange={e => handleInputDataText(e)} 
                        onBlur={handleInputDataTextOnBlur} 
                        onClick={() => {setAnswer('');}} 
                        style={{height: '200px'}} /></div>
                <div className='space'></div>
                {warning && (<div style={{color: 'red'}}>{warning}</div>)}
                <div><button onClick={handleFindArray1} disabled={warning.length > 0}>Алгоритм 1 (O(n2), память O(n)): Найти пару в сумме равную {total}</button></div>
                <div><button onClick={handleFindArray2} disabled={warning.length > 0}>Алгоритм 2 (бинарный поиск - O(n log(n)), память O(1)): Найти пару в сумме равную {total}</button></div>
                <div><button onClick={handleFindArray3} disabled={warning.length > 0}>Алгоритм 3 (бинарный поиск - O(n), память O(1): Найти пару в сумме равную {total}</button></div>
                {answer.length > 0 && (<div>Ответ:{answer}</div>)}
            </div>
    )
}
 
export default TaskFindPairEqualN;