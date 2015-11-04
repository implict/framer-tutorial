

/**
 * 레이어 만들기
 * 위치, 크기, 표현여부부 등의 속성 가지고 있음.
 * 이미지, 비디오, 텍스트, 임의의 html 문서 삽입 가능
 * https://midaeng.gitbooks.io/framer-js/content/05.layers.html
 */
 var layer = new Layer({
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  opacity: 1,
  backgroundColor: "black"
 });

 /**
  * 레이어 속성 값 설정
  */
layer.backgroundColor = '#ff0000';
layer.borderRadius = 5;
layer.shadowColor = "#ccc";
layer.shadowBlur = 4;
layer.shadowSpread = 2;
//layer.html = '<h1>layer</h1>';

/**
 * 애니메이션 주기
 * @curve: spring()
 */
layer.animate({
  properties: {
    x: 200
  },
  curve: "ease-in-out",
  time: 1
});


/**
 * 레이어 id 확인
 * 각 레이어는 고유의 id를 갖는다
 */
print(layer.id);

/**
 * 현재 화면 전체 크기
 */
print(Canvas.width);

/**
* 브라우저 창의 크기
*/
print(Screen.width);

/**
* 레이어 x, y
*/
print(layer.point);

/**
* 레이어 width, height
*/
print(layer.size);

/**
 * 레이어 x, y, width, height
 */
print(layer.frame);

/**
 * 레이어 3d 적용하기
 */
var layerA = new Layer({
  perspective: 0,
  width: 100,
  height: 100,
  backgroundColor: "#fff"
});

var layerB = new Layer({
  superLayer: layerA,
  backgroundColor: "#0f0"
  //html: "B"
});

layerB.animate({
  properties: {
    rotationY: 180
  }
});
