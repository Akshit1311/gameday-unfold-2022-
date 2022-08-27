import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("GameDay", function () {
  async function deploy() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const GameDay = await ethers.getContractFactory("GameDay");
    const gameDay = await GameDay.deploy();

    return { gameDay, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should Deploy", async function () {
      const { gameDay, owner, otherAccount } = await loadFixture(deploy);

      console.log({ gameDay, owner, otherAccount });

      expect(await gameDay.owner()).to.equal(owner.address);
    });
  });
});
