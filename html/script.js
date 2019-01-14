var ws = new WebSocket('ws://' + window.location.hostname + ':1337');

ws.onmessage = function (event) {
    console.log(event.data);
};

function btdown(key){
    ws.send("1"+key)
}

function btup(key){
    ws.send("0"+key)
}