// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PasswordManager is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    mapping(address => uint256) public ownerToToken;
    mapping(address => string) private _ownerToStreamId;

    event StreamAdded(address indexed, uint256 tokenId, string streamId);
    event StreamUpdated(
        address indexed,
        uint256 tokenId,
        string oldStreamId,
        string newStreamId
    );
    event TokenMinted(address indexed, uint256 tokenId);

    modifier singleMintCheck() {
        require(ERC721.balanceOf(msg.sender) == 0, "You already have access.");
        _;
    }

    modifier onlyStreamOwner(uint tokenId) {
        require(msg.sender == ERC721.ownerOf(tokenId), "Incorrect Vault Owner");
        _;
    }

    constructor() ERC721("PaswordManagerAccessToken", "PMAK") {}

    function getStreamId() external view returns (string memory) {
        return _ownerToStreamId[msg.sender];
    }

    function setStream(uint256 _tokenId, string memory _streamId)
        external
        onlyStreamOwner(_tokenId)
    {
        require(
            keccak256(abi.encodePacked(_streamId)) !=
                keccak256(abi.encodePacked("")),
            "Stream Id Cannot be set to blank"
        );
        string memory oldStreamId = _ownerToStreamId[msg.sender];
        _ownerToStreamId[msg.sender] = _streamId;
        if (
            keccak256(abi.encodePacked(oldStreamId)) ==
            keccak256(abi.encodePacked(""))
        ) {
            emit StreamAdded(msg.sender, _tokenId, _streamId);
        } else {
            emit StreamUpdated(msg.sender, _tokenId, oldStreamId, _streamId);
        }
    }

    function safeSingleMint(string memory uri) public singleMintCheck {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        ownerToToken[msg.sender] = tokenId;
        emit TokenMinted(msg.sender, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256, /* firstTokenId */
        uint256 /* batchSize */
    ) internal pure override {
        require(
            from == address(0) || to == address(0),
            "You cannot transfer the token/NFT"
        );
    }
}
