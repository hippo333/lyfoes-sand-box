its a sand box for myself who solve the lyfoes game inspired by https://github.com/jgraham909/lyfoes-solver

my goal is to make an algorythme who can run on mind 

____how to run:
it run on nodeJs
node ./main.js

at the end of main.js the line "main(3.01);" in the dificulty 3 level 01 (i scrached it manualy) 

you can remove "main(3.01)" and replace ti by your level
"columns0 = [
	new column(["green","blue","red"]),
	new column(["green","red","blue"]),
	new column([])
];
main(-1);"

or add it on Level.js with other and give it a name like "case 7.2" and replace in main.js "main(3.01)" by main(7.2);

(some UperCase color are already defined as number at the begening of level.js we can write GREEN instead "green")








____the modules
-level.js is the module who return the selected level called "columns"


-move is the function who move a ball from a botle to an other
it move the bigball

-do the move, we ave a list of move and for each move of the list we do the move on the local column
 

-abstract is the function who summarise the state of the game

-column is the basc object
the big ball is when a ball is above the same ball we take it for one ball of 2 slot (it eliminate infinit loop who duplicate branche[a-b;b-a])

-Vcolumn is virtual columns instead seek the size of the bigBall, the top ball or how many ball can go in the column i use an array who contain for each column [top Ball, the biggBall, the size of the col]



____lexicon
botle==column

list of move = list of move who start when a ball go to an empty botle and over wher we make a new empty botle

columns = the element we search to solve it contain the column

columns2 = local column

