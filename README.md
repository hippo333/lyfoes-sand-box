its a sand box for myself who solve the lyfoes game inspired by https://github.com/jgraham909/lyfoes-solver

my goal is to make an algorythme who can run on mind 

-level is the module who return the selected level called "columns"
the var level line 19 change sthe selected level on the switch case
on switch(level) we can add an other level

-move is the function who move a ball from a botle to an other
it move the bigball

-do the move, we ave a list of move and for each move of the list we do the move on the local column

-do all move, at the end of each main cycle we ave a list of all list of move possible and for each one we do the move  

-abstract is the function who summarise the state of the game

-coppy is for coppying the "state" of the game

-column is the basc object
the big ball is when a ball is above the same ball we take it for one ball of 2 slot (it eliminate infinit loop who duplicate branche[a-b;b-a])

-Vcolumn is virtual columns instead seek the size of the bigBall, the top ball or how many ball can go in the column i use an array who contain for each column [top Ball, the biggBall, the size of the col]

-step2 searche for one columns at time each list of move mosible 

-is finish, return true if all column in the columns is monochrome or empty

-add to the list kill the dublon in output of step2



botle==column

list of move = list of move who start when a ball go to an empty botle and over wher we make a new empty botle

columns = the element we search to solve it contain the column

columns2 = local column

//old code

-main is the main programe who manage parallel research 
the main loop limit the number of the cycle
the state is one posible way simulate
for each state we search (with crissCross) all move posible
if no move is posible we can move an alone ball (for incrise the states posible)

-crissCross search all sequence of movement who start with a column who give a ball to an empty column and over when an new empty column
on crissCross the function getTwin we search what ball can go to what column that make a new free spot for an other ball and do it recursively untile we free a column
we share the array state betbeen the function for separate the branche (i dont know the clean way to do that), state contain columns (the set of botle), and list of move (the seuence we try to make)
VColumn (Virtual columns) is simplified version of column with usefull data for each column if we do the list of move ,the top ball, the big ball, how many ball on the column
