%Easy Level Bot
/** Generate a move for Easy Level Bot */
choose_move(GameState,_,0,Move):- 
    valid_moves(GameState,_,ListOfMoves),
    pickRandom(ListOfMoves,LineMove-ColumnMove),nl,
    pickRandom([1,2,3],ColorCode),
    Move=[LineMove,ColumnMove,ColorCode].

% Hard Level Bot
/** Generate a move for Hard Level Bot */
choose_move(GameState,_,1,Move):-
    invalid_moves(GameState,_,ListOfOccupied),
    pickRandom(ListOfOccupied,LineOccupied-ColumnOccupied),
    adjacent(LineOccupied-ColumnOccupied,Adjacencies),
    pickRandom(Adjacencies,LineMove-ColumnMove),
    \+ member(LineMove-ColumnMove,ListOfOccupied),
    [Board,_,_,_,_,_]=GameState,
    nth0(LineOccupied,Board,BoardLine),
    nth0(ColumnOccupied,BoardLine,Cell),
    Move=[LineMove,ColumnMove,Cell].

choose_move(GameState,_,1,Move):-
    choose_move(GameState,_,0,Move). 

/** Puts all valid moves into a list of valid moves */
valid_moves(GameState,_,ListOfMoves):-
    [Board,_,_,_,_,_]=GameState,
    emptyCells(Board,List),
    append(List,ListOfMoves). %ListOfMoves=[line1-col1,line2-col2,..]

/** Puts all empty cells into a List */
emptyCells(Board,ListEmptyCells):-
    emptyCells(Board,ListEmptyCells,0).

emptyCells([H|T],[HL|TL],LineIndex):-
    findall(Index,emptyColumn(H,Index),ListColIndexes),
    appendLinetoCol(LineIndex,ListColIndexes,HL),
    Next is LineIndex + 1,
    emptyCells(T,TL,Next).

emptyCells([],[],_).

/* Succeeds if Line[ColIndex] is empty */
emptyColumn(Line,ColIndex):-
    nth0(ColIndex,Line,0).
 

/** Puts all invalid moves into a list of valid moves */
invalid_moves(GameState,_,ListOfMoves):-
    [Board,_,_,_,_,_]=GameState,
    nonemptyCells(Board,List),
    append(List,ListOfMoves). %ListOfMoves=[line1-col1,line2-col2,..]

/** Puts all non-empty cells into a List */
nonemptyCells(Board,ListEmptyCells):-
    nonemptyCells(Board,ListEmptyCells,0).

nonemptyCells([H|T],[HL|TL],LineIndex):-
    findall(Index,nonemptyColumn(H,Index),ListColIndexes),
    appendLinetoCol(LineIndex,ListColIndexes,HL),
    Next is LineIndex + 1,
    nonemptyCells(T,TL,Next).

nonemptyCells([],[],_).

/* Succeeds if Line[ColIndex] is occupied */
nonemptyColumn(Line,ColIndex):-
    nth0(ColIndex,Line,1).

nonemptyColumn(Line,ColIndex):-
    nth0(ColIndex,Line,2).

nonemptyColumn(Line,ColIndex):-
    nth0(ColIndex,Line,3).

/* Similar to append but keeps appending a single value to each value of a list returning a new list */ 
appendLinetoCol(LineIndex,[HC|TC],[H|T]):-
    H=LineIndex-HC,
    appendLinetoCol(LineIndex,TC,T).

appendLinetoCol(_,[],[]).

/* Picks a random value inside List */
pickRandom(List,Val):-
    length(List,Len),
    random(0,Len,Random),
    nth0(Random,List,Val).
