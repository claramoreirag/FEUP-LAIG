:-use_module(library(lists)).



generateboard(L,Board):-
    Line=[],
    generateline(L,Line).


/*

generateBoardUp(L):-



generateBoardDown(Len):-


generateBoardMid(Len):-
    Len>1.

*/
generateline(Len, Line):-
    Len>0,
    append( [0],Line, newLine),
    Line is newLine,
    generateline(Len-1,Line).


/*
generateline(Len, Line):-
    Len=:=0,
    append([],[],[]).
*/




replace_nth0(List, Index, OldElem, NewElem, NewList) :-
   % predicate works forward: Index,List -> OldElem, Transfer
   nth0(Index,List,OldElem,Transfer),
   % predicate works backwards: Index,NewElem,Transfer -> NewList
   nth0(Index,NewList,NewElem,Transfer).



:-use_module(library(lists)).
:- dynamic(board/1).
:- assert(board([])).



generateboard(Len,board(L)):-
    generateline(Len,board(L)).

/*

generateBoardUp(L):-



generateBoardDown(Len):-


generateBoardMid(Len):-
    Len>1.

*/
generateline(Len, board(Line)):-
    Len>0,
    newLine=[],
    append( [0],Line, newLine),
    retract(board(Line)),
    assert(board(newLine)),
    generateline(Len-1,board(Line)).


/*
generateline(Len, Line):-
    Len=:=0,
    append([],[],[]).
*/




replace_nth0(List, Index, OldElem, NewElem, NewList) :-
   % predicate works forward: Index,List -> OldElem, Transfer
   nth0(Index,List,OldElem,Transfer),
   % predicate works backwards: Index,NewElem,Transfer -> NewList
   nth0(Index,NewList,NewElem,Transfer).

generateboard(Len,Board):-
    generateline(Len,Line),
	append(OldBoard,Line,NewBoard).

generateline(Len, Line):-
    Len>0,
    length(Line,Len), %criar Lista de 'Len' elementos
    maplist(=(0),Line). %mapeá-los para 0
