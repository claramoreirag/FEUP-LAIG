:-use_module(library(lists)).  
:-use_module(library(between)).
:-use_module(library(random)).

:-consult('board.pl').
:-consult('input.pl').
:-consult('menu.pl').
:-consult('utils.pl').
:-consult('bots.pl').
:-consult('adjacencies.pl').

initial(GameState,Mode,Players):-
    %mainMenu(Mode, Players),

    Board=[
          [0,0],
         [0,0,0],
        [0,0,0,0],
       [0,0,0,0,0],
      [0,0,0,0,0,0],
       [0,0,0,0,0],
      [0,0,0,0,0,0],
     [0,0,0,0,0,0,0], %7
      [0,0,0,0,0,0],
     [0,0,0,0,0,0,0], %7       
      [0,0,0,0,0,0],
     [0,0,0,0,0,0,0], %7
      [0,0,0,0,0,0],        
     [0,0,0,0,0,0,0], %7
      [0,0,0,0,0,0],        
     [0,0,0,0,0,0,0], %7
      [0,0,0,0,0,0],
       [0,0,0,0,0],
      [0,0,0,0,0,0],
       [0,0,0,0,0],
        [0,0,0,0],
         [0,0,0],
          [0,0]
    ],

    %orange,purple,green
    Pecas=[42,42,42],
    Wins=[-1,0,-1], %rounds
    Alliances=[['P ','G ','O '],['G ','O ','P ']],
    GameState=[Board,Pecas,Alliances,Wins,Players,Mode].

play:-
    initial(GameState),
    [_,_,_,_,Players,Mode]=GameState,
    [P1,_]=Players,
    play(GameState,P1,Mode).



/*Updates the list of  wins when a player wins a color 
putting the index of the player in the place of the list 
that corresponds to the color he won*/

setWins(Players,Player,Color, OldWins,Value):-
    nth0(ColorIndex,['O','P','G'],Color),
    nth0(PlayerIndex,Players,Player),
    replace_nth0(OldWins,ColorIndex,_,PlayerIndex,NewWins),
    Value= NewWins.

    
/*Checks if one of the players has won two of the colors, winning the game (Player 1 version)*/
 game_over(GameState, Winner):-
    [_,_,_,Wins,Players,_]=GameState,
    [P1|_]=Players,
    ocurrenceof(Wins,0,NumberOfWins),%0 is the indice of the first player
    NumberOfWins >= 2,!,
    Winner = P1,
    printWinner(Winner),play.


/*Checks if one of the players has won two of the colors, winning the game (Player 2 version)*/
game_over(GameState, Winner):-
    [_,_,_,Wins,Players,_]=GameState,
    [_|[P2]]=Players,
    ocurrenceof(Wins,1,NumberOfWins), %1 is the indice of the second player
    NumberOfWins >= 2,!,
    Winner = P2,
    printWinner(Winner)
    ,play.


/* Check if Current Player won by connecting a color*/
value(GameState, Player, Value):-
    [Board,_,Alliances,Wins,Players,_]=GameState,
    nth0(Indice,Players,Player), %gets indice
    nth0(Indice,Alliances,CurrentPlayerAlliances), %gets corresponding player alliances,
    checkNormalWin(Player,Board,Wins,CurrentPlayerAlliances,Color),
    setWins(Players ,Player,Color,Wins,Value).

/* Check if Current Player made the opponent win*/
value(GameState, Player, Value):-
    [Board,_,Alliances,Wins,Players,_]=GameState,
    nth0(Indice,Players,Player), %gets indice
    OtherIndice is Indice+1,
    Indice2 is (OtherIndice mod 2),
    nth0(Indice2,Players,NextPlayer), %gets indice
    nth0(Indice2,Alliances,NextPlayerAlliances), %gets 
    checkNormalWin(NextPlayer,Board,Wins,NextPlayerAlliances,Color),
    setWins(Players,NextPlayer,Color,Wins,Value).

/* Check if Current Player won by blocking a color*/
value(GameState, Player, Value):-
    [Board,_,Alliances,Wins,Players,_]=GameState,
    nth0(Indice,Players,Player), %gets indice
    OtherIndice is Indice+1,
    Indice2 is (OtherIndice mod 2),
    nth0(Indice2,Players,_), %gets indice
    nth0(Indice2,Alliances,NextPlayerAlliances), %gets alliances
    checkBlockWin( Player,Board,Wins,NextPlayerAlliances,Color),
    setWins(Players,Player,Color,Wins,Value).

/* Check if Current Player lost by blocking himself on a color*/
value(GameState, Player, Value):-
    [Board,_,Alliances,Wins,Players,_]=GameState,
    nth0(Indice,Players,Player), %gets indice
    OtherIndice is Indice+1,
    Indice2 is (OtherIndice mod 2),
    nth0(Indice2,Players,NextPlayer), %gets indice
    nth0(Indice,Alliances,CurrentPlayerAlliances), %gets corresponding player alliances,
    checkBlockWin(NextPlayer,Board,Wins,CurrentPlayerAlliances,Color),
    setWins(Players ,NextPlayer,Color,Wins,Value).

/* Returns current score/wins if no win happened this turn*/
value(GameState, _, Value):-
    [_,_,_,Wins,_,_]=GameState,
    Value =Wins.


/* Play loop for 2 human players*/
play(GameState,CurrentPlayer,'1'):-
    humanPlays(GameState,CurrentPlayer,UpdatedGameState,NextPlayer),
    play(UpdatedGameState,NextPlayer,'1').


/* Play loop for human vs bot*/
play(GameState,CurrentPlayer,'2'):-
    humanPlays(GameState,CurrentPlayer,AfterPlayGameState,Bot),
    botPlays(AfterPlayGameState,Bot,AfterBotGameState,NextPlayer),
    play(AfterBotGameState,NextPlayer,'2').


/* Play loop for bot vs human*/
play(GameState,Bot,'4'):-
    botPlays(GameState,Bot,AfterBotGameState,Player),
    humanPlays(AfterBotGameState,Player,AfterPlayGameState,NextPlayer),
    play(AfterPlayGameState,NextPlayer,'4').

/* Play loop for 2 bot players*/
play(GameState,Bot,'3'):-
    botPlays(GameState,Bot,NewGameState,NextPlayer),
    play(NewGameState,NextPlayer,'3').



/* Makes human play: Asks move, validates it, checks game value, 
changes player and updates gamestate */
humanPlays(GameState,Player,AfterPlayGameState,NextPlayer):-
    display_game(GameState,Player),
    moveLoop(GameState, PlayGameState),
    [_,_,_,_,Players,_]=PlayGameState,
    value(PlayGameState,Player,Value),
    switchPlayer(Player,NextPlayer,Players),
    replace_nth0(PlayGameState,3,_,Value,AfterPlayGameState),
    \+game_over(AfterPlayGameState,_),!.

    
/* Makes bot play: Asks move, validates it, checks game value, 
changes player and updates gamestate */
botPlays(GameState,Bot,AfterBotGameState,NextPlayer):-
    display_game(GameState,Bot),
    botLevel(Bot,Level),
    choose_move(GameState,Bot,Level,Move),
    move(GameState,Move,BotGameState),
    [_,_,_,_,Players,_]=BotGameState,
    value(BotGameState,Bot,BotValue),
    switchPlayer(Bot,NextPlayer,Players),
    replace_nth0(BotGameState,3,_,BotValue,AfterBotGameState),
    \+game_over(AfterBotGameState,_),!.


/** Bot level associates bot name to its level*/
botLevel('SmartBot',1).
botLevel('SmartBot1',1).
botLevel('SmartBot2',1).
botLevel('RandomBot',0).
botLevel('RandomBot1',0).
botLevel('RandomBot2',0).


/** Switches between players */
switchPlayer(Player,NextPlayer, [P1|T]):-
    Player==P1,!,
    [P2]=T,
    NextPlayer=P2.

switchPlayer(Player,NextPlayer, [P1|_]):-
    \+Player==P1,!,
    NextPlayer=P1.

/* Updates Game's State accordingly after processing a given 'Move' */
move(Gamestate,Move,NewGameState):-
    [L,C,Clr] = Move,
    [Board,_,_,_,_,_]=Gamestate,
    nth0(L,Board,Line),
    replace_nth0(Line, C, 0, Clr, NewLine),
    replace_nth0(Board,L,_,NewLine,NewBoard),
    replace_nth0(Gamestate,0,Board,NewBoard,NewGameState).


/* Verifies if the play was valid.
   If it isn't tries to get a new input */ 
moveLoop(GameState,NewGameState):-
    chooseCell(Line,Column,Color),
    Move=[Line,Column,Color],
    move(GameState,Move,NewGameState),!.

moveLoop(GameState,NewGameState):-
    write('\nThat cell is already ocupied\nSelect again:\n'),
    moveLoop(GameState,NewGameState).




/*Checks to see if player connected a color*/
checkNormalWin(Player,Board,Wins,PlayerAlliances,Color):-
    [OrangeWin,_,_]=Wins,
    [OrangeAlly,_,_]=PlayerAlliances,
    checkOrangeWin(Board,OrangeWin,OrangeAlly),
    Color ='O',
    printNormalWin(Player,Color),!.


checkNormalWin(Player,Board,Wins,PlayerAlliances,Color):-
    [_,PurpleWin,_]=Wins,
    [_,PurpleAlly,_]=PlayerAlliances,
    checkPurpleWin(Board,PurpleWin,PurpleAlly),
    Color ='P',
    printNormalWin(Player,Color),!.


checkNormalWin(Player,Board,Wins,PlayerAlliances,Color):-
    [_,_,GreenWin]=Wins,
    [_,_,GreenAlly]=PlayerAlliances,
    checkGreenWin(Board,GreenWin,GreenAlly),
    Color ='G',
    printNormalWin(Player,Color),!.

/*Checks to see if player connected the color orange*/
checkOrangeWin(Board,OrangeWin,OrangeAlly):-
    OrangeWin=:= -1,
    Alliances=['O ',OrangeAlly],
    StartCells=[[9,0],[13,0],[7,0],[11,0],[15,0]],
    EndCells=[[9,6],[13,6],[7,6],[11,6],[15,6]],
    getPaths(StartCells,EndCells,PossiblePaths),
    findAny(PossiblePaths,Alliances,Board),!.

/*Checks to see if player connected the color purple*/
checkPurpleWin(Board,PurpleWin,PurpleAlly):-
    PurpleWin=:= -1,
    Alliances=['P ',PurpleAlly],
    StartCells=[[1,0],[3,0],[0,0],[2,0],[4,0]],
    EndCells=[[19,4],[21,2],[18,5],[20,3],[22,1]],
    getPaths(StartCells,EndCells,PossiblePaths),
    findAny(PossiblePaths,Alliances,Board),!.

/*Checks to see if player connected the color green*/
checkGreenWin(Board,GreenWin,GreenAlly):-
    GreenWin=:= -1,
    Alliances=['G ',GreenAlly],
    StartCells=[[19,0],[21,0],[18,0],[20,0],[22,0]],
    EndCells=[[1,2],[3,4],[0,1],[2,3],[4,5]],
    getPaths(StartCells,EndCells,PossiblePaths),
    findAny(PossiblePaths,Alliances,Board),!.
    
/*Checks to see if player blocked a color*/
checkBlockWin(Player,Board,Wins,PlayerAlliances,Color):-
    [OrangeWin,_,_]=Wins,
    [OrangeAlly,_,_]=PlayerAlliances,
    checkBlockOrangeWin(Board,OrangeWin,OrangeAlly),!,
    Color ='O',
    printBlockWin(Player,Color).

checkBlockWin(Player,Board,Wins,PlayerAlliances,Color):-
    [_,PurpleWin,_]=Wins,
    [_,PurpleAlly,_]=PlayerAlliances,
    checkBlockPurpleWin(Board,PurpleWin,PurpleAlly),!,
    Color ='P',
    printBlockWin(Player,Color).

checkBlockWin(Player,Board,Wins,PlayerAlliances,Color):-
    [_,_,GreenWin]=Wins,
    [_,_,GreenAlly]=PlayerAlliances,
    checkBlockGreenWin(Board,GreenWin,GreenAlly),!,
    Color ='G',
    printBlockWin(Player,Color).

/*Checks to see if player blocked the color orange*/
checkBlockOrangeWin(Board,OrangeWin,OrangeAlly):-
    OrangeWin=:= -1,
    Alliances=['O',' ',OrangeAlly],
    StartCells=[[9,0],[13,0],[7,0],[11,0],[15,0]],
    EndCells=[[9,6],[13,6],[7,6],[11,6],[15,6]],
    getPaths(StartCells,EndCells,PossiblePaths),
    \+findAny(PossiblePaths,Alliances,Board).

/*Checks to see if player blocked the color purple*/
checkBlockPurpleWin(Board,PurpleWin,PurpleAlly):-
    PurpleWin=:= -1,
    Alliances=['P',' ',PurpleAlly],
    StartCells=[[1,0],[3,0],[0,0],[2,0],[4,0]],
    EndCells=[[19,4],[21,2],[18,5],[20,3],[22,1]],
    getPaths(StartCells,EndCells,PossiblePaths),
    \+findAny(PossiblePaths,Alliances,Board).

/*Checks to see if player blocked the color green*/
checkBlockGreenWin(Board,GreenWin,GreenAlly):-
    GreenWin=:= -1,
    Alliances=['G',' ',GreenAlly],
    StartCells=[[19,0],[21,0],[18,0],[20,0],[22,0]],
    EndCells=[[1,2],[3,4],[0,1],[2,3],[4,5]],
    getPaths(StartCells,EndCells,PossiblePaths),
    \+findAny(PossiblePaths,Alliances,Board).

/*Turns Alliances List into a list with the corresponding color codes*/
alliancestonumber([],[]).
alliancestonumber([H|T],[H2|T2]):-
    symbol(H2,H),
    alliancestonumber(T,T2).

/** Succeeds if there still exists a path between a given list of StartCells and EndCells
 *  Takes into consideration the allied colors for each player */

findAny([[L1,C1,L2,C2]|_],Alliances,Board):-
    alliancestonumber(Alliances,NewAlliances),
    path(L1,C1,L2,C2,_,NewAlliances,Board).

findAny([_|T],Alliances,Board):-
    findAny(T,Alliances,Board).
    
/*Gets all possible starts/finishes from starting in StartCell and ending in any EndCell*/
getPaths(StartCells,EndCells,PossiblePaths):-
    appendAll(StartCells,EndCells,Temp),
    flatten(Temp,PossiblePaths).

appendAll([H1|T1],List2,[H3|T3]):-
    maplist(append,[H1,H1,H1,H1,H1],List2,H3),
    appendAll(T1,List2,T3).

appendAll([],_,[]).

/* Recursive predicate which tries to find a path between two cells
*  by finding successive adjacencies between cells until the destination is reached
*  if the destination is impossible to reach given the arguments then the predicate fails
*  Takes into consideration the allied colors for each player*/

path(StartLine,StartColumn,EndLine,EndColumn,Path,Alliances,Board):-
	path(StartLine,StartColumn,EndLine,EndColumn,[[StartLine,StartColumn]],Path,Alliances,Board).

path(EndLine,EndColumn,EndLine,EndColumn,Path,Path,_,_).

path(StartLine,StartColumn,EndLine,EndColumn,Temp,Path,Alliances,Board):-
    adjacent(StartLine-StartColumn,Adjacencies),
    member(NextLine-NextColumn,Adjacencies),
    \+ member([NextLine,NextColumn],Temp),
    nth0(NextLine,Board,BoardLine),
    nth0(NextColumn,BoardLine,Cell),
    member(Cell,Alliances),
    path(NextLine,NextColumn,EndLine,EndColumn,[[NextLine,NextColumn]|Temp],Path,Alliances,Board),!.
