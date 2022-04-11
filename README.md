# LAIG 2020/2021
Project developed for the LAIG course, part of the Integrated Master's in Informatics and Computing Engeneering @FEUP

**Topics:** Graphical Interfaces, Game Development

## Group T03G03
| Name             | Number    | E-Mail               |
| ---------------- | --------- | -------------------- |
| João Fernandes   | 201806724 | up201806724@fe.up.pt |
| Clara Gadelho    | 201806309 | up201806309@fe.up.pt |

----

## Projects

### [TP1 - Scene Graph](TP1)

- Main Strong Points
  - If there are any nodes referenced that are not defined, the program prints a warning and the scene is still drawn without that node.
  - If there are any parameters of a material missing, a warning is shown and those are replaced by a default value and the scene is still drawn accordingly.
  - If there are any parameters of a node missing, a warning is shown and the scene is still drawn.
  - If there isn't a valid texture applied to certain nodes, a warning will be shown ans the nodes will be shown with a specific error texture. 
- Scene
  - The created scene consists in a study room with 4 walls, ceiling and wooden floor. 
  - Inside there's a table, a chair, a door, a window, a poster on the wall and a ceiling light.
  - On top of the table there's a computer screen, a donnut and a slice of pizza.
  - [Link to the scene](./TP1/scenes/LAIG_TP1_T3_G03.xml)

**Grade:** 18/20

-----

### [TP2 - Animations, Spritesheets and Surfaces](TP2)
- Main strong points
  - All necessary features were achieved
  - Transparencies were implemented in spritesheets
- Scene
  - The scene remains similar to TP1's scene with some new additions:
    - A rug and curtains (defined with patch primitive)
    - A vase and a lamp (defined with defbarrel primitive) 
    - A pictute on the wall (defined with plane primitive)
    - A message on the wall (defined with spritetext primitive)
    - A bat flying (defined with spriteanim primitive)
    - Animation of the door opening and closing
    - Animation of the curtains opening
    - Animation of the text 
    - Animation of the bat getting inside the room
  - [Link to the scene](./TP2/scenes/LAIG_TP1_T3_G03.xml)

**Grade:** 19/20
  
----

### [TP3 - Alliances Game](TP3)
- Main strong points
  - All necessary features were implemented
- Scene
  - Two different scenes:
    - A game room;
    - A park;

**Grade:** 18/20
