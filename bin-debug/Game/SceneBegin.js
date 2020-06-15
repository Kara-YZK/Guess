var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SceneBegin = (function (_super) {
    __extends(SceneBegin, _super);
    function SceneBegin() {
        return _super.call(this) || this;
    }
    SceneBegin.Shared = function () {
        if (SceneBegin.shared == null) {
            SceneBegin.shared = new SceneBegin();
        }
        return SceneBegin.shared;
    };
    SceneBegin.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    SceneBegin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    //初始化
    SceneBegin.prototype.init = function () {
        //给两个按钮绑定点击方法
        this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setting_tap, this);
        this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.begin_tap, this);
    };
    /**
     * 点击设置按钮的响应函数
     */
    SceneBegin.prototype.setting_tap = function () {
        //打开设置页面
        console.log('打开游戏关卡场景');
    };
    /**
     * 点击开始游戏的响应函数
     */
    SceneBegin.prototype.begin_tap = function () {
        //打开游戏关卡场景
        console.log('打开游戏关卡场景');
        //把游戏关卡场景添加到显示列表
        this.parent.addChild(SceneLevel.Shared());
        //移除游戏开始场景
        this.parent.removeChild(this);
    };
    return SceneBegin;
}(eui.Component));
__reflect(SceneBegin.prototype, "SceneBegin", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=SceneBegin.js.map