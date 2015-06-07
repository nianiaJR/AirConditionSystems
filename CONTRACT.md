# 软件工程通信协议
如下：

## scoket 发送包内容－举例

```
主控发出的包:
pakage = {
	is_init: true, //是否是初始化包
	charge: 2.5, //费用
    charge_rate: 1.5, //费率
    cur_temp: 26, //当前温度
    def_temp: 25, //默认温度
    def_wind_speed: 1, //默认风速
    energy: 3.5, //能耗
    mode: true, //制冷：true，制热：false
    room_num: 10, //房间号
    state: 0, //空调的工作状态， 0:工作中 1:关机 2:休眠 3:等待
};

从控包：
pakage = {
	room_num: 1, //房间号
    goal_temp: 23, //目标温度
    goal_wind_speed: 1, //目标风速
    cur_temp: 24， //当前环境温度
    turn_on_event: 1 // 0:关机 1:正常 2:开机
    wake_up_event: true //睡眠状态下室温超过目标温度，设置为true
};
```

讨论问题：
## 链接断了之后，从控机和主控机怎么反应
	直接关机
## socket 传送信息的格式
