let hour:number=9;
let minute:number=10;
let second:number=30;
clockFont.setBrightness(32);
clockFont.setColor(0xffff00);

basic.forever(function() {
    clockFont.showClock(hour, minute, second);
    second++;
    if (second >= 60){second = 0;minute++}
    if (minute >= 60){minute = 0;hour++}
    if (hour >= 24){hour = 0}
    basic.pause(100)
})