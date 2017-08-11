window.onload = function () {
    var socket = io.connect('http://localhost:8080');
    var textarea = document.querySelector("textarea");
    var copyButton = document.getElementById("copyButton");
    socket.on('message', function (data) {
        if (data.message) {
            console.log('connected');
        } else {
            console.log("There is a problem:", data);
        }
    });
    socket.on('content', function (data) {
        if (data.content) {
            // content.innerHTML = "html";
            textarea.value = data.content;
        } else {
            console.log("There is a problem:", data);
        }
    });
    copyButton.onclick = function () {
        textarea.select();
        document.execCommand("copy");
    };
}
