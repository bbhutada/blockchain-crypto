/**
 * User: bhagyashributada
 */

'use strict';

const
    SHA256 = require( 'crypto-js/sha256' ),
    {DIFFICULTY, MINE_RATE} = require( '../config' );

class Block {
    constructor( timestamp, lastHash, hash, data, nonce, difficulty ) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    toString() {
        return `Block- \nTimestamp: ${this.timestamp} \nLstHash: ${this.lastHash} \nHash: ${this.hash} \nData: ${this.data} \nNonce: ${this.nonce} \nDifficulty: ${this.difficulty}`;
    }

    static genesis() {
        return new this( 'GenesisTime ', '--dummy--', 'genesisHash', 'ThisIsGenesisBlock.', 0, DIFFICULTY );
    }

    static mineBlock( lastBlock, data ) {
        const
            lastHash = lastBlock.hash;
        let
            {difficulty} = lastBlock,
            nonce = 0, hash, timestamp;

        //This check is the proof of work algorithm

        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty( lastBlock, timestamp );
            hash = Block.hash( timestamp, lastHash, data, nonce, difficulty );
        } while( hash.substring( 0, difficulty ) !== '0'.repeat( difficulty ) );

        return new this( timestamp, lastHash, hash, data, nonce, difficulty );
    }

    static hash( timestamp, lastHash, data, nonce, difficulty ) {
        return SHA256( `${timestamp}${lastHash}${data}${nonce}${difficulty}` ).toString();
    }

    static blockHash( block ) {
        const {timestamp, lastHash, data, nonce, difficulty} = block;
        return Block.hash( timestamp, lastHash, data, nonce, difficulty );
    }

    static adjustDifficulty( lastBlock, currentTime ) {
        let
            {difficulty, timestamp} = lastBlock;
        difficulty = timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        return difficulty;

    }
}

module.exports = {Block, DIFFICULTY};
