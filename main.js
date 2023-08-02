song="";
song1="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
song_name = "";

function preload()
{
    song = loadSound("music.mp3");
    song1 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;


        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log(`Left Wrist X = ${leftWristX} \n\ Left Wrist Y = ${leftWristY}`);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log(`Right Wrist X = ${rightWristX} \n\ Right Wrist Y = ${rightWristY}`);
    }
}

function modelLoaded()
{
    console.log("Model Loaded!");
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#ff0000");
    stroke("#ff0000");

    song_name = song.isPlaying();

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWrist_x, leftWrist_y, 20);
        song1.stop();
        
        if(song == false)
        {
            song.play();
            document.getElementById("song_id").innerHTML = "Song Name - Song 1";
        }
    }
}