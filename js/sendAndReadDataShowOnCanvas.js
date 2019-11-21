const delay = 250;
const lengthOfRod = 50;
const extentOfCanvas = 500;
const middleOfCanvas = extentOfCanvas / 2;
const circleDiameter = 5;
const clearExtent = extentOfCanvas + circleDiameter;
var deviceorientationAlpha;
var deviceorientationBeta;
var deviceorientationGamma;
var devicemotionAccelerationX;
var devicemotionAccelerationY;
var devicemotionAccelerationZ;
var devicemotionRotation;
var devicemotionRotationAlpha;
var devicemotionRotationBeta;
var devicemotionRotationGamma;

<!-- instead of localhost I have used hostname on the current host to set some name -->

<!-- But we have to work with port forwarding or deploy the server on Heroku or something like that and then refer to that host instead.... -->
function postSensorData() {
    fetch('http://MacBook-Pro-2.local:8080/kalman/sensorData',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "deviceorientationAlpha": deviceorientationAlpha,
                "deviceorientationBeta": deviceorientationBeta,
                "deviceorientationGamma": deviceorientationGamma,
                "devicemotionAccelerationX": devicemotionAccelerationX,
                "devicemotionAccelerationY": devicemotionAccelerationY,
                "devicemotionAccelerationZ": devicemotionAccelerationZ,
                "devicemotionRotationAlpha": devicemotionRotationAlpha,
                "devicemotionRotationBeta": devicemotionRotationBeta,
                "devicemotionRotationGamma": devicemotionRotationGamma
            })
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => console.error(error));
}

function showDirectionRod(ctx) {
    var angle = deviceorientationAlpha;
    ctx.fillStyle = "#3B0000";
    ctx.moveTo(middleOfCanvas, middleOfCanvas);
    ctx.beginPath();
    ctx.arc(middleOfCanvas, middleOfCanvas, 10, 0, 2 * Math.PI, false);
    ctx.moveTo(middleOfCanvas, middleOfCanvas);
    ctx.lineTo(middleOfCanvas + lengthOfRod * Math.cos(angle), middleOfCanvas + lengthOfRod * Math.sin(angle));
    ctx.stroke();
}

function showPoint(point, ctx) {
    var adjustedX = Math.max(point.x, circleDiameter);
    var adjustedY = Math.max(point.y, circleDiameter);
    ctx.beginPath();
    ctx.arc(adjustedX, adjustedY, circleDiameter, 0, 2 * Math.PI, false);
    ctx.fill();
}

function outputRepliedPoints(points) {
    var ctx = document.getElementById("outputCanvas").getContext("2d");
    ctx.clearRect(0, 0, clearExtent, clearExtent);

    var i = 1;
    var j = 1;

    function setFillStyleColor() {
        ctx.fillStyle = 'rgb(' + Math.floor(255 - 10.5 * i) + ', ' +
            Math.floor(255 - 62.5 * j) + ', 50)';
        i++;
        j++;
    }

    points.forEach((point) => {
        setFillStyleColor();
        showPoint(point, ctx);
    });
    showDirectionRod(ctx);
}

function fetchPoints() {
    fetch('http://MacBook-Pro-2.local:8080/kalman/randomScaledRelativeList?scale=50&min=0&max=500')
        .then(response => response.json())
        .then(points => {
            console.log(points);
            outputRepliedPoints(points);
        })
        .catch(error => console.error(error))
}

function sendAndFetchPoints() {
    postSensorData();
    fetchPoints();
}

function listenOnDeviceOrientation() {
    //Check for support for DeviceOrientation event
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function (event) {
            deviceorientationAlpha = event.alpha;
            deviceorientationBeta = event.beta;
            deviceorientationGamma = event.gamma;
        }, false);
    }
}

function listenOnDeviceMotion() {
    // Check for support for DeviceMotion events
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', function (event) {
            devicemotionAccelerationX = event.accelerationIncludingGravity.x;
            devicemotionAccelerationY = event.accelerationIncludingGravity.y;
            devicemotionAccelerationZ = event.accelerationIncludingGravity.z;
            devicemotionRotation = event.rotationRate;
            devicemotionRotationAlpha = devicemotionRotation.alpha;
            devicemotionRotationBeta = devicemotionRotation.beta;
            devicemotionRotationGamma = devicemotionRotation.gamma;
        });
    }
}

function listenOnDevice() {
    listenOnDeviceOrientation();
    listenOnDeviceMotion();
}

function setSendAndReadIntervals() {
    setInterval(function () {
            sendAndFetchPoints();
        },
        delay);
}

function init() {
    listenOnDevice();
    setSendAndReadIntervals();
}