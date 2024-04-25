// deployments/MEVTracker.deploy.js

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const MEVTracker = await ethers.getContractFactory("MEVTracker");
    const mevTracker = await MEVTracker.deploy();
  
    console.log("MEVTracker deployed to:", mevTracker.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  