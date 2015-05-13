// A library that wraps Peer JS functionality.
var PeerLib = (function() {
    // PRIVATE API

    var peer = null;
    var conn = null;
    var peerID = '';
    var appReceiveHandler = null;
    var incConnectHandler = null;

    function onOpenHandler(id) {
        console.log('My peer ID is: ' + id);
        console.log('http://www.rickyeh.com/minesweeper/?id=' + id);  //**DEBUGGING
        peerID = id;
    }

    function onConnectHandler(c) {
        console.log(peerID + ' received a connection.');
        conn = c; // save it around so we can start talking!
        setupConnection();
        if (incConnectHandler !== null) {
            incConnectHandler();
        }
    }

    // This function is called when a remote peer sends us data!
    function onDataReceivedHandler(data) {
        console.log(peerID + ' received data: ' + data);
        if (appReceiveHandler !== null) {
            appReceiveHandler(data);
        }
    }

    function onConnectionOpenHandler() {
        conn.on('data', onDataReceivedHandler); // bind the receive handler
    }

    function setupConnection() {
        conn.on('open', onConnectionOpenHandler);
    }

    function setup(apiKey) {
        peer = new Peer({
            key: apiKey
        });

        // When the peer is ready, I'll be able to access its ID.
        // Some other peer will have to call connect with my ID.
        peer.on('open', onOpenHandler);

        // Incoming connection from a remote peer.
        peer.on('connection', onConnectHandler);
    }

    function getPeerID() {
        return peerID;
    }

    // Only one peer needs to call this.
    // It will set up a 2-way connection between the two peers.
    function connect(peerID) {
        conn = peer.connect(peerID);
        setupConnection();
    }

    // External app code must set this handler!
    function setReceiveHandler(callback) {
        appReceiveHandler = callback;
    }

    // External app passes in function to be called when connection is received
    function setIncConnectHandler(callback) {
        incConnectHandler = callback;
    }

    function send(data) {
        if (conn === null) { // If connection does not exist, ignore the sending
            return;
        }
        console.log(peerID + ' sending data: ' + data);
        conn.send(data);
    }

    // clean up
    function disconnect() {
        conn.close();
        peer.disconnect();
        conn = null;
        peer = null;
        console.log('Disconnected!');
    }

    return { // PUBLIC API
        setup: setup,
        setReceiveHandler: setReceiveHandler,
        setIncConnectHandler : setIncConnectHandler,
        getPeerID: getPeerID,
        connect: connect,
        send: send,
        disconnect: disconnect
    };
})();
