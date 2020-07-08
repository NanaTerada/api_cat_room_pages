'use strict'

{
    
    

    const timezone = document.getElementById('timezone');
    const weather =  document.getElementById('weather');
    const flower = document.getElementById('flower');
    const flame = document.getElementById('flame');
    const hex = document.getElementById('hex');
    const catgirl = document.getElementById('catgirl');
    const background00 = document.getElementById('backgroung00');
    const background01 = document.getElementById('backgroung01');
    const background02 = document.getElementById('backgroung02');
    const wrapper = document.getElementById('wrapper');



    background00.addEventListener('click',() =>{
        wrapper.style.backgroundImage = "url(./img/kabegami10.png)";
        flame.src="./img/curtain04.png";
       
    });

    background01.addEventListener('click',() =>{
        wrapper.style.backgroundImage = "url(./img/kabegami09.png)";
        flame.src="./img/curtain01.png";
        
    });

    background02.addEventListener('click',() =>{
        wrapper.style.backgroundImage = "url(./img/kabegami06.png)";
        flame.src="./img/curtain03.png";
    });


    
    



    function docatgirl(d,hour,mins,secs) {
        if( hour >= 5 && hour < 12) {
            // catgirl.src = 'img/catgirl-morning.png';
            catgirl.src = 'img/cat-night.GIF';
        }  else if( hour >= 12 && hour < 20) {
            // catgirl.src = 'img/catgirl-noon.png';
            catgirl.src = 'img/cat-noon.GIF';
        } else{
            catgirl.src = 'img/cat-night.GIF';
        }
    
        // setTimeout(docatgirl,1000);

    }


function timezoneChange(d,hour,mins,secs) {
    if( hour >= 5 && hour < 12) {
        timezone.src = 'img/hours09.png';
    }  else if( hour >= 12 && hour < 17) {
        timezone.src = 'img/hours12.png';
    } else if( hour >= 17 && hour < 20) {
        timezone.src = 'img/hours13.png';
    } else {

        timezone.src = 'img/hours05.png';
    }

    // setTimeout(timezoneChange,1000);
}


function weatherChange(d,hour,mins,secs) {
    $.ajax ({
        // url: "http://001.local/api/",
        http: "http://puffin.php.xdomain.jp/api/",
        dataType:"jsonp",
        jsonpCallback: 'callback',
        success: function($weather) {
            console.log($weather)   
            if($weather === "Sunny" || $weather === "clear"){
                // $('body').css('background-image', 'url(img/sunny.png)');
                weather.src = "img/sunny00.png";

            } else if ($weather === "Clouds") {
                // $('body').css('background-image', 'url(img/cloudy.png)');
                weather.src = "img/cloudy00.png";
            }

            else if ($weather === "Rain") {
                
                weather.src = "img/rain00.png";
            }

            else if ($weather === "Mist") {
                alert('mist');
                weather.src = "img/rain00.png";
            }

        }

    });

    // setTimeout(weatherChange,1000);

}





function dotime(d,hour,mins,secs) {




    if( hour < 10){ hour = "0" + hour};
    if( mins < 10){ mins = "0" + mins};
    if( secs < 10){ secs = "0" + secs};
    
    hour.toString();
    mins.toString();
    secs.toString();

    console.log(hour);
    console.log(mins);
    console.log(secs);

    let hexNum = '#' + hour + mins + secs;

    flower.style.background = hexNum;
    hex.textContent = `#${hour}${mins}${secs}`;

    

    // setTimeout(dotime,1000);

}

function loop() {

    let d = new Date();
    let hour = d.getHours();
    let mins = d.getMinutes();
    let secs = d.getSeconds();

    docatgirl(d,hour,mins,secs);

    // weatherChange(d,hour,mins,secs);

    timezoneChange(d,hour,mins,secs);

    dotime(d,hour,mins,secs);


    setTimeout(loop,1000);
}

function loopHour() {

    let d = new Date();
    let hour = d.getHours();
    let mins = d.getMinutes();
    let secs = d.getSeconds();


    weatherChange(d,hour,mins,secs);

    setTimeout(loopHour,3600000);
}


loop();
loopHour();
    






(() => {
    // クラス
    class ClockDrawer {
        constructor(canvas) {
            this.ctx = canvas.getContext('2d');
            this.width = canvas.width;
            this.height = canvas.height;
        }

        draw(angle,func) {
            this.ctx.save(); //次のループの時に座標空間をもどしたいので

            //原点をキャンバスの中心に移動させる
            this.ctx.translate(this.width / 2, this.height / 2);
            this.ctx.rotate(2 * Math.PI / 360 * angle); //アングルをラジアンに変換しつつ。。。？

            //細い線を描いていく
            this.ctx.beginPath();
            
            func(this.ctx);
            
            this.ctx.stroke(); //線をひく

            this.ctx.restore();//次のループの時に座標空間をもどしたいので

            

        }

        clear() {
            this.ctx.clearRect(0,0,this.width,this.height);
        }

    }

    class Clock {
            constructor(drawer) {
                // this.r = 100;
                this.r = 80;

                this.drawer = drawer ;

                
            }

            // 時計の盤面を描画するメソッド
            drawFace() {
                // 360 / 60 = 6 6度ずつ回転しながら描画
                for (let angle = 0; angle <360; angle += 6) {
                    this.drawer.draw(angle,ctx => {
                        ctx.moveTo(0,-this.r); //中心から半径の位置まで　-this.r←マイナス方向に半径分

                    if (angle % 30=== 0) {
                        ctx.lineWidth = 2;
                        ctx.lineTo(0,-this.r + 10);
                        ctx.font = '13px Arial'
                        ctx.textAlign = 'center';
                        ctx.fillText(angle/ 30 || 12,0,-this.r + 25); //|| 12 falseだったら12を使いなさい

                    } else {
                        ctx.lineTo(0,-this.r + 5); //線の長さ
                    }

                    });
                   
                } 

               
            }

            
         

            // 時計の針を描画
           
            drawHands() {
                 //hour
                this.drawer.draw(this.h * 30 +this.m * 0.5, ctx => { //回転の角度とctxを渡す
                    ctx.lineWidth = 6;
                    ctx.moveTo(0,10);
                    ctx.lineTo(0,-this.r + 50);

                });
                //minute
                this.drawer.draw(this.m *6, ctx => { //回転の角度とctxを渡す
                    ctx.lineWidth = 4;
                    ctx.moveTo(0,10);
                    ctx.lineTo(0,-this.r + 30);

                });

                //second
                this.drawer.draw(this.s *6, ctx => { //回転の角度とctxを渡す
                    ctx.strokeStyle = 'red';
                    ctx.moveTo(0,20);
                    ctx.lineTo(0,-this.r + 20);

                });
            }

            update() {
                //現在時刻を取得しておく
                this.h = (new Date()).getHours();
                this.m = (new Date()).getMinutes();
                this.s = (new Date()).getSeconds();

            }

            run() {
                this.update();

                this.drawer.clear(); //前の秒針が残らないようにするため
                this.drawFace();
                this.drawHands();

             


                setTimeout( ()=> {
                    this.run();
                },100);

            }
    }

                const canvas = document.querySelector('canvas');
                
                if (typeof canvas.getContext === 'undefined') {
                    return;
                }

    // インスタンス
    const clock = new Clock(new ClockDrawer(canvas));
    clock.run();

})();


}