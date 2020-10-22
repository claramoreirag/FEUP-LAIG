class Stack{
    constructor(){
        this.stack=[];
    }

    pop(){
        return this.stack.pop();
    }

    push(obj){
        this.stack.push(obj);
    }

    isEmpty(){
        return this.stack.length==0;
    }
}