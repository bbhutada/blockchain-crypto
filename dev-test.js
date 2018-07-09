/**
 * User: bhagyashributada
 */
'use strict';
// Difficulty test

const
    {Blockchain} = require( './blockchain' ),
    bc = new Blockchain();

for( let i = 0; i < 10; i++ ) {
    console.log( bc.addBlock( `${i} Block` ));
}