/**
 * @Author: YANGZEKUN
 * @Data: 2020-06
 * 关卡数据管理类
 */
class LevelDataManager {
	//声明一个数组，用来保存所有的关卡数据
	private items: LevelDataItem[] = []; 
	//声明单例
	private static shared: LevelDataManager;
	public static Shared(): LevelDataManager{
		if(LevelDataManager.shared == null){
			LevelDataManager.shared = new LevelDataManager();
		}
		return LevelDataManager.shared;
	}
	
	public constructor() {
		//加载所有关卡数据
		this.items = RES.getRes('questions_json');

	}

	//通过关卡号获取该关卡的数据
	public getLevel(level: number): LevelDataItem{
		if(level < 0){
			level = 0;
		}
		else if(level >= this.items.length){
			level = this.items.length - 1;
		}
		//通过数组下标访问数据
		return this.items[level];
	}

	//获取当前游戏最远的进度
	public get Milestone(): number{
		var milestone = egret.localStorage.getItem('guess');
		if(milestone == '' || milestone == null){
			milestone = '1';
		}
		return parseInt(milestone);
	}
	//设置当前游戏的最远进度
	public set Milestone(val: number){
		egret.localStorage.setItem('guess', val.toString());
	}

}

//每个关卡的数据结构（model）
class LevelDataItem{
	public answer: string;
	public img: string;
	public word: string;
	public content: string;
}