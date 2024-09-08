const { Web3 } = require('web3')

const rpcEndpoint = 'http://127.0.0.1:8545/wQMVlsTuOLyjinWJTOCfsLmR/main';
const web3 = new Web3(rpcEndpoint);

const setupAddress = '0x40BE0B0C5b3BfCa45cBecE3Fc579BB56D069ad4d';
const challAddress = '0xc67df35219c2F7B01084A9620fc093d3C031B0fa';

const setupABI = require('./setupABI.json');
const challABI = require('./ChalABI.json');

const setupInstance = new web3.eth.Contract(setupABI, setupAddress);
const challInstance = new web3.eth.Contract(challABI, challAddress);

const privateKey = '0x4c56d98cfe35a9ca822226a64db08dbb199c16266594709e613cc1a1d001fe8c';

const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getAddress() {
    try {
        const result = await setupInstance.methods.chall().call();
        console.log(result);
        const balanceWei = await web3.eth.getBalance(account.address);
        const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        console.log("Balance:", balanceEth);
    } catch (err) {
        console.error('Error:', err);
    }
}

getAddress()

async function adjustGasPrice() {
    try {
        // Step 1: Get the current gas price
        const currentGasPriceWei = await web3.eth.getGasPrice();
        
        // Step 2: Convert 0.005 ETH to gwei
        const additionalGasPriceGwei = 500;
        const additionalGasPriceWei = web3.utils.toWei(additionalGasPriceGwei.toString(), 'gwei'); // Convert ETH to wei
        const newGasPriceWei = BigInt(currentGasPriceWei) + BigInt(additionalGasPriceWei);

        console.log('Current Gas Price (Wei):', currentGasPriceWei);
        console.log('New Gas Price (Wei):', newGasPriceWei);

        return newGasPriceWei;
    } catch (err) {
        console.error('Error:', err);
    }
}

async function register() {
    try {
        const result = await challInstance.methods.registerBlock().send({
            from: account.address
        });
        console.warn("Register Done")
        return result;
    } catch (err) {
        console.error('Error:', err.cause);
    }
}


async function pw(pow) {
    try {
        const result = await challInstance.methods.proveWork(pow).send({
            from: account.address
        });
        console.warn("Prove Done")
    } catch (err) {
        console.error('Error:', err);
    }
}

async function claim() {
    try {
        const result = await challInstance.methods.claimLastWinner(account.address).send({
            from: account.address,
        });
        console.warn("Claim Done");
    } catch (err) {
        // console.error('Error:', err);
    }
}

async function solveChallenge() {
    try {
        // 1. Register block
        register();
        // let balanceWei = await web3.eth.getBalance(account.address);
        // let balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        // console.log("Balance:", balanceEth);
        await delay(2000)
        let pow;
        let blockNumber = await web3.eth.getBlockNumber();

        switch (BigInt(blockNumber)) {
            case 1n:
                pow = "0x5746ec50ea289e343251be889880092f02d27e59eb35213e3c813e220201fe19";
                break;
            case 2n:
                pow = "0x95dc8eaedc145086d06ed2befaaf59b299d1c6866a645c4dee75991e7ae058a7";
                break;
            case 3n:
                pow = "0xce8b9002cb998efb3ea9470a07bae2055c43eea6b64a5d690068476e826dd0cb";
                break;
            case 4n:
                pow = "0xbd7e648f0002f280eaa5e90255b39d26ca6f6476c64e81839f2a3034e6e156b8";
                break;
            case 5n:
                pow = "0xfc6a2a1bbefe4ea390b8cc8f3dcb6f0e596bdcf1e2297f104cc0d18cc8944e64";
                break;
            case 6n:
                pow = "0x40826c15a412b3ae1b6655ac7f4ad0beee2ad1215f0b876cfad7727a36baf722";
                break;
            case 7n:
                pow = "0x989298a86050cd4856ceb6e7a5d8df1af16eab4ae05d9fb8f85f2a8af4ada27c";
                break;
            case 8n:
                pow = "0x29cccfd36da26ed65d6330b423cb15fdc06d6212ec73820da3350fae1da814ed";
                break;
            case 9n:
                pow = "0xa5ee69c10b6ce76a8701bece683ee694133d7790030194714262062d281a7c9a";
                break;
            case 10n:
                pow = "0x933c0210ebb305f6f42cac6562d320ccd6b89e8b83ba836c29e4f88ec40bf8bc";
                break;
            case 11n:
                pow = "0x41f4ca51f78ddae2118e2a36921886b57b421efdc04a8acde9afce0c81617035";
                break;
            case 12n:
                pow = "0x5828ce927f94d5efb5746bc568026582389e200365f182d15945bfff511e7bdb";
                break;
            case 13n:
                pow = "0xfa680b24e75279f88acff575755d45173e671b60b145de3c3206055be2c8d8fb";
                break;
            case 14n:
                pow = "0x4f4500f5db9529d00632659081a26b89f6ec20738e495ec66085893f506a0c23";
                break;
            case 15n:
                pow = "0xfcfce016b5f81b3f55eb5e09a087f1962e2dbc4208134e6ea7a9d488b8ab6666";
                break;
            case 16n:
                pow = "0x5bc9d8181446e892dff82b9038d0cfa6ed9b289b57b32c41e26ddb7c0ea40da9";
                break;
            case 17n:
                pow = "0xd42cece8c7b2c94539e7968d2109e42c7e8c09788d965955f3b717161107d03d";
                break;
            case 18n:
                pow = "0xb24ed635b1d07823c9732d393862c4302faab837eb9b4e598a8c35f39a81736b";
                break;
            case 19n:
                pow = "0xb56d77f35461e4d09fa44251ccd9091610e51821bbd2e72e98a6f4587de0676d";
                break;
            case 20n:
                pow = "0x8c4128cd4f8a00088b4b9aa1bcd6d5526d47c9d617f272ad16b354dd7f89c0b7";
                break;
            case 21n:
                pow = "0x2aeb6726752eac5e4bd156129223ad396e8ac87ab17d0eadfd4d056fb4f3e9d3";
                break;
            case 22n:
                pow = "0xe108b5618a9f639479bf713096a921f1fb31b2cf56bd3d57ccbba7147d86d25e";
                break;
            case 23n:
                pow = "0xcff74d6f4c577f8ab75daf3b94a647ac1b38a64cddc8fc3547e106052eccadd8";
                break;
        }

        console.log(pow);

        // 2. Find valid proof of work (replace this PoW with a valid one)
        await pw(pow);
        // balanceWei = await web3.eth.getBalance(account.address);
        // balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        // console.log("Balance:", balanceEth);

        // 3. Claim last winner
        // await claim();
    } catch (err) {
        console.error('Error during challenge solution:', err);
    }
}

// function onBlockChange(newBlockNumber) {
//     console.log(`Block number has changed! New block: ${newBlockNumber}`);
//     // Place your logic here when the block number changes
//     // You can call any other function you want to start here.
// }

// let currentBlockNumber = null;
// let hasTriggered = false;
// let intervalId = null;

// async function monitorBlockNumber() {
//     try {
//         const newBlockNumber = await web3.eth.getBlockNumber();
        
//         // Check if the block number has changed
//         if (currentBlockNumber === null) {
//             currentBlockNumber = newBlockNumber; // Initialize the first block number
//         } else if (newBlockNumber !== currentBlockNumber) {
//             onBlockChange(newBlockNumber); // Trigger function when block number changes
//             if (!hasTriggered) {
//                 solveChallenge();
//                 hasTriggered = true;
//                 clearInterval(intervalId);
//             }
//             currentBlockNumber = newBlockNumber;
//         }
//     } catch (error) {
//         console.error("Error fetching block number:", error);
//     }
// }

// // Poll the blockchain every few seconds (e.g., 5 seconds)
// intervalId = setInterval(monitorBlockNumber, 500);

solveChallenge()