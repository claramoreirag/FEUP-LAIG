
piece(nullCell, -).
piece(red, 'R').
piece(yellow, 'Y').
piece(blue, 'B').

printBoardLine([], Line) :-
    (   
        Line==12, write('|\n');   
        Aux is Line mod 2, Aux==0, write('|_\n');   
        write('|\n')
    ).

printBoardLine([H|T], Line) :-
    write('|_'), piece(H, S), 
    write(S), write('_'),
    printBoardLine(T, Line).