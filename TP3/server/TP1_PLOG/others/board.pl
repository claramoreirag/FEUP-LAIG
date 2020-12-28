 % :)
                  ___________    ___________
                 /P     __/  \__/  \__     G\
                /    __/  \__/  \__/  \__    \
               /  __/  \__/  \__/  \__/  \__  \
              /__/  \__/  \__/  \__/  \__/  \__\ %5
              /  \__/  \__/  \__/  \__/  \__/  \
              \__/  \__/  \__/  \__/  \__/  \__/
            __/  \__/  \__/  \__/  \__/  \__/  \__
           /  \__/  \__/  \__/  \__/  \__/  \__/  \
          /\__/  \__/  \__/  \__/  \__/  \__/  \__/\ %10
         / /  \__/  \__/  \__/  \__/  \__/  \__/  \ \
        /  \__/  \__/  \__/  \__/  \__/  \__/  \__/  \
       /O  /  \__/  \__/  \__/  \__/  \__/  \__/  \  O\
       \   \__/  \__/  \__/  \__/  \__/  \__/  \__/   /
        \  /  \__/  \__/  \__/  \__/  \__/  \__/  \  / %15
         \ \__/  \__/  \__/  \__/  \__/  \__/  \__/ /
          \/  \__/  \__/  \__/  \__/  \__/  \__/  \/
           \__/  \__/  \__/  \__/  \__/  \__/  \__/
              \__/  \__/  \__/  \__/  \__/  \__/
              /  \__/  \__/  \__/  \__/  \__/  \  %20
              \__/  \__/  \__/  \__/  \__/  \__/
               \ \__/  \__/  \__/  \__/  \__/ /
                \   \__/  \__/  \__/  \__/   /
                 \     \__/  \__/  \__/     /
                  \G______\__/  \__/______P/ %25

                    ___________    ___________
               
                   /      __/  \__/  \__      \ 
                  
                  /    __/  \__/  \__/  \__    \
                 
                 /  __/  \__/  \__/  \__/  \__  \
                
                /__/  \__/  \__/  \__/  \__/  \__\
                
                /  \__/  \__/  \__/  \__/  \__/  \
               
                \__/  \__/  \__/  \__/  \__/  \__/
              
              __/  \__/  \__/  \__/  \__/  \__/  \__
             
             /  \__/  \__/  \__/  \__/  \__/  \__/  \
            
            /\__/  \__/  \__/  \__/  \__/  \__/  \__/\
           
           / /  \__/  \__/  \__/  \__/  \__/  \__/  \ \
          
          /  \__/  \__/  \__/  \__/  \__/  \__/  \__/  \
         
         /   /  \__/  \__/  \__/  \__/  \__/  \__/  \   \
         
         \   \__/  \__/  \__/  \__/  \__/  \__/  \__/   /
          
          \  /  \__/  \__/  \__/  \__/  \__/  \__/  \  /
           
           \ \__/  \__/  \__/  \__/  \__/  \__/  \__/ /
            
            \/  \__/  \__/  \__/  \__/  \__/  \__/  \/
             
             \__/  \__/  \__/  \__/  \__/  \__/  \__/
                
                \__/  \__/  \__/  \__/  \__/  \__/
                 
                /  \__/  \__/  \__/  \__/  \__/  \
                 
                \__/  \__/  \__/  \__/  \__/  \__/
                  
                 \ \__/  \__/  \__/  \__/  \__/ /
                   
                  \   \__/  \__/  \__/  \__/   /
                    
                   \     \__/  \__/  \__/     /

                    \_______\__/  \__/_______/




/o \   /p \
\__/   \__/
     __     __
    /o \   /p \
    \__/   \__/
 __    __
/o \  /p \
\__/  \__/  

%orange
 __
/o \   
\__/

%purple
 __
/p \   
\__/

%green
 __      
/g \   
\__/

%empty
 __
/  \   
\__/

%forbidden
 __
/XX\   
\XX/
⬢
⬡


code(0,'⬡');
code(1,'O');
code(2,'G');
code(3,'P');
code(4,'⬢'); %forbidden cell

%drawCell();
%drawLine();
%drawBoard();

% drawTopHex()
% drawMiddleHex()
% drawBottomHex()
% adj(x,y,[]) - coords x,y + lista de coordenadas adjacantes

%play/0
initial(-GameState)                                     % devolve estado inicial do jogo
display_game(+GameState,+Player)​.                       % visualizar o jogo
play().                                                 % play chama display_game e initial
valid_moves(+GameState, +Player, -ListOfMoves)​.         % obtenção da lista de jogadas possíveis
move(+GameState,+Move,-NewGameState)​.                   % validação e execução de uma jogada retornando um novo game state
game_over(+GameState, -Winner)​.                         % verificação do fim do jogo
​value(+GameState, +Player, -Value)​.                     % avaliação do estado do jogo?
choose_move(+GameState, +Player, +Level, -Move)​.        % jogada do computador dependendo do nível de dificuldade

%array dados
[
          [4,0,0,0,0,0,4],
         [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0],
    [4,0,0,0,0,0,0,0,0,0,0,0,4],
     [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0,0,0,0],       
        [0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0],
          [4,0,0,0,0,0,4]
    ],

     IntermediateBoard=[
          [4,1,0,0,0,0,4],
         [0,0,1,0,0,0,0,0],
        [0,0,0,1,0,0,0,0,0],
       [0,0,0,0,1,3,3,0,0,2],
      [0,0,0,0,0,2,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0],
    [4,0,0,0,0,0,0,0,0,0,0,0,4],
     [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0,0,0,0],       
        [0,0,1,0,0,0,0,0,0],
         [0,0,1,0,0,0,0,0],
          [4,0,1,0,0,0,4]
    ],

    FinalBoard=[
          [4,1,0,0,0,0,4],
         [0,0,1,0,0,0,0,0],
        [0,0,0,1,0,0,0,0,0],
       [0,0,0,0,1,3,3,0,0,2],
      [3,3,3,3,3,2,3,2,3,2,3],
     [0,0,0,0,0,0,2,0,0,0,0,0],
    [4,0,0,0,0,0,0,2,0,0,0,0,4],
     [0,0,0,0,0,0,0,2,0,0,0,0],
      [0,0,0,0,0,0,0,1,0,0,0],
       [0,0,0,0,0,0,1,0,0,0],       
        [0,0,1,0,0,1,0,0,0],
         [0,0,1,0,1,0,0,0],
          [4,0,1,1,0,0,4]
    ],


    
    %orange,purple,green
    Pecas=[42,42,42],
    Wins=[0,0,0],
    GameState=[FinalBoard,Pecas,Wins].


play:-
    initial(GameState),
    Player1='player1',
    Player2='player2',
    display_game(GameState,Player1).


display_game(GameState,Player):-
    GameState=[Board|Rest],
    initCounter,
    printBoard(Board),
    printPlayer(Player).

printPlayer(Player):-
    write(Player),write(' turn:').
    
%mudar
printBoard([FirstLine|Board]):-
    length(FirstLine,Len),
    printBoard([FirstLine|Board],Len).


printBoard([Line|Rest],Len):-
    length(Line,Length),
    X is Length mod Len,
    Padding is Len-1-X,
    printLine(Line,Padding),
    Rest\=[],
    printBoard(Rest,Len).


%returns yes after last line was printed
printBoard([Line|[]],Len).


printPadding(Padding):-
    Padding>0,
    write('  '),
    printPadding(Padding-1).

printPadding(Padding):-
    Padding=:=0,
    write('').


printLine(Line,Padding):-
    printPadding(Padding),
    printCellTop(Line),nl,
    printPadding(Padding),
    printCellMiddle(Line),
    counter(N),
    char_code(C,N),
    printPadding(Padding),
    write(' |'),write(C),write('|'),incrementCounter,nl,
    printPadding(Padding),
    printCellBottom(Line),nl.


initCounter:-
    retractall(counter(_)),
    assertz(counter(65)).

incrementCounter:-
    counter(X),
    retractall(counter(_)),
    incrementValue(X, Y),
    assertz(counter(Y)).

incrementValue(X,Y):-
    Y is X+1.

printCellTop([_|T]):-
    write(' __ '),
    T\=[],
    printCellTop(T).

printCellTop([_|[]]):-
    write('').

printCellMiddle([H|T]):-
    symbol(H,X),
    write(X),
    T\=[],
    printCellMiddle(T).

printCellMiddle([_|[]]):-
    write('').

printCellBottom([_|T]):-
    write('\\__/'),
    T\=[],
    printCellBottom(T).

printCellBottom([_|[]]):-
    write('').


symbol(0,X):-
    X='/  \\'.

symbol(4,X):-
    X='/XX\\'.

symbol(1,X):-
    X='/O \\'.

symbol(2,X):-
    X='/P \\'.

symbol(3,X):-
    X='/G \\'.

%printBoard(+sideLength)