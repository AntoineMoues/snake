function game() {
  var snake = function(cross) {

    this.size = 15;

    this.x = Math.floor(Math.random()*(window.innerWidth/this.size))*this.size;
    this.y = Math.floor(Math.random()*(window.innerHeight/this.size))*this.size;

    this.posX = [this.x];
    this.posY = [this.y];

    this.backgroundColor = 'red';

    this.cross = cross;

    this.speed = this.size;

    this.direction = 'right';

    this.div = new Array();

    this.show = function() {
      for(var i = 0; i < this.posX.length; i++){
        if(this.div[i]){
          this.div[i].remove();
        }
        this.div[i] = document.createElement('div');
        this.div[i].style.left = this.posX[i] + 'px';
        this.div[i].style.top = this.posY[i] + 'px';
        this.div[i].style.width = this.size + 'px';
        this.div[i].style.height = this.size + 'px';
        this.div[i].style.backgroundColor = this.backgroundColor;
        document.querySelector('.snake-container').appendChild(this.div[i]);
      }
    }

    this.update = function() {
      var _this = this;
      window.setInterval(function(){
        var nextX = _this.posX[_this.posX.length-1];
        var nextY= _this.posY[_this.posY.length-1];
        if(_this.direction === 'up'){
          nextY -= _this.speed;
        } else if(_this.direction === 'right'){
          nextX += _this.speed;
        } else if(_this.direction === 'left'){
          nextX -= _this.speed;
        } else if(_this.direction === 'down'){
          nextY += _this.speed;
        }
        var eating = _this.eat(nextX,nextY);
        if(eating === false){
          _this.posX.splice(0,1);
          _this.posY.splice(0,1);
        } else if(eating === true){
          fruit.eaten();
        }
        _this.posX.push(nextX);
        _this.posY.push(nextY);
        _this.show();
        _this.shock();
      },100);
    }

    this.move = function() {
      var _this = this;
      window.addEventListener('keypress', function(e){
        if(e.keyCode === _this.cross[0]){
          _this.direction = 'up';
        } else if(e.keyCode === _this.cross[1]){
          _this.direction = 'right';
        } else if(e.keyCode === _this.cross[2]){
          _this.direction = 'left';
        } else if(e.keyCode === _this.cross[3]){
          _this.direction = 'down';
        }
      },false);

      this.shock = function() {
        for(var i=0; i<this.posX.length-1; i++){
          if(this.posX.length-1>0){
            if(this.posX[this.posX.length-1] === this.posX[i] && this.posY[this.posY.length-1] === this.posY[i]){
              window.alert('t\'es nul');
              window.location.reload();
            }
          }
        }
      }
    }

    this.eat = function(x,y) {
      if(x === fruit.x && y === fruit.y){
        return true;
      }
      else{
       return false;
     }
    }
  }

  var food = function() {
    this.size = 15;

    this.x = Math.floor(Math.random()*(window.innerWidth/this.size))*this.size;
    this.y = Math.floor(Math.random()*(window.innerHeight/this.size))*this.size;

    this.backgroundColor = 'yellow';

    this.div;

    this.show = function(){
      this.div = document.createElement('div');
      this.div.style.left = this.x + 'px';
      this.div.style.top = this.y + 'px';
      this.div.style.backgroundColor = this.backgroundColor;
      this.div.style.width = this.size + 'px';
      this.div.style.height = this.size + 'px';
      this.div.style.position = 'relative';
      document.querySelector('.snake-container').appendChild(this.div);
    }

    this.eaten = function(){

      this.div.remove();

      this.x = Math.floor(Math.random()*(window.innerWidth/this.size))*this.size;
      this.y = Math.floor(Math.random()*(window.innerHeight/this.size))*this.size;

      this.show();
    }
  }

  var zqsd = [122, 100, 113, 115];
  var fruit = new food();
  var first_snake = new snake(zqsd);
  fruit.show();
  first_snake.update();
  first_snake.move();
}
game();
