:-use_module(library(lists)).  
:-use_module(library(between)).
:-consult('input.pl').

/* Main Menu */
mainMenu(Mode, Players):-
    write('\n\nWelcome to ALLIANCES!\n\n'),
    write('Choose game options:\n\n'),
    write('1: Player vs Player\n'),
    write('2: Player vs Computer\n'),
    write('3: Computer vs Computer\n'),
    get_char(Option),
    skip_line,
    setPlayers(Option, Players,Mode),
    !.
    
/* Sets initial players by giving them appropriate names */
setPlayers('1', Players,'1'):-
    Players=['Player1','Player2'].


setPlayers('2', Players,Mode):-
    Players=['Player','Bot'].
    %chooseLevel(Bot),
    %chooseOrder( Players,Bot,Mode).


setPlayers('3', Players,'3'):-
    Players=['Bot1','Bot2'].
    %write('\n\n Computer 1:'),
    %chooseLevel(Bot1),
    %write('\n\n Computer 2:'),
    %chooseLevel(Bot2),
    %atom_concat(Bot1,'1',Player1),
    %atom_concat(Bot2,'2',Player2),
    %Players=[Player1,Player2].

setPlayers(_, Players,Mode):-
    write('\nInvalid choice, try again:'),
    mainMenu(Mode,Players).


/* Asks for bot difficulty level */
chooseLevel(Bot):-
    write('\n\n Computer Level:\n\n'),
    write('1: Random\n'),
    write('2: Smart\n'),
    get_char(Option),
    skip_line,
    setBot(Option,Bot),!.

/* Sets corresponding bot */
setBot(Option,Bot):-
     Option == '1',
     Bot= 'RandomBot'.

setBot(Option,Bot):-
     Option == '2',
     Bot= 'SmartBot'.

setBot(_,Bot):-
    write('\nInvalid choice, try again:'),
    chooseLevel(Bot).

/* Asks for starting player */
chooseOrder( Players,Bot,Mode):-
    write('\n\n Who plays first:\n\n'),
    write('1: Player\n'),
    write('2: Computer\n'),
    get_char(Order),
    skip_line,
    setOrder(Order,Players,Bot,Mode),!.

/* Sets given order of plays */
setOrder(Order,Players,Bot,Mode):-
    Order =='1',
    Mode='2',
    Players=['Player',Bot].

setOrder(Order,Players,Bot,Mode):-
    Order =='2',
    Mode='4',
    Players=[Bot,'Player'].

setOrder(_,Players,Bot,Mode):-
    write('\nInvalid choice, try again:'),
    chooseOrder( Players,Bot,Mode).
