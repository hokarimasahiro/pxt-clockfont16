/**
 * Font for 16*64 neopixel panel Display blocks
 */
//% weight=100 color=#0fbc11 icon="\u270f" block="font for clock"
namespace clockFont {
    let strip = neopixel.create(DigitalPin.P1, 1024, NeoPixelMode.RGB);
    let color: number = NeoPixelColors.White;

    const font9: number[][] = [
        [0x3FFC, 0x7FFE, 0xE007, 0xC003, 0xC003, 0xC003, 0xE007, 0x7FFE, 0x3FFC], // 0
        [0x0000, 0x0000, 0x0000, 0x6003, 0xFFFF, 0xFFFF, 0x0003, 0x0000, 0x0000], // 1
        [0x301F, 0x703F, 0xE073, 0xC0E3, 0xC0C3, 0xC0C3, 0xE1C3, 0x7F83, 0x3F03], // 2
        [0x300C, 0x700E, 0xE187, 0xC183, 0xC183, 0xC183, 0xE3C7, 0x7FFE, 0x3E7C], // 3
        [0x07F0, 0x0FF0, 0x1C30, 0x3830, 0x7030, 0xFFFF, 0xFFFF, 0x0030, 0x0030], // 4
        [0xFF0C, 0xFF0E, 0xC307, 0xC303, 0xC303, 0xC303, 0xC387, 0xC1FE, 0xC0FC], // 5
        [0x3FFC, 0x7FFE, 0xE187, 0xC183, 0xC183, 0xC183, 0xE1C7, 0x70FE, 0x307C], // 6
        [0xC000, 0xC000, 0xC000, 0xC000, 0xC3FF, 0xC7FF, 0xCE00, 0xFC00, 0xF800], // 7
        [0x3E7C, 0x7FFE, 0xE3C7, 0xC183, 0xC183, 0xC183, 0xE3C7, 0x7FFE, 0x3E7C], // 8
        [0x3E0C, 0x7F0E, 0xE387, 0xC183, 0xC183, 0xC183, 0xE387, 0x7FFE, 0x3FFC]  // 9
    ];
    const font8: number[][] = [
        [0x3FFC, 0x7FFE, 0xE007, 0xC003, 0xC003, 0xE007, 0x7FFE, 0x3FFC], // 0
        [0x0000, 0x0000, 0x6003, 0xFFFF, 0xFFFF, 0x0003, 0x0000, 0x0000], // 1
        [0x301F, 0x703F, 0xE073, 0xC0E3, 0xC0C3, 0xE1C3, 0x7F83, 0x3F03], // 2
        [0x300C, 0x700E, 0xE187, 0xC183, 0xC183, 0xE3C7, 0x7FFE, 0x3E7C], // 3
        [0x07F0, 0x0FF0, 0x1C30, 0x3830, 0x7030, 0xFFFF, 0xFFFF, 0x0030], // 4
        [0xFF0C, 0xFF0E, 0xC307, 0xC303, 0xC303, 0xC387, 0xC1FE, 0xC0FC], // 5
        [0x3FFC, 0x7FFE, 0xE187, 0xC183, 0xC183, 0xE1C7, 0x70FE, 0x307C], // 6
        [0xC000, 0xC000, 0xC000, 0xC3FF, 0xC7FF, 0xCE00, 0xFC00, 0xF800], // 7
        [0x3E7C, 0x7FFE, 0xE3C7, 0xC183, 0xC183, 0xE3C7, 0x7FFE, 0x3E7C], // 8
        [0x3E0C, 0x7F0E, 0xE383, 0xC183, 0xC183, 0xE387, 0x7FFE, 0x3FFC]  // 9
    ];
    const font12: number[][] = [
        [0x03C0,0x0FF0,0x1C38,0x300C,0x6006,0x6006,0x6006,0x6006,0x300C,0x1C38,0x0FF0,0x03C0], // ○
        [0x4002,0x6006,0x300C,0x1818,0x0C30,0x07E0,0x07E0,0x0C30,0x1818,0x300C,0x6006,0x4002]  // ×
    ];
    /**
     * @param c RGB color
     */
    //% blockId="setColor" block="set Color RGB%c"
    export function setColor(c: number): void {
        color = c;
    }
    /**
     * @param b brightness
     */
    //% blockId="setBrightness" block="set Brightness brightness%b"
    export function setBrightness(b: number): void {
        strip.setBrightness(b)
    }
    /**
     * @param p position
     * @param n number
     * @param f font
     */
    //% blockId="displayNumber" block="number pos%p num%n font%f"
    export function displayNumber(p: number, n: number, f: number): void {
        let font: number[];
        if (f == 8) font = font8[n];
        else if(f == 9) font = font9[n];
        else font = font12[n];

        let fp = 0;
        for (let c = p; c < (p + f); c++) {
            for (let j = 0; j < 16; j++) {
                if ((c % 2) == 0) {
                    if (((font[fp] >> (15 -j)) & 0x01) == 0x01) {
                        strip.setPixelColor(c * 16 + j, color);
                    } else {
                        strip.setPixelColor(c * 16 + j, NeoPixelColors.Black);
                    }
                } else {
                    if (((font[fp] >> (15 - j)) & 0x01) == 0x01) {
                        strip.setPixelColor(c * 16 + (15 - j), color);
                    } else {
                        strip.setPixelColor(c * 16 + (15 - j), NeoPixelColors.Black);
                    }
                }
            }
            fp++;
        }
    }
    /**
     * @param p position
     */
    //% blockId="displayColon" block="colon pos%p"
    export function displayColon(p: number): void {
        strip.setPixelColor(p * 16 + 3, color);
        strip.setPixelColor(p * 16 + 4, color);
        strip.setPixelColor(p * 16 + 11, color);
        strip.setPixelColor(p * 16 + 12, color);
        strip.setPixelColor(p * 16 + 19, color);
        strip.setPixelColor(p * 16 + 20, color);
        strip.setPixelColor(p * 16 + 27, color);
        strip.setPixelColor(p * 16 + 28, color);
    }
    /**
     * @param p position
     * @param c number
     */
    //% blockId="clearColumn" block="clear pos%p col%c"
    export function clearColumn(p: number, c: number): void {
        for (let i = 0; i < c; i++) {
            for (let j = 0; j < 16; j++) {
                strip.setPixelColor((i * 16) + j, NeoPixelColors.Black)
            }
        }
    }
    /**
     * @param h hour
     * @param m minute
     * @param s second
     */
    //% blockId="showClock" block="clock hour%h minute%m second%s"
    export function showClock(h: number, m: number, s: number): void {
        if (Math.trunc(h / 10) == 0) {
            clearColumn(0, 8);
        } else {
            displayNumber(0, Math.trunc(h / 10), 8);
        }
        displayNumber(9, h % 10, 9);
        displayColon(19);
        displayNumber(22, Math.trunc(m / 10), 9);
        displayNumber(32, m % 10, 9);
        displayColon(42);
        displayNumber(45, Math.trunc(s / 10), 9);
        displayNumber(55, s % 10, 9);

        strip.show();
    }
}
