var layersNews = Framer.Importer.load("imported/News");
var layersReader = Framer.Importer.load("imported/Reader 1");

var topBar = layersNews.topBar;
var txt1 = layersNews.txt1;
var txt2 = layersNews.txt2;
var txt3 = layersNews.txt3;
var txt4 = layersNews.txt4;
var txt5 = layersNews.txt5;
var pic1 = layersNews.pic1;
var pic2 = layersNews.pic2;
var pic3 = layersNews.pic3;
var pic4 = layersNews.pic4;
var pic5 = layersNews.pic5;
var dim = layersNews.dim;

/**
 * News 페이지 초기 좌표와 크기 설정
 * 모바일웹 레티나 디스플레이 기준으로 이미지 크기를 반으로 줄임
 * 레티나 디스플레이가 아니라면 PSD 크기를 반으로 줄여서 그대로 임포트해도 됨
 */
topBar.scale = .5;
txt1.scale = txt2.scale = txt3.scale = txt4.scale = txt5.scale = .5;
pic1.scale = pic2.scale = pic3.scale = pic4.scale = pic5.scale = .5;
dim.scale = .5;
dim.originX = 0;
dim.originY = 0;
dim.y = -2;
//
pic1.x = pic2.x = pic3.x = pic4.x = pic5.x = -188;
pic1.y = -82;
pic2.y = 101;
pic3.y = 228;
pic4.y = 355;
pic5.y = 482;
//
topBar.x = 136;
topBar.y = 21;
//
txt1.x = -115;
txt1.y = 45;
txt2.x = -90;
txt2.y = 174;
txt3.x = -62;
txt3.y = 304;
txt4.x = -62;
txt4.y = 445;
txt5.x = -62;
txt5.y = 575;

////////////////////////////////////////////////
// news 코드 작성하세요.
////////////////////////////////////////////////



/**
* Reader 페이지 초기 좌표와 크기 설정
* 모바일웹 레티나 디스플레이 기준으로 이미지 크기를 반으로 줄임
* 레티나 디스플레이가 아니라면 PSD 크기를 반으로 줄여서 그대로 임포트해도 됨
*/
var topBar = layersReader.topBar;
var close = layersReader.close;
var title = layersReader.title;
var img = layersReader.img;
var content = layersReader.content;
var icon = layersReader.icons;

topBar.scale = title.scale = img.scale = content.scale = icon.scale = .5;

topBar.x = 136;
topBar.y = 21;

close.x = 360;
close.y = 4;

title.x = -73;
title.y = 40;

img.x = -img.width/4;
img.y = -img.height/4;

icon.x = 85;
icon.y = 216;

content.x = -150;
content.y = -142;


/**
 * 스크롤 페이지
 */
var readerScroll = new ScrollComponent({
  y: 297,
  width: img.width * .5,
  height: 368,
  backgroundColor: '#ffffff',
  scrollHorizontal: false
});

content.superLayer = readerScroll.content;

// 처음에는 reader 페이지 안 보이게 설정
setReaderVisible(false);

/**
 * reader 페이지 visible 제어
 */
function setReaderVisible(bool) {

	var layers = [topBar, title, img, icon, readerScroll];

	function fade(layers) {
		(bool) ? fadeIn(layers) : fadeOut(layers);
	}

	fade(layers);
}

/**
 * fade in
 */
function fadeIn(layers) {

	for (var layer in layers) {
		layers[layer].opacity = 0;
		layers[layer].visible = true;
		layers[layer].animate({
	    properties: {
	        opacity: 1
	      },
	    time: .3,
	    curve: "ease-in-out"
	  });
	}
};

/**
 * fade out
 */
function fadeOut(layers) {

	for (var layer in layers) {
		layers[layer].animate({
	    properties: {
	        opacity: 0
	      },
	    time: .3,
	    curve: "ease-in-out"
	  });
	}

	Utils.delay(.3, function() {
		layers[layer].visible = false;
	});
};

////////////////////////////////////////////////
// reader 코드 작성하세요.
////////////////////////////////////////////////
