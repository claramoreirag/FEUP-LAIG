/**
 * MyPrologInterface
 */
class MyPrologInterface{
  constructor() {
    this.port = 8081;
  }

  setPort(port){
    this.port=port;
  }

  sendRequest(requestString,args,requestListener){
    let request = new XMLHttpRequest();
    request.onload = requestListener;

    let argument,func;

    for(let i=0;i<args.length;i++){
      argument+=args[i];
      if(i!=args.length()-1)
        aux+=',';
    }


    if(argument!=undefined)
      func = requestString + '(' + argument + ')';
    else
      func = requestString;

    request.onload = requestListener;
    request.open('GET','http://localhost:' + this.port + '/' + func,true);

    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

    request.send();
  }


  /** Requests */
  requestCheckConnection(){
    this.sendRequest('handshake',[],this.replyCheckConnection);
  }


  /** Replies */
  replyCheckConnection(data){
    console.log(data.target.responseText);
  }

    
}
