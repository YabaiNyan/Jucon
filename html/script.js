var ws = new WebSocket('ws://' + window.location.hostname + ':1337');

ws.onmessage = function (event) {
    console.log(event.data);
};

function btdown(key){
    ws.send("1"+keydict[key])
}

function btup(key){
    ws.send("0"+keydict[key])
}

var keydict = {
    "a": "d",
    "b": "f",
    "c": "j",
    "d": "k",
    "fxa": "c",
    "fxb": "m",
    "start": "1"
};