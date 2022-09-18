const app = document.getElementById("app");
const $width = 50;
const $height = 50;
const BlockNums = 100;
// 计算出 app 模型在 document 的 x,y的坐标
// 计算出 绘制区域的 x起点  和 y起点
// 并且渲染的区域和大盒子要有20px的间距
function calculationOfPosition() {
  const { left: x, top: y } = app.getBoundingClientRect();
  // 绘制的开始端和结束端
  const Position = {
    x,
    y,
    drawStartX: 20,
    drawStartY: 20,
    drawEndX: app.offsetWidth - 70,
    drawEndY: app.offsetHeight - 200,
  };

  return Position;
}
// 全局公用坐标
const Position = calculationOfPosition();

// 生成随机的坐标
function randomPosition(min, max) {
  return randomKey(min, max);
}

// 生成随机的数字 (min,max)
function randomKey(min, max) {
  return parseInt(Math.random() * (max - min + 1) + min);
}

// console.log("calculationOfPosition() ===> ", calculationOfPosition());

const IMGS = [
  "./img/key1.jpeg",
  "./img/key2.jpeg",
  "./img/key3.jpeg",
  "./img/key4.jpeg",
  "./img/key5.jpeg",
  "./img/key6.jpeg",
  "./img/key7.jpeg",
];
// 块 类
class Block {
  // n 表示第几张图 (必须0-6) 也是配对的关键 一旦生成不会改变
  // i 当前图片在数组中的下表 i 一旦生成 不会改变
  constructor(n, i) {
    this.width = $width;
    this.height = $height;
    // 当选中图片时 判断 n 是否相同
    // console.log("n ==> ", n);
    this.n = n;
    // 当前图片生成的位置 （用于判断是否被遮盖 0被1遮盖， 1被2遮盖）
    this.index = i;
    this.src = IMGS[n];
    // x 坐标
    this.x = randomPosition(Position.drawStartX, Position.drawEndX);
    // y 坐标
    this.y = randomPosition(Position.drawStartY, Position.drawEndY);
  }
  // 是否被遮挡
  // 判断逻辑: 从我这里开始算起，判断后续的Block是否有与我 x,y 交叉的节点，有就说明我被覆盖
  isCover() {
    var thatBlock;
    var coverState = false;
    // 如果是最后一个模块(最顶层) 或者是数组最后一个 不处理直接false
    // if() {}
    for (let index = 0; index < allBlock.length; index++) {
      // 找到他的位置
      if (allBlock[index].index === this.index) {
        thatBlock = allBlock[index];
      } else if (thatBlock) {
        // console.log("thatBlock ==> ", thatBlock);
        // 目标元素
        const target = allBlock[index];
        // 找到当前 this.index 在数组中的位置
        // 碰撞逻辑
        var xLeft = target.x;
        var xRight = target.x + 50;
        var yTop = target.y;
        var yBottom = target.y + 50;
        //只要thatBlock在这4个临界值内 那么就说明发生了碰撞
        console.log("我的left", thatBlock.x, "你的right", xRight);
        console.log("我的right", thatBlock.x + 50, "你的left", xLeft);
        console.log("我的top", thatBlock.y, "你的bottom", yBottom);
        console.log("我的bottom", thatBlock.y + 50, "你的top", yTop);
        if (
          !(
            thatBlock.x > xRight ||
            thatBlock.x + 50 < xLeft ||
            thatBlock.y > yBottom ||
            thatBlock.y + 50 < yTop
          )
        ) {
          coverState = true;
          console.log("终端循环 碰撞 ==> ", index, allBlock.length);
          break;
        }
        console.log("循环 ==> ", index, allBlock.length);
      }
    }

    return coverState;
  }
  // 设置属性
  setStyle(d, styleObject) {
    for (const key in styleObject) {
      d["style"][key] = styleObject[key];
    }
  }
  // 绘制块
  draw() {
    const imgDom = new Image();
    imgDom.src = this.src;
    imgDom.id = this.index;
    // 获取位置
    let style = {
      position: "absolute",
      left: this.x + "px",
      top: this.y + "px",
      width: this.width + "px",
      height: this.height + "px",
    };
    console.log("this.isCover() ==> ", this.isCover());
    if (this.isCover()) {
      style["filter"] = "brightness(30%)";
    }

    this.setStyle(imgDom, style);
    return imgDom;
  }
}
// 按照顺序 0 - 100 存放叠加的block块
const allBlock = [];
//
function drawBlock(num) {
  // 计算块个数
  for (let index = 0; index < num; index++) {
    const vBlock = new Block(randomKey(0, 6), index);
    allBlock.push(vBlock);
  }

  // 上面加入完成后，下面开始绘制
  allBlock.forEach((v) => {
    app.appendChild(v.draw());
  });
}

drawBlock(BlockNums);

// console.log("allBlock ===> ", allBlock);
