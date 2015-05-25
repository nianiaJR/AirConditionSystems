/**
*
* @file
*
* @author Jerry Liang(liangjiarui@baidu.com)
* Date: 2015-05-25
*/
var canvas = document.getElementById('condition-manager');
canvas.width = 1200;
canvas.height = 1000;

var ManagerBox = {
    x: 0,
    y: 0,
    width: 1200,
    height: 800,
    fillStyle: '#FF0000'
};

var ManagerScreen = {
    x: 50,
    y: 50,
    width: 900,
    height: 600,
    fillOnStyle: '#66FF66',
    fillShutStyle: '#000000'
};

var WindBox = {
    x: 980,
    y: 50,
    width: 120,
    height: 120,
    wordX: 1020,
    wordY: 124,
    PictureWidth: 64,
    PictureHeight: 64,
    fillOnStyle: '#66FF66',
    fillShutStyle: '#000000'
};

var WindWord = {
    x: 65,
    y: 140,
    fillStyle: '#000000',
    font: '40px Arial'
};

var WindUp = {
    x: 1110,
    y: 50,
    width: 64,
    height: 64,
    PictureWidth: 64,
    PictureHeight: 64
};

var WindDown = {
    x: 1110,
    y: 114,
    width: 64,
    height: 64,
    PictureWidth: 64,
    PictureHeight: 64
};

var Switch = {
    x: 1000,
    y: 650,
    width: 128,
    height: 128,
    PictureWidth: 128,
    PictureHeight: 128
};

var CheckIn = {
    x: 50,
    y: 670,
    width: 100,
    height: 100,
    PictureWidth: 128,
    PictureHeight: 128
};

var TempBox = {
    x: 980,
    y: 200,
    width: 120,
    height: 120,
    wordX: 1000,
    wordY: 270,
    PictureWidth: 64,
    PictureHeight: 64,
    fillOnStyle: '#66FF66',
    fillShutStyle: '#000000'
};

var TempWord = {
    x: 65,
    y: 90,
    fillStyle: '#000000',
    font: '40px Arial'
};

var TempUp = {
    x: 1110,
    y: 200,
    width: 64,
    height: 64,
    PictureWidth: 64,
    PictureHeight: 64
};

var TempDown = {
    x: 1110,
    y: 264,
    width: 64,
    height: 64,
    PictureWidth: 64,
    PictureHeight: 64
};

// 中央空调
var Manager = canvas.getContext('2d');

Manager.init = function () {
    Manager.fillStyle = ManagerBox.fillStyle;
    Manager.fillRect(ManagerBox.x, ManagerBox.y,
                    ManagerBox.width, ManagerBox.height);

    // 空调显示屏幕
    Manager.fillStyle = ManagerScreen.fillShutStyle;
    Manager.fillRect(ManagerScreen.x, ManagerScreen.y,
                     ManagerScreen.width, ManagerScreen.height);

    // 空调风速设置
    Manager.fillStyle = WindBox.fillShutStyle;
    Manager.fillRect(WindBox.x, WindBox.y, WindBox.width, WindBox.height);
    var WindUpImg = document.createElement('img');
    WindUpImg.src = 'asset/up.png';
    WindUpImg.onload = function () {
        Manager.drawImage(WindUpImg, 0, 0, WindUp.PictureWidth, WindUp.PictureHeight,
                          WindUp.x, WindUp.y, WindUp.width, WindUp.height);
    };
    var WindDownImg = document.createElement('img');
    WindDownImg.src = 'asset/down.png';
    WindDownImg.onload = function () {
        Manager.drawImage(WindDownImg, 0, 0, WindDown.PictureWidth, WindDown.PictureHeight,
                          WindDown.x, WindDown.y, WindDown.width, WindDown.height);
    };

    // 温度调节设置
    Manager.fillStyle = TempBox.fillShutStyle;
    Manager.fillRect(TempBox.x, TempBox.y, TempBox.width, TempBox.height);
    var TempUpImg = document.createElement('img');
    TempUpImg.src = 'asset/up.png';
    TempUpImg.onload = function () {
        Manager.drawImage(TempUpImg, 0, 0, TempUp.PictureWidth, TempUp.PictureHeight,
                          TempUp.x, TempUp.y, TempUp.width, TempUp.height);
    };
    var TempDownImg = document.createElement('img');
    TempDownImg.src = 'asset/down.png';
    TempDownImg.onload = function () {
        Manager.drawImage(TempDownImg, 0, 0, TempDown.PictureWidth, TempDown.PictureHeight,
                          TempDown.x, TempDown.y, TempDown.width, TempDown.height);
    };

    // 开关
    var SwitchImg = document.createElement('img');
    Switch.isOpen = false;
    SwitchImg.src = 'asset/switch.png';
    SwitchImg.onload = function () {
        Manager.drawImage(SwitchImg, 0, 0, Switch.PictureWidth, Switch.PictureHeight,
                               Switch.x, Switch.y, Switch.width, Switch.height);
    };
    // 费用查询
    var CheckInImg = document.createElement('img');
    CheckInImg.src = 'asset/checkin.png';
    CheckInImg.onload = function () {
        Manager.drawImage(CheckInImg, 0, 0, CheckIn.PictureWidth, CheckIn.PictureHeight,
                               CheckIn.x, CheckIn.y, CheckIn.width, CheckIn.height);
    };
};

// 中央空调布局初始化
Manager.init();
