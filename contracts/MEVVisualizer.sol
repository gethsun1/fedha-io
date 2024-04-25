// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MEVVisualizer {
    address public owner;
    mapping(address => bool) public authorizedUsers;
    
    struct Transaction {
        address sender;
        address receiver;
        uint256 amount;
        uint256 gasPrice;
        uint256 timestamp;
    }
    
    Transaction[] public transactions;
    
    event TransactionAdded(address sender, address receiver, uint256 amount, uint256 gasPrice, uint256 timestamp);
    event MEVOpportunityIdentified(uint256 transactionId, string opportunityType, uint256 potentialProfit);
    
    constructor() {
        owner = msg.sender;
        authorizedUsers[msg.sender] = true;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }
    
    modifier onlyAuthorized() {
        require(authorizedUsers[msg.sender], "Not authorized to perform this action");
        _;
    }
    
    function addTransaction(address _sender, address _receiver, uint256 _amount, uint256 _gasPrice, uint256 _timestamp) external onlyAuthorized {
        Transaction memory newTransaction = Transaction(_sender, _receiver, _amount, _gasPrice, _timestamp);
        transactions.push(newTransaction);
        emit TransactionAdded(_sender, _receiver, _amount, _gasPrice, _timestamp);
    }
    
    function authorizeUser(address _user) external onlyOwner {
        authorizedUsers[_user] = true;
    }
    
    function revokeAuthorization(address _user) external onlyOwner {
        authorizedUsers[_user] = false;
    }
    
    function identifyMEVOpportunities() external onlyOwner {
        for (uint256 i = 0; i < transactions.length; i++) {
            Transaction storage tx = transactions[i];
            uint256 potentialProfit;
            string memory opportunityType;
            
            // Gas Optimization Analysis
            if (isGasOptimizationOpportunity(tx.gasPrice)) {
                potentialProfit += calculateGasOptimizationProfit(tx.gasPrice);
                opportunityType = "Gas Optimization";
            }
            
            // Arbitrage Opportunities Analysis
            if (isArbitrageOpportunity(tx.sender, tx.receiver, tx.amount)) {
                potentialProfit += calculateArbitrageProfit(tx.sender, tx.receiver, tx.amount);
                opportunityType = "Arbitrage Opportunity";
            }
            
            if (potentialProfit > 0) {
                emit MEVOpportunityIdentified(i, opportunityType, potentialProfit);
            }
        }
    }
    
    function isGasOptimizationOpportunity(uint256 _gasPrice) internal pure returns (bool) {
      
        return _gasPrice > 50000000000; // 50 Gwei in Wei
    }
    
    function calculateGasOptimizationProfit(uint256 _gasPrice) internal pure returns (uint256) {
       
        return 10000000000000000; // 0.01 ETH in Wei
    }
    
    function isArbitrageOpportunity(address _sender, address _receiver, uint256 _amount) internal pure returns (bool) {
       
        return _sender != _receiver && _amount >= 1 ether; // Arbitrary conditions for demo
    }
    
    function calculateArbitrageProfit(address _sender, address _receiver, uint256 _amount) internal pure returns (uint256) {
     
        return 50000000000000000; // 0.05 ETH in Wei
    }
}
