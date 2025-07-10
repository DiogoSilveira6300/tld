// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FractionalToken is ERC20 {
    address public nftAddress;
    uint256 public nftTokenId;

    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        address owner,
        address _nftAddress,
        uint256 _nftTokenId
    ) ERC20(name, symbol) {
        _mint(owner, totalSupply * (10 ** 18));
        nftAddress = _nftAddress;
        nftTokenId = _nftTokenId;
    }
}

contract Fractionalizer {

    event Fractionalized(
        address tokenAddress,
        uint256 tokenId,
        address fractionalToken,
        uint256 totalShares
    );

    function fractionalize(
        address nftAddress,
        uint256 tokenId,
        uint256 totalShares,
        string memory name,
        string memory symbol
    ) external {
        // Transfer NFT to this contract (locking it)
        IERC721(nftAddress).transferFrom(msg.sender, address(this), tokenId);

        // Deploy new ERC-20 token
        FractionalToken ft = new FractionalToken(
            name,
            symbol,
            totalShares,
            msg.sender,
            nftAddress,
            tokenId
        );

        emit Fractionalized(nftAddress, tokenId, address(ft), totalShares);
    }
}
