var canvas=document.getElementById('canvas');
var cobj=canvas.getContext('2d');
// 判断下棋者是黑子还是白子的情况
var me=true;
// 判断游戏是否结束
var over=false;
// 阻止重复落子情况的数组
var arr=[];
// arr数组初始化
for(var i=0;i<15;i++){
	arr[i]=[];
	for(var j=0;j<15;j++){
		arr[i][j]=0;
	}
}
// 赢法数组
var wins=[];
// 创建赢法的三维数组
for(var i=0;i<15;i++){
	wins[i]=[];
	for(var j=0;j<15;j++){
		wins[i][j]=[];
	}
}

// count只第几种赢法的索引

/*例：竖线
	wins[0][0][0]=true;
	wins[0][1][0]=true;
	wins[0][2][0]=true;
	wins[0][3][0]=true;
	wins[0][4][0]=true;
*/
// 赢法次数
var count=[]; 
/*i：行数  ；
j：列数；
k：五颗子*/
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			// 第count种赢法的下标是[i][j+k]
			wins[i][j+k][count]=true;
		}
		count++;
	}
}
//例：横线
/*
	wins[0][0][0]=true;
	wins[1][0][0]=true;
	wins[2][0][0]=true;
	wins[3][0][0]=true;
	wins[4][0][0]=true;
*/
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[j+k][i][count]=true;
		}
		count++;
	}
}
// 斜线
/*
	wins[0][0][0]=true;
	wins[1][1][0]=true;
	wins[2][2][0]=true;
	wins[3][3][0]=true;
	wins[4][4][0]=true;
*/
for(var i=0;i<11;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[i+k][j+k][count]=true;
		}
		count++;
	}
}
// 反斜线
/*
	wins[0][14][0]=true;
	wins[1][13][0]=true;
	wins[2][12][0]=true;
	wins[3][11][0]=true;
	wins[4][10][0]=true;
*/
for(var i=0;i<11;i++){
	for(var j=14;j>3;j--){
		for(var k=0;k<5;k++){
			wins[i+k][j-k][count]=true;
		}
		count++;
	}
}

// 572    console.log(count) 
// 赢法的统计数组
var mywin=[];
var computerwin=[];
// 赢法的统计数组的初始化
for(var i=0;i<count;i++){
	mywin[i]=0;
	computerwin[i]=[0];
}
// 引入图片
var img=new Image();
img.src='1.jpg';
img.onload=function(){
	cobj.drawImage(img,-1,-1,451,451);
	drawChessBoard();
}
// 画棋盘
function drawChessBoard(){
	for(var i=0;i<15;i++){
		cobj.strokeStyle='#696969';
		// 竖线
		cobj.moveTo(15+i*30,15);
		cobj.lineTo(15+i*30,435);
		cobj.stroke();
		// 横线
		cobj.moveTo(15,15+i*30);
		cobj.lineTo(435,15+i*30);
		cobj.stroke();
	}
}
// 画棋子  i:行   j：列     me：棋子颜色(true黑，false白)   
function drawPointer(i,j,me){
	cobj.beginPath();
	cobj.arc(15+i*30,15+j*30,13,0,Math.PI*2);
	cobj.closePath();
	var colorobj=cobj.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
	if(me){
		colorobj.addColorStop(0,'#0A0A0A');
		colorobj.addColorStop(1,'#636766');
	}else{
		colorobj.addColorStop(0,'#D1D1D1');
		colorobj.addColorStop(1,'#F9F9F9');
	}
	cobj.fillStyle=colorobj;
	cobj.fill();
}
// 落子情况
canvas.onclick=function(e){
	// 如果游戏结束，阻止棋盘继续落子
	if(over){
		return;
	}
	// 不允许除了我以外的情况落子
	if(!me){
		return;
	}
	var x=e.offsetX;
	var y=e.offsetY;
	var i=Math.floor(x/30);
	var j=Math.floor(y/30);
	// 如果当前位置没有棋子
	if(arr[i][j]==0){
		// 允许落子
		drawPointer(i,j,me);
		// 并且黑子的值为1
			arr[i][j]=1;
		// 循环赢法次数
		for(var k=0;k<count;k++){
			// 如果当前情况满足赢法数组的条件
			if(wins[i][j][k]){
				// 那么让我的赢法统计数组++
				mywin[k]++;
			// 计算机赢法统计数组统计为6，代表这种赢法以失去
				computerwin[k]=6;
				// 如果我的赢法统计数组为5，代表5颗子连在一起
				if(mywin[k]==5){
					// 那么弹出'你赢了!'
					alert('你赢了!');
					// 游戏结束
					over=true;
				}
			}
		}
		// 如果游戏没有结束
		if(!over){
			// 交替落子
			me=!me;
			// 调用计算机赢法情况函数
			computerAI();
		}
	}
}

var computerAI=function(){
	// 我的分数，即计算机拦截分数
	var myScore=[];
	// 计算机自身赢的分数
	var computerScore=[];
	// 当前位置赢法分数的最大值
	var max=0;
	// 当前位置赢法分数的最大值的下标
	var u=0,v=0;
	// 分数初始化
	for(var i=0;i<15;i++){
		myScore[i]=[];
		computerScore[i]=[];
		for(var j=0;j<15;j++){
			// 初始分数都为0
			myScore[i][j]=0;
			computerScore[i][j]=0;
		}
	}
	// 循环行
	for(var i=0;i<15;i++){
		// 循环列
		for(var j=0;j<15;j++){
			// 如果当前位置没有落子
			if(arr[i][j]==0){
				// 循环赢法次数
				for(var k=0;k<count;k++){
					// 如果当前调节满足赢法数组的情况
					if(wins[i][j][k]){
						//我赢，计算机拦截
						// 拦截第一颗子，加200分
						if(mywin[k]==1){
							myScore[i][j]+=200
						}else if(mywin[k]==2){
							// 拦截第二颗子，加400分
							myScore[i][j]+=400
						}else if(mywin[k]==3){
							// 拦截第三颗子，加2000分
							myScore[i][j]+=2000
						}else if(mywin[k]==4){
							// 拦截第四颗子，加10000分
							myScore[i][j]+=10000
						}
						// 计算机自身情况
						// 计算机自己落第一颗子，加240分
						if(computerwin[k]==1){
							computerScore[i][j]+=240
						}else if(computerwin[k]==2){
							// 计算机自己落第二颗子，加460分
							computerScore[i][j]+=460
						}else if(computerwin[k]==3){
							// 计算机自己落第三颗子，加2100分
							computerScore[i][j]+=2100
						}else if(computerwin[k]==4){
							// 计算机自己落第四颗子，加20000分
							computerScore[i][j]+=20000
						}
					}
				}

				// 判断计算机在i,j坐标拦截分数
				if(myScore[i][j]>max){
					// 如果计算机在i,j坐标分数>最大分数，将i,j坐标分数赋值给最大分，同时i赋值给u，j赋值给v
					max=myScore[i][j];
					u=i;
					v=j;
				}else if(myScore[i][j]==max){
					if(computerScore[i][j]>computerScore[u][v]){
						u=i;
						v=j;
					}
				}
				// 原理同上
				if(computerScore[i][j]>max){
					max=computerScore[i][j];
					u=i;
					v=j;
				}else if(computerScore[i][j]==max){
					if(myScore[i][j]>myScore[u][v]){
						u=i;
						v=j;
					}
				}

			}
		}
	}
// 如果符合以上条件某种，就落白子
	drawPointer(u,v,false);
	// 让arr[][]的值为2；
	arr[u][v]=2;
	// 循环赢法次数
	for(var k=0;k<count;k++){
		// 如果当前情况满足赢法数组的条件
		if(wins[u][v][k]){
			// 那么让计算机的赢法统计数组++
			computerwin[k]++;
			//我的赢法统计数组统计为6，代表这种赢法以失去
			mywin[k]=6;
			// 如果我的赢法统计数组为5，代表5颗子连在一起
			if(computerwin[k]==5){
				// 计算机赢了
				alert('计算机赢了!');
				// 游戏结束
				over=true;
			}
		}
	}
	// 如果游戏还继续
	if(!over){
		// 交替落子
		me=!me;
	}
}