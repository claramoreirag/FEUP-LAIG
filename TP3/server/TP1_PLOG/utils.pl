:- use_module(library(lists)).

/* like flatten but only flattens 1 level */
flatten([H|T],FlatList):- 
    flatten(T,X),
    append(H,X,FlatList).

flatten([], []).

replace_nth0(List, Index, OldElem, NewElem, NewList) :-
   % predicate works forward: Index,List -> OldElem, Transfer
   nth0(Index,List,OldElem,Transfer),
   % predicate works backwards: Index,NewElem,Transfer -> NewList
   nth0(Index,NewList,NewElem,Transfer).

/* empty list, count of anything is 0. Base case. */
ocurrenceof([] , _,0).

/* The first item in the list is the same as what you want to count so add1 to the recursive count. */
ocurrenceof([H|T] , H,NewCount):-
    ocurrenceof(T,H,OldCount),
    NewCount is OldCount +1.

/* The first item in the list is different so keep old count */
ocurrenceof([H|T] , H2,Count):-
    dif(H,H2),
    ocurrenceof(T,H2,Count).