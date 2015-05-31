/**
 * @author ljracm@gmail.com
 *
 * @file 从控机
 */
var WindDescrib = ['低', '中', '高'];
var canvas = document.getElementById('child-condition');
canvas.width = 1200;
canvas.height = 800;


// 空调布局参数配置
var AirConditionBox = {
    x: 0,
    y: 0,
    width: 1200,
    height: 800,
    fillStyle: '#FF0000'
};

var AirConditionScreen = {
    x: 50,
    y: 50,
    width: 900,
    height: 600,
    fillOnStyle: '#66FF66',
    fillShutStyle: '#000000'
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

var CostWord = {
    x: 65,
    y: 190,
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

// 空调外壳画布
var AirCondition = canvas.getContext('2d');

// 空调初始化, 初始化页面布局画布
AirCondition.init = function () {
    AirCondition.cost = 0;
    AirCondition.hostname = location.hostname;
    AirCondition.fillStyle = AirConditionBox.fillStyle;
    AirCondition.fillRect(AirConditionBox.x, AirConditionBox.y,
                          AirConditionBox.width, AirConditionBox.height);
    // 获取空调的id号
    var id = location.href.split('?')[1].split('&')[0].split('user_id=')[1];
    AirCondition.id = id;

    // 空调显示屏
    AirCondition.fillStyle = AirConditionScreen.fillShutStyle;
    AirCondition.fillRect(AirConditionScreen.x, AirConditionScreen.y,
                          AirConditionScreen.width, AirConditionScreen.height);
    // 空调风速设置
    AirCondition.fillStyle = WindBox.fillShutStyle;
    AirCondition.fillRect(WindBox.x, WindBox.y, WindBox.width, WindBox.height);
    var WindUpImg = document.createElement('img');
    WindUpImg.src = 'asset/up.png';
    WindUpImg.onload = function () {
        AirCondition.drawImage(WindUpImg, 0, 0, WindUp.PictureWidth, WindUp.PictureHeight,
                               WindUp.x, WindUp.y, WindUp.width, WindUp.height);
    };
    var WindDownImg = document.createElement('img');
    WindDownImg.src = 'asset/down.png';
    WindDownImg.onload = function () {
        AirCondition.drawImage(WindDownImg, 0, 0, WindDown.PictureWidth, WindDown.PictureHeight,
                               WindDown.x, WindDown.y, WindDown.width, WindDown.height);
    };

    // 温度调节设置
    AirCondition.fillStyle = TempBox.fillShutStyle;
    AirCondition.fillRect(TempBox.x, TempBox.y, TempBox.width, TempBox.height);
    var TempUpImg = document.createElement('img');
    TempUpImg.src = 'asset/up.png';
    TempUpImg.onload = function () {
        AirCondition.drawImage(TempUpImg, 0, 0, TempUp.PictureWidth, TempUp.PictureHeight,
                               TempUp.x, TempUp.y, TempUp.width, TempUp.height);
    };
    var TempDownImg = document.createElement('img');
    TempDownImg.src = 'asset/down.png';
    TempDownImg.onload = function () {
        AirCondition.drawImage(TempDownImg, 0, 0, TempDown.PictureWidth, TempDown.PictureHeight,
                           TempDown.x, TempDown.y, TempDown.width, TempDown.height);
    };

    // 开关
    var SwitchImg = document.createElement('img');
    Switch.isOpen = false;
    SwitchImg.src = 'asset/switch.png';
    SwitchImg.onload = function () {
        AirCondition.drawImage(SwitchImg, 0, 0, Switch.PictureWidth, Switch.PictureHeight,
                               Switch.x, Switch.y, Switch.width, Switch.height);
    };
    // 费用查询
    var CheckInImg = document.createElement('img');
    CheckInImg.src = 'asset/checkin.png';
    CheckInImg.onload = function () {
        AirCondition.drawImage(CheckInImg, 0, 0, CheckIn.PictureWidth, CheckIn.PictureHeight,
                               CheckIn.x, CheckIn.y, CheckIn.width, CheckIn.height);
    };
};

AirCondition.init();

canvas.onclick = function (event) {
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;
    var params = {
        curTemp: AirCondition.curTemp,
        curWind: AirCondition.curWind,
        id: AirCondition.id
    };

    // 按键触发http请求
    var xmlhttp = new XMLHttpRequest();

    // 开关机
    if (x >= Switch.x && y >= Switch.y && x <= Switch.x + Switch.width && y <= Switch.y + Switch.height) {
        var queryString = 'id=' + AirCondition.id;
        // 关机请求
        if (Switch.isOpen) {
            xmlhttp.open('POST', 'http://' + AirCondition.hostname + ':4567/airconditionOff?' + queryString, true);
            xmlhttp.onload = function (e) {
                if (xmlhttp.readyState === 4) {
                    var obj = JSON.parse(xmlhttp.responseText);
                    if (obj.status === 1) {
                        Switch.isOpen = false;
                        AirConditionScreen.shut();
                        clearInterval(AirCondition.timer);
                        clearInterval(AirCondition.envTimer);
                        clearInterval(AirCondition.tempTimer);
                    }
                    else {
                        alert('关机请求失败!');
                    }
                }
            };
        }
        else {
            // 从后台获取缺省温度、风速
            if (AirCondition.id === undefined) {
                alert('请给出正确的空调ID');
                return;
            }
            xmlhttp.open('GET', 'http://' + AirCondition.hostname + ':4567/airconditionOn?' + queryString);
            xmlhttp.onload = function (e) {
                if (xmlhttp.readyState === 4) {
                    var obj = JSON.parse(xmlhttp.responseText);
                    if (obj.status === 1) {
                        AirCondition.defaultTemp = obj.defaultTemp;
                        AirCondition.defaultWind = obj.defaultWind;
                        AirCondition.curTemp = AirCondition.defaultTemp;
                        AirCondition.curWind = AirCondition.defaultWind;
                        AirCondition.envTemp = AirCondition.defaultTemp;
                        AirConditionScreen.show();
                        TempBox.updateShow(AirCondition.curTemp);
                        WindBox.updateShow(AirCondition.curWind);
                        Switch.isOpen = true;
                        AirCondition.timer = setInterval(AirCondition.connectManager, 2000);
                        AirCondition.envTimer = setInterval(AirCondition.changeEnvTemp, 1000 * 60);
                        AirCondition.tempTimer = setInterval(AirCondition.tempControl, 1000 * 10);
                    }
                    else {
                        alert('中央空调未定义初始参数');
                    }
                }
            };
        }
        xmlhttp.send();
    }
    else if (x >= WindUp.x && y >= WindUp.y && x <= WindUp.x + WindUp.width && y <= WindUp.y + WindUp.height) {
        if (AirCondition.curWind + 1 <= 2) {
            WindBox.updateShow(AirCondition.curWind + 1);
            params.curWind = AirCondition.curWind + 1;
            xmlhttp.open('POST', 'http://' + AirCondition.hostname + ':4567/aircondition', false);
            xmlhttp.onload = function (e) {
                if (xmlhttp.readyState === 4) {
                    var obj = JSON.parse(xmlhttp.responseText);
                    if (obj.status) {
                        AirCondition.curWind += 1;
                        AirConditionScreen.show();
                    }
                    else {
                        WindBox.updateShow(AirCondition.curWind - 1);
                    }
                }
            };
            xmlhttp.send(JSON.stringify(params));
        }
    }
    else if (x >= WindDown.x && y >= WindDown.y && x <= WindDown.x + WindDown.width
             && y <= WindDown.y + WindDown.height) {
        if (AirCondition.curWind - 1 >= 0) {
            WindBox.updateShow(AirCondition.curWind - 1);
            params.curWind = AirCondition.curWind - 1;
            xmlhttp.open('POST', 'http://' + AirCondition.hostname + ':4567/aircondition', false);
            xmlhttp.onload = function (e) {
                if (xmlhttp.readyState === 4) {
                    var obj = JSON.parse(xmlhttp.responseText);
                    if (obj.status) {
                        AirCondition.curWind -= 1;
                        AirConditionScreen.show();
                    }
                    else {
                        WindBox.updateShow(AirCondition.curWind + 1);
                    }
                }
            };
            xmlhttp.send(JSON.stringify(params));
        }
    }
    else if (x >= TempUp.x && y >= TempUp.y && x <= TempUp.x + TempUp.width && y <=  TempUp.y + TempUp.height) {
        if (AirCondition.curTemp + 1 <= 35) {
            TempBox.updateShow(AirCondition.curTemp + 1);
            params.curTemp = AirCondition.curTemp + 1;
            xmlhttp.open('POST', 'http://' + AirCondition.hostname + ':4567/aircondition', false);
            xmlhttp.onload = function (e) {
                if (xmlhttp.readyState === 4) {
                    var obj = JSON.parse(xmlhttp.responseText);
                    if (obj.status) {
                        AirCondition.curTemp += 1;
                        AirConditionScreen.show();
                    }
                    else {
                        TempBox.updateShow(AirCondition.curWind - 1);
                    }
                }
            };
            xmlhttp.send(JSON.stringify(params));
        }
    }
    else if (x >= TempDown.x && y >= TempDown.y && x <= TempDown.x + TempDown.width
             && y <= TempDown.y + TempDown.height) {
        if (AirCondition.curTemp - 1 >= 0) {
            TempBox.updateShow(AirCondition.curTemp - 1);
            params.curTemp = AirCondition.curTemp - 1;
            xmlhttp.open('POST', 'http://' + AirCondition.hostname + ':4567/aircondition', true);
            xmlhttp.onload = function (e) {
                if (xmlhttp.readyState === 4) {
                    var obj = JSON.parse(xmlhttp.responseText);
                    if (obj.status) {
                        AirCondition.curTemp -= 1;
                        AirConditionScreen.show();
                    }
                    else {
                        TempBox.updateShow(AirCondition.curTemp);
                    }
                }
            };
            xmlhttp.send(JSON.stringify(params));
        }
    }
};

AirConditionScreen.show = function () {
    AirCondition.fillStyle = AirConditionScreen.fillOnStyle;
    AirCondition.fillRect(AirConditionScreen.x, AirConditionScreen.y,
                          AirConditionScreen.width, AirConditionScreen.height);

    // 温度显示
    AirCondition.fillStyle = TempWord.fillStyle;
    AirCondition.font = TempWord.font;
    var str = '目标：'
            + AirCondition.curTemp
            + ' ℃      环境：'
            + AirCondition.envTemp
            + ' ℃      缺省：'
            + AirCondition.defaultTemp
            + '℃';
    AirCondition.fillText(str, TempWord.x, TempWord.y);
    // 风速显示
    AirCondition.fillStyle = WindWord.fillStyle;
    AirCondition.font = WindWord.font;
    str = '风速：'
        + WindDescrib[AirCondition.curWind]
        + '      缺省：'
        + WindDescrib[AirCondition.defaultWind];
    AirCondition.fillText(str, WindWord.x, WindWord.y);

    str = '当前费用总计：'
        + AirCondition.cost
        + ' 元';
    AirCondition.fillText(str, CostWord.x, CostWord.y);
};

AirConditionScreen.shut = function () {
    AirCondition.fillStyle = '#000000';
    AirCondition.fillRect(AirConditionScreen.x, AirConditionScreen.y,
                          AirConditionScreen.width, AirConditionScreen.height);
    AirCondition.fillRect(WindBox.x, WindBox.y, WindBox.width, WindBox.height);
    AirCondition.fillRect(TempBox.x, TempBox.y, TempBox.width, TempBox.height);
};

WindBox.updateShow = function (wind) {
    AirCondition.fillStyle = WindBox.fillOnStyle;
    AirCondition.fillRect(WindBox.x, WindBox.y, WindBox.width, WindBox.height);
    AirCondition.fillStyle = WindWord.fillStyle;
    AirCondition.font = WindWord.font;
    AirCondition.fillText(WindDescrib[wind], WindBox.wordX, WindBox.wordY);
};

TempBox.updateShow = function (temperature) {
    AirCondition.fillStyle = TempBox.fillOnStyle;
    AirCondition.fillRect(TempBox.x, TempBox.y, TempBox.width, TempBox.height);
    AirCondition.fillStyle = TempWord.fillStyle;
    AirCondition.font = TempWord.font;
    var str = temperature
            + '℃';
    AirCondition.fillText(str, TempBox.wordX, TempBox.wordY);
};

AirCondition.connectManager = function () {
    var params = {
        temperature: AirCondition.curTemp,
        wind: AirCondition.curWind,
        id: AirCondition.id
    };
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://' + AirCondition.hostname + ':4567/airconfigure');
    xmlhttp.onload = function (e) {
        if (xmlhttp.readyState === 4) {
            var obj = JSON.parse(xmlhttp.responseText);
            if (obj.status) {
                if (AirCondition.curTemp !== obj.temperature) {
                    AirCondition.defaultTemp = obj.temperature;
                    AirCondition.curTemp = obj.temperature;
                }
                if (AirCondition.curWind !== obj.wind) {
                    AirCondition.defaultWind = obj.wind;
                    AirCondition.curWind = obj.wind;
                }
                AirConditionScreen.show();
                TempBox.updateShow(AirCondition.curTemp);
                WindBox.updateShow(AirCondition.curWind);
            }
        }
    };
    xmlhttp.send(JSON.stringify(params));
};

AirCondition.changeEnvTemp = function () {
    AirCondition.envTemp = AirCondition.curTemp + Math.floor((Math.random() * 5) + 1);
    AirConditionScreen.show();
};

AirCondition.tempControl = function () {
    if (AirCondition.curTemp === AirCondition.envTemp) {
        AirCondition.changeCurTemp(AirCondition.wind+1);
    }
    else {
        AirCondition.changeCurTemp(0.5);
    }
};

// 温度调幅模块
AirCondition.changeCurTemp = function (delta) {
    // 保持温度
    if (AirCondition.curTemp === AirCondition) {
        AirCondition.computeCost(delta);
        return;
    }
    // 如果开启风速比较大，这里需要进行一下特判
    var absTemp = Math.abs(AirCondition.envTemp - AirCondition.curTemp);
    if (absTemp <= delta) {
        AirCondition.computeCost(absTemp);
        AirCondition.envTemp = AirCondition.curTemp;
    }
    else if (AirCondition.envTemp > AirCondition.curTemp) {
        AirCondition.computeCost(delta);
        AirCondition.envTemp -= delta;
    }
    else if (AirCondition.envTemp < AirCondition.curTemp) {
        AirCondition.computeCost(delta);
        AirCondition.envTemp += delta;
    }
};

// 计算费用，按温度的降幅来计算费用
AirCondition.computeCost = function (delta) {
    // 按每一度温度变化0.1毛钱收费
    var cost = delta * 0.5;
    var params = {
        id: AirCondition.id,
        cost: cost
    };
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://' + AirCondition.hostname + ':4567/airconditionCost');
    xmlhttp.onload = function (e) {
        if(xmlhttp.readyState === 4) {
            var obj = JSON.parse(xmlhttp.responseText);
            if (obj.status === 1) {
                AirCondition.cost += cost;
            }
            else {
                alert('后端计费失败了，你占到便宜了！');
            }
        }
    };
    xmlhttp.send(JSON.stringify(params));
};
