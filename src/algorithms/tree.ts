//AVL-trees: https://habr.com/ru/post/150732/
//https://itchief.ru/javascript/associative-arrays
//https://habr.com/ru/post/102006/

export type TreeNode = {
    id: number;
    parent: number  | null;
    left: number  | null;
    right: number  | null;
    height: number;
} 

export class Tree {
    treeArr: Map<number, TreeNode> = new Map();

    createNode(parent: number | null, key: number): TreeNode {
        const node: TreeNode = {
            height: 0,
            id: key,
            parent: parent,
            left: null,
            right: null,
        }

        this.treeArr.set(key, node);
        return node;
    }

    getTopKey(): number {
        for (let pair of this.treeArr.entries()) {
            if (pair[1].parent === null) {
                return pair[0];
            }
          }

        return 0;
    }

    getTreeSize(): number {
        return this.treeArr.size;
    }

    getNodeById(key: number): TreeNode {
        const obj = this.treeArr.get(key);
        if (obj) {
            return obj;
        } else {
            console.log('=====WRONG key in getNodeById:', key);
            const node: TreeNode = {height: 0, id: -1, parent: null, left: null, right: null,};
            return node;
        }
    }

    getInitialParentId(key: number) {
        if (key === -1) {
            return this.getTopKey();
        }

        return key;
    }

    removeNodeById(key: number) {
        this.treeArr.delete(key);
    }

    hasNodeById(id: number) {
        return this.treeArr.has(id); 
    }

    isEmpty() {
        return this.treeArr.size === 0;
    }

    showTree(comment: string = '') {
    /*
        if (comment) console.log(comment);
        for (let value of this.treeArr.values()) {
            console.log(value);
        }
    */
    }

    addNode(id: number, current: number = -1) {
        if (this.hasNodeById(id)) {
            console.log(`The key ${id} is not unique!`);
            return false;
        }

        if (this.isEmpty()) {
            this.createNode(null, id);
            return true;
        } 

        const node = this.getNodeById(this.getInitialParentId(current));

        if (id < node.id) {
            if (node.left !== null) {
                this.addNode(id, node.left);  
            } else {
                const newNode = this.createNode(node.id, id);
                node.left = newNode.id;
            }
        } else { //if (val > node.id) 
            if (node.right !== null) {
                this.addNode(id, node.right);  
            } else {
                const newNode = this.createNode(node.id, id);
                node.right = newNode.id;
            }
        }

        this.doBalance(); 
        this.showTree(`Tree after adding: `);
    }

    deleteNode(id: number) {
        if (!this.hasNodeById(id)) {
            console.log(`The key ${id} doesn't exist in the tree!`);
            return false;
        }

        const node = this.getNodeById(id);

        //option 1: the node has neither left nor right nodes:
        if (node.left === null && node.right === null) {
            const parentId = node.parent;

            if (parentId !== null) {
                const parentNode = this.getNodeById(parentId);
                //console.log('OPT 1, parentId=', parentId, ' parentNode=', parentNode);

                if (parentNode.left && parentNode.left === node.id) {
                    parentNode.left = null;
                    //console.log(`OPT 1 left`);
                } else {
                    parentNode.right = null;
                    //console.log(`OPT 1 right`);
                }
            }

            this.removeNodeById(node.id);
        }

        //option 2a: the node has left node:
        else if (node.left !== null && node.right === null) {
            //console.log(`node.left=`, node.left);
            const parentId = node.parent;

            if (parentId === null) {
                const leftNode = this.getNodeById(node.left);
                leftNode.parent = null;
                //console.log(`OPT 2a set null`);
            } else {
                const parentNode = this.getNodeById(parentId);
                const childNode = this.getNodeById(node.left);

                childNode.parent = parentNode.id;
    
                if (node.id < parentNode.id) {
                    parentNode.left = node.left; //10 3 12 1 del 3
                    //console.log(`OPT 2a not-null - reset left`);
                } else {
                    parentNode.right = node.left;
                    //console.log(`OPT 2a not-null - reset right`);
                }
            }

            this.removeNodeById(node.id);
        }

        //option 2b: the node has right node:
        else if (node.right !== null && node.left === null) {
            const parentId = node.parent;

            if (parentId === null) {
                const rightNode = this.getNodeById(node.right);
                rightNode.parent = null;
                //console.log(`OPT 2b set null`);
            } else {
                const parentNode = this.getNodeById(parentId);
                const childNode = this.getNodeById(node.right);

                childNode.parent = parentNode.id;

                if (node.id < parentNode.id) {
                    parentNode.left = node.right;   //10 3 12 4 del 3
                    //console.log(`OPT 2b not-null - reset left`);
                } else {
                    parentNode.right = node.right;
                    //console.log(`OPT 2b not-null - reset right`);
                }
            }

            this.removeNodeById(node.id);
        } 
        
        //node has left and right:
        else if (node.left !== null && node.right !== null) {
            //find in left branch the most right leaf:
            const mostRightLeafId = this.findMostRightLeaf(node.left);
            const mostRightLeaf = this.getNodeById(mostRightLeafId);
            node.id = mostRightLeaf.id;

            if (mostRightLeaf.parent) {
                const mrlParent = this.getNodeById(mostRightLeaf.parent);

                if (mostRightLeaf.left) {  //50 30 60 10 40 20 19 28 27
                    mrlParent.right = mostRightLeaf.left;
                    //get son and set its parent
                    const leftSon = this.getNodeById(mostRightLeaf.left);
                    leftSon.parent = mostRightLeaf.parent;

                    //console.log(`===mrlParent=`, mrlParent);
                } else { //clear parent ref on it:   //50 30 60 10 40 20 19 28
                    mrlParent.right = null;
                }
            }

            this.removeNodeById(mostRightLeafId);
        }

        this.doBalance(); 

        this.showTree(`Tree after deletion: `);
        return true;
    }

    findMostRightLeaf(nodeId: number): number {
        const node = this.getNodeById(nodeId);
        if (node.right) {
            return this.findMostRightLeaf(node.right);
        } else {
            return node.id; 
        }
    }

    getLayers(): Array<string> {
        const depthArr: Array<string> = new Array(this.getTreeSize()).fill('');
        this.distributeKeysByLayers(depthArr, 0);
        return depthArr;
    }

    distributeKeysByLayers(depthArr: Array<string>, level: number, currentId = -1) {
        if (depthArr.length === 0) return;
        const node = this.getNodeById(this.getInitialParentId(currentId));
        depthArr[level] = depthArr[level] + node.id + ' ';

        if  (node.left !== null) {
            this.distributeKeysByLayers(depthArr, level + 1, node.left);
        }

        if  (node.right !== null) {
            this.distributeKeysByLayers(depthArr, level + 1, node.right);
        }
    }

    doRound(currentId = -1): string { //Обход
        const node = this.getNodeById(this.getInitialParentId(currentId));

        let res = '';
        if  (node.left !== null) res += this.doRound(node.left);
        res += `${node.id} `;
        if  (node.right !== null) res += this.doRound(node.right);
        return res;
    }

    getAllHeights() {
        for (let pair of this.treeArr.entries()) {
            const node = pair[1];
            node.height = this.getHeightByNode(node);
        }

        this.showTree('see heights:');
    }

    getHeightByNode(node: TreeNode) {
        const leftHeight = node.left ? this.getNodeHeight(node.left) : 0;
        let rightHeight = node.right ? this.getNodeHeight(node.right) : 0;
        return rightHeight - leftHeight;
    }

    //void fixheight(node* p){unsigned char hl = height(p->left);	unsigned char hr = height(p->right);	p->height = (hl>hr?hl:hr)+1;}
    getNodeHeight(id: number): number {
        const node = this.getNodeById(id);
        const leftHeight = node.left ? this.getNodeHeight(node.left) : 0;
        const rightHeight = node.right ? this.getNodeHeight(node.right) : 0;
        return (!node.left && !node.right) ? 0 : Math.max(leftHeight, rightHeight) + 1;
    }

    doBalance() {
        this.getAllHeights();
        this.showTree('tree after calc. height');

        for (let key of this.treeArr.keys()) {
            this.doBalanceById(key);
        }
    }

    doBalanceById(id: number) {
        const node = this.getNodeById(id);
        const nodeLeft = node.left ? this.getNodeById(node.left) : null;
        const nodeRight = node.right ? this.getNodeById(node.right) : null;

        if (node.height > 1) {
            if (nodeLeft && nodeRight) {
                if (nodeLeft.height <= nodeRight.height) {
                    //console.log('1 - ПРОСТОЙ ПОВОРОТ ВЛЕВО nodeLeft.height=', nodeLeft.height, ' nodeRight.height=', nodeRight.height);
                    this.rotateLeft(node.id);
                } else {
                    //console.log('1 - БОЛЬШОЙ ПОВОРОТ ВЛЕВО nodeLeft.height=', nodeLeft.height, ' nodeRight.height=', nodeRight.height);
                    this.rotateLeft(nodeLeft.id);
                    this.rotateRight(node.id);
                }
            } else if (nodeRight) {
                //console.log('2 - ПРОСТОЙ ПОВОРОТ ВЛЕВО nodeRight.height=', nodeRight.height);
                this.rotateLeft(node.id);
            } else  if (nodeLeft) {
                //console.log('2 - БОЛЬШОЙ ПОВОРОТ ВЛЕВО nodeLeft.height=', nodeLeft.height);
                this.rotateLeft(nodeLeft.id);
                this.rotateRight(node.id);
        }
        } else if (node.height < -1) {
            if (nodeLeft && nodeRight) {
                if (nodeLeft.height <= nodeRight.height) {
                    //console.log('1 - ПРОСТОЙ ПОВОРОТ НАПРАВО nodeLeft.height=', nodeLeft.height, ' nodeRight.height=', nodeRight.height);
                    this.rotateRight(node.id);
                } else {
                    //console.log('1 - БОЛЬШОЙ ПОВОРОТ НАПРАВО nodeLeft.height=', nodeLeft.height, ' nodeRight.height=', nodeRight.height);
                    this.rotateRight(nodeRight.id);
                    this.rotateLeft(node.id);
                }
            } else if (nodeLeft) {
                //console.log('2 - ПРОСТОЙ ПОВОРОТ НАПРАВО nodeRight.height=', nodeLeft.height);
                this.rotateRight(node.id);
            } else  if (nodeRight) {
                //console.log('2 - БОЛЬШОЙ ПОВОРОТ НАПРАВО nodeLeft.height=', nodeRight.height);
                this.rotateRight(nodeRight.id);
                this.rotateLeft(node.id);
            }
        }
    }

    /*node* rotateright(node* p) { // правый поворот вокруг p
    	node* q = p->left;	p->left = q->right;	q->right = p;	fixheight(p);	fixheight(q);  }*/
    rotateRight(nodeId: number) {
        const node = this.getNodeById(nodeId);

        if (node.left === null) return;
        const nodeLeft = this.getNodeById(node.left);

        let nodeLeftRight = null;
        if (nodeLeft.right !== null) {
            nodeLeftRight = this.getNodeById(nodeLeft.right);
        }

        //console.log('====RRB node=', node.id, ' ', node.parent, ' ', node.left, ' ', node.right);

        nodeLeft.parent = node.parent;
        node.parent = nodeLeft.id;

        const saveNodeLeftRight = nodeLeft.right; 
        nodeLeft.right = nodeId;
        node.left = saveNodeLeftRight;

        if (nodeLeftRight) {
            nodeLeftRight.parent = node.id;
            nodeLeftRight.height = this.getHeightByNode(nodeLeftRight);
        }

        node.height = this.getHeightByNode(node);
        nodeLeft.height = this.getHeightByNode(nodeLeft);
        //console.log('====RRA node=', node.id, ' ', node.parent, ' ', node.left, ' ', node.right);
        //console.log('====RRA nodeLeft=', nodeLeft.id, ' ', nodeLeft.parent, ' ', nodeLeft.left, ' ', nodeLeft.right);
    }

    rotateLeft(nodeId: number) {
        const node = this.getNodeById(nodeId);

        if (node.right === null) return;
        const nodeRight = this.getNodeById(node.right);

        let nodeRightLeft = null;
        if (nodeRight.left !== null) {
            nodeRightLeft = this.getNodeById(nodeRight.left);
        }

        //console.log('====RLB node=', node.id, ' ', node.parent, ' ', node.left, ' ', node.right);

        nodeRight.parent = node.parent;
        node.parent = nodeRight.id;

        const saveNodeRightLeft = nodeRight.left; 
        nodeRight.left = nodeId;
        node.right = saveNodeRightLeft;

        if (nodeRightLeft) {
            nodeRightLeft.parent = node.id;
            nodeRightLeft.height = this.getHeightByNode(nodeRightLeft);
        }

        node.height = this.getHeightByNode(node);
        nodeRight.height = this.getHeightByNode(nodeRight);

        //console.log('====RLA node=', node.id, ' ', node.parent, ' ', node.left, ' ', node.right);
        //console.log('====RLA nodeRight=', nodeRight.id, ' ', nodeRight.parent, ' ', nodeRight.left, ' ', nodeRight.right);
    }

};
