 % :)__

 __ /  \ __
/  \\__//  \
\__//  \\__/
/o \\__//  \ 
\__//g \\__/
    \__/
 __     __
/o \   /p \
\__/   \__/
     __     __
    /o \   /p \
    \__/   \__/
 __    __
/o \  /p \
\__/  \__/  

 / \ / \
|   |   |
 \ / \ /
  |   |
   \ /

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
]

% array acrescentar mais 1 linha ou cada célula conecta a uma cor
% representar por hexágonos print do meio recebe 1 linha e outros recebem linha anterior e do meio
% podemos tentar gerar dinâmicamente o tabuleiro
