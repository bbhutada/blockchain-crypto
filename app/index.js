/**
 * User: bhagyashributada
 */

'use strict';

const
    express = require( 'express' ),
    bodyparser = require( 'body-parser' ),
    {P2pServer} = require( './p2p-server' ),
    {Blockchain} = require( '../blockchain' ),
    HTTP_PORT = process.env.HTTP_PORT || 3000,
    app = express(),
    bc = new Blockchain(),
    p2pServer = new P2pServer( bc );

app.use( bodyparser.json() );

app.get( '/blockchain', ( req, res ) => {
    res.json( bc.chain );
} );

app.post( '/mine', ( req, res ) => {
    const addedBlock = bc.addBlock( req.body.data );
    console.log( `Added a new block : ${addedBlock}` );

    p2pServer.syncChains();
    res.redirect( '/blockchain' );
} );

app.listen( HTTP_PORT, () => console.log( `Listening on port ${HTTP_PORT}` ) );
p2pServer.listen();