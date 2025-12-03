"use strict";
cc._RF.push(module, '7bc24njds1H3LACglpoD/8f', 'WeightRandom');
// Scripts/WeightRandom.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WeightRandom = /** @class */ (function () {
    function WeightRandom() {
        this.weightArr = [];
    }
    WeightRandom.prototype.weightAdd = function (value, weight) {
        if (weight !== 0) {
            for (var i = 0; i < weight; i++) {
                this.weightArr.push(value);
            }
        }
    };
    WeightRandom.prototype.weightDeleteAll = function (value) {
        var firstIndex = -1;
        var count = 0;
        for (var i = 0; i < this.weightArr.length; i++) {
            if (value === this.weightArr[i]) {
                count++;
                if (firstIndex === -1) {
                    firstIndex = i;
                }
            }
        }
        if (firstIndex !== -1) {
            this.weightArr.splice(firstIndex, count);
        }
    };
    WeightRandom.prototype.weightDeleteSingle = function (value) {
        for (var i = 0; i < this.weightArr.length; i++) {
            if (value === this.weightArr[i]) {
                this.weightArr.splice(i, 1);
                break;
            }
        }
    };
    WeightRandom.prototype.weightNext = function () {
        if (this.weightArr.length === 0) {
            return null;
        }
        var randomIndex = Math.floor(Math.random() * this.weightArr.length);
        return this.weightArr[randomIndex];
    };
    return WeightRandom;
}());
exports.default = WeightRandom;

cc._RF.pop();