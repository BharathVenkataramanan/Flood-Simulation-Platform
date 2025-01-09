const obstacles3 = [
    // Parks
   [19,23,4,10,'#70A288'],
   [33,34,24,30,'#70A288'],
   [33,34,32,35,'#70A288'],[34,35,36,36,'#70A288'],[36,38,36,37,'#70A288'],[35,38,32,35,'#70A288'],
   
   // River
   [0,7,21,21,'#3185FC'],[9,25,21,21,'#3185FC'],[27,28,21,21,'#3185FC'],[28,29,22,22,'#3185FC'],[29,30,23,23,'#3185FC'],[30,31,24,24,'#3185FC'],
   [31,31,25,30,'#3185FC'],[31,31,32,37,'#3185FC'],[32,32,37,37,'#3185FC'],[32,34,38,38,'#3185FC'],[34,43,39,39,'#3185FC'],[45,49,39,39,'#3185FC'],
   [50,55,39,39,'#3185FC'],[55,56,40,40,'#3185FC'],[56,57,41,41,'#3185FC'],[57,57,42,48,'#3185FC'],[57,57,50,63,'#3185FC'],[57,57,65,77,'#3185FC'],
   [57,57,78,91, '#3185FC'],[57,57,93,98, '#3185FC'],
   [49,64,1,27, '#3185FC'],[39,43,23,31, '#3185FC'],[39,42,32,38, '#3185FC'],[44,49,26,38, '#3185FC'],[50,63,28,32, '#3185FC'],[61,63,33,40, '#3185FC'],[55,60,34,38, '#3185FC'],[57,60,39,40, '#3185FC'],[65,67,21,27, '#3185FC'],[67,77,33,41, '#3185FC'],[77,80,39,45, '#3185FC'],[86,88,1,16, '#3185FC'],[86,88,25,33, '#3185FC'],
   [84,88,74,77, '#3185FC'],[90,99,70,72, '#3185FC'],[92,99,73,77, '#3185FC'],[90,91,74,78, '#3185FC'],[72,76,74,77, '#3185FC'],[72,74,78,79, '#3185FC'],[53,56,81,99, '#3185FC'],[21,22,88,95, '#3185FC'],[23,25,86,95, '#3185FC'],
   [1,10,54,58, '#3185FC'],[4,14,59,60, '#3185FC'],
   [0,6,40,46, '#3185FC'],[4,6,47,49, '#3185FC'],[16,20,36,40, '#3185FC'],[20,21,34,35, '#3185FC'],[22,30,34,36, '#3185FC'],[21,25,37,39, '#3185FC'],[1,16,28,30, '#3185FC'],[28,30,25,31, '#3185FC'],[26,27,25,28, '#3185FC'],




   // Buildings
   [1,5,1,2],[1,5,4,5],[7,11,1,2],[7,11,4,5],[13,17,1,2],[13,17,4,5],[16,17,6,7],[19,25,1,2],[25,25,4,6],[25,25,8,10],
   [13,17,9,10],[13,14,7,7],[7,11,7,9],[1,5,7,10],
   [1,5,12,13],[7,11,11,13],
   [13,15,12,13],[17,20,12,13],[22,25,12,13],
   [1,3,15,16],[1,3,18,19],[5,7,15,16],[5,7,18,19],[1,1,17,17],[7,7,17,17],[9,20,15,16],[22,25,15,16],[9,15,18,19],[17,25,18,19],
   [1,1,23,23],[3,3,23,23],[5,5,23,23],[7,7,23,23],[9,9,23,23],[11,11,23,23],[13,13,23,23],[15,15,23,23],
   [17,17,23,23],[19,19,23,23],[21,21,23,23],[23,23,23,23],[25,25,23,23],
   [1,3,25,25],[5,7,25,25],[9,11,25,25],[13,15,25,25],[17,21,25,25],[23,23,25,25],[25,25,25,25],
   [1,7,27,27],[9,15,27,27],[17,23,27,27],[27,27,24,24],
   [1,3,31,31],[5,7,31,31],[9,11,31,31],[13,15,31,31],
   [1,3,33,33],[5,7,33,33],[9,11,33,33],[13,15,33,35],
   [29,29,32,33],[26,27,32,33],[21,24,32,33],[26,27,30,30],
   [17,24,30,30],[17,19,32,33],[17,24,29,29],[26,27,29,29],
   [27,28,12,17],[27,28,19,19],[30,31,12,16],[31,32,21,21],[32,32,22,22],
   [31,32,20,20],[30,32,19,19],[30,30,20,20],[30,32,17,17],
   [27,28,8,10],[30,31,8,10],[27,28,4,6],[30,30,4,6],[32,32,4,6],[27,32,1,2],
   [17,19,35,35],
   [36,38,30,30],[36,38,28,28],[36,38,24,26],[34,34,19,22],[36,38,19,22],
   [9,11,35,35],[9,9,36,37],[11,11,37,38],[10,11,39,39],[7,8,39,39],[5,7,35,37],
   [13,15,37,39],[5,5,39,39],[2,3,39,39],[3,3,35,38],[2,2,35,35],[1,2,37,37],[1,1,35,35],[1,1,39,39],
   [33,34,12,15],[34,34,16,17],[36,36,15,17],[36,36,12,13],[38,38,12,17],[33,34,8,10],
   [34,34,5,6],[34,34,1,3],
   [36,38,5,10],[36,38,1,3],[40,42,1,3],[40,42,5,10],
   [40,40,12,13],[41,42,12,12],[42,42,13,17],[41,41,15,15],[40,41,17,17],[40,40,15,15],[40,40,19,19],
   [42,42,19,22],[40,41,22,22],[41,41,21,21],
   [43,43,36,37],[43,43,32,34],
   [44,44,24,25],[45,48,25,25],[46,48,19,23],[44,44,21,22],[44,44,19,19],
   [44,48,16,17],[44,45,12,14],[47,48,12,14],[44,48,10,10],[44,44,8,8],[46,48,8,8],[44,48,5,6],[44,44,1,3],
   [46,46,1,2],[47,48,2,2],[48,48,1,1],[46,46,4,4],[48,48,4,4],
   [34,38,41,41],[40,43,41,41],[45,45,41,41],[47,48,41,41],[47,48,43,44],[47,48,46,48],[44,45,44,47],[45,45,43,43],
   [43,43,43,43],[43,43,44,47],[40,41,43,43],[40,41,45,47],[45,45,48,48],[43,43,48,48],[41,41,48,48],[40,40,48,48],
   [38,38,43,48],[36,36,47,48],[36,36,43,45],[34,34,43,45],[33,34,47,48],[31,32,40,45],[30,30,39,40],[29,29,37,37],
   [26,26,37,37],[27,27,37,37],[26,28,39,39],[28,28,41,45],[29,29,42,45],[26,26,41,45],[26,31,47,48],
   [21,24,40,40],[21,22,42,42],[24,24,42,45],[21,22,44,45],[19,19,41,45],[14,17,41,45],[21,24,47,48],[14,19,47,48],
   [1,1,47,48],[2,3,48,48],[3,3,47,47],
   [7,8,45,48],[7,8,41,43],[10,12,41,43],[10,12,45,48],
   [10,10,45,45],
   
   [1,3,50,51],[5,5,50,51],[7,11,50,51],[13,13,50,51],[15,19,50,51],[21,21,50,51],[22,22,51,51],[23,24,50,51],[26,26,50,50],[28,28,50,50],[30,31,50,51],[26,28,52,53],[30,31,53,53],[21,24,53,53],[15,19,53,53],[13,13,53,53],[9,11,53,53],[7,7,53,53],[1,5,53,53],
   [33,34,50,50],[33,34,52,53],[36,36,50,53],[37,37,53,53],[37,37,51,51],[38,38,50,50],[38,38,51,51],[38,38,53,53],[40,41,50,53],[43,43,50,53],[45,45,50,53],[47,48,50,50],[47,48,52,52],[47,48,53,53],
   [50,50,41,41],[52,53,41,41],[53,54,42,42],[56,56,43,44],[56,56,46,48],[53,54,44,44],[56,56,42,42],[53,54,46,48],[51,51,44,48],[50,50,44,45],[50,50,48,48],[51,51,41,42],[50,50,47,47],[50,50,42,42],[50,51,50,50],
   [53,54,50,50],[55,55,52,53],[53,54,52,53],[50,51,52,53],[55,55,50,50],[55,55,55,57],[55,55,59,63],[53,53,59,63],[53,53,55,57],[51,51,55,55],[50,51,57,57],[47,49,55,55],[48,48,56,57],[45,45,55,57],[46,46,57,57],[45,51,59,59],[48,51,61,61],[45,46,61,61],[45,51,63,63],
   [43,43,55,57],[43,43,59,59],[43,43,61,63],[40,41,55,55],[41,41,56,59],[40,40,59,59],[40,41,61,61],[41,41,62,63],[40,40,63,63],[38,38,55,56],[38,39,57,57],[38,38,59,63],[30,36,55,57],[34,36,59,63],[30,32,59,63],[26,28,55,55],[26,28,57,57],[26,28,59,61],[28,28,63,63],[26,26,63,63],[21,24,55,57],[21,24,59,61],[21,24,63,63],[19,19,55,59],[19,19,61,63],[15,17,55,55],[17,17,57,57],[15,15,57,57],[17,17,59,59],[15,15,59,59],[15,17,61,63],
   [13,13,55,57],[11,12,57,57],[11,11,55,55],[3,3,59,59],[1,1,59,59],[11,13,61,63],[7,9,61,61],[7,9,63,63],[5,5,61,63],[3,3,61,63],[1,1,61,63],
   [55,55,65,65],[55,55,67,69],[54,55,71,72],[55,55,74,74],[55,55,76,77],[52,53,76,77],[52,53,74,74],[52,52,69,72],[53,53,69,69],[52,53,67,67],[52,53,65,65],[47,50,65,65],[45,45,65,65],[45,50,67,67],[48,50,69,71],[45,46,69,71],[50,50,72,72],[48,48,72,72],[48,50,74,74],[50,50,76,76],[48,48,76,76],[48,50,78,78],[46,46,74,77],[46,46,72,72],[44,44,74,77],[46,49,79,79],[44,44,79,79],[44,44,69,72],[42,43,67,67],[42,42,69,72],[42,42,74,75],[42,42,77,79],[42,43,65,65],[52,52,78,80],[51,51,80,80],[54,55,79,79],[54,55,80,80],[46,49,80,80],[42,44,80,80],
   [40,40,65,67],[40,40,69,72],[40,40,74,75],[40,40,77,77],[40,40,79,80],[38,38,65,67],[38,38,69,69],[38,38,71,72],[38,38,74,74],[38,38,76,77],[38,38,79,80],[36,36,65,67],[34,35,65,65],[34,34,66,67],[34,36,69,70],[34,36,72,72],[34,36,74,75],[34,36,77,77],[34,36,79,80],[32,32,65,65],[30,30,65,65],[32,32,67,67],[30,30,67,67],[32,32,69,69],[30,30,69,69],[32,32,70,72],[30,30,71,72],[30,32,74,76],[32,32,77,77],[30,30,78,80],[31,32,79,80],[26,28,65,65],[26,28,67,67],[26,28,69,72],[28,28,74,76],[26,26,74,76],[26,28,78,78],[26,28,80,80],
   [21,24,65,65],[24,24,67,67],[21,22,67,67],[21,22,69,69],[24,24,69,70],[23,24,72,72],[21,21,70,72],[22,22,70,70],[21,24,74,74],[22,24,76,76],[21,24,78,78],[22,24,80,80],[20,20,80,80],[20,20,76,76],[19,19,74,76],[19,19,78,80],[19,19,69,72],[19,19,65,67],[17,17,65,67],[15,15,65,65],[15,15,67,67],[15,17,69,71],[17,17,72,72],[15,15,72,72],[15,17,74,76],[17,17,78,80],[15,15,78,80],[11,13,65,65],[11,13,67,67],[11,13,69,69],[11,13,71,72],[13,13,74,74],[11,11,74,76],[12,13,76,76],[11,13,78,78],[13,13,79,80],[11,11,80,80],
   [9,9,78,80],[9,9,74,76],[9,9,69,72],[9,9,67,67],[9,9,65,65],[7,7,65,67],[5,7,69,69],[7,7,70,72],[5,5,72,72],[6,6,70,70],[5,7,74,76],[5,7,78,80],[5,5,65,67],[1,3,65,65],[3,3,66,70],[1,2,67,67],[1,1,68,68],[1,1,70,70],[1,3,72,72],[1,3,74,74],[1,1,76,76],[3,3,76,76],[1,3,78,78],[1,3,80,80],
 
   [51,52,82,82],[51,52,84,84],[51,52,86,86],[52,52,87,87],[49,49,84,87],[46,49,82,82],[46,47,84,87],[49,50,88,88],[52,52,89,91],[49,50,90,91],[46,47,89,91],[46,47,93,93],[49,52,93,93],[52,52,94,94],[50,50,94,94],[47,47,94,94],[50,52,96,96],[48,48,95,96],[47,47,95,95],[50,52,98,98],[47,48,98,98],[46,46,97,98],[45,45,95,97],[44,44,93,93],[44,44,89,91],[44,44,84,87],[42,44,82,82],[42,42,83,85],[42,42,87,87],[42,42,89,91],[42,42,93,95],[43,43,95,96],[42,42,97,98],[43,43,98,98],
   [38,40,82,82],[38,40,84,84],[39,39,85,86],[40,40,86,86],[38,38,86,86],[38,40,88,90],[40,40,91,91],[38,38,91,91],[38,40,93,94],[38,40,96,98],[34,36,82,82],[34,36,84,86],[34,36,88,88],[34,36,90,90],[36,36,92,92],[34,34,92,92],[34,36,94,94],[34,36,96,96],[34,36,98,98],[32,32,96,98],[32,32,92,94],[32,32,90,90],[32,32,88,88],[32,32,84,86],[32,32,82,82],[30,30,82,82],[28,30,84,84],[28,28,82,83],[26,27,82,82],[26,26,83,84],[28,31,86,86],[26,26,86,86],[28,30,88,90],[26,26,88,90],[26,26,92,92],[28,30,92,92],[28,30,94,94],[26,26,94,94],[26,30,96,96],[28,30,98,98],[26,26,98,98],
   [22,24,82,82],[22,22,83,84],[24,24,83,85],[22,22,86,87],[24,24,96,96],[22,22,96,98],[24,24,98,98],[19,20,82,84],
   [19,20,86,86],[19,20,88,89],[20,20,91,91],[18,18,91,93],[20,20,93,95],[18,18,95,97],[20,20,97,98],[14,18,98,98],[14,16,96,96],[16,16,95,95],[14,14,95,95],[14,16,93,93],[16,16,91,91],[14,14,91,91],[14,17,88,89],[14,17,86,86],[16,17,84,84],[14,14,82,84],[15,17,82,82],[12,12,82,82],[11,11,82,83],[11,12,84,84],[11,12,86,86],[11,12,88,89],[11,12,91,91],[11,12,93,93],[11,12,95,96],[11,12,98,98],[5,9,82,83],[7,9,85,85],[5,5,85,85],[7,9,87,87],[5,5,87,87],[5,5,89,89],[7,9,89,89],[5,9,91,91],[9,9,92,94],[5,8,93,93],[7,7,94,94],[5,5,94,94],[5,9,96,96],[5,9,98,98],[1,3,82,83],[3,3,85,87],[1,2,85,85],[1,1,87,87],[1,3,89,89],[3,3,91,91],[1,1,91,91],[1,3,93,93],[3,3,94,96],[1,1,94,96],[1,3,98,98],
 
   [50,50,37,37],[50,50,34,35],[52,52,34,35],[52,54,37,37],[54,54,34,35],[59,60,33,33],
 
   [65,66,19,20],[65,66,16,17],[65,66,14,14],[65,66,10,12],[65,66,6,8],[65,66,4,4],[66,66,1,3],[65,65,1,1],[65,65,2,2],[64,66,28,28],[64,64,29,31],[66,66,29,31],[64,66,33,33],[64,66,35,35],[64,64,37,37],[66,66,37,37],[66,66,39,39],[64,64,39,39],[59,62,41,41],[64,66,41,41],[59,59,43,43],[61,62,43,43],[64,66,43,43],[59,59,45,48],[61,62,45,46],[61,62,48,48],[64,66,45,48],[59,59,50,51],[59,59,53,56],[59,59,58,58],[59,59,60,63],[60,62,62,62],[60,62,61,61],[62,62,60,60],[62,62,63,63],[61,61,58,58],[63,66,58,58],[64,66,60,60],[64,66,62,63],[61,61,59,60],[61,61,53,56],[61,62,50,51],[63,63,53,53],[63,63,55,55],[63,64,57,57],[65,65,53,55],[66,66,57,57],[66,66,55,55],[66,66,53,53],[64,64,51,51],[64,66,50,50],[66,66,51,52],[59,62,65,65],[64,66,65,65],[59,59,67,67],[61,61,67,67],[62,62,67,69],[61,61,69,69],[59,59,69,69],[64,66,67,69],[59,62,71,71],[64,66,71,71],[59,62,73,73],[64,64,73,73],[66,66,72,73],[59,62,75,76],[64,66,75,76],
 
   [60,62,77,77],[61,62,78,78],[62,62,79,79],[64,64,78,78],[64,66,80,80],[66,66,78,78],[65,65,81,81],[66,66,82,82],[67,67,83,83],[66,67,81,81],[68,68,83,84],[67,67,84,84],[66,68,86,86],[67,67,88,91],[67,67,93,94],[67,67,96,98],[68,68,78,78],[67,68,80,80],[68,68,81,81],[68,68,75,76],[69,69,88,91],[69,69,93,93],[69,69,95,95],[69,69,97,98],[70,71,86,89],[71,71,91,91],[71,71,93,95],[71,71,97,98],[70,71,83,84],[70,70,80,81],[71,71,81,81],[70,71,78,78],[70,71,75,76],[68,68,71,73],[70,71,71,73],[68,71,67,69],[68,71,65,65],[68,68,63,63],[70,71,63,63],[70,71,61,61],[68,68,61,61],[68,71,59,59],[68,71,57,57],[68,68,55,55],[70,71,55,55],[71,71,51,54],[72,77,51,51],[77,77,52,55],[76,76,53,54],[74,74,52,54],[72,72,53,54],[73,75,56,56],[68,69,51,53],[68,68,50,50],[70,70,48,49],[68,69,48,48],[68,68,45,47],[70,70,44,46],[71,72,46,46],[72,72,47,49],[74,77,46,49],[74,76,44,44],[72,72,44,44],[68,68,42,43],[69,72,42,42],[74,74,42,42],[76,76,42,42],[78,79,34,38],[79,79,46,49],[79,79,51,55],[77,79,57,57],[75,75,57,57],[73,73,57,57],[73,75,59,59],[77,79,59,59],
 
   [68,68,32,32],[68,68,28,30],[70,70,28,32],[72,72,31,32],[72,72,28,29],[74,76,28,32],[78,78,28,32],[80,80,28,32],[79,79,30,30],[78,80,26,26],[74,76,26,26],[72,72,26,26],[68,70,26,26],[68,68,24,24],[68,70,22,22],[70,70,24,24],[72,72,22,24],[74,76,22,24],[77,78,23,23],[78,80,24,24],[80,80,22,23],[78,78,22,22],[78,80,20,20],[74,76,20,20],[72,72,20,20],[68,70,20,20],[68,68,19,19],[70,70,19,19],[72,75,19,19],[78,78,19,19],[80,80,19,19],[68,70,17,17],[72,72,17,17],[74,76,17,17],[75,75,18,18],[76,76,18,18],[78,80,17,17],[68,68,15,15],[70,72,15,15],[74,76,15,15],[78,78,15,15],[80,80,15,15],[78,80,13,13],[74,76,13,13],[70,72,13,13],[68,68,13,13],[68,68,10,11],[70,72,10,11],[74,74,11,11],[76,76,10,11],[74,74,8,9],[75,76,8,8],[78,80,8,11],[70,72,8,8],[68,68,8,8],[68,70,6,6],[72,72,6,6],[74,76,6,6],[78,80,6,6],[68,68,4,4],[68,68,2,2],[68,70,1,1],[70,70,3,4],[72,72,1,4],[73,75,4,4],[73,75,2,2],[74,74,1,1],[77,77,2,4],[75,77,1,1],[79,79,1,4],[81,81,4,4],[81,81,1,2],[82,83,6,6],[83,83,1,4],[82,83,8,11],[82,83,13,13],[82,83,15,15],[82,82,17,17],[82,82,19,19],[82,83,20,20],[84,84,19,20],[84,84,17,17],[82,84,22,24],[82,82,26,26],[84,84,26,26],[82,82,28,30],[83,85,28,28],[84,84,29,30],[82,85,32,32],[85,85,30,30],[85,85,13,15],[85,85,10,11],[85,85,6,8],[85,85,1,4],[86,87,22,24],[86,87,19,20],[86,87,17,17],
 
   [89,91,1,1],[89,91,3,3],[93,93,1,3],[94,96,2,2],[95,97,1,1],[98,98,1,3],[98,98,5,5],[96,96,4,5],[95,95,4,4],[93,94,5,5],[91,91,5,5],[89,89,5,8],[91,91,7,8],[93,94,7,8],[96,96,7,8],[98,98,7,8],[89,91,10,11],[93,96,10,11],[98,98,10,11],[89,91,13,13],[93,96,13,13],[98,98,13,13],[89,91,15,15],[89,91,17,17],[93,94,15,15],[93,93,17,17],[95,96,17,17],[96,96,15,15],[98,98,15,17],[89,91,19,20],[93,93,19,20],[95,96,19,20],[98,98,19,19],[98,98,21,26],[93,97,22,22],[97,97,24,24],[93,95,24,24],[93,93,23,23],[96,96,26,26],[93,94,26,26],[91,91,22,22],[89,91,24,24],[89,89,22,23],[89,91,26,26],[89,89,28,28],[89,91,30,30],[91,91,28,29],[93,94,28,28],[93,94,30,30],[96,98,28,28],[96,96,29,30],[98,98,29,30],
 
   [89,98,32,32],[81,83,34,34],[85,85,34,34],[87,87,34,34],[89,92,34,34],[94,96,34,36],[98,98,34,36],[90,92,36,36],[91,91,35,35],[87,88,36,36],[83,85,36,36],[81,81,36,36],[81,83,38,38],[85,85,38,38],[87,88,38,38],[90,92,38,38],[94,94,38,38],[96,96,38,38],[98,98,38,38],[81,81,40,44],[82,82,42,42],[82,82,40,40],[82,82,44,44],[84,85,40,40],[84,84,41,44],[85,85,44,44],[86,86,42,42],
 
   [87,87,40,44],[89,89,40,41],[89,89,43,44],[91,91,40,44],[93,93,40,40],[93,93,42,44],[95,95,40,42],[96,97,40,40],[97,97,41,42],[95,97,44,44],[81,82,46,46],[81,82,48,49],[84,85,46,49],[87,87,46,46],[87,87,48,49],[89,89,46,49],[90,91,46,46],[91,91,48,48],[91,91,49,49],[93,93,46,46],[93,97,48,49],[95,97,46,46],[98,98,40,40],[98,98,42,42],[98,98,44,46],[98,98,48,48],[98,98,50,50],
 
   [93,96,50,50],[89,91,51,51],[85,87,51,51],[81,83,51,51],[81,83,53,55],[85,87,53,53],[85,87,55,55],[89,89,53,53],[89,91,55,55],[91,91,53,54],[93,94,52,52],[96,98,52,52],[93,94,54,55],[96,98,54,55],[81,83,57,59],[85,85,57,57],[87,87,57,57],[86,86,58,58],[85,87,59,59],[89,91,57,57],[89,91,59,59],[93,93,57,59],[95,95,57,59],[96,98,57,57],[98,98,58,59],[97,97,59,59],
 
   [73,75,61,61],[73,75,63,63],[77,79,61,63],[81,81,61,61],[83,83,61,61],[81,83,63,63],[85,85,61,63],[86,89,61,61],[87,91,63,63],[91,91,61,62],[93,93,61,63],[95,98,61,63],[73,75,65,65],[77,79,65,65],[81,81,65,65],[83,86,65,65],[88,91,65,65],[93,98,65,66],[73,73,67,67],[73,75,69,69],[75,75,67,68],[77,79,67,69],[81,84,67,67],[81,83,69,69],[85,87,69,69],[86,86,67,67],[88,91,67,67],[89,91,69,69],[93,98,68,69],[73,75,71,71],[73,75,73,73],[77,79,71,73],[81,83,71,71],[81,83,73,73],[85,85,71,73],
   [87,87,71,73],[89,89,71,71],[89,89,73,73],[89,89,75,75],[91,91,73,73],
 
   [77,79,75,75],[77,79,77,77],[81,83,75,77],[75,75,78,78],[77,77,78,78],[79,79,78,78],[81,81,78,78],[83,83,78,78],[85,85,78,78],[87,87,78,78],[72,73,80,81],[75,79,80,81],[81,83,80,80],[85,85,80,80],[87,87,80,80],[89,91,79,80],[93,95,79,80],[97,97,79,79],[98,98,80,83],[97,97,81,83],[98,98,78,79],
 
   [93,95,82,83],[89,91,82,83],[87,87,82,82],[85,85,82,82],[81,83,82,82],[73,73,83,83],[75,79,83,83],[81,81,83,86],[83,83,84,86],[85,87,84,86],[75,79,85,86],[73,73,85,86],[89,91,85,85],[90,95,86,86],[93,93,84,85],[95,95,85,85],[97,98,85,86],[73,73,88,88],[73,73,90,91],[75,79,88,88],[75,79,90,91],[81,81,88,88],[81,81,90,91],[83,85,90,90],[84,84,91,91],[82,82,92,92],[82,82,93,96],[83,85,88,88],[87,87,88,88],[87,89,90,90],[89,89,87,89],[91,91,88,90],[93,93,88,90],[95,98,88,88],[95,97,89,90],[98,98,90,90],[95,98,92,92],[91,93,92,94],[87,89,92,92],[84,85,92,92],[84,85,94,94],[87,87,94,94],[89,89,94,94],[84,87,96,97],[89,93,96,97],[95,95,94,94],[97,98,94,97],[95,95,96,97],[98,98,98,98],[95,97,98,98],[93,93,98,98],[85,91,98,98],[82,82,98,98],[73,73,93,93],[75,79,93,93],[81,81,93,93],[78,80,95,98],[76,76,95,95],[73,76,97,98],[73,74,95,95],
 
   [59,60,80,80],[59,59,77,79],[59,62,82,82],[59,61,84,84],[62,62,81,81],[63,65,84,84],[64,64,83,83],[64,64,81,81],[59,61,86,88],[59,61,90,91],[63,64,86,86],[63,65,88,88],[63,65,90,91],[59,59,93,93],[61,61,93,93],[59,61,95,96],[59,61,98,98],[63,63,93,93],[63,65,95,95],[65,65,93,94],[63,65,97,98],
  ];
  export default obstacles3;