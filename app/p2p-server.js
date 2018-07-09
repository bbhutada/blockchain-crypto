/**
 * User: bhagyashributada
 */

'use strict';

const
    Websocket = require( 'ws' ),
    P2P_PORT = process.env.P2P_PORT || 5000,
    PEERS = process.env.PEERS ? process.env.PEERS.split( ',' ) : [];

// Provide environment variables (Reference)- $ HTTP_PORT=3000 P2P_PORT=5000 PEERS=ws://localhost:5000,ws://localhost:5001 npm run dev

class P2pServer {

    constructor( blockchain ) {
        this.blockchain = blockchain;
        this.sockets = [];
    }

    listen() {
        const
            server = new Websocket.Server( {port: P2P_PORT} );

        server.on( 'connection', socket => this.connectSocket( socket ) );

        this.connectToPeers();

        console.log( `Listening for P2P connections on port: ${P2P_PORT}` );
    }

    connectToPeers() {
        PEERS.forEach( peer => {
            const
                ws = new Websocket( peer );

            ws.on( 'open', () => this.connectSocket( ws ) );
        } );
    }

    connectSocket( socket ) {
        this.sockets.push( socket );
        console.log( "Websocket Connected" );

        this.messageHandler( socket );

        this.sendChain( socket );
    }

    messageHandler( socket ) {
        socket.on( 'message', message => {
            const data = JSON.parse( message );
            this.blockchain.replaceChain( data );
        } );
    }

    sendChain( socket ) {
        socket.send( JSON.stringify( this.blockchain.chain ) );
    }

    syncChains() {
        this.sockets.forEach( socket => this.sendChain( socket ) );
    }
}

module.exports = {P2pServer};