```
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░██╗░░░░░░░██╗░█████╗░████████╗░██████╗░█████╗░███╗░░██╗░
░██║░░██╗░░██║██╔══██╗╚══██╔══╝██╔════╝██╔══██╗████╗░██║░
░╚██╗████╗██╔╝███████║░░░██║░░░╚█████╗░██║░░██║██╔██╗██║░
░░████╔═████║░██╔══██║░░░██║░░░░╚═══██╗██║░░██║██║╚████║░
░░╚██╔╝░╚██╔╝░██║░░██║░░░██║░░░██████╔╝╚█████╔╝██║░╚███║░
░░░╚═╝░░░╚═╝░░╚═╝░░╚═╝░░░╚═╝░░░╚═════╝░░╚════╝░╚═╝░░╚══╝░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░   Wallet And Token Service On Node   ░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

## How to run
### first run
run:
```
yarn install
```
- You'll need to create a new mongodb and user
- shell into the mongo container after running `docker-compose up`
```
> use watson
> db.keys.insert({pk:"adw234"})
> db.createUser({user: 'localAdmin',pwd:passwordPrompt(),roles:[{role:'readWrite',db:'watson'}]})
```
Then you'll need to deploy the smart contracts. If you're using flare make sure the .env file variable BLOCKCHAIN is set to flare
```
npx hardhat run scripts/deployProfileToken.ts --network coston
```
```
docker-compose up -d
yarn run server
```
----
### thereafter:
```
docker-compose up -d
yarn run server
```

## Explore the API
There is a swagger web ui at http://localhost:7001/docs after you run the server.  
<br/>
Requests must be authenticated with username `django` and password `secret` (or whatever is in the .env file under AUTH_PASSWORD)
<br/><br/>

There is also a postman collection in `app/test/postman/` you can use that to explore the API options in the POC.

1. create wallet
2. mint profile
3. Get wallet info
4. Profit!


## Authorization and Authentication
This web server is secured by a `Basic` authorization scheme. There is one user `django` and the password is provided by environment variable currently under the `AUTH_PASSWORD` variable.  
if you're doing curls you can base64 encode `username:password` and provided it as a header with key: `Authorization` and value `Basic base64encodedString`.  
<br/><br/>


----
Hardhat output from `npx hardhat` setup
## Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
GAS_REPORT=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

# Troubleshooting
## Hardhat
if hardhat is giving an error that there are no logs available for a transaction, check that the contract is deployed correctly.  
Things to check:
- contract is the same on all containers (blockchain and watson)
- check the database that the contract being used on your environment is the address that was outputted when you deployed it
- using `NODE_ENV=local|test|...` before the command `yarn run deploy-growth-partner-contract` will set the environment, otherwise it is set to `test`
