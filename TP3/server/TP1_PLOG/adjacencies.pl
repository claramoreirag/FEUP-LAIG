/*adjacent(Linha-Coluna,ListaDeCelulasAdjacentes).*/

adjacent(0-0,[1-0,1-1,2-1]).
adjacent(0-1,[1-1,1-2,2-2]).
adjacent(1-0,[2-0,2-1,3-1,0-0]).
adjacent(1-1,[0-0,0-1,2-1,2-2,3-2]).
adjacent(1-2,[0-1,2-2,2-3,3-3]).
adjacent(2-0,[1-0,3-0,3-1,4-1]).
adjacent(2-1,[0-0,1-0,1-1,3-1,3-2,4-2]).
adjacent(2-2,[0-1,1-1,1-2,3-2,3-3,4-3]).
adjacent(2-3,[1-2,3-3,3-4,4-4]).
adjacent(3-0,[2-0,4-0,4-1,5-0]).
adjacent(3-1,[1-0,2-0,2-1,4-1,4-2,5-1]).
adjacent(3-2,[1-1,2-1,2-2,4-2,4-3,5-2]).
adjacent(3-3,[1-2,2-2,2-3,4-3,4-4,5-3]).
adjacent(3-4,[2-3,4-4,4-5,5-4]).
adjacent(4-0,[3-0,5-0,6-0]).
adjacent(4-1,[2-0,3-0,3-1,5-0,5-1,6-1]).
adjacent(4-2,[2-1,3-1,3-2,5-1,5-2,6-2]).
adjacent(4-3,[2-2,3-2,3-3,5-2,5-3,6-3]).
adjacent(4-4,[2-3,3-3,3-4,5-3,5-4,6-4]).
adjacent(4-5,[3-4,5-4,6-5]).
adjacent(5-0,[3-0,4-0,4-1,6-0,6-1,7-1]).
adjacent(5-1,[3-1,4-1,4-2,6-1,6-2,7-2]).
adjacent(5-2,[3-2,4-2,4-3,6-2,6-3,7-3]).
adjacent(5-3,[3-3,4-3,4-4,6-3,6-4,7-4]).
adjacent(5-4,[3-4,4-4,4-5,6-4,6-5,7-5]).
adjacent(6-0,[4-0,5-0,7-0,7-1,8-0]).
adjacent(6-1,[4-1,5-0,5-1,7-1,7-2,8-1]).
adjacent(6-2,[4-2,5-1,5-2,7-2,7-3,8-2]).
adjacent(6-3,[4-3,5-2,5-3,7-3,7-4,8-3]).
adjacent(6-4,[4-4,5-3,5-4,7-4,7-5,8-4]).
adjacent(6-5,[4-5,5-4,7-5,7-6,8-5]).
adjacent(7-0,[6-0,8-0,9-0]).
adjacent(7-1,[5-0,6-0,6-1,8-0,8-1,9-1]).
adjacent(7-2,[5-1,6-1,6-2,8-1,8-2,9-2]).
adjacent(7-3,[5-2,6-2,6-3,8-2,8-3,9-3]).
adjacent(7-4,[5-3,6-3,6-4,8-3,8-4,9-4]).
adjacent(7-5,[5-4,6-4,6-5,8-4,8-5,9-5]).
adjacent(7-6,[6-5,8-5,9-6]).
adjacent(8-0,[6-0,7-0,7-1,9-0,9-1,10-0]).
adjacent(8-1,[6-1,7-1,7-2,9-1,9-2,10-1]).
adjacent(8-2,[6-2,7-2,7-3,9-2,9-3,10-2]).
adjacent(8-3,[6-3,7-3,7-4,9-3,9-4,10-3]).
adjacent(8-4,[6-4,7-4,7-5,9-4,9-5,10-4]).
adjacent(8-5,[6-5,7-5,7-6,9-5,9-6,10-5]).
adjacent(9-0,[7-0,8-0,10-0,11-0]).
adjacent(9-1,[7-1,8-0,8-1,10-0,10-1,11-1]).
adjacent(9-2,[7-2,8-1,8-2,10-1,10-2,11-2]).
adjacent(9-3,[7-3,8-2,8-3,10-2,10-3,11-3]).
adjacent(9-4,[7-4,8-3,8-4,10-3,10-4,11-4]).
adjacent(9-5,[7-5,8-4,8-5,10-4,10-5,11-5]).
adjacent(9-6,[7-6,8-5,10-5,11-6]).
adjacent(10-0,[8-0,9-0,9-1,11-0,11-1,12-0]).
adjacent(10-1,[8-1,9-1,9-2,11-1,11-2,12-1]).
adjacent(10-2,[8-2,9-2,9-3,11-2,11-3,12-2]).
adjacent(10-3,[8-3,9-3,9-4,11-3,11-4,12-3]).
adjacent(10-4,[8-4,9-4,9-5,11-4,11-5,12-4]).
adjacent(10-5,[8-5,9-5,9-6,11-5,11-6,12-5]).
adjacent(11-0,[9-0,10-0,12-0,13-0]).
adjacent(11-1,[9-1,10-0,10-1,12-0,12-1,13-1]).
adjacent(11-2,[9-2,10-1,10-2,12-1,12-2,13-2]).
adjacent(11-3,[9-3,10-2,10-3,12-2,12-3,13-3]).
adjacent(11-4,[9-4,10-3,10-4,12-3,12-4,13-4]).
adjacent(11-5,[9-5,10-4,10-5,12-4,12-5,13-5]).
adjacent(11-6,[9-6,10-5,12-5,13-6]).
adjacent(12-0,[10-0,11-0,11-1,13-0,13-1,14-0]).
adjacent(12-1,[10-1,11-1,11-2,13-1,13-2,14-1]).
adjacent(12-2,[10-2,11-2,11-3,13-2,13-3,14-2]).
adjacent(12-3,[10-3,11-3,11-4,13-3,13-4,14-3]).
adjacent(12-4,[10-4,11-4,11-5,13-4,13-5,14-4]).
adjacent(12-5,[10-5,11-5,11-6,13-5,13-6,14-5]).
adjacent(13-0,[11-0,12-0,14-0,15-0]).
adjacent(13-1,[11-1,12-1,14-1,15-1,12-0,14-0]).
adjacent(13-2,[11-2,12-2,14-2,15-2,12-1,14-1]).
adjacent(13-3,[11-3,12-3,14-3,15-3,12-2,14-2]).
adjacent(13-4,[11-4,12-4,14-4,15-4,12-3,14-3]).
adjacent(13-5,[11-5,12-5,14-5,15-5,14-4,12-4]).
adjacent(13-6,[11-6,12-5,14-5,15-6]).
adjacent(14-0,[12-0,13-0,15-0,16-0,15-1,13-1]).
adjacent(14-1,[13-1,15-1,16-1,15-2,13-2,12-1]).
adjacent(14-2,[15-2,16-2,15-3,13-3,12-2,13-3]).
adjacent(14-3,[13-3,15-3,16-3,15-4,13-4,12-3]).
adjacent(14-4,[13-5,12-4,13-4,15-4,16-4,15-5]).
adjacent(14-5,[12-5,13-5,15-5,16-5,15-6,13-6]).
adjacent(15-0,[13-0,14-0,16-0]).
adjacent(15-1,[14-0,13-1,14-1,16-0,17-0,16-1]).
adjacent(15-2,[13-2,14-2,16-2,14-1,16-1,17-1]).
adjacent(15-3,[14-2,16-2,17-2,16-3,14-3,13-3]).
adjacent(15-4,[14-3,13-4,14-4,16-4,17-3,16-3]).
adjacent(15-5,[13-5,14-4,16-4,17-4,16-5,14-5]).
adjacent(15-6,[13-6,14-5,16-5]).
adjacent(16-0,[15-0,14-0,15-1,17-0,18-0]).
adjacent(16-1,[15-1,17-0,18-1,17-1,15-2,14-1]).
adjacent(16-2,[15-2,17-1,18-2,17-2,15-3,14-2]).
adjacent(16-3,[15-3,17-2,18-3,17-3,15-4,14-3]).
adjacent(16-4,[15-4,17-3,18-4,17-4,15-5,14-4]).
adjacent(16-5,[15-5,17-4,18-5,15-6,14-5]).
adjacent(17-0,[16-0,18-0,19-0,18-1,16-1,15-1]).
adjacent(17-1,[16-1,18-1,19-1,18-2,16-2,15-2]).
adjacent(17-2,[16-2,18-2,19-2,18-3,16-3,15-3]).
adjacent(17-3,[16-3,18-3,15-4,16-4,18-4]).
adjacent(17-4,[16-4,18-4,19-4,18-5,16-5,15-5]).
adjacent(18-0,[19-0,17-0,16-0]).
adjacent(18-1,[17-0,19-0,16-1,17-1,19-1,20-0]).
adjacent(18-2,[17-2,19-1,16-2,20-1,17-2,19-2]).
adjacent(18-3,[16-3,17-2,17-3,19-2,20-2,19-3]).
adjacent(18-4,[17-3,19-3,16-4,17-4,19-4,20-4]).
adjacent(18-5,[16-5,17-4,19-4]).
adjacent(19-0,[18-0,17-0,18-1,20-0]).
adjacent(19-1,[18-1,20-0,17-1,18-2,20-1,21-0]).
adjacent(19-2,[18-2,20-1,17-2,18-3,20-2,21-1]).
adjacent(19-3,[20-2,18-3,18-4,17-3,20-3,21-2]).
adjacent(19-4,[20-3,18-4,17-4,18-5]).
adjacent(20-0,[19-0,18-1,19-1,21-1]).
adjacent(20-1,[21-0,19-1,18-2,19-2,21-1,22-0]).
adjacent(20-2,[19-2,18-3,19-3,21-1,22-1,21-2]).
adjacent(20-3,[21-2,19-3,18-4,19-4]).
adjacent(21-0,[20-0,19-1,20-1,22-0]).
adjacent(21-1,[22-0,20-1,19-2,20-2,22-2]).
adjacent(21-2,[22-1,20-2,19-3,20-3]).
adjacent(22-0,[21-0,20-1,21-1]).
adjacent(22-1,[21-1,20-2,21-2]).

/* Adjacent Color */
/* Is Cell (Line,Column) adjacent to Color? */
adjacent(Line,Column,Color):-
    Line<5,
    lineLength(Line,Length),
    Len=Length-1,
    Column=:=Len,
    Color='G'.

adjacent(Line,Column,Color):-
    Line<5,
    Column=:=0,
    Color='P'.

adjacent(Line,Column,Color):-
    Line>17,
    lineLength(Line,Length),
    Len=Length-1,
    Column=:=Len,
    Color='P'.

adjacent(Line,Column,Color):-
    Line>17,
    Column=:=0,
    Color='G'.

adjacent(Line,Column,Color):-
    Line>6,
    Line<16,
    lineLength(Line,Length),
    Len=Length-1,
    Column=:=Len,
    Color='O'.

adjacent(Line,Column,Color):-
    Line>6,
    Line<16,
    Column=:=0,
    Color='O'.
