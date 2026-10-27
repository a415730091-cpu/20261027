let spriteSheet; // 儲存橫向排列的角色精靈圖
let characterX; // 儲存角色目前的水平位置
let characterY; // 儲存角色目前的垂直位置
let facingDirection = 1; // 記錄角色朝向，1 為右方，-1 為左方
const frameCountPerCycle = 8; // 設定精靈圖中的動畫影格數
const movementSpeed = 4; // 設定角色每一影格的移動距離

function preload() { // 在畫布建立前載入角色圖片
  spriteSheet = loadImage("walk/all.png"); // 載入包含 8 格動畫的精靈圖
} // 結束圖片載入函式

function setup() { // 設定全螢幕畫布與角色初始狀態
  createCanvas(windowWidth, windowHeight); // 建立符合視窗尺寸的畫布
  imageMode(CENTER); // 讓精靈圖以角色位置作為繪製中心
  characterX = width / 2; // 將角色水平放在畫面中央
  characterY = height / 2; // 將角色垂直放在畫面中央
} // 結束初始設定函式

function draw() { // 每一影格更新畫面與角色狀態
  background("#caf0f8"); // 使用指定的淺藍色作為畫布背景
  const frameWidth = spriteSheet.width / frameCountPerCycle; // 計算每格精靈圖的寬度
  const frameHeight = spriteSheet.height; // 取得精靈圖的高度
  let isMoving = false; // 記錄角色本影格是否正在移動

  if (keyIsDown(LEFT_ARROW)) { // 檢查左方向鍵是否正被按住
    characterX -= movementSpeed; // 按住左鍵時讓角色向左移動
    facingDirection = -1; // 將角色方向設定為左方
    isMoving = true; // 標記角色正在移動
  } // 結束左方向鍵判斷

  if (keyIsDown(RIGHT_ARROW)) { // 檢查右方向鍵是否正被按住
    characterX += movementSpeed; // 按住右鍵時讓角色向右移動
    facingDirection = 1; // 將角色方向設定為右方
    isMoving = true; // 標記角色正在移動
  } // 結束右方向鍵判斷

  characterX = constrain(characterX, frameWidth / 2, width - frameWidth / 2); // 限制角色不要移出畫布左右邊界

  const currentFrame = isMoving ? floor(frameCount / frameCountPerCycle) % frameCountPerCycle : 0; // 移動時循環播放 8 格，停止時顯示第 1 格
  push(); // 暫存繪圖狀態以便翻轉角色方向
  translate(characterX, characterY); // 將座標原點移至角色所在位置
  scale(facingDirection, 1); // 依角色朝向水平翻轉精靈圖
  image(spriteSheet, 0, 0, frameWidth, frameHeight, currentFrame * frameWidth, 0, frameWidth, frameHeight); // 繪製目前動畫影格
  pop(); // 還原繪圖狀態避免影響後續畫面
} // 結束畫面更新函式

function windowResized() { // 視窗尺寸改變時重新調整畫布
  resizeCanvas(windowWidth, windowHeight); // 讓畫布持續填滿整個視窗
  characterX = constrain(characterX, spriteSheet.width / frameCountPerCycle / 2, width - spriteSheet.width / frameCountPerCycle / 2); // 將角色留在新畫布的左右範圍內
  characterY = constrain(characterY, spriteSheet.height / 2, height - spriteSheet.height / 2); // 將角色留在新畫布的上下範圍內
} // 結束視窗尺寸調整函式

function keyPressed() { // 阻止方向鍵觸發瀏覽器的預設捲動
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) { // 判斷按下的是否為左右方向鍵
    return false; // 停止瀏覽器處理方向鍵
  } // 結束方向鍵判斷
} // 結束鍵盤按下事件函式
