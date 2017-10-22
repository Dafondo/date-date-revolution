$(document).ready(function() {
    var timelimit = + new Date();
    var prevState = [0, 0, 0, 0, 0, 0, 0];
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
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
    
    function updateStatus() {
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
    
          if (pressed && prevState[i] == 0) {
            if(i == 0) {
              console.log(+ new Date() + " 0");
              var img = new Image();
              img.addEventListener('load', function() {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  ctx.drawImage(img, canvas.width/2-240, canvas.height/2-240);
              }, false);
              img.src = "/static/images/redu.png";
            }
            else if(i == 3) {
              console.log(+ new Date() + " 1");
              var img = new Image();
              img.addEventListener('load', function() {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  ctx.drawImage(img, canvas.width/2-240, canvas.height/2-240);
              }, false);
              img.src = "/static/images/redr.png";
            }
            else if(i == 1) {
              console.log(+ new Date() + " 2");
              var img = new Image();
              img.addEventListener('load', function() {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  ctx.drawImage(img, canvas.width/2-240, canvas.height/2-240);
              }, false);
              img.src = "/static/images/redd.png";
            }
            else if(i == 2) {
              console.log(+ new Date() + " 3");
              var img = new Image();
              img.addEventListener('load', function() {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  ctx.drawImage(img, canvas.width/2-240, canvas.height/2-240);
              }, false);
              img.src = "/static/images/redl.png";
            }
            else if(i == 6) {
              console.log(+ new Date() + " 4");
              var img = new Image();
              img.addEventListener('load', function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, canvas.width/2-240, canvas.height/2-240);
              }, false);
              img.src = "/static/images/redul.png";
            }
            else if(i == 7) {
              console.log(+ new Date() + " 5");
              var img = new Image();
              img.addEventListener('load', function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, canvas.width/2-240, canvas.height/2-240);
              }, false);
              img.src = "/static/images/redur.png";
            }
            else {
              console.log("button " + i + ": button pressed");
            } 
            prevState[i] = 1;
          }
          else {
            prevState[i] = 0;
          }
        }
      }
      if(+ new Date() < timelimit) {
        requestAnimationFrame(updateStatus);
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

    function update() {
      timelimit = + new Date() + 30000;
      console.log(timelimit - 30000);
      updateStatus();
    }

    $("#start-btn").on("click", update);
});