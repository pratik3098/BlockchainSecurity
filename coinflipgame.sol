pragma solidity ^0.5.9;
contract CoinFlipGame {
    
    constructor() public payable {
    }
    
    function bet() public payable {
        require(msg.value <= maxBet(), "bet size too big");
        
        if (generateRandomBit()) {
            msg.sender.transfer(msg.value * 2);
        }
    }
    
    function maxBet() public view returns(uint256) {
        return address(this).balance / 10;
    }
    
    function generateRandomBit() private view returns(bool) {
        // MODIFY ME to randomly return either true or false
          if(uint256(keccak256(abi.encodePacked((block.timestamp + block.number) * block.gaslimit)))%block.difficulty == 0)
         return true;
         else
         return false;
    }
}
