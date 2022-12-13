//AVL-trees: https://habr.com/ru/post/150732/

import React, {useState, useRef} from 'react';
import {isNumeric} from '../utils/utils';
import {Tree} from './tree';
import './algorithms.css';

const AlgorithmTree: React.FC = () => {
    const [inputDataText, setInputDataText] = useState<string>('');
    const [nodeToAdd, setNodeToAdd] = useState<string>('');
    const [nodeToDelete, setNodeToDelete] = useState<string>('');
    const [answer, setAnswer] = useState<string[]>([]);
    const [round, setRound] = useState<string>('');
    const [warning, setWarning] = useState<string>('');
    const tree = useRef(new Tree());
    
    const handleInputDataText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setWarning('');
        setAnswer([]);
        setRound('');
        tree.current = new Tree();
        setInputDataText(e.target.value);
    };

    const handleInputDataTextOnBlur = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setWarning('');
        const value = e.target.value.trim();
        const arr = value.split(' ');

        if (arr.filter(item => !isNumeric(item)).length === 0) {
            setInputDataText(value);
        } else {
            setWarning('Некорректные данные в массиве.');
        }
    };

    //algorithm: AVL-tree
    const handleAddTree = () => {
        //console.log('TREE STARTED');
        const arr = inputDataText.split(' ');
        const myTree: Tree = new Tree();

        for (let i = 0; i < arr.length; i ++) {
            myTree.addNode(parseInt(arr[i]));
        }

        tree.current = myTree;
        tree.current.showTree('Created tree');
        setAnswer(tree.current.getLayers());

        //console.log('TREE COMPLETED');
    };

    const handleNodeToAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        if (isNumeric(value)) {
            setNodeToAdd(value);
        }
    };

    const handleNodeToDelete = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        if (isNumeric(value)) {
            setNodeToDelete(value);
        }
    };

    const handleAddNode = () => {
        const key = parseInt(nodeToAdd);

        if (tree.current) {
            if (tree.current.addNode(key)) {
                setAnswer(tree.current.getLayers());
            }

            tree.current.showTree(`handleAddNode - after adding ${key}`);
        } 
    };

    const handleRemoveNode = () => {
        const key = parseInt(nodeToDelete);

        if (tree.current) {
            if (tree.current.deleteNode(key)) {
                setAnswer(tree.current.getLayers());
            }

            tree.current.showTree(`handleRemoveNode - after removal  ${key}`);
        } 
    };

    const handleRound = () => {
        const res = tree.current.doRound();
        setRound(res); 
    };

    return (
            <div>
                <div><b>АВЛ-дерево: Добавление, удаление узлов, балансировка</b></div>
                <div className='space'></div>
                <div>Примеры задания дерева:</div>
                <div>50 30 70 20 40 10 или 50 30 70 60 80 90 или 50 30 60 10 40 20 19 28 </div>
                
                <div className='space'></div>
                <div>Задайте массив целых чисел: </div>
                <div><textarea value={inputDataText} 
                        onChange={e => handleInputDataText(e)} 
                        onBlur={handleInputDataTextOnBlur} 
                        onClick={() => {setAnswer([]);tree.current = new Tree();setRound('');}} 
                        style={{height: '200px'}} />
                </div>
                {warning && (<div style={{color: 'red'}}>{warning}</div>)}
                <div><button onClick={handleAddTree} disabled={warning.length > 0}>Покажите дерево</button></div>
                <div className='space'></div>
                <div>
                    Задайте новый узел для добавления: <input type='text' value={nodeToAdd} onChange={handleNodeToAdd} className='inputbox' />&nbsp;&nbsp;
                    <button onClick={handleAddNode} disabled={warning.length > 0}>Добавьте узел</button>
                </div>
                <div>
                    Задайте существующий узел для удаления: <input type='text' value={nodeToDelete} onChange={handleNodeToDelete} className='inputbox' />&nbsp;&nbsp;
                    <button onClick={handleRemoveNode} disabled={warning.length > 0}>Удалите узел</button>
                </div>
                {answer.length > 0 && (
                    <div>Ответ:{answer.map((item, id)=> <div key={id}>{item}</div>)}</div>
                )}
                <div className='space'></div>
                <div><button onClick={handleRound} disabled={warning.length > 0}>Сделать обход!</button></div>
                <div className='space'></div>
                {round.length > 0 && (
                    <div>
                        Результат обхода:{round}
                    </div>
                )}
                <div className='space'></div>
                <div className='bordertop'></div>
                <div><b>Иллюстрация вращений:</b></div>
                <div className='space'></div>
                <div className='boxes'>
                    <div>
                        <div><b>Малое левое вращение</b>: используется тогда, когда разница высот a-поддерева и b-поддерева равна 2 и высота С не больше высоты R</div>
                        <div className='box'><img src={'https://upload.wikimedia.org/wikipedia/ru/b/bc/AVL_LR.GIF'} alt='Малое левое вращение' />&nbsp;</div>
                    </div>
                    <div>
                        <div><b>Большое левое вращение</b>: используется тогда, когда разница высот a-поддерева и b-поддерева равна 2 и высота c-поддерева больше высоты R.</div>
                        <div className='box'><img src={'https://upload.wikimedia.org/wikipedia/ru/1/16/AVL_BR.GIF'} alt='Большое левое вращение' /></div>
                    </div>
                    <div>
                        <div><b>Малое правое вращение</b>: используется тогда, когда разница высот a-поддерева и b-поддерева равна 2 и высота С не больше высоты L</div>
                        <div className='box'><img src={'https://upload.wikimedia.org/wikipedia/ru/e/e8/AVL_LL.GIF'} alt='Малое правое вращение' />&nbsp;</div>
                    </div>
                    <div>
                        <div><b>Большое правое вращение</b>: используется тогда, когда разница высот a-поддерева и b-поддерева равна 2 и высота c-поддерева больше высоты L.</div>
                        <div className='box'><img src={'https://upload.wikimedia.org/wikipedia/ru/7/74/AVL_BL.GIF'} alt='Большое правое вращение'/></div>
                    </div>
                    <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                </div>

            </div>
    )
}
 
export default AlgorithmTree;
//https://ru.wikipedia.org/wiki/%D0%90%D0%92%D0%9B-%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%BE
