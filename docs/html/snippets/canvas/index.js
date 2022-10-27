//#region canvas
// 画布对象
const canvas = document.querySelector('#canvas');
// 上下文API接口
const ctx = canvas.getContext('2d');
//#endregion canvas

//#region stroke
ctx.moveTo(50, 50);
ctx.lineTo(50, 100);
ctx.lineTo(100, 100);
ctx.lineTo(100, 10);
// 别忘记用stroke进行描线
ctx.stroke();
//#endregion stroke

//#region fill
ctx.moveTo(50, 50);
ctx.lineTo(50, 100);
ctx.lineTo(100, 100);
ctx.lineTo(100, 10);
// 换成填充试试
ctx.fill();
//#endregion fill

//#region beginPath
ctx.lineWidth="5";
ctx.strokeStyle="red";
ctx.moveTo(0,75);
ctx.lineTo(250,75);
ctx.stroke();
// 告诉canvas要开始画新的东西了
ctx.beginPath();
ctx.strokeStyle="blue";
ctx.moveTo(50,0);
ctx.lineTo(150,130);
ctx.stroke();
//#endregion beginPath

//#region arc
ctx.arc(100, 75, 50, 0, 2*Math.PI);
ctx.stroke();
//#endregion arc