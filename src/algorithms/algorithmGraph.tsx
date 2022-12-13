//Поиск в глубину: https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA_%D0%B2_%D0%B3%D0%BB%D1%83%D0%B1%D0%B8%D0%BD%D1%83
//Поиск в ширину: https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA_%D0%B2_%D1%88%D0%B8%D1%80%D0%B8%D0%BD%D1%83
//Алгоритм Дейкстры. Поиск оптимальных маршрутов на графе https://habr.com/ru/post/111361/

import React, {useState, useRef} from 'react';
import {Graph, checkInputGraph, GraphEdge, DeikstraEdge} from './graph';
import {isNumeric} from '../utils/utils';
import './algorithms.css';

const AlgorithmGraph: React.FC = () => {
    const [inputDataText, setInputDataText] = useState<string>('');
    const [initVertex, setInitVertex] = useState<number>(0);
    const [vertexNumber, setVertexNumber] = useState<number>(0);
    const [answer1, setAnswer1] = useState<GraphEdge[]>([]);
    const [answer2, setAnswer2] = useState<GraphEdge[]>([]);
    const [answer3, setAnswer3] = useState<DeikstraEdge[]>([]);
    const [warning, setWarning] = useState<string>('');
    const graph = useRef(new Graph());
    
    const handleInputDataText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setWarning('');
        setAnswer1([]);
        setAnswer2([]);
        setAnswer3([]);
        graph.current = new Graph();
        setInputDataText(e.target.value);
    };

    const handleInitVertex = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (isNumeric(value) && parseInt(value) >= 0) {
            setInitVertex(parseInt(value));
        }
    };

    const handleInputDataTextOnBlur = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setWarning('');
        const value = e.target.value.trim();

        if (checkInputGraph(value)) {
            graph.current.initializeGragh(value);
            setInputDataText(value);
            graph.current.showGraph('Init Graph:');
            setVertexNumber(graph.current.vertexNumber);
        } else {
            setWarning('Некорректные данные в описании графа.');
        }
    };

    const handleDFS = () => {
        graph.current.doDepthFirstSearch(0);
        //graph.current.showGraph('Final Graph:');
        setAnswer1(graph.current.graphArr);
    };

    const handleBFS = () => {
        graph.current.doBreadthFirstSearch(0);
        //graph.current.showGraph('Final Graph:');
        setAnswer2(graph.current.graphArr);
    };

    const handleDeikstra = () => {
        const dArr = graph.current.doDeikstraSearch(initVertex);
        setAnswer3(dArr);
    };

    return (
            <div>
                <div className='space'></div>
                <div><b>Алгоритмы для графов (DFS, BFS, Дейкстры)</b></div>
                <div className='space'></div>
                <div>Пример задания 1-направленного графа (для DFS и BFS граф делается 2-направленным автоматически):</div>
                <div>0/1 (ребро из вершины 0 в вершину 1)</div>
                <div>0/2 (ребро из вершины 0 в вершину 2)</div>
                <div>или</div>
                <div>0/1/5 (ребро из вершины 0 в вершину 1, вес ребра 0-1 равен 5)</div>
                <div>0/2/7 (ребро из вершины 0 в вершину 2, вес ребра 0-2 равен 7)</div>
                <div className='space'></div>
                <div>Задайте описание графа: </div>
                <div><textarea value={inputDataText} 
                        onChange={e => handleInputDataText(e)} 
                        onBlur={handleInputDataTextOnBlur} 
                        onClick={() => {setAnswer1([]);setAnswer2([]);setAnswer3([]);graph.current = new Graph();}} 
                        style={{height: '200px'}} />
                </div>
                {warning && (<div style={{color: 'red'}}>{warning}</div>)}
                <div><button onClick={handleDFS} disabled={warning.length > 0}>Алгоритм: Поиск в глубину (DFS)</button></div>
                {answer1.length > 0 && (
                    <div>
                        Ответ:{answer1.map((item, id)=> <div key={id}>start={item.startId} end={item.endId} color={item.color}</div>)}
                    </div>
                )}
                <div className='space'></div>
                <div>
                    <button onClick={handleBFS} disabled={warning.length > 0}>Алгоритм: Поиск в ширину (BFS)</button>
                </div>
                {answer2.length > 0 && (
                    <div>
                        Ответ:{answer2.map((item, id)=> <div key={id}>start={item.startId} end={item.endId} color={item.color}</div>)}
                    </div>
                )}
                <div className='space'></div>
                <div>
                    <div>
                        Задайте начальную вершину для вычисления кратчайшего пути к остальным (0 - {vertexNumber}): &nbsp;
                        <input type='text' value={initVertex} onChange={e => handleInitVertex(e)} className='inputbox' />
                    </div>
                    <div><button onClick={handleDeikstra} disabled={warning.length > 0}>Алгоритм Дейкстры: поиск кратчайшего пути</button></div>
                </div>
                {answer3.length > 0 && (
                    <div>
                        Ответ:{answer3.map((item, id)=> <div key={id}>index={item.index} path={item.path} lastChangedEdge={item.lastChangedEdge} isVisited={item.isVisited.toString()}</div>)}
                    </div>
                )}
                <div className='space'></div>
                <div className='bordertop'></div>
                <div className='space'><b>Иллюстрация к примеру 1-направленного графа:</b></div>
                <div className='space'></div>
                <div className='space'></div>
                <div><img src='https://habrastorage.org/r/w1560/getpro/habr/post_images/693/49d/f50/69349df50d9ca60c1fff348e9b0b40ad.jpg' className='img' alt='Пример графа для алгоритма Дейкстры' /></div>
            </div>
    )
}
 
export default AlgorithmGraph;

/*
примеры для DFS & BFS:
1/2
0/1
0/5
4/5
2/3

примеры для DEIKSTRA:
        0/1/10
        0/2/30
        0/3/50
        0/4/10
        2/4/10
        4/2/10
        3/2/20
        3/1/40
        4/0/10
        4/3/30
    И
1/2/10
0/1/20
0/5/1
4/5/3
2/3/4        

*/