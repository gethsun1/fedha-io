// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MEVTracker {
  // Structure to store data about a potential MEV opportunity
  struct MEVOpportunity {
    uint256 gasPrice; // Simulated gas price of the opportunity
    uint256 transactionValue; // Simulated transaction value
    uint256 blockNumber; // Block number where the opportunity was identified (optional)
    uint256 timestamp; // Timestamp of the opportunity identification (optional)
  }

  // Mapping to store reported opportunities for each user (address)
  mapping(address => MEVOpportunity[]) public reportedOpportunities;

  /**
   * @dev Allows users to report a potential MEV opportunity.
   * @param _gasPrice The simulated gas price of the opportunity.
   * @param _transactionValue The simulated transaction value.
   */
  function reportMEV(uint256 _gasPrice, uint256 _transactionValue) public {
    reportedOpportunities[msg.sender].push(MEVOpportunity({
      gasPrice: _gasPrice,
      transactionValue: _transactionValue,
      blockNumber: block.number, // Optional: Store the block number where the opportunity was identified
      timestamp: block.timestamp // Optional: Store the timestamp of the opportunity identification
    }));
  }

  /**
   * @dev Retrieves all reported opportunities for a specific user.
   * @param user The address of the user to get opportunities for.
   * @return An array of MEVOpportunity structs representing the user's reported opportunities.
   */
  function getReportedOpportunities(address user) public view returns (MEVOpportunity[] memory) {
    return reportedOpportunities[user];
  }

  /**
   * @dev Retrieves the latest reported opportunity for a specific user.
   * @param user The address of the user to get the latest opportunity for.
   * @return A single MEVOpportunity struct representing the user's latest reported opportunity.
   */
  function getLatestReportedOpportunity(address user) public view returns (MEVOpportunity memory) {
    MEVOpportunity[] memory opportunities = reportedOpportunities[user];
    uint256 opportunitiesLength = opportunities.length;
    require(opportunitiesLength > 0, "No opportunities reported by this user");
    return opportunities[opportunitiesLength - 1];
  }

  /**
   * @dev Filters all reported opportunities and returns only those with a gas price greater than or equal to the provided minimum gas price.
   * @param minGasPrice The minimum gas price to filter by.
   * @return An array of MEVOpportunity structs representing opportunities with a gas price above the minimum threshold.
   */
  function getOpportunitiesAboveGasPrice(uint256 minGasPrice) public view returns (MEVOpportunity[] memory) {
    uint256 opportunitiesLength = reportedOpportunities[msg.sender].length;
    MEVOpportunity[] memory filteredOpportunities = new MEVOpportunity[](opportunitiesLength); // Initialize array with max length

    // Loop through reportedOpportunities[msg.sender] to access the MEVOpportunity structs
    uint256 filteredCount = 0;
    for (uint256 i = 0; i < opportunitiesLength; i++) {
      if (reportedOpportunities[msg.sender][i].gasPrice >= minGasPrice) {
        filteredOpportunities[filteredCount] = reportedOpportunities[msg.sender][i];
        filteredCount++;
      }
    }

    // Resize the array to remove empty slots
    assembly {
      mstore(filteredOpportunities, filteredCount)
    }

    return filteredOpportunities;
  }
}
