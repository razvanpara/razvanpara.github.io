'use strict';

// Put variables in global scope to make them available to the browser console.
var video = document.querySelector('video');
var constraints = window.constraints = {
    audio: false,
    video: true
};
var errorElement = document.querySelector('#errorMsg');

navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {
        var videoTracks = stream.getVideoTracks();
        console.log('Got stream with constraints:', constraints);
        console.log('Using video device: ' + videoTracks[0].label);
        stream.onremovetrack = function () {
            console.log('Stream ended');
        };
        window.stream = stream; // make variable available to browser console
        video.srcObject = stream;
    })
    .catch(function (error) {
        if (error.name === 'ConstraintNotSatisfiedError') {
            errorMsg('The resolution ' + constraints.video.width.exact + 'x' +
                constraints.video.height.exact + ' px is not supported by your device.');
        } else if (error.name === 'PermissionDeniedError') {
            errorMsg('Permissions have not been granted to use your camera and ' +
                'microphone, you need to allow the page access to your devices in ' +
                'order for the demo to work.');
        }
        errorMsg('getUserMedia error: ' + error.name, error);
    });

function errorMsg(msg, error) {
    errorElement.innerHTML += '<p>' + msg + '</p>';
    if (typeof error !== 'undefined') {
        console.error(error);
    }
}


const captureEvent = (event) => {
    const captureList = document.getElementById("captures");
    const listElement = document.createElement("div");
    listElement.style.float = "left";
    listElement.appendChild(getScreenshot())
    captureList.appendChild(listElement);
}

const getScreenshot = () => {
    const canvas = document.createElement("canvas");
    canvas.height = 240;
    canvas.width = 320;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0,320,240);
    return canvas;
}