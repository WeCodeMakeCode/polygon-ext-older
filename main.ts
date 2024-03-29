//%  weight=100 color color=#008080  blockGap=8
namespace polygon {

    //% block="create polygon with %n_sides sides radius %radius || color %color angle %angle"
    //% blockSetVariable=myPolygon
    //% expandableArgumentMode=toggle
    //% inlineInputMode=inline
    //% n_sides.min=3 n_sides.max=30 n_sides.defl=3
    //% radius.min=10 radius.max=50 radius.defl=30
    //% color.min=1 color.max=15 color.defl=2  
    //% angle.min=0 angle.max=360 angle.defl=0
    export function createPolygon(n_sides: number, radius: number, color: number = 2, angle: number = 0): Polygon {
        return new Polygon(n_sides, radius, color, angle);
    }
}
//% blockNamespace=polygon color="#008080" blockGap=8blockGap=8
class Polygon {
    private _polygon: Sprite = null
    private _img: Image = null;
    private _n_sides: number = 3;
    private _radius: number = 30;
    private _color: number = 2;
    private _angle: number = 0;

    //% lockSetVariable="myPolygon"
    //% blockCombine block="sides"
    get sides(): number {
        return this._n_sides;
    }
    //% blockSetVariable="myPolygon"
    //% blockCombine block="sides"
    set sides(value: number) {
        this._n_sides = Math.min(Math.max(value, 3), 30);
        this.draw_polygon();
    }
    //% blockSetVariable="myPolygon"
    //% blockCombine block="radius"
    get radius(): number {
        return this._radius;
    }
    //%  blockSetVariable="myPolygon"
    //% blockCombine block="color"
    get color(): number {
        return this._color;
    }
    //% blockSetVariable="myPolygon"
    //% blockCombine block="color"
    set color(value: number) {
        this._color = Math.min(Math.max(value, 1), 15);
        this.draw_polygon();
    }
    //% blockSetVariable="myPolygon"
    //% blockCombine block="starting angle (degrees)"
    get angle(): number {
        return this._angle;
    }
    //% blockSetVariable="myPolygon"
    //% blockCombine block="starting angle (degrees)"
    set angle(value: number) {
        this._angle = Math.min(Math.max(value, 0), 360);
        this.draw_polygon();
    }
    //% blockSetVariable="myPolygon"
    //% blockCombine block="sprite"
    get sprite(): Sprite {
        return this._polygon;
    }
    constructor(n_sides: number, radius: number, color: number, starting_angle_degrees: number) {
        this._n_sides = n_sides;
        this._radius = radius;
        this._color = color;
        this._angle = starting_angle_degrees;
        this._img = image.create(2 * this._radius + 1, 2 * this._radius + 1)
        this._polygon = sprites.create(this._img)
        this.draw_polygon();
    }
    private draw_polygon() {
        this._img.fill(0);
        let step_degrees = 360 / this._n_sides
        let angle_degrees = this._angle;
        while (angle_degrees < this._angle + 360) {
            let x1 = this.degrees_to_X(angle_degrees, this._radius, this._radius);
            let y1 = this.degrees_to_Y(angle_degrees, this._radius, this._radius);
            let x2 = this.degrees_to_X(angle_degrees + step_degrees, this._radius, this._radius);
            let y2 = this.degrees_to_Y(angle_degrees + step_degrees, this._radius, this._radius);
            this._img.drawLine(x1, y1, x2, y2, this._color);
            angle_degrees += step_degrees;
        }
    }
    private degrees_to_X(angle_degrees: number, radius: number, origin_X: number): number {
        let angle_radians = angle_degrees * Math.PI / 180
        return origin_X + radius * Math.cos(angle_radians)
    }
    private degrees_to_Y(angle_degrees: number, radius: number, origin_Y: number): number {
        let angle_radians = angle_degrees * Math.PI / 180
        return origin_Y + radius * Math.sin(- angle_radians)
    }
}

