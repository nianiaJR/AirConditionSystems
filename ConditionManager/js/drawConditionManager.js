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

var MinWindUp = {
    x: 1110,
    y: 50,
    width: 64,
    height: 64,
    PictureWidth: 64,
    PictureHeight: 64
};

var MinWindDown = {
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

var MinTempUp = {
    x: 1110,
    y: 200,
    width: 64,
    height: 64,
    PictureWidth: 64,
    PictureHeight: 64
};

var MinTempDown = {
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
    var MinWindUpImg = document.createElement('img');
    MinWindUpImg.src = 'asset/up.png';
    MinWindUpImg.onload = function () {
        Manager.drawImage(MinWindUpImg, 0, 0, MinWindUp.PictureWidth, MinWindUp.PictureHeight,
                          MinWindUp.x, MinWindUp.y, MinWindUp.width, MinWindUp.height);
    };
    var MinWindDownImg = document.createElement('img');
    MinWindDownImg.src = 'asset/down.png';
    MinWindDownImg.onload = function () {
        Manager.drawImage(MinWindDownImg, 0, 0, MinWindDown.PictureWidth, MinWindDown.PictureHeight,
                          MinWindDown.x, MinWindDown.y, MinWindDown.width, MinWindDown.height);
    };

    // 温度调节设置
    Manager.fillStyle = TempBox.fillShutStyle;
    Manager.fillRect(TempBox.x, TempBox.y, TempBox.width, TempBox.height);
    var MinTempUpImg = document.createElement('img');
    MinTempUpImg.src = 'asset/up.png';
    MinTempUpImg.onload = function () {
        Manager.drawImage(MinTempUpImg, 0, 0, MinTempUp.PictureWidth, MinTempUp.PictureHeight,
                          MinTempUp.x, MinTempUp.y, MinTempUp.width, MinTempUp.height);
    };
    var MinTempDownImg = document.createElement('img');
    MinTempDownImg.src = 'asset/down.png';
    MinTempDownImg.onload = function () {
        Manager.drawImage(MinTempDownImg, 0, 0, MinTempDown.PictureWidth, MinTempDown.PictureHeight,
                          MinTempDown.x, MinTempDown.y, MinTempDown.width, MinTempDown.height);
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

canvas.onclick = function (event) {
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;
    var params = {
        curTemp: Manager.curTemp,
        curWind: Manager.curWind,
        id: Manager.id
    };

    // 按键触发http请求
    var xmlhttp = new XMLHttpRequest();

    // 开关机
    if (x >= Switch.x && y >= Switch.y && x <= Switch.x + Switch.width && y <= Switch.y + Switch.height) {
        // 关机请求
        if (Switch.isOpen) {
            xmlhttp.open('POST', 'http://localhost:9494/airconditionOff', true);
            xmlhttp.onload = function (e) {
                if (xmlhttp.readyState === 4) {
                    var obj = JSON.parse(xmlhttp.responseText);
                    if (obj.status === 1) {
                        Switch.isOpen = false;
                        ManagerScreen.shut();
                    }
                    else {
                        alert('关机请求失败!');
                    }
                }
            };
        }
        else {
            xmlhttp.open('GET', 'http://localhost:9494/airconditionOn');
            xmlhttp.onload = function (e) {
                if (xmlhttp.readyState === 4) {
                    var obj = JSON.parse(xmlhttp.responseText);
                    if (obj.status === 1) {
                        Manager.minTemp = obj.minTemp;
                        Manager.maxTemp = obj.maxTemp;
                        Manager.minWind = obj.minWind;
                        Manager.maxWind = obj.maxWind;
                        ManagerScreen.show();
                        TempBox.updateShow(Manager.curTemp);
                        WindBox.updateShow(Manager.curWind);
                        Switch.isOpen = true;
                    }
                    else {
                        alert('中央空调未定义初始参数');
                    }
                }
            };
        }
        xmlhttp.send();
    }
/*
    else if (x >= MinWindUp.x && y >= MinWindUp.y && x <= MinWindUp.x + MinWindUp.width && y <= MinWindUp.y + MinWindUp.height) {
        if (AirCondition.curWind + 1 <= 2) {
            WindBox.updateShow(AirCondition.curWind + 1);
            params.curWind = AirCondition.curWind + 1;
            xmlhttp.open('POST', 'http://localhost:4567/aircondition', false);
            xmlhttp.onload = function (e) {
                var obj = JSON.parse(xmlhttp.responseText);
                if (obj.status) {
                    AirCondition.curWind += 1;
                    AirConditionScreen.show();
                }
                else {
                    WindBox.updateShow(AirCondition.curWind - 1);
                }
            };
            xmlhttp.send(JSON.stringify(params));
        }
    }
    else if (x >= MinWindDown.x && y >= MinWindDown.y && x <= MinWindDown.x + MinWindDown.width
             && y <= MinWindDown.y + MinWindDown.height) {
        if (AirCondition.curWind - 1 >= 0) {
            WindBox.updateShow(AirCondition.curWind - 1);
            params.curWind = AirCondition.curWind + 1;
            xmlhttp.open('POST', 'http://localhost:4567/aircondition', false);
            xmlhttp.onload = function (e) {
                var obj = JSON.parse(xmlhttp.responseText);
                if (obj.status) {
                    AirCondition.curWind -= 1;
                    AirConditionScreen.show();
                }
                else {
                    WindBox.updateShow(AirCondition.curWind + 1);
                }
            };
            xmlhttp.send(JSON.stringify(params));
        }
    }
    else if (x >= MinTempUp.x && y >= MinTempUp.y && x <= MinTempUp.x + MinTempUp.width && y <=  MinTempUp.y + MinTempUp.height) {
        if (AirCondition.curTemp + 1 <= 35) {
            TempBox.updateShow(AirCondition.curTemp + 1);
            xmlhttp.open('POST', 'http://localhost:4567/aircondition', false);
            xmlhttp.onload = function (e) {
                var obj = JSON.parse(xmlhttp.responseText);
                if (obj.status) {
                    AirCondition.curTemp += 1;
                    AirConditionScreen.show();
                }
                else {
                    TempBox.updateShow(AirCondition.curWind - 1);
                }
            };
            xmlhttp.send(JSON.stringify(params));
        }
    }
    else if (x >= MinTempDown.x && y >= MinTempDown.y && x <= MinTempDown.x + MinTempDown.width
             && y <= MinTempDown.y + MinTempDown.height) {
        if (AirCondition.curTemp - 1 >= 10) {
            TempBox.updateShow(AirCondition.curTemp - 1);
            xmlhttp.open('POST', 'http://localhost:4567/aircondition', false);
            xmlhttp.onload = function (e) {
                var obj = JSON.parse(xmlhttp.responseText);
                if (obj.status) {
                    AirCondition.curTemp -= 1;
                    AirConditionScreen.show();
                }
                else {
                    TempBox.updateShow(AirCondition.curWind + 1);
                }
            };
            xmlhttp.send(JSON.stringify(params));
        }
    }
    */
};

ManagerScreen.show = function () {
    Manager.fillStyle = ManagerScreen.fillOnStyle;
    Manager.fillRect(ManagerScreen.x, ManagerScreen.y,
                          ManagerScreen.width, ManagerScreen.height);
};

WindBox.updateShow = function (wind) {
    Manager.fillStyle = WindBox.fillOnStyle;
    Manager.fillRect(WindBox.x, WindBox.y, WindBox.width, WindBox.height);
//   Manager.fillStyle = WindWord.fillStyle;
//   Manager.font = WindWord.font;
//    Manager.fillText(WindDescrib[wind], WindBox.wordX, WindBox.wordY);
};

TempBox.updateShow = function (temperature) {
    Manager.fillStyle = TempBox.fillOnStyle;
    Manager.fillRect(TempBox.x, TempBox.y, TempBox.width, TempBox.height);
    /*
    Manager.fillStyle = TempWord.fillStyle;
    Manager.font = TempWord.font;
    var str = temperature
        + '℃';
    Manager.fillText(str, TempBox.wordX, TempBox.wordY);
    */
};

