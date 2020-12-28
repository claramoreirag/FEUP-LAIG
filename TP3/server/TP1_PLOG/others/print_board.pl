:-use_module(library(lists)).
:- dynamic counter/1.

%generateBoard(length)

initial(GameState):-
    Board2=[
           [0,0,0],
          [0,0,0,0],
         [0,0,0,0,0],
          [0,0,0,0],
           [0,0,0]
    ],

    Board=[
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
    X=' '.

symbol(1,X):-
    X='O'.

symbol(2,X):-
    X='P'.

symbol(3,X):-
    X='G'.

%printBoard(+sideLength)
