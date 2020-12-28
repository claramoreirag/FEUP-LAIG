:-use_module(library(lists)).

/* Reads Cell input */
chooseCell(Iline,Icolumn,Colorcode):-
    readLine(Line),
    readColumn(Column),
    isCell(Line,Column),
    readColor(Color),
    nth0(Iline,['A','B','C','D','E', 'F', 'G','H','I', 'J', 'K','L','M','N','O','P', 'Q', 'R', 'S','T', 'U', 'V','W'],Line),
    lineLength(Iline,Len),
    lineOp(Len,Options),
    nth0(Icolumn,Options,Column),
    colorCode(Color,Colorcode),!.


chooseCell(Line,Column,Color):-
    write('\nInvalid Cell\nSelect again:\n'),
    chooseCell(Line,Column,Color).

/* Reads Color input */
readColor(Color):-
    write('- Select Color: '),
    get_char(Color),
    skip_line,
    nth0(_,['O','P','G'],Color),!.

readColor(Color):-
    write('\nInvalid color\nSelect again:\n'),
    readColor(Color).



/* Reads Column Input */
readColumn(Column) :-
    write('- Select Column: '),
    get_char(Column),
    skip_line.

/* Reads Line Input */
readLine(Line) :-
    write('- Select Line: '),
    get_char(Line),
    skip_line.

/* Corresponding line options for a given index */
lineOp(2,Options):-Options=['F','H'].
lineOp(4,Options):-Options=['D','F','H','J'].
lineOp(6,Options):-Options=['B','D','F','H','J','L'].
lineOp(3,Options):-Options=['E','G','I'].
lineOp(5,Options):-Options=['C','E','G','I','K'].
lineOp(7,Options):-Options=['A','C','E','G','I','K','M'].

/* Full meaning of color symbol */
colorName('O','Orange').
colorName('P','Purple').
colorName('G','Green').

/* Prints win by block */
printBlockWin(Player,Color):-
    colorName(Color,ColorName),
    write('\n'),write(Player),write(' just won color '), write(ColorName),write(' by blocking it!\n\n').

/* Prints win by color connection */
printNormalWin(Player,Color):-
    colorName(Color,ColorName),
    write('\n'),write(Player),write(' just won color '), write(ColorName),write('!\n\n').

/* Prints winner */
printWinner(Winner):-
    write('\n'),write(Winner),write(' won the game! \n\n ').


/* Verifies if a given Line and Column represent an actual game Cell or not */
isCell(Line,Column):-
    LineOptions=['A','B','C','D','E', 'F', 'G','H','I', 'J', 'K','L','M','N','O','P', 'Q', 'R', 'S','T', 'U', 'V','W'],
    nth0(LineIndex,LineOptions,Line),
    even(LineIndex),!,
    lineLength(LineIndex,Len),
    lineOp(Len,Options),
    member(Column,Options).

isCell(Line,Column):-
    LineOptions=['A','B','C','D','E', 'F', 'G','H','I', 'J', 'K','L','M','N','O','P', 'Q', 'R', 'S','T', 'U', 'V','W'],
    nth0(LineIndex,LineOptions,Line),
    odd(LineIndex),!,
    lineLength(LineIndex,Len),
    lineOp(Len,Options),
    member(Column,Options).

even(X):-
    X mod 2 =:= 0.

odd(X):-
    X mod 2 =\= 0.

/* Options for an even line */
evenLine(Options):-
    Options=['B','D','F','H','J','L'].

/* Options for an odd line */
oddLine(Options):-
    Options=['A','C','E','G','I','K','M'].

/* Corresponding color symbols and color codes */
colorCode('O',1).
colorCode('P',2).
colorCode('G',3).


/* lineLength(index,length) */
lineLength(0,2).
lineLength(1,3).
lineLength(2,4).
lineLength(3,5).
lineLength(4,6).
lineLength(5,5).
lineLength(6,6).
lineLength(7,7).
lineLength(8,6).
lineLength(9,7).
lineLength(10,6).
lineLength(11,7).
lineLength(12,6).
lineLength(13,7).
lineLength(14,6).
lineLength(15,7).
lineLength(16,6).
lineLength(17,5).
lineLength(18,6).
lineLength(19,5).
lineLength(20,4).
lineLength(21,3).
lineLength(22,2).