basic.forever(function() {
    clockFont.clearColumn(0, 16);
    clockFont.displayColon(11)

    for(let i=0;i<10;i++){
        clockFont.displayNumber(0, i, 8);
        basic.pause(1000);
    }
    for (let i = 0; i < 10; i++) {
        clockFont.displayNumber(0, i, 9);
        basic.pause(1000);
    }
})