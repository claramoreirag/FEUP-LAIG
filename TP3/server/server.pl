:-use_module(library(sockets)).
:-use_module(library(lists)).
:-use_module(library(codesio)).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%                                        Server                                                   %%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% To run, enter 'server.' on sicstus command line after consulting this file.
% You can test requests to this server by going to http://localhost:8081/<request>.
% Go to http://localhost:8081/quit to close server.

% Made by Luis Reis (ei12085@fe.up.pt) for LAIG course at FEUP.

port(8081).

% Server Entry Point
server :-
	port(Port),
	write('Opened Server'),nl,nl,
	socket_server_open(Port, Socket),
	server_loop(Socket),
	socket_server_close(Socket),
	write('Closed Server'),nl.

% Server Loop 
% Uncomment writes for more information on incomming connections
server_loop(Socket) :-
	repeat,
	socket_server_accept(Socket, _Client, Stream, [type(text)]),
		% write('Accepted connection'), nl,
	    % Parse Request
		catch((
			read_request(Stream, Request),
			read_header(Stream)
		),_Exception,(
			% write('Error parsing request.'),nl,
			close_stream(Stream),
			fail
		)),
		
		% Generate Response
		handle_request(Request, MyReply, Status),
		format('Request: ~q~n',[Request]),
		format('Reply: ~q~n', [MyReply]),
		
		% Output Response
		format(Stream, 'HTTP/1.0 ~p~n', [Status]),
		format(Stream, 'Access-Control-Allow-Origin: *~n', []),
		format(Stream, 'Content-Type: text/plain~n~n', []),
		format(Stream, '~p', [MyReply]),
	
		% write('Finnished Connection'),nl,nl,
		close_stream(Stream),
	(Request = quit), !.
	
close_stream(Stream) :- flush_output(Stream), close(Stream).

% Handles parsed HTTP requests
% Returns 200 OK on successful aplication of parse_input on request
% Returns 400 Bad Request on syntax error (received from parser) or on failure of parse_input
handle_request(Request, MyReply, '200 OK') :- catch(parse_input(Request, MyReply),error(_,_),fail), !.
handle_request(syntax_error, 'Syntax Error', '400 Bad Request') :- !.
handle_request(_, 'Bad Request', '400 Bad Request').

% Reads first Line of HTTP Header and parses request
% Returns term parsed from Request-URI
% Returns syntax_error in case of failure in parsing
read_request(Stream, Request) :-
	read_line(Stream, LineCodes),
	print_header_line(LineCodes),
	
	% Parse Request
	atom_codes('GET /',Get),
	append(Get,RL,LineCodes),
	read_request_aux(RL,RL2),	
	
	catch(read_from_codes(RL2, Request), error(syntax_error(_),_), fail), !.
read_request(_,syntax_error).
	
read_request_aux([32|_],[46]) :- !.
read_request_aux([C|Cs],[C|RCs]) :- read_request_aux(Cs, RCs).


% Reads and Ignores the rest of the lines of the HTTP Header
read_header(Stream) :-
	repeat,
	read_line(Stream, Line),
	print_header_line(Line),
	(Line = []; Line = end_of_file),!.

check_end_of_header([]) :- !, fail.
check_end_of_header(end_of_file) :- !,fail.
check_end_of_header(_).

% Function to Output Request Lines (uncomment the line bellow to see more information on received HTTP Requests)
% print_header_line(LineCodes) :- catch((atom_codes(Line,LineCodes),write(Line),nl),_,fail), !.
print_header_line(_).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%                                       Commands                                                  %%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% Require your Prolog Files here
:-consult('TP1_PLOG/game.pl').

%Verify connection
parse_input(handshake, handshake).

%initial gamestate
parse_input(initial(Mode,Players),Res):- 
	%TODO add player vs bot mode
	setPlayers(Mode,Players,_),
	initial(Gamestate,Mode,Players),
	gamestateJson(Gamestate,Res).

% valid moves
parse_input(valid_moves(Gamestate),Res):-
	valid_moves(Gamestate,_,ValidMoves),
  moves_to_array(ValidMoves,JsArr),
	Res = { '"moves"' : JsArr }.

%Move = [C,L,Clr]
parse_input(move(Gamestate,Move),Res):-
  move(Gamestate,Move,NewGamestate),
  gamestateJson(NewGamestate,Res). 

parse_input(value(Gamestate,Player),Res):-
  value(Gamestate,Player,Res).

%Bot move (Difficulty -> 0-Easy 1-Hard)
parse_input(choose_move(Gamestate,Difficulty),Res):-
  choose_move(Gamestate,_,Difficulty,Res).


%End connection	
parse_input(quit, goodbye).


%Case L-C
moves_to_array([L-C|Rest],[[L,C]|T]):-
  moves_to_array(Rest,T).  

moves_to_array([],[]).

playersToStr([P1,P2],PlayerStr):-
  atom_chars(P1,P1List),
  atom_chars(P2,P2List),
  Aux = [['"'],P1List,['"',',','"'],P2List,['"']],
  append(Aux,L),
  atom_chars(PlayerStr,L).

%gamestate JSON 
gamestateJson(Gamestate,JsonGamestate):-
	Gamestate=[Board,Pecas,Alliances,Wins,Players,Mode],
	Board_json = '"board"' : Board,
	Pecas_json = '"pecas"' : Pecas,
	Alliances_json = '"alliances"' : [['"P"','"G"','"O"'],['"G"','"O"','"P"']],
	Wins_json = '"wins"' : Wins,
  
  playersToStr(Players,PlayersStr),
	Players_json = '"players"' : [PlayersStr],

	Mode_json = '"mode"' : Mode,

	JsonGamestate = { '"gamestate"' : { Board_json, Pecas_json, Alliances_json, Wins_json, Players_json, Mode_json }}.


%Test
%parse_input(test(C,N), Res) :- test(C,Res,N).
%test(_,[],N) :- N =< 0.
%test(A,[A|Bs],N) :- N1 is N-1, test(A,Bs,N1).
