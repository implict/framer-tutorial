/**
 * 레이어 만들기
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
  * 레이어 속성 값 바꾸기
  */
layer.backgroundColor = '#ff0000';


/**
 * 애니메이션 주기
 */
layer.animate({
  properties: {
    x: 200
  },
  curve: "ease-in-out"
});
