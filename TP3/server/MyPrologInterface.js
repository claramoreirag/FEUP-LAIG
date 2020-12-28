/**
 * MyPrologInterface
 */
class MyPrologInterface{
  constructor() {
    this.request=null;
    this.port = 8081;
  }

  sendRequest(requestString,args,listener){
    let request = new XMLHttpRequest();
    request.onLoad = requestListener;

    let arguments;

    for(int i=0;i<args.length();i++){)
      arguments+=args[i];
      if(i!=args.length()-1)
        aux+=',';
    }

    func = requestString + '(' + arguments + ')';

    request.open('GET','http://localhost:'+this.port+'/'+func,true);

    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

    request.send();
  }
    
    
}
