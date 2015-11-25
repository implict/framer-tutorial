var layers = Framer.Importer.load("imported/onepage");

/**
 * gnb
 */
var head = layers.head;
var about = layers.about;
var feature = layers.feature;

function draw() {

};

$(window).resize(function() {
  //head.x = (Screen.width - head.width)/2;
  //feature.x = (Screen.width - feature.width)/2;
});

// header 상단 고정 (sticky nav)
$(window).scroll(function() {
  // if ($(window).scrollTop() > head.height) {
  //   headBg.opacity = .5;
  // } else {
  //   headBg.opacity = 1;
  // }
  head.y = window.scrollY;

  //console.log(window.scrollY);

  if (window.scrollY < 10) {
    if(videoLayer.player.paused === true) {
      videoLayer.player.play();
    }
  } else {
    videoLayer.player.pause();
  }
});

// about 마우스 오버 버튼 처리
about.style = {
  "cursor": "pointer"
};

// about 클릭 이벤트, 페이지 스크롤
about.on(Events.Click, function(event, layer) {
  //print('about click!');
  //$('html, body').animate({scrollTop: '+=760px'}, {duration: 'slow',easing:'swing'});
  var pos = $("[name='feature-content-2']").offset().top - 200;
  // http://gsgd.co.uk/sandbox/jquery/easing/
  $('html, body').animate({scrollTop: pos}, 800, 'easeOutExpo');
});

/**
 * header visual
 */
var headTxt = layers.bigText;
headTxt.visible = false;

var playBtn = layers.playBtn;
playBtn.opacity = 0;
playBtn.y += 16;

var prevBtn = layers.prev;
prevBtn.visible = false;
var nextBtn = layers.next;
nextBtn.visible = false;

// 비디오 처리
var video = layers.videoBg;
var videoLayer = new VideoLayer({
  video: "assets/mov1.mp4",
  width: video.width,
  height: video.height,
  backgroundColor: "#fff"
});

videoLayer.player.autoplay = true;
videoLayer.player.loop = true;
videoLayer.superLayer = video;

// 비디오 클릭 이벤트,
videoLayer.on(Events.Click, function() {
  if(videoLayer.player.paused === true) {
    videoLayer.player.play();
    //playBtn.visible = false;
    playBtn.animate({
      properties: {
        opacity: 0,
      },
      time: .1
    });
    videoLayer.brightness = 100;
  } else {
    videoLayer.player.pause();
    //playBtn.visible = true;
    playBtn.animate({
      properties: {
        opacity: 1
      },
      time: .3
    });
    videoLayer.brightness = 80;
  }
});

// 썸네일 클릭 - 팝업

var thumb = layers.imgIcon;
var thumbHover = layers.imgIconHover;

thumbHover.visible = false;

thumb.on(Events.Click, function() {
  thumbHover.visible = true;
});

thumbHover.on(Events.Click, function() {
  thumbHover.visible = false;
});
