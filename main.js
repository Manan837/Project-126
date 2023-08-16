song="";
song1="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
song_song = "";
song_song1 = "";
w = "";

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload()
{
    song = loadSound("music.mp3");
    song1 = loadSound("music2.mp3");
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#ff0000");
    stroke("#ff0000");

    song_song = song.isPlaying();
    console.log(song_song);
       
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        
        if(song_song == false)
        {
            song.play();
            document.getElementById("song_name").innerHTML = "Song Name - Song 1";
        }
    }
    
    song_song1 = song1.isPlaying();
    console.log(song_song1);

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song.stop();

        if (song_song1 == false)
        {
            song1.play();
            document.getElementById("song_name").innerHTML = "Song Name - Song 2";
        }
    }
}

function modelLoaded()
{
    console.log("Model Loaded!");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log(`Left Wrist X = ${leftWristX} Left Wrist Y = ${leftWristY}`);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log(`Right Wrist X = ${rightWristX} Right Wrist Y = ${rightWristY}`);
    }
}
