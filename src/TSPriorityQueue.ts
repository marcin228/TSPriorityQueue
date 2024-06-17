type HeapItem<T> = {
    priority:number,
    value:T
}

class TSPriorityQueue<T>{

    private heap:Array<HeapItem<T>>;

    constructor(){

        this.heap = [];
    }

    public add(item:HeapItem<T>):void{

        this.heap.push(item);
        this.heapifyUp();
    }

    public peek():HeapItem<T>|null{
        
        if(this.heap.length == 0)
            return null;
        
        return this.heap[0]!;
    }
 
    public remove():HeapItem<T>|null{
        
        if(this.heap.length == 0)
            return null;

        const item = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown();

        return item;
    }
 
    public isEmpty():boolean{

        if(this.heap.length == 0)
            return true;
        
        return false;
    }

    private getLeftChildIndex(parentIndex:number):number{
    
        return 2 * (parentIndex + 1);
    }
 
    private getRightChildIndex(parentIndex:number):number{

        return 2 * (parentIndex + 2);
    }
 
    private getParentIndex(childIndex:number):number{

        return Math.floor((childIndex - 1) * 0.5);
    }
 
    private hasLeftChild(index:number):boolean{

        return this.getLeftChildIndex(index) < this.heap.length;
    }
 
    private hasRightChild(index:number):boolean{

        return this.getRightChildIndex(index) < this.heap.length;
    }
 
    private hasParent(index:number):boolean{

        return this.getParentIndex(index) >= 0;
    }
 
    private leftChild(index:number):HeapItem<T>{

        return this.heap[this.getLeftChildIndex(index)];
    }
 
    private rightChild(index:number):HeapItem<T>{

        return this.heap[this.getRightChildIndex(index)];
    }
 
    private parent(index:number):HeapItem<T>{

        return this.heap[this.getParentIndex(index)];
    }
 
    private swap(indexOne:number, indexTwo:number):void{

        [this.heap[indexOne], this.heap[indexTwo]] = [this.heap[indexTwo], this.heap[indexOne]];
    }
 
    private heapifyUp():void{

        let index = this.heap.length - 1;
        while(this.hasParent(index) && (this.parent(index).priority > this.heap[index].priority)){
            
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }
 
    private heapifyDown():void{

        let index = 0;
        while(this.hasLeftChild(index)){

            let smallerChildIndex = this.getLeftChildIndex(index);
            
            if(this.hasRightChild(index) && (this.rightChild(index).priority < this.leftChild(index).priority))
                smallerChildIndex = this.getRightChildIndex(index);

            if(this.heap[index].priority < this.heap[smallerChildIndex].priority)
                break;
            else
                this.swap(index, smallerChildIndex);

            index = smallerChildIndex;
        }
    }
}