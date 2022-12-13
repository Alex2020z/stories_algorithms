//Сортировка.

import React, {useState, useRef} from 'react';
import {isNumeric} from '../utils/utils';
import './algorithms.css';

type Range = {
    start: number,
    finish: number,
}

const AlgorithmSort: React.FC = () => {
    const [inputDataText, setInputDataText] = useState<string>('');
    const [sortArray, setSortArray] = useState<number[]>([]);
    const [answer, setAnswer] = useState<string>('');
    const [warning, setWarning] = useState<string>('');
    const refArray = useRef([] as number[]);

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
            setSortArray(numbers);
            refArray.current = numbers;
        } else {
            setWarning('Некорректные данные в массиве, возможно, есть пустая строка.');
        }
    };

    //algorithm 1:  Сортировка методом пузырька.
    //https://www.youtube.com/watch?v=tFxA9v4gRpE
    const handleBubbleSort = () => {
        let border = sortArray.length - 2;

        for (let i = 0; i < sortArray.length - 1; i ++) {
            for (let j = 0; j <= border; j ++) {
                if (sortArray[j] > sortArray[j+1]) {
                    const a = sortArray[j+1];
                    sortArray[j+1] = sortArray[j];
                    sortArray[j] = a;
                }
            }

            border --;
        }

        setAnswer('[' + sortArray.join(', ') + ']');
    };

    //algorithm 2: Сортировка методом слияния (merge sort)
    //https://www.youtube.com/watch?v=BaY1a0VPIsE
    const handleMergeSort = () => {
        let size = sortArray.length;
        const totalArr: Array<any> = [];
        let canComplete = false;
        let arr: Array<(Range | null)> | null = [{start: 0, finish: size - 1}];

        while (!canComplete) {
            if (arr !== null) {
                arr = getBorders(arr);
                if (arr !== null) {
                    totalArr.push(arr); //collect [][] => [][]. [][] => ... 
                }
            } else {
                canComplete = true;
            }
        }

        //merge adjacent arrays:
        for (let i = totalArr.length - 1; i >= 0; i--) {
            const arr = totalArr[i];

            for (let j = 0; j < arr.length; j+= 2) {
                doMerge(arr[j], arr[j+1]);
            }
        }

        setAnswer('[' + refArray.current.join(', ') + ']');
    };

    const getBorders = (array: (Range | null)[]): (Range | null)[] | null => {
        const resArr:  (Range | null)[] = [];
        let count = 0;

        //divide each elem in the array in 2 pieces
        for (let i = 0; i < array.length; i ++) {
            const obj = array[i];

            if (obj != null) {
                const start = obj.start;
                const finish = obj.finish;

                if (finish === start) {
                    resArr.push(null);
                    resArr.push(null);
                    count ++;
                } else if (finish - start === 1) {
                    resArr.push({start: start, finish: start});
                    resArr.push({start: finish, finish: finish});
                } else  {
                    let middle = start + Math.floor((finish - start) / 2);
                    resArr.push({start: start, finish: middle});
                    resArr.push({start: middle + 1, finish: finish});
                }
            } else {
                count ++;  //the elem contains null
            }
        }

        if (count !== array.length) {
            return resArr;
        } else {
            return null; //all elems contain null => output is null
        }
    };

    const doMerge = (arr1: Range | null, arr2: Range | null) => {
        const sortedArray = refArray.current;

        if (arr1 === null || arr2 === null) {
            return;
        }

        let count1 = 0;
        let count2 = 0;
        const start1 = arr1.start;
        const size1 = arr1.finish - arr1.start + 1;
        const start2 = arr2.start;
        const size2 = arr2.finish - arr2.start + 1;
        const arr: number[] = [];
        
        //в массив arr записываем упорядоченные данные из arr1 и arr2 пока они оба не будут исчерпаны
        while (count1 < size1 || count2 < size2) {
            if (count1 === size1) {
                arr.push(sortedArray[start2 + count2]);  //в arr1 больше нет элементов. Берем очередной элемент из arr2
                count2 ++;
            } else if (count2 === size2) {
                arr.push(sortedArray[start1 + count1]);  //в arr2 больше нет элементов. Берем очередной элемент из arr1
                count1 ++;
            } else if (sortedArray[start1 + count1] <= sortedArray[start2 + count2]) {
                arr.push(sortedArray[start1 + count1]);
                count1 ++;
            } else if (sortedArray[start1 + count1] > sortedArray[start2 + count2]) {
                arr.push(sortedArray[start2 + count2]);
                count2 ++;
            }
        }

        //save changed data:
        for (let i = 0; i < arr.length; i++) {
            sortedArray[start1 + i] = arr[i];
        }
    };

    //algorithm 3: Сортировка методом слияния (insert sort)
    //https://habr.com/ru/post/415935/
    const handleInsertSort = () => {
        let savedValue = moveMinimalToStart(refArray.current); //find minimal element and move it to the 1st position:
        const arr = refArray.current;
        let sortedBorder = 0;

        while (sortedBorder < arr.length - 1)  {
            //пропустить уже отсортированные элементы
            while (arr[sortedBorder] <= arr[sortedBorder + 1] && sortedBorder < arr.length - 1)  {
                sortedBorder ++; 
            }

            if (sortedBorder === arr.length - 1) {
                break;
            }

            //запомнить элемент, который меньше предыдущего: его надо переместить
            savedValue = arr[sortedBorder+1];
            let ind = -1;

            //найти в отсортированной части массива позицию для перемещения элемента
            for (let j = 1; j <= sortedBorder && ind === -1; j ++) {
                if (savedValue <= arr[j]) {
                    ind = j;
                }
            }

            //сдвинуть отсортированные элементы, чтобы освободить позицию для вставки
            for (let j = sortedBorder; j >= ind; j --) {
                arr[j+1] = arr[j];
            }

            //вставить элемент на освободившееся место
            arr[ind] = savedValue; 
        }

        setAnswer('[' + refArray.current.join(', ') + ']');
    };

    const moveMinimalToStart = (arr: number[]): number => {
        let minElement = Infinity;
        let ind = -1;

        for (let i = 0; i < arr.length; i ++) {
            if (arr[i] < minElement) {
                minElement = arr[i];
                ind = i;
            }
        }

        const savedValue = arr[ind];
        arr[ind] = arr[0];
        arr[0] = savedValue;

        return savedValue;
    };

    return (
        <div>
            <div className='space'></div>
            <div><b>Алгоритмы сортировки (метод пузырька, merge sort, insert sort)</b></div>
            <div className='space'></div>
            <div>Пример:</div>
            <div>5</div>
            <div>3</div>
            <div>9</div>
            <div>4</div>
            <div>Отсортируйте</div>
            <div>Ответ: [3, 4, 5, 9]</div>
            <div className='space'></div>
            <div>Задайте массив чисел: </div>
            <div><textarea value={inputDataText} 
                onChange={e => handleInputDataText(e)} 
                onBlur={handleInputDataTextOnBlur} 
                onClick={() => {setAnswer('');}} 
                style={{height: '200px'}} /></div>
            {warning && (<div style={{color: 'red'}}>{warning}</div>)}

            <div><button onClick={handleBubbleSort} disabled={warning.length > 0}>Отсортируйте методом пузырька</button></div>
            <div><button onClick={handleMergeSort} disabled={warning.length > 0}>Отсортируйте методом слияния</button></div>
            <div><button onClick={handleInsertSort} disabled={warning.length > 0}>Отсортируйте методом вставок</button></div>
            {answer.length > 0 && (
            <div>
                Ответ:{answer}
            </div>
            )}
        </div>
)}
 
export default AlgorithmSort;
