:-use_module(library(lists)).
:- dynamic counter/1.

/* Displays Game for Player */
display_game(GameState,Player):-
    [Board,_,Alliances,Wins,Players,_]=GameState,
    initCounter,
    nl,
    printBoard(Board),
    printAlliances(Alliances,Players),
    printWins(Wins,Players),
    printPlayer(Player).

/* Gets winner if available*/
getWinner(-1, _,'No one yet').

getWinner(Index, Players,Winner):-
    nth0(Index, Players, Winner).
    
/* Prints wins in a readable format */
printWins(Wins,Players):-
    [WinOrange,WinPurple,WinGreen]=Wins,
    getWinner(WinOrange,Players,OrangeWinner),
    getWinner(WinPurple,Players,PurpleWinner),
    getWinner(WinGreen,Players,GreenWinner),
    write('\n\n Color wins: \n'),
    write('Orange - '),write(OrangeWinner),write(' ; Purple - '),write(PurpleWinner),write(' ; Green - '),write(GreenWinner),nl,nl.

/* Prints player in a readable format */
printPlayer(Player):-
    write('\nCurrent Player: '),
    write(Player),
    write('\n\n').

/* Corresponding alliance for color symbol */
allianceName('O ','Orange').
allianceName('P ','Purple').
allianceName('G ','Green').

/* Prints alliances in a readable format */
printAlliances(Alliances,Players):-
    [[AO1,AP1,AG1],[AO2,AP2,AG2]]=Alliances,
    [P1,P2]=Players,
    allianceName(AO1,Color1),
    allianceName(AP1,Color2),
    allianceName(AG1,Color3),
    allianceName(AO2,Color4),
    allianceName(AP2,Color5),
    allianceName(AG2,Color6),
    write('\n'),write(P1),write(' Alliances:\n'),
    write('Can use '),write(Color1), write(' to connect Orange\n'),
    write('Can use '),write(Color2), write(' to connect Purple\n'),
    write('Can use '),write(Color3), write(' to connect Green\n'),
    write('\n\n'),write(P2),write(' Alliances:\n'),
    write('Can use '),write(Color4), write(' to connect Orange\n'),
    write('Can use '),write(Color5), write(' to connect Purple\n'),
    write('Can use '),write(Color6), write(' to connect Green\n').

/* Prints board */
printBoard(Board):-
    printColumnLetter,
    printLine1(Board).

/* Prints padding */
printPadding(Padding):-
    Padding>0,
    write(' '),
    printPadding(Padding-1).

printPadding(Padding):-
    Padding=:=0,
    write('').

/* Prints Column Letter */
printColumnLetter:-
    printPadding(7),
    write('A  B  C  D  E  F  G  H  I  J  K  L  M'),nl.

/* Prints Line Letter */
printLineLetter:-
    counter(N),
    char_code(C,N),
    incrementCounter,
    write(C).

printLine1(Board):-
    printPadding(13),
    write('___________    ___________'),nl,
    printLine2(Board).


printLine2([Line|Rest]):-
    printLineLetter,
    printPadding(11),
    toSymbolList(Line,SymbolList),
    [X1,X2] = SymbolList,
    
    write('/P'),printPadding(5),
    maplist(write,['__/',X1,'\\__/',X2,'\\__']),
    printPadding(5),write('G\\'),nl,
    printLine3(Rest).

printLine3([Line|Rest]):-
    printLineLetter,
    printPadding(10),
    toSymbolList(Line,SymbolList),
    [X1,X2,X3] = SymbolList,

    write('/'),printPadding(4),
    maplist(write,['__/',X1,'\\__/',X2,'\\__/',X3,'\\__']),
    printPadding(4),write('\\'),nl,
    printLine4(Rest).

printLine4([Line|Rest]):-
    printLineLetter,
    printPadding(9),
    toSymbolList(Line,SymbolList),
    [X1,X2,X3,X4] = SymbolList,

    write('/'),printPadding(2),
    maplist(write,['__/',X1,'\\__/',X2,'\\__/',X3,'\\__/',X4,'\\__']),
    printPadding(2),write('\\'),nl,
    printLine5(Rest).

printLine5([Line|Rest]):-
    printLineLetter,
    printPadding(8),
    toSymbolList(Line,SymbolList),
    [X1,X2,X3,X4,X5] = SymbolList,


    maplist(write,['/__/',X1,'\\__/',X2,'\\__/',X3,'\\__/',X4,'\\__/',X5,'\\__\\']),nl,
    printLine6(Rest).

printLine6([Line|Rest]):-
    printLineLetter,
    printPadding(8),
    toSymbolList(Line,SymbolList),
    [X1,X2,X3,X4,X5,X6] = SymbolList,

    maplist(write,['/',X1,'\\__/',X2,'\\__/',X3,'\\__/',X4,'\\__/',X5,'\\__/',X6,'\\']),nl,
    printLine7(Rest).

printLine7([Line|Rest]):-
    printLineLetter,
    printPadding(8),
    toSymbolList(Line,SymbolList),
    [X1,X2,X3,X4,X5] = SymbolList,

    maplist(write,['\\__/',X1,'\\__/',X2,'\\__/',X3,'\\__/',X4,'\\__/',X5,'\\__/']),nl,
    printLine8(Rest).

printLine8([Line|Rest]):-
    printLineLetter,
    printPadding(6),
    toSymbolList(Line,SymbolList),
    [X1,X2,X3,X4,X5,X6] = SymbolList,

    maplist(write,['__/',X1,'\\__/',X2,'\\__/',X3,'\\__/',X4,'\\__/',X5,'\\__/',X6,'\\__']),nl,
    printLine9(Rest).



printLine9([Line|Rest]):-
    printLineLetter,
    printPadding(5),
    toSymbolList(Line,SymbolList),
    [X1,X2,X3,X4,X5,X6,X7] = SymbolList,

    maplist(write,['/',X1,'\\__/',X2,'\\__/',X3,'\\__/',X4,'\\__/',X5,'\\__/',X6,'\\__/',X7,'\\']),nl,
    printLine10(Rest).

printLine10([Line|Rest]):-
    printLineLetter,
    printPadding(4),
    toSymbolList(Line,SymbolList),
    [X1,X2,X3,X4,X5,X6] = SymbolList,

    maplist(write,['/\\__/',X1,'\\__/',X2,'\\__/',X3,'\\__/',X4,'\\__/',X5,'\\__/',X6,'\\__/\\']),nl,
    printLine11(Rest).


printLine11([Line|Rest]):-
    printLineLetter,
    printPadding(3),
    toSymbolList(Line,SymbolList),
    [X1,X2,X3,X4,X5,X6,X7] = SymbolList,

    maplist(write,['/ /',X1,'\\__/',X2,'\\__/',X3,'\\__/',X4,'\\__/',X5,'\\__/',X6,'\\__/',X7,'\\ \\']),nl,
    printLine12(Rest).

printLine12([Line|Rest]):-
    printLineLetter,
    printPadding(2),
    toSymbolList(Line,SymbolList),
    [X1,X2,X3,X4,X5,X6] = SymbolList,

    maplist(write,['/  \\__/',X1,'\\__/',X2,'\\__/',X3,'\\__/',X4,'\\__/',X5,'\\__/',X6,'\\__/  \\']),nl,
    printLine13(Rest).

printLine13([Line|Rest]):-
    printLineLetter,
    printPadding(1),
    toSymbolList(Line,SymbolList),
    [X1,X2,X3,X4,X5,X6,X7] = SymbolList,

    maplist(write,['/O  /',X1,'\\__/',X2,'\\__/',X3,'\\__/',X4,'\\__/',X5,'\\__/',X6,'\\__/',X7,'\\  O\\']),nl,
    printLine14(Rest).

printLine14([Line|Rest]):-
    printLineLetter,
    printPadding(1),
    toSymbolList(Line,SymbolList),
    [X1,X2,X3,X4,X5,X6] = SymbolList,

    maplist(write,['\\   \\__/',X1,'\\__/',X2,'\\__/',X3,'\\__/',X4,'\\__/',X5,'\\__/',X6,'\\__/   /']),nl,
    printLine15(Rest).

printLine15([Line|Rest]):-
    printLineLetter,
    printPadding(2),
    toSymbolList(Line,SymbolList),
    [X1,X2,X3,X4,X5,X6,X7] = SymbolList,

    maplist(write,['\\  /',X1,'\\__/',X2,'\\__/',X3,'\\__/',X4,'\\__/',X5,'\\__/',X6,'\\__/',X7,'\\  /']),nl,
    printLine16(Rest).

printLine16([Line|Rest]):-
    printLineLetter,
    printPadding(3),
    toSymbolList(Line,SymbolList),
    [X1,X2,X3,X4,X5,X6] = SymbolList,

    maplist(write,['\\ \\__/',X1,'\\__/',X2,'\\__/',X3,'\\__/',X4,'\\__/',X5,'\\__/',X6,'\\__/ /']),nl,
    printLine17(Rest).

printLine17([Line|Rest]):-
    printLineLetter,
    printPadding(4),
    toSymbolList(Line,SymbolList),
    [X1,X2,X3,X4,X5,X6,X7] = SymbolList,

    maplist(write,['\\/',X1,'\\__/',X2,'\\__/',X3,'\\__/',X4,'\\__/',X5,'\\__/',X6,'\\__/',X7,'\\/']),nl,
    printLine18(Rest).

printLine18([Line|Rest]):-
    printLineLetter,
    printPadding(5),
    toSymbolList(Line,SymbolList),
    [X1,X2,X3,X4,X5,X6] = SymbolList,

    maplist(write,['\\__/',X1,'\\__/',X2,'\\__/',X3,'\\__/',X4,'\\__/',X5,'\\__/',X6,'\\__/']),nl,
    printLine19(Rest).


printLine19([Line|Rest]):-
    printLineLetter,
    printPadding(8),
    toSymbolList(Line,SymbolList),
    [X1,X2,X3,X4,X5] = SymbolList,

    maplist(write,['\\__/',X1,'\\__/',X2,'\\__/',X3,'\\__/',X4,'\\__/',X5,'\\__/']),nl,
    printLine20(Rest).

printLine20([Line|Rest]):-
    printLineLetter,
    printPadding(8),
    toSymbolList(Line,SymbolList),
    [X1,X2,X3,X4,X5,X6] = SymbolList,

    maplist(write,['/',X1,'\\__/',X2,'\\__/',X3,'\\__/',X4,'\\__/',X5,'\\__/',X6,'\\']),nl,
    printLine21(Rest).



printLine21([Line|Rest]):-
    printLineLetter,
    printPadding(8),
    toSymbolList(Line,SymbolList),
    [X1,X2,X3,X4,X5] = SymbolList,

    maplist(write,['\\__/',X1,'\\__/',X2,'\\__/',X3,'\\__/',X4,'\\__/',X5,'\\__/']),nl,
    printLine22(Rest).

printLine22([Line|Rest]):-
    printLineLetter,
    printPadding(9),
    toSymbolList(Line,SymbolList),
    [X1,X2,X3,X4] = SymbolList,

    maplist(write,['\\ \\__/',X1,'\\__/',X2,'\\__/',X3,'\\__/',X4,'\\__/ /']),nl,
    printLine23(Rest).

printLine23([Line|Rest]):-
    printLineLetter,
    printPadding(10),
    toSymbolList(Line,SymbolList),
    [X1,X2,X3] = SymbolList,

    maplist(write,['\\   \\__/',X1,'\\__/',X2,'\\__/',X3,'\\__/   /']),nl,
    printLine24(Rest).


printLine24([Line|_]):-
    printLineLetter,
    printPadding(11),
    toSymbolList(Line,SymbolList),
    [X1,X2] = SymbolList,

    maplist(write,['\\     \\__/',X1,'\\__/',X2,'\\__/     /']),nl,
    printLine25.

printLine25:-
    printPadding(13),

    write('\\G______\\__/  \\__/______P/'),nl.

/* Turns List into its respective symbols */
toSymbolList(List,SymbolList):-
    maplist(symbol, List, SymbolList).

/** Initializes counter with the value of the 'A' character*/
initCounter:-
    retractall(counter(_)),
    assertz(counter(65)).

/* Increments counter with the next character in the ASCII table */
incrementCounter:-
    counter(X),
    retractall(counter(_)),
    incrementValue(X, Y),
    assertz(counter(Y)).

incrementValue(X,Y):-
    Y is X+1.

/* Matches color code with color symbol */
symbol(0,'  ').
symbol(1,'O ').
symbol(2,'P ').
symbol(3,'G ').