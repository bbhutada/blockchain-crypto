/**
 * User: bhagyashributada
 */

'use strict';

const
    {Block} = require( './block' );

describe( 'Block', () => {
    let
        data,
        previousBlock,
        block;

    beforeEach( () => {
        data = 'BlockChain';
        previousBlock = Block.genesis();
        block = Block.mineBlock( previousBlock, data );
    } );

    it( 'Sets block `data` to match the input data', () => {
        expect( block.data ).toEqual( data );
    } );

    it( 'Sets block `lastHash` to match the hash of the previous block', () => {
        expect( block.lastHash ).toEqual( previousBlock.hash );
    } );

    it( 'It generates the hash that matches the difficulty', () => {
        expect( block.hash.substring( 0, block.difficulty ) ).toEqual( '0'.repeat( block.difficulty ) );
    } );

    it( 'Difficulty is reduced for slower mining block ', () => {
        expect( Block.adjustDifficulty( block, block.timestamp + 360000 ) ).toEqual( block.difficulty - 1 );
    } );

    it( 'Difficulty is increased for fast mining block ', () => {
        expect( Block.adjustDifficulty( block, block.timestamp + 1 ) ).toEqual( block.difficulty + 1 );
    } )


} );