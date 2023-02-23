const node = (value, lC  = null, rC = null) => {
    let key = value;
    let left = lC;
    let right = rC;
    

    return {key, left, right}
}

//const A = node('A', null, null);
//console.log(A);

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.key}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

function mergeS(array){
    if(array.length < 2){
        console.log('I hit rock bottom')
        console.log(array);
        return array;
    }
    else{
        let copy = array;
        let index = Math.round(array.length/2);
        console.log('the index is' + index);
        let arrayL = copy.slice(0, index);
        console.log('the left array is ' + arrayL);
        copy = array;
        let arrayR = copy.slice(index);
        console.log(' the right array is ' + arrayR);
        arrayL = mergeS(arrayL);
        arrayR = mergeS(arrayR);
        let sorted = [];
        while ((arrayL.length > 0 ) && (arrayR.length > 0)){
            console.log('while conditions satisfied')
            if(arrayL[0] < arrayR[0]){
                console.log('pushing the value at index 0 of the left array which is ' + arrayL[0])
            sorted = sorted.concat(arrayL.shift());
        }
        else{
            console.log('pushing the value at index 0 of the right array which is ' + arrayR[0])
            const value = [arrayR.shift()];
            console.log(value);
            sorted = sorted.concat(value);
            console.log(sorted);
        }
        } 
        if(arrayL.length === 0){
            sorted = sorted.concat(arrayR);
        }
        else{
            sorted = sorted.concat(arrayL);
        }
        console.log( 'the sorted array getting return is ' + sorted)
        console.log(sorted);
        return sorted;
    }
}

const makeArray = (array) => {
    const newArray = [];
    console.log('incoming array is' + array);
    array.forEach(item =>{
        if(!item.isArray){
            newArray.push(array.shift());
        }
        else{
            newArray.push(makeArray(item));
        }
    })
    console.log('the new array is' + newArray);
    return newArray;
}

const buildTree = (array, sorted) => {
    console.log('building a tree!');
    if(array.length == 0){
        return;
    }
    if(sorted == 0){
        //array = makeArray(array);
        array = mergeS(array);
    }
    console.log(array, array.length);
    const mid = Math.ceil(array.length/2);
    const left = array.slice(0, mid-1);
    console.log('the middle index is' + mid)
    console.log('the middle value is ' + array[mid-1])
    //console.log(start, end, mid);
    console.log('left array is' + left);
    const right = array.slice(mid, array.length);
    console.log('right array is' + right);
    const root = node(array[mid-1]);
    console.log(root)
    console.log(typeof left)
    if(mid-1 !== 0){
        if(left.length !== 1){
            console.log("root is" + root.key)
            root.left = buildTree(left, 1);
            console.log(root.left);
        }
        else{
            
                console.log('I equalled one! L')
                console.log(left[0])
                root.left = node(left[0]);
                console.log(root.left); 
                root.left.left = null;
                root.left.right = null;  
        }
    }
    else{
        console.log('left array was undefined')
        root.left = null;
    }
    if(right.length !== 1){
        root.right = buildTree(right, 1);
        console.log(root.left);
    }
    else{
        if(right !== undefined){
            console.log('I equalled one! R')
            console.log(right)
            root.right = node(right[0]);
            root.right.right = null;
            root.right.left = null;
        }
        else{
            console.log('right array didnt exist!')
            root.right = null;
        }
        

    }
    console.log(root.key);
    return root;
}

const tree = (array) => {
    let root = buildTree(array, 0); 

    const find = (val) => {
        let current = root;
        if(current.key === val){
            return current;
        }
        while(current !== null){
                //console.log('in the while loop!')
                if(val !== current.key){
                    if(val > current.key){
                        //console.log(val + ' is bigger than ' + current.key);
                        if(current.right !== null){
                            //console.log('the right child is ' + current.right.key);
                            current = current.right; 
                        }
                        else{
                            return 'no match';
                        }
                        
                    }
                    else {
                        if(current.left !== null){
                            current = current.left;
                        }
                        else{
                            return 'no match';
                        }
                        
                    }
                     
                }
                else{
                    return current;
                }
                
        }
        return 'no match';
    }

   
    const levelOrder2 = (aNode, aNode2, stored) => {
        console.log('aNode is ' + aNode);
        console.log('aNode2 is ' + aNode2);
        if(aNode !== undefined){
        if(aNode !== null){
            if(!stored.includes(aNode)){
                console.log('pushing ' + aNode.key);
                stored.push(aNode);
            }
            if(!stored.includes(aNode.left)){
                if(aNode.left !== null){
                    console.log('pushing ' + aNode.left.key);
                    stored.push(aNode.left);
                }
            }
            if(!stored.includes(aNode.right)){
                if(aNode.right !== null){
                    console.log('pushing ' + aNode.right.key);
                    stored.push(aNode.right);
                }
                
            } 
        }
    }
    if(aNode2!== undefined){
        if(aNode2 !== null){
            if(!stored.includes(aNode2)){
                console.log('pushing ' + aNode2.key);
                stored.push(aNode2);
            }
            if(!stored.includes(aNode2.left)){
                if(aNode2.left !== null){
                    console.log('pushing ' + aNode2.left.key);
                    stored.push(aNode2.left);
                }
            }
            if(!stored.includes(aNode2.right)){
                if(aNode2.right !== null){
                    console.log('pushing ' + aNode2.right.key);
                    stored.push(aNode2.right);
                }
                
            } 
        }
    }
    if((aNode !== null) && (aNode !== undefined)){
        if((aNode.left !== (null || undefined)) && (aNode.right !== (null || undefined))){
            levelOrder2(aNode.left, aNode.right, stored);
        }
        if(aNode.left !== (null || undefined)){
            levelOrder2(aNode.left, undefined, stored);
        }
        else{
            levelOrder2(undefined, aNode.right, stored);
        }
    }
    if((aNode2 !== null) && (aNode2 !== undefined)){
        if((aNode2.left !== (null || undefined)) && (aNode2.right !== (null || undefined))){
            levelOrder2(aNode2.left, aNode2.right, stored);
        }
        if(aNode2.left !== (null || undefined)){
            levelOrder2(aNode2.left, undefined, stored);
        }
        else{
            levelOrder2(undefined, aNode2.right, stored);
        }
    }
    
        return stored;
    }

    const levelOrder = (func) =>{
        let storage = [];
        storage = levelOrder2(root, undefined, storage);
        if(func !== undefined){
            storage.forEach(nodeItem => 
                nodeItem.func())
        }
        return storage;
    }

    return{root, find, levelOrder}
}

const insert = (val, aTree) => {
    //traverse tree going higher or lower, add as leaf
    console.log('INSERTING!')
    if(aTree.root == null){
        console.log('there was no root! So I made one')
        aTree.root = node(val);
        return;
    }
    let current = aTree.root;
    //let theKey = current.key;
    let previous;
    let side;
    while((current !== null) && (current !== undefined)){
        console.log('in the while loop!')
        if(val > current.key){
            console.log(val + ' is bigger than ' + current.key)
            //go right
            side = 'right';
            previous = current;
            current = current.right;
        }
        else {
            //go left
            side = 'left';
            previous = current;
            current = current.left
        }
    }
    if(side === 'left'){
        previous.left = node(val);
        return;
    }
    else{
        console.log('create right child with the value!');
        console.log(previous);
        previous.right = node(val);
        console.log(previous.right);
        return;
    }
}

const deleteVal = (val, aTree) => {
    
    if(aTree.root == null){
        console.log('no nodes in tree!')
        return;
    }
    //traverse until match
    let current = aTree.root;
    let previous;
    let side;
    while((current !== null) && (current !== undefined)){
        console.log('in the while loop!')
        if(val !== current.key){
            if(val > current.key){
                console.log(val + ' is bigger than ' + current.key)
                //go right
                side = 'right';
                previous = current;
                current = current.right;
            }
            else {
                //go left
                side = 'left';
                previous = current;
                current = current.left
            }
        }
        else{
            if((current.right == null) && (current.left == null)){
                if(side === 'left'){
                    previous.left = null;
                    return;
                }
                else{
                    previous.right = null;
                    return;
                }
            }
            if((current.right !== null) && (current.left !== null)){
                //got to right child, then traverse left until empty
                let byeNode = current;
                current = current.right;
                while(current.left !== null){
                    previous = current;
                    current = current.left;
                }
                byeNode.key = current.key;
                previous.left = current.right;
                return;
            }
            else{
                if(current.left !== null){
                    previous.left = current.left;
                    return;
                }
                else{
                    previous.right = current.right;
                    return;
                }

            }

        }
        
        
    }
    return 'no match!';

}



const testArray = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const testArray2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
//console.log(mergeS(testArray));
const testTree = tree(testArray);
//const testTree2 = tree(testArray2);
console.log('tree root node is: ')
console.log(testTree.root);
//console.log(testTree.root.left.left);
prettyPrint(testTree.root);
insert(14, testTree);
prettyPrint(testTree.root);
insert(3.5, testTree);
prettyPrint(testTree.root);
deleteVal(3.5, testTree);
prettyPrint(testTree.root);
deleteVal(5, testTree);
prettyPrint(testTree.root);
console.log(testTree.find(14));
console.log(testTree.find(15));
console.log(testTree.find(6));
console.log(testTree.find(1));
prettyPrint(testTree.root);
console.log(testTree.levelOrder());

