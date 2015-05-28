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

var WindDescrib = ['低', '中', '高'];

var ManagerBox = {
    x: 0,
    y: 0,
    width: 1200,
    height: 800,
    fillStyle: '#FF0000'
};

var ManagerScreen = {
    x: 40,
    y: 180,
    width: 1115,
    height: 460,
    fillOnStyle: '#66FF66',
    fillShutStyle: '#000000'
};

var MinWindBox = {
    x: 40,
    y: 40,
    width: 100,
    height: 100,
    wordX: 70,
    wordY: 100,
    PictureWidth: 64,
    PictureHeight: 64,
    fillOnStyle: '#66FF66',
    fillShutStyle: '#000000'
};

var WindLine = {
    sx: 185,
    sy: 90,
    ex: 280,
    ey: 90
};

var MinWindUp = {
    x: 140,
    y: 35,
    width: 64,
    height: 64,
    PictureWidth: 64,
    PictureHeight: 64
};

var MinWindDown = {
    x: 140,
    y: 90,
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

var MaxWindBox = {
    x: 290,
    y: 40,
    width: 100,
    height: 100,
    wordX: 320,
    wordY: 100,
    PictureWidth: 64,
    PictureHeight: 64,
    fillOnStyle: '#66FF66',
    fillShutStyle: '#000000'
};

var Word = {
    fillStyle: '#000000',
    font: '40px Arial'
};

var MaxWindUp = {
    x: 390,
    y: 35,
    width: 64,
    height: 64,
    PictureWidth: 64,
    PictureHeight: 64
};

var MaxWindDown = {
    x: 390,
    y: 90,
    width: 64,
    height: 64,
    PictureWidth: 64,
    PictureHeight: 64
};

var MinTempBox = {
    x: 745,
    y: 40,
    width: 100,
    height: 100,
    wordX: 750,
    wordY: 100,
    PictureWidth: 64,
    PictureHeight: 64,
    fillOnStyle: '#66FF66',
    fillShutStyle: '#000000'
};

var MinTempUp = {
    x: 845,
    y: 35,
    width: 64,
    height: 64,
    PictureWidth: 64,
    PictureHeight: 64
};

var MinTempDown = {
    x: 845,
    y: 90,
    width: 64,
    height: 64,
    PictureWidth: 64,
    PictureHeight: 64
};

var TempLine = {
    sx: 890,
    sy: 90,
    ex: 990,
    ey: 90
};

var MaxTempBox = {
    x: 1000,
    y: 40,
    width: 100,
    height: 100,
    wordX: 1010,
    wordY: 100,
    PictureWidth: 64,
    PictureHeight: 64,
    fillOnStyle: '#66FF66',
    fillShutStyle: '#000000'
};

var MaxTempUp = {
    x: 1100,
    y: 35,
    width: 64,
    height: 64,
    PictureWidth: 64,
    PictureHeight: 64
};

var MaxTempDown = {
    x: 1100,
    y: 90,
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
    Manager.fillStyle = MinWindBox.fillShutStyle;
    Manager.fillRect(MinWindBox.x, MinWindBox.y, MinWindBox.width, MinWindBox.height);
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

    Manager.beginPath();
    Manager.moveTo(WindLine.sx, WindLine.sy);
    Manager.lineTo(WindLine.ex, WindLine.ey);
    Manager.stroke();

    // 温度调节设置
    Manager.fillStyle = MaxWindBox.fillShutStyle;
    Manager.fillRect(MaxWindBox.x, MaxWindBox.y, MaxWindBox.width, MaxWindBox.height);
    var MaxWindUpImg = document.createElement('img');
    MaxWindUpImg.src = 'asset/up.png';
    MaxWindUpImg.onload = function () {
        Manager.drawImage(MaxWindUpImg, 0, 0, MaxWindUp.PictureWidth, MaxWindUp.PictureHeight,
                          MaxWindUp.x, MaxWindUp.y, MaxWindUp.width, MaxWindUp.height);
    };
    var MaxWindDownImg = document.createElement('img');
    MaxWindDownImg.src = 'asset/down.png';
    MaxWindDownImg.onload = function () {
        Manager.drawImage(MaxWindDownImg, 0, 0, MaxWindDown.PictureWidth, MaxWindDown.PictureHeight,
                          MaxWindDown.x, MaxWindDown.y, MaxWindDown.width, MaxWindDown.height);
    };

    // 最小温度调节
    Manager.fillStyle = MinTempBox.fillShutStyle;
    Manager.fillRect(MinTempBox.x, MinTempBox.y, MinTempBox.width, MinTempBox.height);
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

    Manager.beginPath();
    Manager.moveTo(TempLine.sx, TempLine.sy);
    Manager.lineTo(TempLine.ex, TempLine.ey);
    Manager.stroke();

    // 最大温度调节
    Manager.fillStyle = MaxTempBox.fillShutStyle;
    Manager.fillRect(MaxTempBox.x, MaxTempBox.y, MaxTempBox.width, MaxTempBox.height);
    var MaxTempUpImg = document.createElement('img');
    MaxTempUpImg.src = 'asset/up.png';
    MaxTempUpImg.onload = function () {
        Manager.drawImage(MaxTempUpImg, 0, 0, MaxTempUp.PictureWidth, MaxTempUp.PictureHeight,
                          MaxTempUp.x, MaxTempUp.y, MaxTempUp.width, MaxTempUp.height);
    };
    var MaxTempDownImg = document.createElement('img');
    MaxTempDownImg.src = 'asset/down.png';
    MaxTempDownImg.onload = function () {
        Manager.drawImage(MaxTempDownImg, 0, 0, MaxTempDown.PictureWidth, MaxTempDown.PictureHeight,
                          MaxTempDown.x, MaxTempDown.y, MaxTempDown.width, MaxTempDown.height);
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
                        MaxWindBox.updateShow(Manager.maxWind);
                        MinWindBox.updateShow(Manager.minWind);
                        MaxTempBox.updateShow(Manager.maxTemp);
                        MinTempBox.updateShow(Manager.minTemp);
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
    else if (x >= MinWindUp.x && y >= MinWindUp.y && x <= MinWindUp.x + MinWindUp.width
            && y <= MinWindUp.y + MinWindUp.height) {
        if (Manager.minWind + 1 <= Manager.maxWind) {
            Manager.minWind += 1;
            MinWindBox.updateShow(Manager.minWind);
        }
    }
    else if (x >= MinWindDown.x && y >= MinWindDown.y && x <= MinWindDown.x + MinWindDown.width
             && y <= MinWindDown.y + MinWindDown.height) {
        if (Manager.minWind - 1 >= 0) {
            Manager.minWind -= 1;
            MinWindBox.updateShow(Manager.minWind);
        }
    }
    else if (x >= MaxWindUp.x && y >= MaxWindUp.y && x <= MaxWindUp.x + MaxWindUp.width
             && y <= MaxWindUp.y + MaxWindUp.height) {
        if (Manager.maxWind + 1 <= 2) {
            Manager.maxWind += 1;
            MaxWindBox.updateShow(Manager.maxWind);
        }
    }
    else if (x >= MaxWindDown.x && y >= MaxWindDown.y && x <= MaxWindDown.x + MaxWindDown.width
             && y <= MaxWindDown.y + MaxWindDown.height) {
        if (Manager.maxWind - 1 >= Manager.minWind) {
            Manager.maxWind -= 1;
            MaxWindBox.updateShow(Manager.maxWind);
        }
    }
    else if (x >= MinTempUp.x && y >= MinTempUp.y && x <= MinTempUp.x + MinTempUp.width
             && y <= MinTempUp.y + MinTempUp.height) {
        if (Manager.minTemp + 1 <= Manager.maxTemp) {
            Manager.minTemp += 1;
            MinTempBox.updateShow(Manager.minTemp);
        }
    }
    else if (x >= MinTempDown.x && y >= MinTempDown.y && x <= MinTempDown.x + MinTempDown.width
             && y <= MinTempDown.y + MinTempDown.height) {
        if (Manager.minTemp - 1 >= 0) {
            Manager.minTemp -= 1;
            MinTempBox.updateShow(Manager.minTemp);
        }

    }
    else if (x >= MaxTempUp.x && y >= MaxTempUp.y && x <= MaxTempUp.x + MaxTempUp.width
             && y <= MaxTempUp.y + MaxTempUp.height) {
        if (Manager.maxTemp + 1 <= 40) {
            Manager.maxTemp += 1;
            MaxTempBox.updateShow(Manager.maxTemp);
        }

    }
    else if (x >= MaxTempDown.x && y >= MaxTempDown.y && x <= MaxTempDown.x + MaxTempDown.width
             && y <= MaxTempDown.y + MaxTempDown.height) {
        if (Manager.maxTemp - 1 >= Manager.minTemp) {
            Manager.maxTemp -= 1;
            MaxTempBox.updateShow(Manager.maxTemp);
        }
    }
};

ManagerScreen.show = function () {
    Manager.fillStyle = ManagerScreen.fillOnStyle;
    Manager.fillRect(ManagerScreen.x, ManagerScreen.y,
                          ManagerScreen.width, ManagerScreen.height);
};

ManagerScreen.shut = function () {
    Manager.fillStyle = '#000000';
    Manager.fillRect(ManagerScreen.x, ManagerScreen.y,
                          ManagerScreen.width, ManagerScreen.height);
    Manager.fillRect(MinWindBox.x, MinWindBox.y, MinWindBox.width, MinWindBox.height);
    Manager.fillRect(MaxWindBox.x, MaxWindBox.y, MaxWindBox.width, MaxWindBox.height);
    Manager.fillRect(MinTempBox.x, MinTempBox.y, MinTempBox.width, MinTempBox.height);
    Manager.fillRect(MaxTempBox.x, MaxTempBox.y, MaxTempBox.width, MaxTempBox.height);
};

MinWindBox.updateShow = function (wind) {
    Manager.fillStyle = MinWindBox.fillOnStyle;
    Manager.fillRect(MinWindBox.x, MinWindBox.y, MinWindBox.width, MinWindBox.height);
    Manager.fillStyle = Word.fillStyle;
    Manager.font = Word.font;
    Manager.fillText(WindDescrib[wind], MinWindBox.wordX, MinWindBox.wordY);
};

MaxWindBox.updateShow = function (wind) {
    Manager.fillStyle = MaxWindBox.fillOnStyle;
    Manager.fillRect(MaxWindBox.x, MaxWindBox.y, MaxWindBox.width, MaxWindBox.height);
    Manager.fillStyle = Word.fillStyle;
    Manager.font = Word.font;
    Manager.fillText(WindDescrib[wind], MaxWindBox.wordX, MaxWindBox.wordY);
};

MinTempBox.updateShow = function (temperature) {
    Manager.fillStyle = MinTempBox.fillOnStyle;
    Manager.fillRect(MinTempBox.x, MinTempBox.y, MinTempBox.width, MinTempBox.height);
    Manager.fillStyle = Word.fillStyle;
    Manager.font = Word.font;
    var str = temperature
            + '℃';
    Manager.fillText(str, MinTempBox.wordX, MinTempBox.wordY);
};

MaxTempBox.updateShow = function (temperature) {
    Manager.fillStyle = MaxTempBox.fillOnStyle;
    Manager.fillRect(MaxTempBox.x, MaxTempBox.y, MaxTempBox.width, MaxTempBox.height);
    Manager.fillStyle = Word.fillStyle;
    Manager.font = Word.font;
    var str = temperature
            + '℃';
    Manager.fillText(str, MaxTempBox.wordX, MaxTempBox.wordY);
};

