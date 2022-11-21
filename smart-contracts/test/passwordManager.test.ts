import { assert, expect } from "chai";
import { ContractFactory, Signer } from "ethers";
import { network, ethers, deployments } from "hardhat";
import { developmentChains } from "../helper-hardhat-config";
import { PasswordManager } from "../typechain-types/contracts/PasswordManager";
import { PasswordManager__factory } from "../typechain-types/factories/contracts/PasswordManager__factory";

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Password Manager Unit Test", function () {
      let accounts: Signer[],
        deployer: Signer,
        nftUser1: Signer,
        nftUser2: Signer,
        nftUser1Address: string,
        nftUser2Address: string,
        passwordManagerContractFactory: PasswordManager__factory,
        passwordManagerContract: PasswordManager,
        pmUser1Ct: PasswordManager,
        pmUser2Ct: PasswordManager;
      beforeEach(async () => {
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        nftUser1 = accounts[1];
        nftUser2 = accounts[2];
        nftUser1Address = await nftUser1.getAddress();
        nftUser2Address = await nftUser2.getAddress();
        // await deployments.fixture(["PasswordManager"]);
        passwordManagerContractFactory = (await ethers.getContractFactory(
          "PasswordManager"
        )) as PasswordManager__factory;
        passwordManagerContract = await passwordManagerContractFactory.deploy();
        pmUser1Ct = passwordManagerContract.connect(nftUser1);
        pmUser2Ct = passwordManagerContract.connect(nftUser2);
      });

      it("Allow user to mint an NFT to get signup access", async () => {
        let txResponse = await pmUser1Ct.safeSingleMint("https://get.user.com");
        await txResponse.wait(1);
        const bal1 = await pmUser1Ct.balanceOf(nftUser1Address);
        const tokenId1 = await pmUser1Ct.ownerToToken(nftUser1Address);

        txResponse = await pmUser2Ct.safeSingleMint("https://get.user.com");
        await txResponse.wait(1);
        const bal2 = await pmUser1Ct.balanceOf(nftUser2Address);
        const tokenId2 = await pmUser1Ct.ownerToToken(nftUser2Address);

        assert.equal(bal1.toString(), "1");
        assert.equal(tokenId1.toString(), "0");
        assert.equal(bal2.toString(), "1");
        assert.equal(tokenId2.toString(), "1");
      });
      it("User should be to mint only one nft", async () => {
        let txResponse = await pmUser1Ct.safeSingleMint("https://get.user.com");
        await txResponse.wait(1);
        const bal1 = await pmUser1Ct.balanceOf(nftUser1Address);
        const tokenId1 = await pmUser1Ct.ownerToToken(nftUser1Address);

        await expect(pmUser1Ct.safeSingleMint("https://get.user.com")).to.be.revertedWith(
          "You already have access."
        );
      });
      it("NFT minting should emit event TokenMinted", async () => {
        await expect(pmUser1Ct.safeSingleMint("https://get.user.com"))
          .to.emit(pmUser1Ct, "TokenMinted")
          .withArgs(nftUser1Address, ethers.BigNumber.from(0));
      });

      it("Check Get token URI", async () => {
        let txResponse = await pmUser1Ct.safeSingleMint("https://get.user.com");
        await txResponse.wait(1);
        const tokenId = await pmUser1Ct.ownerToToken(nftUser1Address);

        expect(await pmUser1Ct.tokenURI(tokenId)).to.be.equal("https://get.user.com");
      });

      it("Check token cannot be transferred", async () => {
        let txResponse = await pmUser1Ct.safeSingleMint("https://get.user.com");
        await txResponse.wait(1);
        const tokenId = await pmUser1Ct.ownerToToken(nftUser1Address);

        await expect(
          pmUser1Ct.transferFrom(nftUser1Address, nftUser2Address, tokenId)
        ).to.be.revertedWith("You cannot transfer the token/NFT");
      });

      describe("Stream Related Test ", () => {
        beforeEach(async () => {
          let txResponse = await pmUser1Ct.safeSingleMint("https://get.user.com");
          await txResponse.wait(1);
        });
        it("User should be able to set streamId", async () => {
          const tokenId1 = await pmUser1Ct.ownerToToken(nftUser1Address);

          await expect(pmUser1Ct.setStream(tokenId1, "streamId1"))
            .to.emit(pmUser1Ct, "StreamAdded")
            .withArgs(nftUser1Address, tokenId1, "streamId1");
        });
        it("User should be able to get streamId", async () => {
          const tokenId1 = await pmUser1Ct.ownerToToken(nftUser1Address);
          let txResponse = await pmUser1Ct.setStream(tokenId1, "streamId1");
          txResponse.wait(1);

          expect(await pmUser1Ct.getStreamId()).to.be.equal("streamId1");
        });
        it("User should be able to update streamId", async () => {
          const tokenId1 = await pmUser1Ct.ownerToToken(nftUser1Address);
          let txResponse = await pmUser1Ct.setStream(tokenId1, "streamId1");
          await txResponse.wait(1);

          await expect(pmUser1Ct.setStream(tokenId1, "streamId2"))
            .to.emit(pmUser1Ct, "StreamUpdated")
            .withArgs(nftUser1Address, tokenId1, "streamId1", "streamId2");
        });
        it("User should be able to add non empty streamId", async () => {
          const tokenId1 = await pmUser1Ct.ownerToToken(nftUser1Address);

          await expect(pmUser1Ct.setStream(tokenId1, "")).to.be.revertedWith(
            "Stream Id Cannot be set to blank"
          );
        });
      });
    });
