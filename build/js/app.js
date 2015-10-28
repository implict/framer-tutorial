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

/**
 * ======================================= page slide
 */
var page = new PageComponent({
	width: img1.width * .5,
	height: img1.height * .5,
	scrollVertical: false,
	index: 1
});

var page1 = new Layer({
	width: page.width,
	height: page.height,
	superLayer: page.content,
	backgroundColor: "#28affa"
});

var page2 = new Layer({
	width: page.width,
	height: page.height,
	backgroundColor: "#90D7FF"
});

page.addPage(page2, "right");

img1.superLayer = page1;
img1.scale = .5;
img1.originY = 0;
img1.originX = 0;

img2.superLayer = page2;
img2.scale = .5;
img2.originY = 0;
img2.originX = 0;

/**
 * set dotActive
 */
page.on("change:currentPage", function() {
	//print(page.currentPage.id);
	var id = page.currentPage.id;

	if (id === 11) {
		dotActive.x = 142;
	} else if (id == 12) {
		dotActive.x = 159;
	}
});








/**
 * layerA.states.switch("stateB", time: 1, curve: "ease")
 * >>> layerA.states.switch("stateB", {time: 1, curve: "ease"});
 */
//layers.img1.states.switch("stateA", {time: .5, curve: "ease"});
