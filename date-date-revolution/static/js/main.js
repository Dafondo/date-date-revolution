$(document).ready(function() {
    var duration = 10000;
    var dancing = false;
    var timelimit = + new Date();
    var timeoffset = + new Date();
    var prevState = [];
    var canvas = document.getElementById('dance-canvas');
    var ctx = canvas.getContext('2d');
    var json = {
      data: []
    };
    // var mcanvas = document.getElementById('match-canvas');
    // var mctx = mcanvas.getContext('2d');
    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeCanvas, false);

    function loadImages(arr) {
      this.images = {};
      var loadedImageCount = 0;
  
      // Make sure arr is actually an array and any other error checking
      for (var i = 0; i < arr.length; i++){
          var img = new Image();
          img.onload = imageLoaded;
          img.src = arr[i];
          this.images[arr[i]] = img;
      }
  
      function imageLoaded(e) {
          loadedImageCount++;
      }
    }

    var loader = loadImages(['/static/images/redu.png', '/static/images/redr.png', '/static/images/redd.png', '/static/images/redl.png', '/static/images/redul.png', '/static/images/redur.png']);

    function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            /**
             * Your drawings need to be inside this function otherwise they will be reset when 
             * you resize the browser window and the canvas goes will be cleared.
             */
            var img = new Image();
            img.addEventListener('load', function() {
                ctx.drawImage(img, canvas.width/2-240, canvas.height/2-240);
            }, false);
            img.src = '/static/images/redd.png';
    }

    resizeCanvas();


    var haveEvents = 'ongamepadconnected' in window;
    var controllers = {};
    
    function connecthandler(e) {
      addgamepad(e.gamepad);
    }
    
    function addgamepad(gamepad) {
      controllers[gamepad.index] = gamepad;
    
      // // See https://github.com/luser/gamepadtest/blob/master/index.html
      // var start = document.getElementById("start");
      // if (start) {
      //   start.style.display = "none";
      // }

      // requestAnimationFrame(updateStatus);
    }
    
    function disconnecthandler(e) {
      removegamepad(e.gamepad);
    }
    
    function removegamepad(gamepad) {
      delete controllers[gamepad.index];
    }
    
    function endDancing() {
      var jsonstr = JSON.stringify(json);
      jsonURL = URL.createObjectURL(new Blob([jsonstr]));
      $("#dl").attr("href", jsonURL);
      // $.ajax({
      //     url : 'http://localhost:5000/post',
      //     data: jsonstr,
      //     type: 'POST'
      // })
      // $.post('localhost:5000/post');
    }

    function updateStatus() {
      dancing = true;
      if (!haveEvents) {
        scangamepads();
      }
    
      var i = 0;
      var j;
    
      for (j in controllers) {
        var controller = controllers[j];
    
        for (i = 0; i < controller.buttons.length; i++) {
          var val = controller.buttons[i];
          var pressed = val == 1.0;
          if (typeof(val) == "object") {
            pressed = val.pressed;
            val = val.value;
          }
    
          var arrow = document.getElementById("arrow");

          timerec = + new Date() - timeoffset;
    
          if (pressed && prevState[i] != 1) {
            prevState[i] = 1;
            if(i == 0) {
              console.log(timerec + " 0 1");
              json.data.push({time: timerec, button: 0, state: 1});
              var img = new Image();
              img.addEventListener('load', function() {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  ctx.drawImage(img, canvas.width/2-240, canvas.height/2-240);
              }, false);
              img.src = "/static/images/redu.png";
            }
            else if(i == 3) {
              console.log(timerec + " 1 1");
              json.data.push({time: timerec, button: 1, state: 1});
              var img = new Image();
              img.addEventListener('load', function() {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  ctx.drawImage(img, canvas.width/2-240, canvas.height/2-240);
              }, false);
              img.src = "/static/images/redr.png";
            }
            else if(i == 1) {
              console.log(timerec + " 2 1");
              json.data.push({time: timerec, button: 2, state: 1});
              var img = new Image();
              img.addEventListener('load', function() {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  ctx.drawImage(img, canvas.width/2-240, canvas.height/2-240);
              }, false);
              img.src = "/static/images/redd.png";
            }
            else if(i == 2) {
              console.log(timerec + " 3 1");
              json.data.push({time: timerec, button: 3, state: 1});
              var img = new Image();
              img.addEventListener('load', function() {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  ctx.drawImage(img, canvas.width/2-240, canvas.height/2-240);
              }, false);
              img.src = "/static/images/redl.png";
            }
            else if(i == 6) {
              console.log(timerec + " 4 1");
              json.data.push({time: timerec, button: 4, state: 1});
              var img = new Image();
              img.addEventListener('load', function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, canvas.width/2-240, canvas.height/2-240);
              }, false);
              img.src = "/static/images/redul.png";
            }
            else if(i == 7) {
              console.log(timerec + " 5 1");
              json.data.push({time: timerec, button: 5, state: 1});
              var img = new Image();
              img.addEventListener('load', function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, canvas.width/2-240, canvas.height/2-240);
              }, false);
              img.src = "/static/images/redur.png";
            }
            // else {
            //   console.log("button " + i + ": button pressed");
            // } 
          }
          else if(!pressed && prevState[i] != 0) {
            prevState[i] = 0;
            if(i == 0) {
              console.log(timerec + " 0 0");
              json.data.push({time: timerec, button: 0, state: 0});
            }
            else if(i == 3) {
              console.log(timerec + " 1 0");
              json.data.push({time: timerec, button: 1, state: 0});
            }
            else if(i == 1) {
              console.log(timerec + " 2 0");
              json.data.push({time: timerec, button: 2, state: 0});
            }
            else if(i == 2) {
              console.log(timerec + " 3 0");
              json.data.push({time: timerec, button: 3, state: 0});
            }
            else if(i == 6) {
              console.log(timerec + " 4 0");
              json.data.push({time: timerec, button: 4, state: 0});
            }
            else if(i == 7) {
              console.log(timerec + " 5 0");
              json.data.push({time: timerec, button: 5, state: 0});
            }
            // else {
            //   console.log("button " + i + ": button not pressed");
            // } 
          }
        }
      }
      if(+ new Date() < timelimit) {
        requestAnimationFrame(updateStatus);
      }
      else {
        dancing = false;
        endDancing();
      }
    } 
    
    function scangamepads() {
      var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
      for (var i = 0; i < gamepads.length; i++) {
        if (gamepads[i]) {
          if (gamepads[i].index in controllers) {
            controllers[gamepads[i].index] = gamepads[i];
          } else {
            addgamepad(gamepads[i]);
          }
        }
      }
    }
    
    window.addEventListener("gamepadconnected", connecthandler);
    window.addEventListener("gamepaddisconnected", disconnecthandler);
    
    if (!haveEvents) {
      setInterval(scangamepads, 500);
    }

    function scanstart() {
      if(controllers[0]) {
        if(controllers[0].buttons[9].pressed) {
          update();
        }
      }
    }

    if(!dancing) {
      setInterval(scanstart, 500);
    }

    function update() {
      timelimit = + new Date() + duration;
      timeoffset = timelimit - duration;
      console.log(0);
      updateStatus();
    }

    $("#start-btn").on("click", update);
});