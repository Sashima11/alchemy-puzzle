const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {

  // deploying contract
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }


  // Generates random wallet and connects it to hardhat provider, sets balance to 100 ETH
  async function generateRandomWallet() {
    // Connect to Hardhat Provider
    const wallet = ethers.Wallet.createRandom().connect(ethers.provider);
    // Set balance
    await ethers.provider.send("hardhat_setBalance", [
        wallet.address,  "0x56BC75E2D63100000" //100 ETH
    ]);
    return wallet;
  }

  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // good luck
   
    // address value have to be lower then treshold
    const threshold = "0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf";

    // condition for while loop
    let b = true;

    // generate new address each pass untill address value is lower then treshold value
    while(b){
      // walet generating
      const wallet = await generateRandomWallet();

      // getting address from wallet
      const address = await wallet.getAddress();
      
      // checking if address is lower then treshold
      if(parseInt(address) < parseInt(threshold)){
        // initiate win function as signer = wallet
        await game.connect(wallet).win();
        // breaking while loop
        b = false;
      }
    }

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
