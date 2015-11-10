(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  exports.AudioPlayer = (function(superClass) {
    extend(AudioPlayer, superClass);

    function AudioPlayer(options) {
      if (options == null) {
        options = {};
      }
      this.getTimeLeft = bind(this.getTimeLeft, this);
      if (options.backgroundColor == null) {
        options.backgroundColor = "transparent";
      }
      this.player = document.createElement("audio");
      this.player.setAttribute("webkit-playsinline", "true");
      this.player.setAttribute("preload", "auto");
      this.player.style.width = "100%";
      this.player.style.height = "100%";
      this.player.on = this.player.addEventListener;
      this.player.off = this.player.removeEventListener;
      AudioPlayer.__super__.constructor.call(this, options);
      this.controls = new Layer({
        backgroundColor: "transparent",
        width: 80,
        height: 80,
        superLayer: this,
        name: "controls"
      });
      this.controls.showPlay = function() {
        return this.image = "images/play.png";
      };
      this.controls.showPause = function() {
        return this.image = "images/pause.png";
      };
      this.controls.showPlay();
      this.controls.center();
      this.timeStyle = {
        "font-size": "20px",
        "color": "#000"
      };
      this.on(Events.Click, function() {
        var currentTime, duration;
        currentTime = Math.round(this.player.currentTime);
        duration = Math.round(this.player.duration);
        if (this.player.paused) {
          this.player.play();
          this.controls.showPause();
          if (currentTime === duration) {
            this.player.currentTime = 0;
            return this.player.play();
          }
        } else {
          this.player.pause();
          return this.controls.showPlay();
        }
      });
      this.player.onplaying = (function(_this) {
        return function() {
          return _this.controls.showPause();
        };
      })(this);
      this.player.onended = (function(_this) {
        return function() {
          return _this.controls.showPlay();
        };
      })(this);
      this.player.formatTime = function() {
        var min, sec;
        sec = Math.floor(this.currentTime);
        min = Math.floor(sec / 60);
        sec = Math.floor(sec % 60);
        sec = sec >= 10 ? sec : '0' + sec;
        return min + ":" + sec;
      };
      this.player.formatTimeLeft = function() {
        var min, sec;
        sec = Math.floor(this.duration) - Math.floor(this.currentTime);
        min = Math.floor(sec / 60);
        sec = Math.floor(sec % 60);
        sec = sec >= 10 ? sec : '0' + sec;
        return min + ":" + sec;
      };
      this.audio = options.audio;
      this._element.appendChild(this.player);
    }

    AudioPlayer.define("audio", {
      get: function() {
        return this.player.src;
      },
      set: function(audio) {
        this.player.src = audio;
        if (this.player.canPlayType("audio/mp3") === "") {
          throw Error("No supported audio file included.");
        }
      }
    });

    AudioPlayer.define("showProgress", {
      get: function() {
        return this._showProgress;
      },
      set: function(showProgress) {
        return this.setProgress(showProgress, false);
      }
    });

    AudioPlayer.define("showVolume", {
      get: function() {
        return this._showVolume;
      },
      set: function(showVolume) {
        return this.setVolume(showVolume, false);
      }
    });

    AudioPlayer.define("showTime", {
      get: function() {
        return this._showTime;
      },
      set: function(showTime) {
        return this.getTime(showTime, false);
      }
    });

    AudioPlayer.define("showTimeLeft", {
      get: function() {
        return this._showTimeLeft;
      },
      set: function(showTimeLeft) {
        return this.getTimeLeft(showTimeLeft, false);
      }
    });

    AudioPlayer.prototype._checkBoolean = function(property) {
      var ref, ref1;
      if (_.isString(property)) {
        if ((ref = property.toLowerCase()) === "1" || ref === "true") {
          property = true;
        } else if ((ref1 = property.toLowerCase()) === "0" || ref1 === "false") {
          property = false;
        } else {
          return;
        }
      }
      if (!_.isBoolean(property)) {

      }
    };

    AudioPlayer.prototype.getTime = function(showTime) {
      this._checkBoolean(showTime);
      this._showTime = showTime;
      if (showTime === true) {
        this.time = new Layer({
          backgroundColor: "transparent",
          name: "currentTime"
        });
        this.time.style = this.timeStyle;
        this.time.html = "0:00";
        return this.player.ontimeupdate = (function(_this) {
          return function() {
            return _this.time.html = _this.player.formatTime();
          };
        })(this);
      }
    };

    AudioPlayer.prototype.getTimeLeft = function(showTimeLeft) {
      this._checkBoolean(showTimeLeft);
      this._showTimeLeft = showTimeLeft;
      if (showTimeLeft === true) {
        this.timeLeft = new Layer({
          backgroundColor: "transparent",
          name: "timeLeft"
        });
        this.timeLeft.style = this.timeStyle;
        this.timeLeft.html = "-0:00";
        this.player.on("loadedmetadata", (function(_this) {
          return function() {
            return _this.timeLeft.html = "-" + _this.player.formatTimeLeft();
          };
        })(this));
        return this.player.ontimeupdate = (function(_this) {
          return function() {
            return _this.timeLeft.html = "-" + _this.player.formatTimeLeft();
          };
        })(this);
      }
    };

    AudioPlayer.prototype.setProgress = function(showProgress) {
      var isMoving, wasPlaying;
      this._checkBoolean(showProgress);
      this._showProgress = showProgress;
      if (this._showProgress === true) {
        this.progressBar = new SliderComponent({
          width: 200,
          height: 6,
          backgroundColor: "#eee",
          knobSize: 20,
          value: 0,
          min: 0
        });
        this.player.oncanplay = (function(_this) {
          return function() {
            return _this.progressBar.max = Math.round(_this.player.duration);
          };
        })(this);
        this.progressBar.knob.draggable.momentum = false;
        wasPlaying = isMoving = false;
        if (!this.player.paused) {
          wasPlaying = true;
        }
        this.progressBar.on("change:value", (function(_this) {
          return function() {
            _this.player.currentTime = _this.progressBar.value;
            if (_this.time && _this.timeLeft) {
              _this.time.html = _this.player.formatTime();
              return _this.timeLeft.html = "-" + _this.player.formatTimeLeft();
            }
          };
        })(this));
        this.progressBar.knob.on(Events.DragMove, (function(_this) {
          return function() {
            return isMoving = true;
          };
        })(this));
        this.progressBar.knob.on(Events.DragEnd, (function(_this) {
          return function(event) {
            var currentTime, duration;
            currentTime = Math.round(_this.player.currentTime);
            duration = Math.round(_this.player.duration);
            if (wasPlaying && currentTime !== duration) {
              _this.player.play();
              _this.controls.showPause();
            }
            if (currentTime === duration) {
              _this.player.pause();
              _this.controls.showPlay();
            }
            return isMoving = false;
          };
        })(this));
        return this.player.ontimeupdate = (function(_this) {
          return function() {
            if (!isMoving) {
              _this.progressBar.knob.midX = _this.progressBar.pointForValue(_this.player.currentTime);
              _this.progressBar.knob.draggable.isMoving = false;
            }
            if (_this.time && _this.timeLeft) {
              _this.time.html = _this.player.formatTime();
              return _this.timeLeft.html = "-" + _this.player.formatTimeLeft();
            }
          };
        })(this);
      }
    };

    AudioPlayer.prototype.setVolume = function(showVolume) {
      var base;
      this._checkBoolean(showVolume);
      if ((base = this.player).volume == null) {
        base.volume = 0.75;
      }
      this.volumeBar = new SliderComponent({
        width: 200,
        height: 6,
        backgroundColor: "#eee",
        knobSize: 20,
        min: 0,
        max: 1,
        value: this.player.volume
      });
      this.volumeBar.knob.draggable.momentum = false;
      this.volumeBar.on("change:width", (function(_this) {
        return function() {
          return _this.volumeBar.value = _this.player.volume;
        };
      })(this));
      return this.volumeBar.on("change:value", (function(_this) {
        return function() {
          return _this.player.volume = _this.volumeBar.value;
        };
      })(this));
    };

    return AudioPlayer;

  })(Layer);

}).call(this);
