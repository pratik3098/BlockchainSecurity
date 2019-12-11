pragma solidity ^0.5.0;

contract PersonalBank {
    address owner;
    address current_payable;
    
    constructor() public payable {
        owner = msg.sender;
        current_payable = address(0);
    }
    
    function() external payable {
    }
    
    function cashCheque(address payable to, uint256 amount,  bytes32 r, bytes32 s, uint8 v) public only_owner() attack_safety(to){
        bytes32 messageHash = keccak256(abi.encodePacked(to, amount));
        
        bytes32 messageHash2 = keccak256(abi.encodePacked(
            "\x19Ethereum Signed Message:\n32", messageHash
        ));
        
        require(ecrecover(messageHash2, v, r, s) == owner, "bad signature");
        
        to.transfer(amount);
        
        current_payable = address(0);
    }
    
     modifier attack_safety(address payable_to){
        require(payable_to != current_payable ,"Error: Multiple cheque cashing");
        current_payable=payable_to;
        _;
    }
    
    modifier only_owner(){
       require(owner==msg.sender,"Error: Invalid transcation");
         _;
    }
}
