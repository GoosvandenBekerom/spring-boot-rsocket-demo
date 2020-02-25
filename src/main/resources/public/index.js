const {
    RSocketClient,
    JsonSerializer,
    IdentitySerializer
} = require('rsocket-core');
const RSocketWebSocketClient = require('rsocket-websocket-client').default;
let client = undefined;

let total = 0;
let last20 = [];

let totalDOM = document.getElementById("total");
let last20DOM = document.getElementById("last-20");

function updateTotal(number) {
    total += number;
    totalDOM.innerHTML = total;
}

function updateLast20List(number) {
    last20.unshift(number);
    last20.length = Math.min(last20.length, 20);

    last20DOM.innerHTML = "";

    for (let i = 0; i < last20.length; i++) {
        let item = document.createElement("li");
        item.appendChild(document.createTextNode(last20[i]));
        last20DOM.appendChild(item);
    }
}

function main() {
    totalDOM = document.getElementById("total");
    last20DOM = document.getElementById("last-20");

    if (client !== undefined) {
        client.close();
        last20 = [];
        total = 0;
        totalDOM.innerHTML = total+"";
        last20DOM.innerHTML = "<li>No data received yet...</li>";
    }

    client = new RSocketClient({
        serializers: {
            data: JsonSerializer,
            metadata: IdentitySerializer
        },
        setup: {
            keepAlive: 60000,
            lifetime: 180000,
            dataMimeType: 'application/json',
            metadataMimeType: 'message/x.rsocket.routing.v0',
        },
        transport: new RSocketWebSocketClient({
            url: 'ws://localhost:8080/rsocket'
        }),
    });

    client.connect().subscribe({
        onComplete: socket => {
            socket.requestStream({
                metadata: String.fromCharCode('randomNumbers'.length) + 'randomNumbers',
            }).subscribe({
                onComplete: () => console.log('Stream of random numbers completed.'),
                onError: console.error,
                onNext: payload => {
                    let number = payload.data;
                    updateTotal(number);
                    updateLast20List(number);
                },
                onSubscribe: subscription => {
                    subscription.request(2147483647);
                },
            });
        },
        onError: console.error,
        onSubscribe: cancel => {
            /* call cancel() to abort */
        }
    });
}

document.addEventListener('DOMContentLoaded', main);
