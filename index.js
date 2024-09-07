const { Web3 } = require('web3')

const rpcEndpoint = 'http://claim-guard.wm-team.cn:8545/GjAqoNKMKLBwKzRvMohqjRCT/main';
const web3 = new Web3(rpcEndpoint);

const setupAddress = '0xb5DcDa3317760975Ba134fCe4F9bd4089105C0d1';
const challAddress = '0x8d3Ef42C623FbFf864b486ec90C2953BCDB83b46';

const setupABI = require('./setupABI.json');
const challABI = require('./ChalABI.json');

const setupInstance = new web3.eth.Contract(setupABI, setupAddress);
const challInstance = new web3.eth.Contract(challABI, challAddress);

const privateKey = '0xa882950c5543fdc5bbb06bf4d46abadf9172f1dac6fefce0e4dfb57d4f7afa34';

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
    } catch (err) {
        console.error('Error:', err);
    }
}

// getAddress()

async function register() {
    try {
        const result = await challInstance.methods.registerBlock().send({
            from: account.address
        });
        console.log(result);
        return result;
    } catch (err) {
        console.error('Error:', err);
    }
}


async function pw(pow) {
    try {
        const result = await challInstance.methods.proveWork(pow).send({
            from: account.address
        });
        console.log(result);
    } catch (err) {
        console.error('Error:', err);
    }
}

async function claim() {
    try {
        const result = await challInstance.methods.claimLastWinner(account.address).send({
            from: account.address
        });
        console.log(result);
    } catch (err) {
        console.error('Error:', err);
    }
}

async function solveChallenge() {
    try {
        // 1. Register block
        const resp = await register();

        console.log(resp.blockNumber)
        let pow;

        switch (resp.blockNumber) {
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
        }

        console.log(pow);

        // 2. Find valid proof of work (replace this PoW with a valid one)
        await pw(pow);

        // 3. Claim last winner
         claim();
    } catch (err) {
        console.error('Error during challenge solution:', err);
    }
}

// Run the script
solveChallenge();