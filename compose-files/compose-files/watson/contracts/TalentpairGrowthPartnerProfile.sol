// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TalentpairGrowthPartnerProfile is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    // ERC 721
    Counters.Counter private _tokenIdCounter;

    // GP Profile
    struct Fow_Specialty {
        string fow;
    }

    // NFT struct
    struct NFT {
        string uri;
        // TP ERC721
        string external_token_uri;
        uint256 token_id;
        // TP Metadata
        string hash_value;
        // GP Profile
        // mapping(uint256 => Fow_Specialty) fow_specialties;
        string[] fow_specialties;
        string growth_partner_uuid;
        uint256 agency_id;
    }

    // Solidity contracts are single instances. Minting creates entries in the instance. Each value requires an address mapping to the values
    mapping(uint256 => NFT) NFTs;

    using Counters for Counters.Counter;

    constructor() ERC721("TalentpairGrowthPartnerProfile", "TPGP_PROFILE") {}

    // Fow_Specialty[] fows;
    // mapping(uint256 => Fow_Specialty) fows;

    function safeMint(
        address to,
        string memory uri,
        string memory external_token_uri,
        string memory hash_value,
        string[] memory fow_input,
        string memory growth_partner_uuid,
        uint256 agency_id
    ) public onlyOwner returns (NFT memory) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        // _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);

        NFT memory nft = NFT(uri, external_token_uri, tokenId, hash_value, fow_input, growth_partner_uuid, agency_id);

        NFTs[tokenId] = nft;
        return nft;
    }

    function safeBurn(uint256 tokenId) public onlyOwner {
        _burn(tokenId);
    }

    // Retrieve NFT struct entry by token id
    function getNFT(uint256 tokenId) public view returns (NFT memory) {
        return NFTs[tokenId];
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 token_id) internal override(ERC721, ERC721URIStorage) {
        super._burn(token_id);
    }

    function tokenURI(uint256 token_id) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(token_id);
    }
}
