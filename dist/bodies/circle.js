"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
const sat_1 = require("sat");
const model_1 = require("../model");
const utils_1 = require("../utils");
/**
 * collider - circle
 */
class Circle extends sat_1.Circle {
    /**
     * collider - circle
     * @param {PotentialVector} position {x, y}
     * @param {number} radius
     */
    constructor(position, radius, options) {
        super((0, utils_1.ensureVectorPoint)(position), radius);
        /**
         * bodies are not reinserted during update if their bbox didnt move outside bbox + padding
         */
        this.padding = 0;
        /**
         * for compatibility reasons circle has angle
         */
        this.angle = 0;
        this.type = model_1.Types.Circle;
        (0, utils_1.extendBody)(this, options);
        this.updateAABB();
    }
    get x() {
        return this.pos.x;
    }
    /**
     * updating this.pos.x by this.x = x updates AABB
     */
    set x(x) {
        var _a;
        this.pos.x = x;
        (_a = this.system) === null || _a === void 0 ? void 0 : _a.updateBody(this);
    }
    get y() {
        return this.pos.y;
    }
    /**
     * updating this.pos.y by this.y = y updates AABB
     */
    set y(y) {
        var _a;
        this.pos.y = y;
        (_a = this.system) === null || _a === void 0 ? void 0 : _a.updateBody(this);
    }
    /**
     * update position
     * @param {number} x
     * @param {number} y
     */
    setPosition(x, y) {
        var _a;
        this.pos.x = x;
        this.pos.y = y;
        (_a = this.system) === null || _a === void 0 ? void 0 : _a.updateBody(this);
    }
    /**
     * Updates Bounding Box of collider
     */
    getAABBAsBBox() {
        return {
            minX: this.pos.x - this.r,
            minY: this.pos.y - this.r,
            maxX: this.pos.x + this.r,
            maxY: this.pos.y + this.r,
        };
    }
    /**
     * Updates Bounding Box of collider
     */
    updateAABB(bounds = this.getAABBAsBBox()) {
        (0, utils_1.updateAABB)(this, bounds);
    }
    /**
     * Draws collider on a CanvasRenderingContext2D's current path
     * @param {CanvasRenderingContext2D} context The canvas context to draw on
     */
    draw(context) {
        const radius = this.r;
        if (this.isTrigger) {
            const max = Math.max(8, radius);
            for (let i = 0; i < max; i++) {
                const arc = (i / max) * 2 * Math.PI;
                const arcPrev = ((i - 1) / max) * 2 * Math.PI;
                const fromX = this.pos.x + Math.cos(arcPrev) * radius;
                const fromY = this.pos.y + Math.sin(arcPrev) * radius;
                const toX = this.pos.x + Math.cos(arc) * radius;
                const toY = this.pos.y + Math.sin(arc) * radius;
                (0, utils_1.dashLineTo)(context, fromX, fromY, toX, toY);
            }
        }
        else {
            context.moveTo(this.pos.x + radius, this.pos.y);
            context.arc(this.pos.x, this.pos.y, radius, 0, Math.PI * 2);
        }
    }
    setAngle(angle) {
        this.angle = angle;
    }
    center() { }
}
exports.Circle = Circle;
//# sourceMappingURL=circle.js.map