// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract FractionalDAO {
    struct Proposal {
        string description;
        uint256 voteCount;
        uint256 deadline;
        bool executed;
    }

    IERC20 public governanceToken;
    Proposal[] public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    constructor(address _token) {
        governanceToken = IERC20(_token);
    }

    function createProposal(string memory _description, uint256 durationSeconds) external {
        proposals.push(Proposal({
            description: _description,
            voteCount: 0,
            deadline: block.timestamp + durationSeconds,
            executed: false
        }));
    }

    function vote(uint256 proposalId) external {
        require(block.timestamp < proposals[proposalId].deadline, "Voting ended");
        require(!hasVoted[proposalId][msg.sender], "Already voted");

        uint256 voterPower = governanceToken.balanceOf(msg.sender);
        require(voterPower > 0, "No voting power");

        proposals[proposalId].voteCount += voterPower;
        hasVoted[proposalId][msg.sender] = true;
    }

    function getProposal(uint256 id) external view returns (Proposal memory) {
        return proposals[id];
    }
}
