 pragma solidity ^0.5.9;
contract Tipjar {
    
    address public owner;
    uint balance;
    event strLog(string);
    event addrLog(string, address);
    event Log (string, uint);
    constructor() public payable { 
        owner=msg.sender;
        balance=0;
    }
    
    function deposit_tip() public payable{
       
        balance+=msg.value;
        emit strLog("Thanks for the Tip!");
        emit Log("Tip;Jar balance: ", balance);
    }
    
    function withdraw_tip(uint amt)public payable onlyOwner() suff_bal(amt){
        balance-=amt;
        msg.sender.transfer(balance);
        emit Log("TipJar balance: ", balance);
    }
    function get_Balance() public view returns (uint){
         return balance;
    }
    function transfer_Ownership(address new_owner) public onlyOwner(){
        owner=new_owner;
        emit addrLog("Ownership transffered to: ",owner);
    }
    modifier onlyOwner()
    {
        require(owner==msg.sender,"Error: Only accessible by owner");
         _;
    }
    modifier suff_bal(uint amt){
        require(amt<=balance,"Error: Insufficient balance");
        _;
    }
}
