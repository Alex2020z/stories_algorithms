//Найти слово во фразе: Алгоритм Бойера-Мура-Хорспула
//https://www.youtube.com/watch?v=KIUHWMwavQg&list=PLaYEWc-h_PAeo3bneqrs7bqUxyboBAFVq&index=6

import React, {useState, useRef} from 'react';
import './algorithms.css';

type CharShifts = {
    char: string,
    shift: number,
}

const AlgorithmSearchWordInString: React.FC = () => {
    const [wordToSearch, setWordToSearch] = useState<string>('');
    const [inputText, setInputText] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const [warning, setWarning] = useState<string>('');
    const word = useRef('');
    const text = useRef('');
    const commonShift = useRef<number>(-1);
    const wordShifts = useRef<CharShifts[]>([]);

    const handleWordToSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
            
        if (value.length > 0) {
            setWordToSearch(value);
            word.current = value;
        }
    };

    const handleInputDataText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setWarning('');
        setAnswer('');
        setInputText(e.target.value);
    };

    const handleInputDataTextOnBlur = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setWarning('');

        text.current = e.target.value.trim();

        if (text.current.length === 0) {
            setWarning('Введите фразу для поиска слова.');
        }

        if (text.current.length < word.current.length ) {
            setWarning('Фраза слишком короткая.');
        }
    };

    const handleSearchWord = () => {
        prepareDArrayAndShiftArray();
        searchWordInPhrase();
    };

    const prepareDArrayAndShiftArray = () => {
        const wordArr = word.current.split('');
        const wordLength = wordArr.length;
        const wordShiftArr: Array<number> = new Array(wordLength).fill(-1);

        //calc shifts from the right border for all letters except the last one.
        //нашли О в корОва и для кОрова ищем и находим уже существующую О
        let count = 0;
        for (let i = wordLength - 2; i >= 0 ; i --) {
            const savedShift = tryFindShiftByDuplicatedChar(wordArr, wordShiftArr, wordArr[i], i+1);
            count ++; //always do shift
            wordShiftArr[i] = savedShift === -1 ? count : savedShift;
        }

        //The last letter in the word:
        const savedShift = tryFindShiftByDuplicatedChar(wordArr, wordShiftArr, wordArr[wordLength-1], 0);

        //if not duplicated use wordLength otherwise use value from duplicated shift
        //для молокО для последней буквы сохраняем 3 (по позиции молОко), иначе длину слова коровА (6)
        wordShiftArr[wordLength - 1] = savedShift !== -1 ? savedShift : wordLength;

        const arr: Array<CharShifts> = [];
        for (let i = 0; i < wordLength; i++) {
            arr.push({
                char: wordArr[i],
                shift: wordShiftArr[i],
            });
        }

        commonShift.current = wordLength;
        wordShifts.current = arr;
    
    };

    const tryFindShiftByDuplicatedChar = (wordArr: string[], wordShiftArr: number[], searchChar: string, ind: number): number => {
        let savedShift = -1;

        for (let j = wordShiftArr.length - 2; j >= ind; j --) {
            if (searchChar === wordArr[j]) {
                savedShift = wordShiftArr[j];
            }
        }

        return savedShift;
    };

    const searchWordInPhrase = () => {
        let currInd = 0;
        const wordLength = word.current.length;
        //console.log('wordToSearch=', wordToSearch, ' wordLength=', wordLength, ' commonShift=', commonShift.current, ' wordShifts=', wordShifts.current);

        let iter = 0;
        let successCount = 0;
        const successPosArr: Array<number> = [];

        while (currInd + wordLength <= text.current.length && iter < 100) {
            iter ++;
            //console.log('iter=', iter, ' currentInd=', currentInd, ' text.length=', text.current.length);

            let flag = false;
            let res = 'ok';

            //сравним фразу, начиная с текущей позиции currentInd, и заданное слово. 
            for (let i = wordLength - 1; i >= 0 && !flag; i --) {
                if (text.current[currInd + i] !== word.current[i]) {
                    flag = true;
                    res = 'shift';
                    let ch = '';

                    if (i === wordLength - 1) { 
                        //последняя буква слова не совпадает с буквой в тек.позиции в слове => будем сдвигаться в зависимости от буквы во фразе, найденной со сдвигом на длину слова
                        ch = text.current[currInd + wordLength - 1]
                    } else {
                        //уже были совпадения букв слова и фразы => будем сдвигаться в зависимости от значения сдвига для последней буквы слова 
                        ch = word.current[wordLength - 1];
                    }

                    currInd += getShiftByChar(ch);
                }
            }

            if (res === 'ok') {
                //console.log('FOUND RES!!!', ' iter=', iter, ' currentInd=', currentInd);
                successCount ++;
                successPosArr.push(currInd); //сохраняем позицию во фразе, где есть совпадение со словом
                currInd += wordLength;
            }
        }

        let message = '';
        if (successCount > 0) {
            message = `Слово '${word.current}' было найдено ${successCount} раз(а), начиная с позиций ${successPosArr.join(', ')}.`;
        } else {
            message = `Слово ${word.current} не содержится в заданной фразе.`;
        }

        setAnswer(message);
    };

    const getShiftByChar = (ch: string): number => {
        for (let i = 0; i < wordShifts.current.length; i ++) {
            if (ch === wordShifts.current[i].char) {
                return wordShifts.current[i].shift;
            }
        }

        return commonShift.current;
    };

    return (
            <div>
                <div className='space'></div>
                <div><b>Алгоритм Бойера-Мура-Хорспула: найти слово во фразе.</b></div>
                <div className='space'></div>
                <div>Пример: ищем слово 'слово' во фразе 'любой текст состоит из слов и не надо удивляться, что слово за словом может повторяться'</div>
                <div>'слово' находится в этой фразе 2 раз(а), начиная с позиций 54, 63.</div>
                <div className='space'></div>
                <div>
                    Задайте слово для поиска: 
                    <input type='text' value={wordToSearch} onChange={handleWordToSearch} />
                </div>
                <div className='space'></div>
                <div>Задайте массив чисел: </div>
                <div><textarea value={inputText} 
                        onChange={e => handleInputDataText(e)} 
                        onBlur={handleInputDataTextOnBlur} 
                        onClick={() => {setAnswer('');}} 
                        style={{height: '200px'}} />
                </div>
                <div className='space'></div>
                {warning && (<div style={{color: 'red'}}>{warning}</div>)}
                <div className='space'></div>
                <div><button onClick={handleSearchWord} disabled={warning.length > 0}>Найдите слово во фразе!</button></div>
                {answer.length > 0 && (<div>Ответ: {answer}</div>)}
            </div>
    )
}
 
export default AlgorithmSearchWordInString;
