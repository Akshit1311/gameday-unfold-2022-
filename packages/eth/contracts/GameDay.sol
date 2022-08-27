// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract GameDay {
    address payable public owner;

    mapping(address => bool) public isPlayerWaiting;

    mapping(address => uint) public awaitingGames;

    struct Game {
        address player1;
        address player2;
        uint stake;
    }

    constructor() payable {
        owner = payable(msg.sender);
    }

    function createGame(address _player, uint _stake) public {
        require(
            bytes(awaitingGames[address]).length > 0,
            "Game already exists"
        );

        awaitingGames[address] = _stake;
    }

    function withdraw() public {
        owner.transfer(address(this).balance);
    }
}
