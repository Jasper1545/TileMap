/*class MapNode {

    public x:number;
    public y:number;
    public f:number;
    public g:number;
    public h:number;
    public walkable:boolean = true;
    public parent:MapNode;
    public costMultiplier:number = 1.0;

    public constructor(x:number,y:number) {

        this.x = x;
        this.y = y;
    }

}

class Grid {

    private _startNode:MapNode;
    private _endNode:MapNode;
    private _nodes;
    private _numCols:number;
    private _numRows:number;

    public constructor(numCols:number,numRows:number) {

        this._numCols = numCols;
        this._numRows = numRows;
        this._nodes = new Array();

        for(var i = 0; i<this._numCols; i++) {

            this._nodes[i] =  new Array();
            for(var j=0; j<this._numRows; j++) {
                this._nodes[i][j] = new MapNode(i,j);
            }
        }
    }

    public getNode(x:number,y:number):MapNode {

        return this._nodes[x][y] as MapNode;
    }

    public setEndNode(x:number,y:number):void {

        this._endNode = this._nodes[x][y] as MapNode; 
    }

    public getEndNode():MapNode {

        return this._endNode;
    }

    public setStartNode(x:number,y:number):void {

        this._startNode = this._nodes[x][y] as MapNode;
    }

    public getStartNode():MapNode {

        return this._startNode;
    }

    public setWalkable(x:number,y:number,value:boolean) {

        this._nodes[x][y].walkable = value;
    }

    public getNumCols():number {

        return this._numCols;
    }

    public getNumRows():number {

        return this._numRows;
    }

}
/*
class AStar {

    private _open;
    private _closed;
    private _grid:Grid;
    private _endNode:MapNode;
    private _startNode:MapNode;
    private _path;
    private _heuristic:Function = this.diagonal;
    private _straightCost:number = 1.0;
    private _diagCost:number = Math.SQRT2;

    //this._open.sortOn("f",Array.NUMBERIC); // 把f按升序排列
    public sortopenbyf() {

        var proparray = new Array();
        var tempnode:MapNode;
        var min:number;
        
        for(var i = 0; i < this._open.length-1; i++) {

            min = i;

            for(var j = i+1; j <this._open.length; j++) {

                if (this._open[j].f < this._open[min].f) {

                    min = j;
                }

                if(min != 1) {

                    tempnode = this._open[min];
                    this._open[i] = this._open[min];
                    this._open[min] = tempnode;
                }
            }
        }

    }

    public diagonal(node:MapNode):number {

        var dx = Math.abs(node.x - this._endNode.x);
        var dy = Math.abs(node.y - this._endNode.y);
        var diag = Math.min(dx,dy);
        var straight = dx + dy;
        return this._diagCost*diag + this._straightCost*(straight - 2 * diag);
    }

    public manhattan(node:MapNode):number {

        return Math.abs(node.x - this._endNode.x) * this._straightCost + 
               Math.abs(node.y + this._endNode.y) * this._straightCost; 
    }

    public euclidian(node:MapNode):number {

        var dx = node.x - this._endNode.x;
        var dy = node.y - this._endNode.y;
        return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
    }


    public isOpen(node:MapNode):boolean {  

        for(var i = 0; i < this._open.length; i++) {

            if(node == this._open[i]) {

                return true;
            }
        }

        return false;
        
    }

    public isClosed(node:MapNode):boolean { 

         for(var i = 0; i < this._closed.length; i++) {

            if(node == this._closed[i]) {

                return true;
            }
        }

        return false;
    }

    public constructor() {

    }

    public findPath(grid:Grid):boolean {

        this._grid = grid;
        this._open = new Array();
        this._closed = new Array();
        this._startNode = this._grid.getStartNode();
        this._endNode = this._grid.getEndNode();
        this._startNode.g = 0;
        this._startNode.h = this._heuristic(this._startNode);
        this._startNode.f = this._startNode.g + this._startNode.h;

        //console.log("findpath\n");
        return this.search();
    }

    public search():boolean {

        var node:MapNode = this._startNode;

        while(node != this._endNode) {

            
            var startX:number = Math.max(0,node.x-1);
            var endX:number = Math.min(this._grid.getNumCols()-1,node.x + 1);
            var startY:number = Math.max(0,node.y-1);
            var endY:number = Math.min(this._grid.getNumRows()-1,node.y + 1);

            for(var i = startX; i<=endX; i++) {
                //console.log("searchi");
                for(var j = startY; j<=endY; j++) {
                    //console.log("searchj");
                    var test:MapNode = this._grid.getNode(i,j);

                    if(test == node||
                       !test.walkable||
                       !this._grid.getNode(node.x,test.y).walkable||
                       !this._grid.getNode(test.x,node.y).walkable) {
                           continue;
                       }

                    var cost = this._straightCost;

                    if(!((node.x == test.x)||(node.y = test.y))) {

                        cost = this._straightCost;
                    }

                    var g = node.g +cost*test.costMultiplier;
                    var h = this._heuristic(test);
                    var f = g + h;

                    if(this.isOpen(test)||this.isClosed(test)) {

                        if(test.f > f) {

                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;
                        }
                    }else {

                        test.f = f;
                        test.g = g;
                        test.h = h;
                        test.parent = node;
                        this._open.push(test);
                    }
                }
            }


            this._closed.push(node);

            if(this._open.length == 0) {

                //console.log("no path find");
                return false;
            }

            //this.sortopenbyf();
            //this._open.sortOn("f",Array.NUMBERIC); // 把f按升序排列
            this._open.sort(function (a, b) {

				return a.f - b.f;
			});
            
            node = this._open.shift() as MapNode;
            
        }
        //console.log("searchfinish");
        this.buildPath();
        return true;

    }

    public buildPath():void {

        this._path = new Array();
        var node = this._endNode;
        this._path.push(node);
        while(node != this._startNode) {
            //console.log("buildpath");
            node = node.parent;
            this._path.unshift(node);
        }

        //console.log("buildpathfinish");
    }

    public getpath():any {

        return this._path;
    }

    public clearpath(){

        this._path = new Array();
    }

}
*/

class TileNode {

    public x:number;
    public y:number;
    public f:number;
    public g:number;
    public h:number;
    public walkable:boolean = true;
    public parent:TileNode;
    public costMultiplier:number = 1.0;

    public constructor(x:number,y:number) {

        this.x = x;
        this.y = y;
    }

}

class Grid {

    public _startNode:TileNode;
    public _endNode:TileNode;
    public _nodes;
    public _numCols:number;
    public _numRows:number;

    public constructor(numCols:number,numRows:number) {

        this._numCols = numCols;
        this._numRows = numRows;
        this._nodes = new Array();

        for(var i = 0; i<this._numCols; i++) {

            this._nodes[i] =  new Array();
            for(var j=0; j<this._numRows; j++) {
                this._nodes[i][j] = new TileNode(i,j);
            }
        }
    }

    public getNode(x:number,y:number):TileNode {

        return this._nodes[x][y] as TileNode;
    }

    public setEndNode(x:number,y:number):void {

        this._endNode = this._nodes[x][y] as TileNode; 
    }

    public getEndNode():TileNode {

        return this._endNode;
    }

    public setStartNode(x:number,y:number):void {

        this._startNode = this._nodes[x][y] as TileNode;
    }

    public getStartNode():TileNode {

        return this._startNode;
    }

    public setWalkable(x:number,y:number,value:boolean) {

        this._nodes[x][y].walkable = value;
    }

    public getNumCols():number {

        return this._numCols;
    }

    public getNumRows():number {

        return this._numRows;
    }

}


class AStar {

		  _openList: TileNode[] = [];//Array<TileNode>//

		  _closedList: TileNode[] = [];  //已考察表

		  _grid: Grid;

		  _startNode: TileNode;
		  _endNode: TileNode;

		  _path: TileNode[] = [];

	_heuristic: Function = this.diagonal;

		  _straightCost: number = 1.0;
		  _diagCost: number = Math.SQRT2;

	constructor() {

	}
	public findPath(grid: Grid): Boolean {
		this._grid = grid;
		this._openList = new Array();
		this._closedList = new Array();

		this._startNode = this._grid._startNode;
		this._endNode = this._grid._endNode;

		this._startNode.g = 0;
		this._startNode.h = this._heuristic(this._startNode);
		this._startNode.f = this._startNode.g + this._startNode.h;

		return this.search();
	}

	public search(): Boolean {

		var currentNode: TileNode = this._startNode;

		while (currentNode != this._endNode) {

			var startX: number = Math.max(0, currentNode.x - 1);
			var endX: number = Math.min(this._grid._numCols - 1, currentNode.x + 1);

			var startY: number = Math.max(0, currentNode.y - 1);
			var endY: number = Math.min(this._grid._numRows - 1, currentNode.y + 1);

			for (var i: number = startX; i <= endX; i++) {

				for (var j: number = startY; j <= endY; j++) {
					var test: TileNode = this._grid._nodes[i][j];
					if (test == currentNode || !test.walkable||!this._grid._nodes[currentNode.x][test.y].walkable||!this._grid._nodes[test.x][currentNode.y].walkable)
						{continue;}

					var cost: number = this._straightCost;
					if (!((currentNode.x == test.x) || (currentNode.y == test.y))) {
						cost = this._diagCost;
					}

					var g: number = currentNode.g + cost;
					var h: number = this._heuristic(test);
					var f: number = g + h;

					if (this.isOpen(test) || this.isClosed(test)) {
						if (test.f > f) {
							test.f = f;
							test.g = g;
							test.h = h;
							test.parent = currentNode;
						}
					} else {
						test.f = f;
						test.g = g;
						test.h = h;
						test.parent = currentNode;
						this._openList.push(test);
					}
				}
			}


			this._closedList.push(currentNode);  //已考察列表

			if (this._openList.length == 0) {

				return false;
			}

			//this._openList.sortOn("f", Array.NUMERIC); 把f从小到大排序

			// var allf:number[]=new Array();
			// for(var i=0;i<this._openList.length;i++){
            // allf[i]=this._openList[i].f;
			// }
			
			this._openList.sort(function (a, b) {
				// if (a.f > b.f) {
				// 	return 1;
				// } else if (a.f < b.f) {
				// 	return -1
				// } else {
				// 	return 0;
				// }
				return a.f - b.f;
			});
			
			currentNode = this._openList.shift() as TileNode;

		}

		this.buildPath();

		return true;
	}

    public getpath():any{

        return this._path;
    }

	

	public isOpen(node: TileNode): Boolean {
		for (var i: number = 0; i < this._openList.length; i++) {
			if (this._openList[i] == node) {
				return true;
			}
		}
		return false;
			//return this._openList.indexOf(node) > 0 ? true : false;
	}

	

	public isClosed(node: TileNode): Boolean {
		for (var i: number = 0; i < this._closedList.length; i++) {
			if (this._closedList[i] == node) {
				return true;
			}
		}
		return false;
//return this._closedList.indexOf(node) > 0 ? true : false;
	}
	


    public buildPath(): void {

		this._path = new Array();
		var node: TileNode = this._endNode;
		this._path.push(node);
		while (node != this._startNode) {
			node = node.parent;
			this._path.unshift(node);  //开头加入
		}
	}

	public manhattan(node: TileNode): number {
		return Math.abs(this._endNode.x - node.x) * this._straightCost + Math.abs(this._endNode.y - node.y) * this._straightCost;
	}

	public euclidian(node: TileNode): number {
		var dx: number = this._endNode.x - node.x;
		var dy: number = this._endNode.y - node.y;

		return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
	}


	public diagonal(node: TileNode): number {
		var dx: number = Math.abs(this._endNode.x - node.x);
		var dy: number = Math.abs(this._endNode.y - node.y);

		var diag: number = Math.min(dx, dy);
		var straight: number = dx + dy;

		return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
	}

	public visited(): TileNode[] {
		return this._closedList.concat(this._openList);
	}

	public validNode(node: TileNode, currentNode: TileNode): Boolean {
		if (currentNode == node || !node.walkable) return false;

		if (!this._grid._nodes[currentNode.x][node.y].walkable) return false;

		if (!this._grid._nodes[node.x][currentNode.y].walkable) return false;

		return true;
	}
}