<!--
 * @Author: your name
 * @Date: 2021-09-01 17:19:56
 * @LastEditTime: 2021-09-01 17:22:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lcz_document\docs\project\cocos2dJs.md
-->
 ## 模板+备注
 ```html
 /**
 * 作者：Nowpaper
 * 时间：2021-1-25
 * 地点：B站直播
 * 功能：游戏主场景
 */
import BallSc from "./BallSc";
import {XMLHttpResquestGet} from '../utils/api'
// _decorator 室内装修
const { ccclass, property } = cc._decorator;
// 枚举游戏状态
enum GameState {
    start, gaming, over
}
@ccclass
export default class GameSc extends cc.Component {
    // @property(xxx)获取其他节点
    @property(cc.Label)
    scoreLabel: cc.Label = null;

    @property(cc.Node)
    ballsLayer: cc.Node = null;

    @property(cc.Prefab)
    waterEffectPrefab: cc.Prefab = null;

    @property([cc.Prefab])
    ballsPrefab: cc.Prefab[] = [];

    @property(cc.Node)
    deadLine: cc.Node = null;

    @property(cc.Node)
    zhezhao: cc.Node = null;

    private randomArray = [0, 0, 0, 0, 1, 1, 2, 3];
    // private randomArray = [0, 0, 0, 0, 0,0,0,0];
    private currentBall: cc.Node = null;
    private currentBallIndex: number = 0;
    private _gameState: GameState = GameState.gaming;
    private _winner = false;

    private _score: number = 0;
    public get score(): number {
        return this._score;
    }

    public set score(v: number) {
        this._score = v;
        this.scoreLabel.string = v.toFixed(0);
    }
    onLoad() {
        //是否每帧执行动画.enabled  开启物理系统
        cc.director.getPhysicsManager().enabled = true;
        //设置物理重力  秒加速降落 1280
        cc.director.getPhysicsManager().gravity = cc.v2(0, -1280);
    }

    start() {
        
    }
    /**
     * @description: 请求成功游戏开始
     * @param {*}
     * @return {*}
     */    
    private gameOpen(){
        this.zhezhao.active = false;
        //监听节点手机移动跟抬起
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        //创建球
        this.CreateNewBall();
        // //死亡线在球接近的时候闪烁
        this.deadLine.active = false;
        //cc.tween 缓动系统 repeatForever 永远重复动作
        cc.tween(this.deadLine).repeatForever(
            //透明度闪烁
            cc.tween(this.deadLine)
                // 0.3s
                .to(0.3, { opacity: 0 })
                .to(0.3, { opacity: 255 })
        ).start();
    }

    private openStart(){
        // XMLHttpResquestGet('url/123123121231123',(e)=>{
        //     if(e){
        this.gameOpen();
        //     }else{
        //         alert('信息错误')
        //     }
        // })
        
    }

    /** 松开弹射 */
    private onTouchEnd(e: cc.Event.EventTouch) {
        if (this._gameState !== GameState.gaming) {
            return;
        }
        if (!this.currentBall) {
            return;
        }
        let ball = this.currentBall;
        ball.addComponent(BallSc).BallIndex = this.currentBallIndex;
        this.currentBall = null;
        let x = this.ballsLayer.convertToNodeSpaceAR(e.getLocation()).x;

        if (x > 720 / 2 - ball.width / 2) {
            x = 720 / 2 - ball.width / 2;
        } else if (x < -720 / 2 + ball.width / 2) {
            x = -720 / 2 + ball.width / 2;
        }

        let speed = 1 / 1000;
        // speed加速 .call 动作回调
        cc.tween(ball)
            .to(Math.abs(speed * x), { x })
            .call(() => {
                ball.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic;
                //设置移动速度
                ball.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, -300);
                this.CreateNewBall();
            })
            .start();
    }

    //左右移动
    private onTouchMove(e: cc.Event.EventTouch) {
        if (this._gameState == GameState.gaming) {
            if (this.currentBall) {
                let x = this.ballsLayer.convertToNodeSpaceAR(e.getLocation()).x;
                if (x > 720 / 2 - this.currentBall.width / 2) {
                    x = 720 / 2 - this.currentBall.width / 2;
                } else if (x < -720 / 2 + this.currentBall.width / 2) {
                    x = -720 / 2 + this.currentBall.width / 2;
                }
                this.currentBall.x = x;
            }
        }
    }
    /** 创建一个新的球在等待射击的位置上 */
    private CreateNewBall() {
        // 如果之前的球存在则销毁它
        if(this.currentBall){
            this.currentBall.destroy();
        }
        //控制球的难度 生成下标的球
        const randomIndex = this.randomArray[Math.floor(Math.random() * this.randomArray.length)];
        // 复制一个预制体
        const ball = cc.instantiate(this.ballsPrefab[randomIndex]);
        console.log(ball,222)
        //设置弹性系数0, 1
        ball.getComponent(cc.PhysicsCollider).restitution = 0.1; 
        this.currentBallIndex = ball.getComponent(BallSc).BallIndex;
        ball.removeComponent(BallSc);
        ball.y = 566;
        //设置刚体类型
        ball.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static;
        //this.currentBall
        ball.scale = 0;
        cc.tween(ball)
            .delay(0.2)
            .call(() => {
                this.ballsLayer.addChild(ball);
            })
            .to(0.2, { scale: 1 })
            .call(() => {
                this.currentBall = ball;
            }).start();
    }

    public BallLevelUp(target: cc.Node, other: cc.Node) {
        let index = target.getComponent(BallSc).BallIndex + 1;
        if (index <= this.ballsPrefab.length) {
            cc.game.emit('game-ball-levelup');

            other.getComponent(cc.PhysicsCollider).enabled = false;
            cc.tween(other).to(0.15, { x: target.x, y: target.y }).removeSelf()
                .call(() => {
                    const newBall = cc.instantiate(this.ballsPrefab[index - 1]);
                    newBall.position = target.position;
                    this.ballsLayer.addChild(newBall);
                    target.removeFromParent(true);
                    const eff = cc.instantiate(this.waterEffectPrefab); 
                    eff.x = newBall.x;
                    eff.y = newBall.y;
                    eff.color = this.ballColors[index - 1];
                    this.ballsLayer.addChild(eff);
                    if (index == this.ballsPrefab.length && this._winner == false) {
                        this._winner = true;
                        cc.find('Canvas/WinUI').active = true;
                    }
                })
                .start();
            //碰撞元素的分数
            this.score += target.getComponent(BallSc).BallIndex;
            // 对随机范围作扩充
            if (this.randomArray.findIndex((value) => {
                return value == index - 1;
            }) < 0) {
                this.randomArray = this.randomArray.concat(JSON.parse(JSON.stringify(this.randomArray))).sort((a, b) => { return a - b; });
                console.log(this.randomArray);
                this.randomArray.push(index - 1);
            }
            return true;
        }else{
            return false;
        }
    }

    private ballColors: cc.Color[] = [
        new cc.Color().fromHEX("#862274"),
        new cc.Color().fromHEX("#ff0925"),
        new cc.Color().fromHEX("#ff8e1c"),
        new cc.Color().fromHEX("#ffe614"),
        new cc.Color().fromHEX("#6de42e"),
        new cc.Color().fromHEX("#e61933"),
        new cc.Color().fromHEX("#fab36d"),
        new cc.Color().fromHEX("#ffe350"),
        new cc.Color().fromHEX("#fffaea"),
        new cc.Color().fromHEX("#fc7b97"),
        new cc.Color().fromHEX("#52d135")
    ];

    update(dt) {
        if (this._gameState == GameState.gaming) {
            const arr = this.ballsLayer.getComponentsInChildren(BallSc);
            let warning: boolean = false;
            let over: boolean = false;
            for (let ball of arr) {
                if (!ball.isNotCheckOver) continue;
                if (ball.node.y >= this.deadLine.y - ball.node.height / 2) {
                    warning = true;
                }
                if (ball.node.y >= this.deadLine.y) {
                    over = true;
                    break;
                }
            }
            this.deadLine.active = warning;
            //游戏结束
            if (over) {
                this._gameState = GameState.over;
                console.log( this.score)
                console.log("Game Over");
                // alert('游戏结束')
                cc.find('Canvas/OverUI').active = true;
            }
        }
    }

    replay() {
        cc.find('Canvas/OverUI').active = false;
        this._gameState = GameState.start;
        const arr = this.ballsLayer.getComponentsInChildren(BallSc);
        for (let i = arr.length - 1; i >= 0; i--) {
            cc.tween(arr[i].node).delay(0.1 * i).call(
                () => {
                    const eff = cc.instantiate(this.waterEffectPrefab);
                    eff.x = arr[i].node.x;
                    eff.y = arr[i].node.y;
                    eff.color = this.ballColors[arr[i].BallIndex - 1];
                    this.ballsLayer.addChild(eff);
                }
            ).removeSelf().start();
        }
        cc.tween(this).delay(arr.length * 0.1)
            .call(() => {
                this._gameState = GameState.gaming;
                /** 恢复到原始状态 */
                this.randomArray = [0, 0, 0, 0, 1, 1, 2, 3];
                this.CreateNewBall();
            }).start();
        this.score = 0;
        this._winner = false;
    }

    /**
     * 复活不清除得分
     */
    revive() {
        let score = this.score;
        this.replay()
        this.score = score;
    }
   
    closeWin() {
        
        cc.find('Canvas/WinUI').active = false;
    }
}


 ```