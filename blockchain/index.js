/**
 * User: bhagyashributada
 */

'use strict';

const
    {Block} = require( './block' );

class Blockchain {

    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock( data ) {
        const
            block = Block.mineBlock( this.chain[this.chain.length - 1], data );

        this.chain.push( block );

        return block;
    }

    isValidBlockChain( chain ) {

        if( JSON.stringify( chain[0] ) !== JSON.stringify( Block.genesis() ) ) {
            return false;
        }

        for( let i = 1; i < chain.length; i++ ) {
            const block = chain[i],
                previousBlock = chain[i - 1];

            if( block.lastHash !== previousBlock.hash || block.hash !== Block.blockHash( block ) ) {
                return false;
            }
        }

        return true;
    }

    replaceChain( newChain ) {

        if( newChain.length <= this.chain.length ) {
            console.log( 'The length of new chain is not longer than the current chain. Hence do nothing.' );
            return;
        } else if( !this.isValidBlockChain( newChain ) ) {
            console.log( 'The new chain is not valid chain. Hence do nothing.' );
            return;
        }

        console.log( 'Replacing the blockchain with new chain' );
        this.chain = newChain;
    }
}

module.exports = {Blockchain};