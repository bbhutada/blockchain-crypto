/**
 * User: bhagyashributada
 */

'use strict';

const
    {Blockchain} = require( './index' ),
    {Block} = require( './block' );

describe( 'Blockchain', () => {

    let blockchain, bc;

    beforeEach( () => {
        blockchain = new Blockchain();
        bc = new Blockchain();
    } );

    it( 'Blockchain starts with Genesis block', () => {
        expect( blockchain.chain[0] ).toEqual( Block.genesis() );
    } );

    it( 'Adds block to the chain', () => {
        const data = 'New block';
        let lastBlockData;

        blockchain.addBlock( data );
        lastBlockData = blockchain.chain[blockchain.chain.length - 1].data;

        expect( lastBlockData ).toEqual( data );
    } );

    it( 'Validates valid block chain', () => {
        bc.addBlock( 'BlockChain2' );

        expect( blockchain.isValidBlockChain( bc.chain ) ).toBe( true );
    } );

    it( 'It invalidates a chain with corrupt genesis data', () => {
        bc.chain[0].data = 'Incorrect Data';

        expect( blockchain.isValidBlockChain( bc.chain ) ).toBe( false )

    } );

    it( 'It invalidates a corrupt chain', () => {
        bc.addBlock( 'BloackChain Data' );
        bc.chain[1].data = 'Incorrect Data';

        expect( blockchain.isValidBlockChain( bc.chain ) ).toBe( false );
    } );

    it( 'It replaces the blockchain with new valid chain', () => {
        bc.addBlock( 'AddedNewBlock' );
        blockchain.replaceChain( bc.chain );

        expect( blockchain.chain ).toEqual( bc.chain );

    } );

    it( 'It does not replace the chain, if new chain length is less than or equal to blockchain', () => {
        bc.addBlock( 'AddedNewBlock' );
        bc.replaceChain( bc.chain );

        expect( blockchain.chain ).not.toEqual( bc.chain );

    } );
} );