/*=============================================================================*/  
/* Canvas Lightning v1
/*=============================================================================*/
export var canvasLightning = function(c, cw, ch){
  
/*=============================================================================*/  
/* Initialize
/*=============================================================================*/
  this.init = function(){
    this.loop();
  };    
  
/*=============================================================================*/  
/* Variables
/*=============================================================================*/
  var _this = this;
  this.c = c;
  this.ctx = c.getContext('2d');
  this.cw = cw;
  this.ch = ch;
  this.mx = 0;
  this.my = 0;
  
  this.lightning = [];
  this.lightTimeCurrent = 0;
  this.lightTimeTotal = 50;
  
/*=============================================================================*/  
/* Utility Functions
/*=============================================================================*/        
this.rand = function(rMi, rMa){return ~~((Math.random()*(rMa-rMi+1))+rMi);};
this.hitTest = function(x1, y1, w1, h1, x2, y2, w2, h2){return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1);};
  
/*=============================================================================*/ 
/* Create Lightning
/*=============================================================================*/
  this.createL= function(x, y, canSpawn){         
    this.lightning.push({
      x: x,
      y: y,
      xRange: this.rand(5, 30),
      yRange: this.rand(5, 25),
      path: [{
        x: x,
        y: y  
      }],
      pathLimit: this.rand(10, 35),
      canSpawn: canSpawn,
      hasFired: false
    });
  };
  
/*=============================================================================*/ 
/* Update Lightning
/*=============================================================================*/
  this.updateL = function(){
    var i = this.lightning.length;
    while(i--){
      var light = this.lightning[i];            
      
      
      light.path.push({
        x: light.path[light.path.length-1].x + (this.rand(0, light.xRange)-(light.xRange/2)),
        y: light.path[light.path.length-1].y + (this.rand(0, light.yRange))
      });
      
      if(light.path.length > light.pathLimit){
        this.lightning.splice(i, 1)
      }
      light.hasFired = true;
    };
  };
  
/*=============================================================================*/ 
/* Render Lightning
/*=============================================================================*/
  this.renderL = function(){
    var i = this.lightning.length;
    while(i--){
      var light = this.lightning[i];
      
      this.ctx.strokeStyle = 'hsla(0, 100%, 100%, '+this.rand(10, 100)/100+')';
      this.ctx.lineWidth = 1;
      if(this.rand(0, 30) == 0){
        this.ctx.lineWidth = 2; 
      }
      if(this.rand(0, 60) == 0){
        this.ctx.lineWidth = 3; 
      }
      if(this.rand(0, 90) == 0){
        this.ctx.lineWidth = 4; 
      }
      if(this.rand(0, 120) == 0){
        this.ctx.lineWidth = 5; 
      }
      if(this.rand(0, 150) == 0){
        this.ctx.lineWidth = 6; 
      } 
      
      this.ctx.beginPath();
      
      var pathCount = light.path.length;
      this.ctx.moveTo(light.x, light.y);
      for(var pc = 0; pc < pathCount; pc++){  
        
        this.ctx.lineTo(light.path[pc].x, light.path[pc].y);
        
        if(light.canSpawn){
          if(this.rand(0, 100) == 0){
            light.canSpawn = false;
            this.createL(light.path[pc].x, light.path[pc].y, false);
          } 
        }
      }
      
      this.ctx.stroke();
    };
  };
  
/*=============================================================================*/ 
/* Lightning Timer
/*=============================================================================*/
  this.lightningTimer = function(){
    this.lightTimeCurrent++;
    if(this.lightTimeCurrent >= this.lightTimeTotal){
      var newX = this.mx !== 0 || this.my !== 0 ? this.mx : this.rand(100, cw - 100);
      var newY = this.mx !== 0 || this.my !== 0 ? this.mx : this.rand(0, ch / 2); 
      var createCount = this.rand(3, 10);
      while(createCount--){             
        this.createL(newX, newY, true);
      }
      this.mx = 0;
      this.my = 0;
      this.lightTimeCurrent = 0;
      this.lightTimeTotal = this.rand(20, 70);
    }
  }
    
/*=============================================================================*/ 
/* Clear Canvas
/*=============================================================================*/
    this.clearCanvas = function(){
      this.ctx.globalCompositeOperation = 'destination-out';
      this.ctx.fillStyle = 'rgba(0,0,0,'+this.rand(1, 30)/100+')';
      this.ctx.fillRect(0,0,this.cw,this.ch);
      this.ctx.globalCompositeOperation = 'source-over';
    };
  
/*=============================================================================*/ 
/* Resize on Canvas on Window Resize
/*=============================================================================*/

/*$(window).on('resize', function(){
  _this.cw = _this.c.width = window.innerWidth
  _this.ch = _this.c.height = window.innerHeight
});*/

window.addEventListener('resize', () => {
  _this.cw = _this.c.width = window.innerWidth;
  _this.ch = _this.c.height = window.innerHeight;
});
    
/*=============================================================================*/ 
/* Animation Loop
/*=============================================================================*/
  this.loop = function(){
        var loopIt = function(){
      requestAnimationFrame(loopIt, _this.c);
      _this.clearCanvas();
      _this.updateL();
      _this.lightningTimer();
      _this.renderL();  
    };
    loopIt();         
  };
  
};

/*=============================================================================*/ 
/* Check Canvas Support
/*=============================================================================*/
var isCanvasSupported = function(){
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
};

/*=============================================================================*/ 
/* Setup requestAnimationFrame
/*=============================================================================*/
var setupRAF = function(){
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x){
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  };
  
  if(!window.requestAnimationFrame){
    window.requestAnimationFrame = function(callback, element){
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  };
  
  if (!window.cancelAnimationFrame){
    window.cancelAnimationFrame = function(id){
      clearTimeout(id);
    };
  };
};      

/*=============================================================================*/ 
/* Define Canvas and Initialize
/*=============================================================================*/

/*
if(isCanvasSupported){
    var c = document.getElementsByClassName('canvas');
    var cw = c.width = window.innerWidth;
    var ch = c.height = window.innerHeight;
    var cl = new canvasLightning(c, cw, ch);        
    
    setupRAF();
    cl.init();
}
*/
