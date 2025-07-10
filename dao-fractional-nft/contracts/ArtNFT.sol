// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArtNFT is ERC721, Ownable {

    uint256 private _currentTokenId;

    constructor() ERC721("ArtNFT", "ART") Ownable(msg.sender) {}

    function mint(address recipient) public onlyOwner returns (uint256) {
        uint256 tokenId = _currentTokenId;

        _mint(recipient, tokenId);
        _currentTokenId++;
        
        return tokenId;
    }
}
