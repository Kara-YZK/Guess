var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @Author: YANGZEKUN
 * @Data: 2020-06
 * 关卡数据管理类
 */
var LevelDataManager = (function () {
    function LevelDataManager() {
        //声明一个数组，用来保存所有的关卡数据
        this.items = [];
        //加载所有关卡数据
        this.items = RES.getRes('questions_json');
    }
    LevelDataManager.Shared = function () {
        if (LevelDataManager.shared == null) {
            LevelDataManager.shared = new LevelDataManager();
        }
        return LevelDataManager.shared;
    };
    //通过关卡号获取该关卡的数据
    LevelDataManager.prototype.getLevel = function (level) {
        if (level < 0) {
            level = 0;
        }
        else if (level >= this.items.length) {
            level = this.items.length - 1;
        }
        //通过数组下标访问数据
        return this.items[level];
    };
    Object.defineProperty(LevelDataManager.prototype, "Milestone", {
        //获取当前游戏最远的进度
        get: function () {
            var milestone = egret.localStorage.getItem('guess');
            if (milestone == '' || milestone == null) {
                milestone = '1';
            }
            return parseInt(milestone);
        },
        //设置当前游戏的最远进度
        set: function (val) {
            egret.localStorage.setItem('guess', val.toString());
        },
        enumerable: true,
        configurable: true
    });
    return LevelDataManager;
}());
__reflect(LevelDataManager.prototype, "LevelDataManager");
//每个关卡的数据结构（model）
var LevelDataItem = (function () {
    function LevelDataItem() {
    }
    return LevelDataItem;
}());
__reflect(LevelDataItem.prototype, "LevelDataItem");
//# sourceMappingURL=LevelDataManager.js.map