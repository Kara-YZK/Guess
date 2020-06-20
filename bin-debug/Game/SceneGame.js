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
var SceneGame = (function (_super) {
    __extends(SceneGame, _super);
    function SceneGame() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/Game/SceneGame.exml";
        return _this;
    }
    SceneGame.Shared = function () {
        if (SceneGame.shared == null) {
            SceneGame.shared = new SceneGame();
        }
        return SceneGame.shared;
    };
    SceneGame.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    SceneGame.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    //初始化
    SceneGame.prototype.init = function () {
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back_tap, this);
        this.group_win.visible = false;
        this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.next_tap, this);
    };
    /**
     * 返回按钮的响应函数
     */
    SceneGame.prototype.back_tap = function () {
        SoundManager.Shared().playClick();
        this.parent.addChild(SceneLevel.Shared());
        this.parent.removeChild(this);
    };
    /**
     * 初始化游戏场景
     */
    SceneGame.prototype.initLevel = function (level) {
        //记录当前关卡
        this.levelIndex = level;
        //获取关卡的内容
        var levelData = LevelDataManager.Shared().getLevel(level);
        //先把自己关卡的成语（4个字）和混淆字（16个字）拼接起来
        var words = levelData.answer + levelData.word;
        //随机一个关卡，把随机关卡的成语和混淆字也拼接到words后面
        while (words.length == 10) {
            var i = Math.floor(Math.random() * 400);
            if (i != level) {
                var temp = LevelDataManager.Shared().getLevel(i);
                //把随机关卡的成语和混淆字添加进来
                words += temp.answer + temp.word;
            }
        }
        //把words变成数组
        var wordList = [];
        for (var i = 0; i < words.length; i++) {
            wordList.push(words.charAt(i));
        }
        //重新排列(打乱wordList这个数组)
        wordList = this.randomList(wordList);
        //把wordList里面的文字渲染出来
        for (var i = 0; i < this.group_words.numChildren; i++) {
            //获取到选择区域 Word 组件
            var word = this.group_words.getChildAt(i);
            //设置word的显示内容
            word.setWordText(wordList[i]);
            //设置该word可见
            word.visible = true;
        }
        //对答案区域进行初始化
        for (var i = 0; i < this.group_answer.numChildren; i++) {
            var answer = this.group_answer.getChildAt(i);
            answer.SetSelectWord(null);
            answer.visible = true;
            answer.SelectWord = null;
        }
        //显示图示提示
        this.img_question.source = "resource/assets/data/" + levelData.img;
    };
    /**
     * 对一个数组进行随机排列
     */
    SceneGame.prototype.randomList = function (arr) {
        var array = [];
        while (arr.length > 0) {
            var i = Math.floor(Math.random() * arr.length);
            array.push(arr[i]);
            arr.splice(i, 1);
        }
        return array;
    };
    /**
     * 点击选择区域的文本后的响应函数
     */
    SceneGame.prototype.word_click = function (word) {
        var sel = null;
        for (var i = 0; i < this.group_answer.numChildren; i++) {
            var answer = this.group_answer.getChildAt(i);
            if (answer.SelectWord == null) {
                sel = answer;
                break;
            }
        }
        //如果存在空白区，则把点击的文字上传到答案区
        if (sel != null) {
            sel.SetSelectWord(word);
            //胜利判断
            var check_str = "";
            for (var i = 0; i < this.group_answer.numChildren; i++) {
                var answer = this.group_answer.getChildAt(i);
                check_str += answer.getWordText();
            }
            //如果答案区的拼成成语等于当前关卡的答案，则弹出正解场景页面
            if (check_str == LevelDataManager.Shared().getLevel(this.levelIndex).answer) {
                this.showWin();
            }
            if (check_str.length >= 4 && check_str !== LevelDataManager.Shared().getLevel(this.levelIndex).answer) {
                SoundManager.Shared().playError();
            }
        }
    };
    /**
     * 显示正解场景
     */
    SceneGame.prototype.showWin = function () {
        // console.log("win");
        SoundManager.Shared().playWin();
        this.group_win.visible = true;
        //获取游戏的关卡信息
        var levelData = LevelDataManager.Shared().getLevel(this.levelIndex);
        this.lb_from.text = levelData.content;
        this.lb_explain.text = levelData.tip;
    };
    /**
     * 点击下一关按钮的响应函数
     */
    SceneGame.prototype.next_tap = function () {
        SoundManager.Shared().playClick();
        //先把游戏正解场景隐藏起来
        this.group_win.visible = false;
        //从新初始化游戏场景
        this.initLevel(this.levelIndex + 1);
        //记录最远关卡
        SceneLevel.Shared().setMileStoneLevel(this.levelIndex);
    };
    return SceneGame;
}(eui.Component));
__reflect(SceneGame.prototype, "SceneGame", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=SceneGame.js.map