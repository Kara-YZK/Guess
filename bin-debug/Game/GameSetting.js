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
var GameSetting = (function (_super) {
    __extends(GameSetting, _super);
    function GameSetting() {
        return _super.call(this) || this;
    }
    GameSetting.Shared = function () {
        if (GameSetting.shared == null) {
            GameSetting.shared = new GameSetting();
        }
        return GameSetting.shared;
    };
    GameSetting.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameSetting.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    //初始化
    GameSetting.prototype.init = function () {
        //确定按钮的绑定方法
        this.btn_agree.addEventListener(egret.TouchEvent.TOUCH_TAP, this.agree_tap, this);
        //背景音乐按钮的绑定方法
        this.btn_music.addEventListener(egret.TouchEvent.TOUCH_TAP, this.music_tap, this);
        //音效按钮的绑定方法
        this.btn_sound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sound_tap, this);
        //初始化音乐/音效的显示
        this.update_button_stage();
    };
    /**
     * 确定按钮的响应函数
     */
    GameSetting.prototype.agree_tap = function () {
        console.log('确定');
        //隐藏设置场景
        this.parent.removeChild(this);
        //播放一个点击音效
        SoundManager.Shared().playClick();
    };
    /**
     * 背景音乐按钮的响应函数
     */
    GameSetting.prototype.music_tap = function () {
        // console.log('music');
        SoundManager.Shared().playClick();
        SoundManager.Shared().isMusic = !SoundManager.Shared().isMusic;
        //改变状态，（如果是可播放状态，则设置为禁用状态）
        this.update_button_stage();
    };
    /**
     * 音效按钮的响应函数
     */
    GameSetting.prototype.sound_tap = function () {
        // console.log('sound');
        SoundManager.Shared().playClick();
        SoundManager.Shared().isSound = !SoundManager.Shared().isSound;
        this.update_button_stage();
    };
    /**
     * 修改音乐/音效的状态
     */
    GameSetting.prototype.update_button_stage = function () {
        this.img_music_disable.visible = !SoundManager.Shared().isMusic;
        this.img_sound_disable.visible = !SoundManager.Shared().isSound;
    };
    return GameSetting;
}(eui.Component));
__reflect(GameSetting.prototype, "GameSetting", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=GameSetting.js.map