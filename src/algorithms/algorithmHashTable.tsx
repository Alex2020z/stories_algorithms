//Метод цепочек — предпочтительный метод. Добавление значений в массив
//https://www.freecodecamp.org/news/javascript-hash-table-associative-array-hashing-in-js/

import React, {useState} from 'react';
import HashTable from './hashTable';
import {isNumeric} from '../utils/utils';
import './algorithms.css';

const LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const DEFAULT_HASH_LENGTH = 20;

type HashElemToShow = {
    ind: number,
    hash: number,
    key: string,
    value: string,
}

const AlgorithmHashTable: React.FC = () => {
    const [textToHash, setTextToHash] = useState(LOREM_IPSUM);
    const [hashLength, setHashLength] = useState(DEFAULT_HASH_LENGTH);
    const [hashArrayToShow, setHashArrayToShow] = useState<HashElemToShow[]>([]);

    const handleTextToHash = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextToHash(e.target.value);
    };

    const handleChangeHashLength = (e: React.ChangeEvent<HTMLInputElement>) => {
        const length = isNumeric(e.target.value) ? parseInt(e.target.value) : DEFAULT_HASH_LENGTH;
        setHashLength(length);
        setHashArrayToShow([]);
    };
   
    const handleShowHash = () => {    
        const hashTable = new HashTable(hashLength);
        const wordArray = textToHash.split(' ');

        //create hash table with entered data:
        for (let i = 0; i < wordArray.length; i ++) {
            const word = wordArray[i];
            hashTable.set(word, word); //note: in our case key = value
        }

        //get data from hash table to show it:
        const hashArr: HashElemToShow[] = []; 
        for (let i = 0; i < hashLength; i ++) {
            const arr = hashTable.getByIndex(i);

            if (arr && arr.length > 0) {
                for (let j = 0; j < arr.length; j ++) { 
                    const key = arr[j].key;
                    const elem: HashElemToShow = {
                        ind: i,
                        hash: hashTable._hash(key),
                        key: key,
                        value: key,
                    }
                    hashArr.push(elem);
                }
            }
        }

        setHashArrayToShow(hashArr);
    };
   
    return (
            <div>
                <div className='space'></div>
                <div><b>Хеш таблица. Реализован метод цепочек</b></div>
                <div className='space'></div>
                <div>
                    Установите размер хеш таблицы (по умолчанию 20) и введите свой текст вместо установленного по умолчанию. Затем нажмите кнопку ниже.
                </div>
                <div className='space'></div>
                <div className='space'></div>
                <div>
                    Размер хеш таблицы:&nbsp;  
                    <input type='text' value={hashLength} 
                        onChange={e => handleChangeHashLength(e)} 
                        onClick={() => {setHashArrayToShow([]);}}
                        className='inputbox' />
                </div>
                <div className='space'></div>
                <div>
                    <textarea 
                        className='textarea'
                        value={textToHash} 
                        onChange={e => handleTextToHash(e)} 
                        onClick={() => {setHashArrayToShow([]);}}
                        />
                </div>
                <div className='space'></div>
                <div>
                    <button onClick={handleShowHash}>Показать хеш таблицу</button>
                </div>
                <div className='space'></div>
                {hashArrayToShow.length > 0 && (
                    <div >
                        <div><b>Содержимое хеш таблицы:</b></div>
                        <div>
                            {hashArrayToShow.map(item => <div key={item.hash + item.key}>hash: {item.hash}, key/value: {item.key}</div>)}
                        </div>
                    </div>
                )}
            </div>
    )
}
 
export default AlgorithmHashTable;