status = " ";
objects = [ ];
function preload()
{
sound = loadSound("alarm_clock.mp3");
}
function setup()
{
canvas = createCanvas(500,370);
canvas.center();

video = createCapture(VIDEO);
video.hide();

object_detector = ml5.objectDetector('cocossd' , modelLoaded);
document.getElementById("status_btn").innerHTML = "Status : Detecting Objects";
}
function draw()
{
image(video ,0,0,500,370);

if (status != " ")
{ 
r = random(255);
g = random(255);
b = random(255);
object_detector.detect(video , gotResults);
    for(var i = 0;i<objects.length;i++)
    {
    document.getElementById("status_btn").innerHTML = "Status : Objects Detected";
    document.getElementById("obj_btn").innerHTML = "Number of objects : " + objects.length;
    fill(r,g,b);
    noFill();
    stroke(r,g,b);
    accuracy = floor(objects[i].confidence * 100);
    text(objects[i].label + " " + accuracy + " % " , objects[i].x,objects[i].y);
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    
    if(objects[i].label == "person")
    {
        console.log(objects);

    }
    else{
        sound.play();
        sound.rate(1);
        sound.volume(1); 
       
    }
}
}

}
function modelLoaded()
{
    console.log("coco intialized");
    status = true;
    object_detector.detect(video , gotResults);
}
function gotResults(error , results)
{ if(error)
    {
    console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}
