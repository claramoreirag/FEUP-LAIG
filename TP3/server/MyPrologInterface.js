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

  popReply(){
    let reply = this.reply;

    if(reply != null)
      this.reply=null;
    return reply;
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

    switch (mode){
      case 1:
        gameMode = "'1'";
        break;
      case 2:
        gameMode = "'2'";
        break;
      case 3:
        gameMode = "'3'";
        break;
    }

    this.sendRequest('initial',[gameMode,'_'],this.replyInitial);
  }

  //working
  requestValidMoves(gamestate){
    let g = [gamestate.board,gamestate.pecas,gamestate.alliances,gamestate.wins,gamestate.players,gamestate.mode];
    let gs = this.strRequest(g);
    this.sendRequest('valid_moves',[gs],this.replyValidMoves);
  }

  requestMove(gamestate,move){
    let g = [gamestate.board,gamestate.pecas,gamestate.alliances,gamestate.wins,gamestate.players,gamestate.mode];
    let gs = this.strRequest(g);
    let mv = this.strRequest(move);
    this.sendRequest('move',[gs,mv],this.replyMove);
  }

  requestValue(gamestate,player){
    let playerStr = "'"+ player + "'";
    let g = [gamestate.board,gamestate.pecas,gamestate.alliances,gamestate.wins,gamestate.players,gamestate.mode];
    let gs = this.strRequest(g);
    this.sendRequest('value',[gs,playerStr],this.replyValue);
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
    self.reply = data.target.response;
  }
    
  replyInitial(data){
    self.reply = JSON.parse(data.target.response);
  }

  replyValidMoves(data){
    self.reply = JSON.parse(data.target.response);
  }

  replyMove(data){
    self.reply = JSON.parse(data.target.response);
  }

  replyValue(data){
    self.reply = JSON.parse(data.target.response);
  }

  replyMoveBot(data){
    self.reply = JSON.parse(data.target.response);
  }

  replyQuit(data){
    self.reply = data.target.response;
  }
}
