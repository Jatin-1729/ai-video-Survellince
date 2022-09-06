video ="" ;
model_status ="";
object = [];

function preload(){
video = createVideo("video.mp4");
video.hide();
}

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
}

function draw(){
    image(video,0,0,480,380);

    if(model_status != ""){
        objectDetector.detect(video,gotResult);
        for(i = 0 ; i < object.length ; i++)
        {
          document.getElementById("status").innerHTML = "status: Object Detected";
          document.getElementById("number_obj").innerHTML = "Number Of Objects Detected Are:" + object.length ;
          fill("green");
          persentage = floor(object[i].confidence*100);
          text(object[i].label+" "+persentage+"%",object[i].x , object[i].y); 
          noFill();
          stroke("#ff0000");
          rect(object[i].x , object[i].y , object[i].width , object[i].height);
        }
    } 
}

function Start(){
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting The Object";
}

function modelLoaded(){
    console.log("cocossd model is loaded");
    model_status = true ;
    video.loop();
    video.speed(1);
    video.volume(1);
}

function gotResult(error,result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        object = result;
    }
}

