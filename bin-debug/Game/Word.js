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
var Word = (function (_super) {
    __extends(Word, _super);
    function Word() {
        return _super.call(this) || this;
    }
    Word.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Word.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    //初始化
    Word.prototype.init = function () {
        this.lb_text.addEventListener(egret.TouchEvent.TOUCH_TAP, this.word_tap, this);
    };
    /**
     * 点击选择区域的文字的响应方法
     */
    Word.prototype.word_tap = function () {
        SoundManager.Shared().playWord();
        //点击文字，让游戏场景去处理自己
        SceneGame.Shared().word_click(this);
    };
    //设置文本内容
    Word.prototype.setWordText = function (val) {
        this.lb_text.text = val;
    };
    //获取文本内容
    Word.prototype.getWordText = function () {
        return this.lb_text.text;
    };
    return Word;
}(eui.Component));
__reflect(Word.prototype, "Word", ["eui.UIComponent", "egret.DisplayObject"]);
/**
 * 答案区域的字（成语的四个组成字）
 */
var AnswerWord = (function (_super) {
    __extends(AnswerWord, _super);
    function AnswerWord() {
        var _this = _super.call(this) || this;
        //记录答案区域的内容
        _this.SelectWord = null;
        return _this;
    }
    /**
     * 点击答案区域的字的响应方法
     */
    AnswerWord.prototype.word_tap = function () {
        SoundManager.Shared().playWord();
        //如果点击的答案区有内容（有文字）
        if (this.SelectWord != null) {
            //清空该答案区
            this.SelectWord.visible = true;
            this.SelectWord = null;
            this.setWordText("");
        }
    };
    /**
     * 点击选择区域的word，在ananswer中记录下来这个word
     */
    AnswerWord.prototype.SetSelectWord = function (word) {
        if (word != null) {
            this.setWordText(word.getWordText());
            this.SelectWord = word;
            word.visible = false;
        }
        else {
            this.setWordText("");
            this.SelectWord = null;
        }
        //记录点击的word
        // this.SelectWord = word;
    };
    return AnswerWord;
}(Word));
__reflect(AnswerWord.prototype, "AnswerWord");
//# sourceMappingURL=Word.js.map