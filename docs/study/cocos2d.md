<!--
 * @Author: lcz
 * @Date: 2021-08-31 10:46:20
 * @LastEditTime: 2021-09-01 17:27:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \watermelon\README.md
-->

cocosEdit =>cocos控制台

# assets 文件解析
prefab 预制体-》主要用于重复出现的 (王者小兵)

# resources 文件解析
动态加载文件夹

# 游戏地图
.tmx文件 -》可以解析出下面有N个png图片

# 骨骼动画
多个身体结构形成的骨骼

# Api
this.node  获取当前节点
this.node.children 获取当前节点的所有子节点
this.node.childrenCount 获取当前节点的所有子节点的数量
thid.node.getChildByName(节点名字) 获取当前节点的单个子节点

let lable = this.getComponent(cc.Label);  //自己节点 获取子节点 Label
lable.string = '123' //修改子节点名字

cc.find('Canvas/OverUI') 从根节点开始查看子节点
cc.find('cannect/OverUI',this.node) 从当前节点开始查看子节点

cc.find('Canvas/OverUI').active = true || false  隐藏节点

let parent = cc.find('Canvas')
this.node.parent = parent  更改当前节点的父节点

this.node.color = cc.Color.RED //修改节点颜色
this.node.opcity = 128 //修改节点透明度

let self = this
cc.loader.loadRes('图片名',cc.SpriteFrame,function(err,spriteFrame){
  let node = new cc.Node('sprite');
  let sp = node.addComponent(cc.Sprite)
  sp.spriteFrame = spriteFrame
  node.parent = self
}) 创建新节点并且放入图片

let targetNode =  cc.instantiate('目标节点 || 克隆') 克隆节点 || 克隆预制体
targetNode.parent = this.node  
targetNode.setPosition(100,100)

cc.director.loadScene('场景')  场景切换
cc.director.preloadScene('场景',function(){
  //场景预加载
})
cc.game.addPersistRootNode(myNode) //常驻节点 切换场景不消失
cc.game.removePersistRootNode(myNode)

cc.SpriteFrame:资源类型
cc.loader.loadRes('图片名',cc.SpriteFrame,function(err,spriteFrame){
  
})  //动态加载资源
cc.loader.releaseRes('图片名',cc.SpriteFrame)

//动作
let cation = cc.moveTo(2,100,100)
this.node.runAction(active) 开始 
this.node.stopAction(active) 停止
this.node.stopAllAction()停止所有动作

//新建节点 预制体 文案 -》cocosEdit 拖拉到面板
@property(cc.Label)
scoreLabel: cc.Label = null;
@property([cc.Prefab])
ballsPrefab: cc.Prefab[] = [];
@property(cc.Prefab)
waterEffectPrefab: cc.Prefab = null;

//物理系统
//是否每帧执行动画.enabled  开启物理系统
cc.director.getPhysicsManager().enabled = true;
//设置物理重力  秒加速降落 1280
cc.director.getPhysicsManager().gravity = cc.v2(0, -1280);

//监听
this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);

//cc.tween 缓动系统 repeatForever 永远重复动作开始行动 支持链式操作
  cc.tween(this.deadLine).repeatForever(
      //透明度闪烁
      cc.tween(this.deadLine)
          // 0.3s
          .to(0.3, { opacity: 0 })
          .to(0.3, { opacity: 255 })
  ).start();

//拷贝预制体
//控制球的难度 生成下标的球
const randomIndex = this.randomArray[Math.floor(Math.random() * this.randomArray.length)];
// 复制一个预制体
const ball = cc.instantiate(this.ballsPrefab[randomIndex]);

//设置弹性系数0, 1
ball.getComponent(cc.PhysicsCollider).restitution = 0.1; 
//设置刚体类型
ball.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static;