var canvas = document.getElementById('child-condition');
// 空调外壳画布
var AirConditionBox = canvas.getContext('2d');
AirConditionBox.fillStyle = '#FF0000';
AirConditionBox.fillRect(0, 0, 1200, 800);

// 空调显示屏
var AirConditionScreen = canvas.getContext('2d');
AirConditionScreen.fillStyle = '#8F8FB2';
AirConditionScreen.fillRect(10, 10, 220, 100);

// 温度显示
var TempWord = canvas.getContext('2d');
TempWord.fillStyle = '#000000';
TempWord.font = '10px Arial';
TempWord.fillText('制冷温度：25 ℃      缺省温度：25 ℃', 20, 25);

var WindWord = canvas.getContext('2d');
WindWord.fillStyle = '#000000';
WindWord.font = '10px Arial';
WindWord.fillText('风速：低        缺省风速：低', 20, 45);

// 空调风速设置
var WindBox = canvas.getContext('2d');
WindBox.fillStyle = '#66FF66';
WindBox.fillRect(240, 10, 40, 40);
var WindUpImg = document.createElement('img');
var WindUp = canvas.getContext('2d');
WindUpImg.src = 'asset/up.png';
WindUpImg.onload = function () {
    WindUp.drawImage(WindUpImg, 0, 0, 24, 24, 278, 10, 24, 24);
}
var WindDownImg = document.createElement('img');
var WindDown = canvas.getContext('2d');
WindDownImg.src = 'asset/down.png';
WindDownImg.onload = function () {
    WindDown.drawImage(WindDownImg, 0, 0, 24, 24, 278, 26, 24, 24);
}

//温度调节设置
var TempBox = canvas.getContext('2d');
TempBox.fillStyle = '#66FF66';
TempBox.fillRect(240, 70, 40, 40);
var TempUpImg = document.createElement('img');
var TempUp = canvas.getContext('2d');
TempUpImg.src = 'asset/up.png';
TempUpImg.onload = function () {
    TempUp.drawImage(TempUpImg, 0, 0, 24, 24, 278, 70, 24, 24);
}
var TempDownImg = document.createElement('img');
var TempDown = canvas.getContext('2d');
TempDownImg.src = 'asset/down.png';
TempDownImg.onload = function () {
    TempDown.drawImage(TempDownImg, 0, 0, 24, 24, 278, 86, 24, 24);
}

//开关
var SwitchImg = document.createElement('img');
var Switch = canvas.getContext('2d');
SwitchImg.src = 'asset/switch.png';
SwitchImg.onload = function () {
    Switch.drawImage(SwitchImg, 0, 0, 32, 32, 240, 115, 48, 32);
}

//费用查询
var CheckInImg = document.createElement('img');
var CheckIn = canvas.getContext('2d');
CheckInImg.src = 'asset/checkin.png';
CheckInImg.onload = function () {
    Switch.drawImage(CheckInImg, 0, 0, 64, 64, 10, 115, 38, 30);
}
