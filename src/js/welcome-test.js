var layers = Framer.Importer.load("imported/Welcome 1");

// var device = new Framer.DeviceComponent();
//
// device.setupContext();
// device.deviceType = "iphone-5c-pink";

/**
 * ======================================= asset init
 */
layers.button.visible = false;
layers.pageDot.visible = false;
layers.text.visible = false;
layers.dim.visible = false;
//
var img1 = layers.img1;
var img2 = layers.img2;
var text = layers.text;
var dotActive = layers.dotActive;
var pageDot = layers.pageDot;

img1.scale = .5;
img1.originY = 0;
img1.originX = 0;

img2.scale = .5;
img2.originY = 0;
img2.originX = 0;

text.visible = true;
text.scale = .5;
text.originX = -.17;
text.originY = -.25;
text.index = 20;
//
pageDot.visible = true;
pageDot.scale = .5;
pageDot.y = 540;
pageDot.x = 120;
pageDot.index = 30;
//
dotActive.visible = true;
dotActive.scale = .5;
dotActive.y = 536.5;
dotActive.x = 142;
dotActive.index = 30;

var dim = new Layer({
	backgroundColor: "#292b32",
	opacity: .8,
	width: img1.width * .5,
	height: img1.height * .5,
	index: 10
});

////////////////////////////////////////////////
// 아래 슬라이드 관련 코드 작성하세요.
////////////////////////////////////////////////
