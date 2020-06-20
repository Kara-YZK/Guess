var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundManager = (function () {
    function SoundManager() {
        //加载所有的音频文件
        // this.click_sound = new egret.Sound();
        // this.click_sound.load(url)
        this.click_sound = RES.getRes('buttonclick_mp3');
        this.bgm_sound = RES.getRes('Music_mp3');
        this.win_sound = RES.getRes('right_mp3');
        this.error_sound = RES.getRes('wrong_mp3');
        this.word_sound = RES.getRes('type_word_mp3');
    }
    SoundManager.Shared = function () {
        if (SoundManager.shared == null) {
            SoundManager.shared = new SoundManager();
        }
        return SoundManager.shared;
    };
    /**
     * 播放背景音乐
     */
    SoundManager.prototype.playBgm = function () {
        if (this.isMusic) {
            this.bgm_channel = this.bgm_sound.play(0, 0);
        }
    };
    /**
     * 停止背景音乐
     */
    SoundManager.prototype.stopBgm = function () {
        if (this.bgm_channel != null) {
            this.bgm_channel.stop();
        }
    };
    /**
     * 音效播放
     */
    SoundManager.prototype.playClick = function () {
        if (this.isSound) {
            this.click_sound.play(0, 1);
        }
    };
    /**
     * 成功的音效播放
     */
    SoundManager.prototype.playWin = function () {
        if (this.isSound) {
            this.win_sound.play(0, 1);
        }
    };
    /**
     * 答案错误的音效
     */
    SoundManager.prototype.playError = function () {
        if (this.isSound) {
            this.error_sound.play(0, 1);
        }
    };
    /**
     * 点击文字的音效播放
     */
    SoundManager.prototype.playWord = function () {
        if (this.isSound) {
            this.word_sound.play(0, 1);
        }
    };
    Object.defineProperty(SoundManager.prototype, "isMusic", {
        /**
         * 获取音频是否播放
         */
        get: function () {
            var b = egret.localStorage.getItem('isMusic');
            if (b == null || b == "") {
                return true;
            }
            else {
                return b == "1";
            }
        },
        /**
         * 音乐是否播放，保存设置
         */
        set: function (val) {
            if (!val) {
                egret.localStorage.setItem('isMusic', "0");
                this.stopBgm();
            }
            else {
                egret.localStorage.setItem('isMusic', "1");
                this.playBgm();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager.prototype, "isSound", {
        /**
         * 获取音频的配置
         */
        get: function () {
            var b = egret.localStorage.getItem('isSound');
            if (b == null || b == "") {
                return true;
            }
            else {
                return b == "1";
            }
        },
        /**
         * 音效是否播放，保存设置
         */
        set: function (val) {
            if (val) {
                egret.localStorage.setItem('isSound', "1");
            }
            else {
                egret.localStorage.setItem('isSound', "0");
            }
        },
        enumerable: true,
        configurable: true
    });
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
//# sourceMappingURL=SoundManager.js.map