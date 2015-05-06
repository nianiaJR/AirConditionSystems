/**
 * @author ljracm@gmail.com
 *
 * @file 从控机
 */
var WindDescrib = ['低', '中', '高'];

var canvas = document.getElementById('child-condition');
canvas.width = 1200;
canvas.height = 800;

// 空调外壳画布
var AirConditionBox = canvas.getContext('2d');
AirConditionBox.defaultTemp = 25;
AirConditionBox.defaultWind = 0;
AirConditionBox.curTemp;
AirConditionBox.curWind;
AirConditionBox.fillStyle = '#FF0000';
AirConditionBox.fillRect(0, 0, 1200, 800);

// 空调显示屏
var AirConditionScreen = canvas.getContext('2d');
AirConditionScreen.fillStyle = '#000000';
AirConditionScreen.fillRect(50, 50, 900, 600);

// 温度显示
var TempWord = canvas.getContext('2d');

// 风速显示
var WindWord = canvas.getContext('2d');

// 空调风速设置
var WindBox = canvas.getContext('2d');
WindBox.fillStyle = '#000000';
WindBox.fillRect(980, 50, 120, 120);
var WindUpImg = document.createElement('img');
var WindUp = canvas.getContext('2d');
WindUpImg.src = 'asset/up.png';
WindUpImg.onload = function () {
    WindUp.drawImage(WindUpImg, 0, 0, 64, 64, 1110, 50, 64, 64);
};
var WindDownImg = document.createElement('img');
var WindDown = canvas.getContext('2d');
WindDownImg.src = 'asset/down.png';
WindDownImg.onload = function () {
    WindDown.drawImage(WindDownImg, 0, 0, 64, 64, 1110, 114, 64, 64);
};

// 温度调节设置
var TempBox = canvas.getContext('2d');
TempBox.fillStyle = '#000000';
TempBox.fillRect(980, 200, 120, 120);
var TempUpImg = document.createElement('img');
var TempUp = canvas.getContext('2d');
TempUpImg.src = 'asset/up.png';
TempUpImg.onload = function () {
    TempUp.drawImage(TempUpImg, 0, 0, 64, 64, 1110, 200, 64, 64);
};
var TempDownImg = document.createElement('img');
var TempDown = canvas.getContext('2d');
TempDownImg.src = 'asset/down.png';
TempDownImg.onload = function () {
    TempDown.drawImage(TempDownImg, 0, 0, 64, 64, 1110, 264, 64, 64);
};

// 开关
var SwitchImg = document.createElement('img');
var Switch = canvas.getContext('2d');
Switch.isOpen = false;
SwitchImg.src = 'asset/switch.png';
SwitchImg.onload = function () {
    Switch.drawImage(SwitchImg, 0, 0, 128, 128, 1000, 650, 128, 128);
};

// 费用查询
var CheckInImg = document.createElement('img');
var CheckIn = canvas.getContext('2d');
CheckInImg.src = 'asset/checkin.png';
CheckInImg.onload = function () {
    CheckIn.drawImage(CheckInImg, 0, 0, 128, 128, 50, 670, 100, 100);
};

canvas.onclick = function (event) {
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;
    // 开关机
    if (x >= 1000 && y >= 650 && x <= 1128 && y <= 778) {
        if (Switch.isOpen) {
            AirConditionScreen.shut();
            Switch.isOpen = false;
        }
        else {
            AirConditionScreen.show();
            Switch.isOpen = true;
        }
    }
    else if (x >= 1110 && y >= 50 && x <= 1174 && y <= 114) {
        var t = AirConditionBox.curTemp || AirConditionBox.defaultTemp;
    }
};

AirConditionScreen.show = function () {
    var t = AirConditionBox.defaultTemp;
    var w = AirConditionBox.defaultWind;
    AirConditionScreen.fillStyle = '#66FF66';
    AirConditionScreen.fillRect(50, 50, 900, 600);
    WindBox.fillRect(980, 50, 120, 120);
    TempBox.fillRect(980, 200, 120, 120);

    // 温度显示
    TempWord.fillStyle = '#000000';
    TempWord.font = '40px Arial';
    var str = '制冷温度：'
            + t
            + ' ℃      缺省温度：'
            + t
            + '℃';
    TempWord.fillText(str, 65, 90);
    // 风速显示
    WindWord.fillStyle = '#000000';
    WindWord.font = '40px Arial';
    str = '风速：'
            + WindDescrib[w]
            + '      缺省风速：'
            + WindDescrib[w];
    WindWord.fillText(str, 65, 140);
    // 调节窗口显示
    WindBox.fillStyle = '#000000';
    WindBox.font = '40px Arial';
    WindBox.fillText(WindDescrib[w], 1020, 125);
    str = t
        + '℃';
    TempBox.fillText(str, 1000, 270);
};

AirConditionScreen.shut = function () {
    AirConditionScreen.fillStyle = '#000000';
    AirConditionScreen.fillRect(50, 50, 900, 600);
    WindBox.fillRect(980, 50, 120, 120);
    TempBox.fillRect(980, 200, 120, 120);
};

