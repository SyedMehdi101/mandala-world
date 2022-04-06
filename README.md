# Mandala Hello World 

This project demonstrates a testcase where other account cannot get public variable of contract deployed by other account.

The project houses a simple hello world contract, with a sample script that deploys that contract, and a script to get greeting from that contract.


## Steps to Reproduce
```shell
# install all dependencies
yarn
# clean and compile contract abis
yarn build

# deploy HelloWorld contract from signer[0] and store in deployed-${network}.json
yarn mandalaPub-deploy-account-a
# deploy HelloWorld contract from signer[1] and store in deployed-${network}.json
yarn mandalaPub-deploy-account-b

# ** works **
# Call HelloWorld.message() of contract deployed of signer[0] by Account-A (signer[0])

yarn mandalaPub-greet-account-a-d0 

# ** works **
# Call HelloWorld.message() of contract deployed of signer[1] by Account-B (signer[1])
yarn mandalaPub-greet-account-b-d1 


# ** does not work **
# Call HelloWorld.message() of contract deployed of signer[1] by Account-A (signer[0])
yarn mandalaPub-greet-account-a-d1

# ** does not work **
# Call HelloWorld.message() of contract deployed of signer[0] by Account-B (signer[1])
yarn mandalaPub-greet-account-b-d0

```

## Steps without comments
```shell
yarn
yarn build
yarn mandalaPub-deploy-account-a
yarn mandalaPub-deploy-account-b
yarn mandalaPub-greet-account-a-d0 
yarn mandalaPub-greet-account-b-d1 
yarn mandalaPub-greet-account-a-d1
yarn mandalaPub-greet-account-b-d0
```