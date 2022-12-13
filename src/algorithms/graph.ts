//Поиск в глубину: https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA_%D0%B2_%D0%B3%D0%BB%D1%83%D0%B1%D0%B8%D0%BD%D1%83
//Поиск в ширину: https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA_%D0%B2_%D1%88%D0%B8%D1%80%D0%B8%D0%BD%D1%83
//Алгоритм Дейкстры. Поиск оптимальных маршрутов на графе https://habr.com/ru/post/111361/

enum Colors {
    white,
    grey,
    black,
}

export type GraphEdge = {
    startId: number;
    endId: number;
    weight: number;
    color: Colors;
} 

export type DeikstraEdge = {
    index: number; // общее число узлов
    path: number;  // длина пути из заданного узла
    lastChangedEdge: number; //содержит последний узел, в котором произошел пересчет маршрута на более короткий  
    isVisited: boolean; //все пути из этой вершины были учтены
} 

export class Graph {
    vertexNumber: number;
    graphArr: Array<GraphEdge>;

    constructor () {
        this.vertexNumber = -1;
        this.graphArr = [];
    }

    initializeGragh(edgeArrStr: string) {
        const graphArr: Array<string> = edgeArrStr.trim().split('\n');
                
        for (let i = 0; i < graphArr.length; i++) {
            this.findMaxVertexIndex(graphArr[i]);
            this.addEdge(graphArr[i]);
        }
    }

    findMaxVertexIndex(edgeStr: string) {
        const arr = edgeStr.split('/');
        this.vertexNumber = Math.max(parseInt(arr[0]), parseInt(arr[1]), this.vertexNumber);
    }

    addEdge(edgeStr: string) {
        const arr = edgeStr.split('/');
        const edge: GraphEdge = {
            startId: parseInt(arr[0]),
            endId: parseInt(arr[1]),
            weight: arr.length > 2 ? parseInt(arr[2]) : 0,
            color: Colors.white,
        }

        this.graphArr.push(edge);
    }

    /*
    Пройдём по всем вершинам v.
        Если вершина v белая, выполним для неё DFS(v).
    Процедура DFS (параметр — вершина v):
        1. Перекрашиваем вершину u в серый цвет.
        2. Для всякой вершины {w, смежной с вершиной u и окрашенной в белый цвет, 
        рекурсивно выполняем процедуру DFS(w)[2].
        3. Перекрашиваем вершину u в чёрный цвет.
    */
    doDepthFirstSearch(selectedVertex: number) {
        for (let i = 0; i < this.graphArr.length; i ++) {
            const iEdge = this.graphArr[i];

            if (iEdge.startId === selectedVertex) {
                this.dfs(i, false);  //запускаем процесс для выделенной вершины
            } else if (iEdge.endId === selectedVertex) {
                this.dfs(i, true);   //запускаем процесс для выделенной вершины
            }
        }
        console.log('Vertex ', selectedVertex, ' colored');
    }

    dfs(ind: number, isStartId: boolean) {
        const selEdge = this.graphArr[ind]; //найдем ребро по ind
        const selectedVertex = isStartId ? selEdge.startId : selEdge.endId; //найдем интересующую нас вершину

        if (selEdge.color === Colors.white) {
            selEdge.color = Colors.black;

            for (let i = 0; i < this.graphArr.length; i ++) {
                const iEdge = this.graphArr[i];

                if (iEdge.color === Colors.white) {
                    if (iEdge.startId === selectedVertex) {
                        this.dfs(i, false); //запускаем процесс для смежной вершины
                    } else if (iEdge.endId === selectedVertex) {
                        this.dfs(i, true); //запускаем процесс для смежной вершины
                    }
                }
            }

            console.log('Vertex ', selectedVertex, ' colored');
        }
    }

    /*
    Поиск в ширину работает путём последовательного просмотра отдельных уровней графа, начиная с узла-источника {\displaystyle u}u.
    Рассмотрим все рёбра {\displaystyle (u,v)}(u,v), выходящие из узла {\displaystyle u}u. 
    Если очередной узел {\displaystyle v}v является целевым узлом, то поиск завершается; в противном случае узел {\displaystyle v}v 
    добавляется в очередь. После того, как будут проверены все рёбра, выходящие из узла {\displaystyle u}u, из очереди извлекается 
    следующий узел {\displaystyle u}u, и процесс повторяется.
    */
    doBreadthFirstSearch(selectedVertex: number) {
        const bfsArr: Array<GraphEdge> = [];

        for (let i = 0; i < this.graphArr.length; i ++) {
            const iEdge = this.graphArr[i];

            if (iEdge.startId === selectedVertex) {
                bfsArr.push(iEdge); //кладем в очередь ребро с выделенной вершиной
            } else if (iEdge.endId === selectedVertex) {
                bfsArr.push(iEdge); //кладем в очередь ребро с выделенной вершиной
            }
        }
       
        while(bfsArr.length > 0) {
            this.bfs(bfsArr);
        }
    }

    bfs(bfsArr: Array<GraphEdge>) {
        const selEdge = bfsArr.shift();
        if (!selEdge) return;

        selEdge.color = Colors.black;
        console.log('selEdge= ', selEdge, ' colored');

        for (let i = 0; i < this.graphArr.length; i ++) {
            const iEdge = this.graphArr[i];

            if (iEdge.color === Colors.white && 
                !bfsArr.includes(iEdge)) {

                if (selEdge.startId === iEdge.startId || 
                    selEdge.endId === iEdge.startId ||
                    selEdge.startId === iEdge.endId || 
                    selEdge.endId === iEdge.endId) {
                    bfsArr.push(iEdge);
                }
            }
        }
    }

    //Deikstra Algorithm:
    doDeikstraSearch(selectedVertex: number): Array<DeikstraEdge> {
        const edges: Array<DeikstraEdge> = [];

        //initialize edges array:
        for (let i = 0; i < this.vertexNumber + 1; i++) {
            edges.push({
                index: i, 
                path: i === selectedVertex ? 0 : Infinity,
                lastChangedEdge: selectedVertex,
                isVisited: false, 
            });
        }

        //calc edges:
        this.ds(edges, selectedVertex);

        return edges;
    }

    ds(edges: Array<DeikstraEdge>, selectedVertex: number) {
        console.log('STARTED vertex: ', selectedVertex, ' edges[',selectedVertex,']=', edges[selectedVertex]);

        //check if we now have shorter pathes:
        const selectedEdges = this.graphArr.filter(item => item.startId === selectedVertex && !edges[item.endId].isVisited);

        for (let i = 0; i < selectedEdges.length; i ++) {
            const iEdge = selectedEdges[i];
            const iD = edges[iEdge.endId];
            const sum = edges[selectedVertex].path + iEdge.weight;
            console.log('iEdge.startId === selectedVertex: ', selectedVertex, ' iD=', iD);

            if (sum < iD.path) {
                //found a shorter path:                
                iD.path = sum;
                iD.lastChangedEdge = iEdge.startId;
                console.log('found short path=', iD.path, ' iD.lastChangedEdge=', iD.lastChangedEdge);
            }
        }

        edges[selectedVertex].isVisited = true;
        console.log('DONE vertex: ', selectedVertex, ' edges[', selectedVertex,']=', edges[selectedVertex]);

        //Search minimal path in unvisited vertices:
        let minPath = Infinity;
        let newVertex = -1;
        for (let i = 0; i < edges.length; i ++) {
            if (!edges[i].isVisited && edges[i].path !== Infinity && edges[i].path < minPath) {
                minPath = edges[i].path;
                newVertex = i;
            }
        }

        if (newVertex !== -1) {
            this.ds(edges, newVertex);
        }
    }

    showDeikstra(edges: Array<DeikstraEdge>, comment: string = '') {
        if (comment) console.log(comment);
        for (let i = 0; i < edges.length; i ++) {
            console.log(edges[i]);
        }
    }

    showGraph(comment: string = '') {
        if (comment) console.log(comment);
        console.log('vertexNumber=', this.vertexNumber);
        for (let i = 0; i < this.graphArr.length; i ++) {
            console.log(this.graphArr[i]);
        }
    }
};

export const checkInputGraph = (graphStr: string): boolean => {
    const graphArr = graphStr.split('\n');
    if (graphArr.length === 0) {
        return false;
    }

    for (let i = 0; i < graphArr.length; i++) {
        const arr = graphArr[i].trim().split('/');

        if (arr.length < 2 || arr.length > 3) {
            return false;
        }

        for (let j = 0; j < arr.length; j ++) {
            if (!containsOnlyNumbers(arr[j])) {
                return false;
            }
            if (parseInt(arr[j]) < 0) {
                return false;
            }
        }
    }
    
    return true;
};

function containsOnlyNumbers(str: string) {
    return /^\d+$/.test(str);
  }