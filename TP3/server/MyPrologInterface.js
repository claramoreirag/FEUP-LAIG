/**
 * MyPrologInterface
 */
class MyPrologInterface{
  constructor() {
    this.port = 8081;
    this.reply = null;
  }

  setPort(port){
    this.port=port;
  }

  sendRequest(requestString,args,requestListener){
    let request = new XMLHttpRequest();
    request.onload = requestListener;

    let argument=[],func;

    self = this;


    if(args!=null){
      for(let i=0;i<args.length;i++){
        argument+=args[i];
        if(i!=args.length-1)
          argument+=',';
      }

      func = requestString + '(' + argument + ')';
    }
    else
      func = requestString;

    request.onload = requestListener;
    request.open('GET','http://localhost:' + this.port + '/' + func, true);

    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

    request.send();
  }

  strRequest(obj){
    let str = "";

    if(Array.isArray(obj)){
      str = '['; 
      for(let i=0;i<obj.length;i++){
        str+=this.strRequest(obj[i]);
        if(i<obj.length-1)
          str+=',';
      }
      str +=']';

      return str;
    }
    else{
      switch (typeof obj){
        case 'string':
          return "'"+obj+"'";
        default:
          return obj.toString();
      }
    }

  }

  /** Requests */
  requestCheckConnection(){
    this.sendRequest('handshake',null,this.replyCheckConnection);
  }

  // implement for different modes
  requestInitial(mode){
    let gameMode=mode;
    if(mode==undefined) 
      gameMode = "'1'";

    this.sendRequest('initial',[gameMode,'_'],this.replyInitial);
  }

  //working
  requestValidMoves(gamestate){
    let gs = this.strRequest(gamestate);
    this.sendRequest('valid_moves',[gs],this.replyValidMoves);
  }

  requestMove(gamestate,move){
    let gs = this.strRequest(gamestate);
    let mv = this.strRequest(move);
    this.sendRequest('move',[gs,mv],this.replyMove);
  }

  requestValue(gamestate,player){
    let gs = this.strRequest(gamestate);
    this.sendRequest('value',[gs,player],this.replyValue);
  }

  requestMoveBot(gamestate,difficulty){
    let g = [gamestate.board,gamestate.pecas,gamestate.alliances,gamestate.wins,gamestate.players,gamestate.mode];
    let gs = this.strRequest(g);
    this.sendRequest('choose_move',[gs,difficulty],this.replyMoveBot);
  }

  requestQuit(){
    this.sendRequest('quit',[],this.replyQuit);
  }

  /** Replies */
  replyCheckConnection(data){
    this.reply = data.target.response;
  }
    
  replyInitial(data){
    self.reply = JSON.parse(data.target.response);
  }

  replyValidMoves(data){
    this.reply = JSON.parse(data.target.response);
  }

  replyMove(data){
    this.reply = JSON.parse(data.target.response);
  }

  replyValue(data){
    this.reply = JSON.parse(data.target.response);
  }

  replyMoveBot(data){
    self.reply = JSON.parse(data.target.response);
  }

  replyQuit(data){
    this.reply = data.target.response;
  }
}
