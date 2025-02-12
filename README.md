# ZECpages

ZECpages is a Zcash-focused social site with a Zcash-powered message board. It uses a React frontend connected to a Express/knex/pg backend in its present state. You can see the app at https://zecpages.com. Note that this repo is just for the React app - the backend and a few other jobs that drive the app are in other repositories linked below.

ZECpages was built and maintained by [Michael Harms](https://twitter.com/michaelharms70).

ZECpages was a proof-of-concept "Blockchain MVC" app using Zcash shielded transaction memos as an api and data store. The posts that appeared on ZECpages still persist on the Zcash blockchain.
The view key for ZECpages can be imported into most Zcash wallets, and has been used as a benchmarking tool for wallet sync, being an Old Wallet With Quite A Few Transactions.

This is the view key:
`zxviews1q0duytgcqqqqpqre26wkl45gvwwwd706xw608hucmvfalr759ejwf7qshjf5r9aa7323zulvz6plhttp5mltqcgs9t039cx2d09mgq05ts63n8u35hyv6h9nc9ctqqtue2u7cer2mqegunuulq2luhq3ywjcz35yyljewa4mgkgjzyfwh6fr6jd0dzd44ghk0nxdv2hnv4j5nxfwv24rwdmgllhe0p8568sgqt9ckt02v2kxf5ahtql6s0ltjpkckw8gtymxtxuu9gcr0swvz`

## Backend

Expressjs api / pg db. Hosted w/AWS EB / RDS. I wouldn't choose EB/RDS again, but here we are. 

JSON API details, db schema, and deployment information are here: https://github.com/michaelharms6010/be-zeitpages

## Zcash Jobs

These jobs run on a t3.large instance using adityapk00's [zecwallet-cli](https://github.com/adityapk00/zecwallet-light-cli). 

This is probably oversized, but it's for safety - ime a t2.micro is totally fine for lightwallet testing and even modest use (not too many tx's firing at once).

### Wallet Daemon

The wallet daemon listens for and handles new transactions. Credit where it's due, this is mostly cribbed and adapted from Andrew Miller's staked polling script: https://gist.github.com/amiller/63f78b6c5fb5a9aadcd8a34012986a76 . Thank you vm sir. This box uses admin auth to make posts to the rds db.

Wallet daemon code: https://github.com/michaelharms6010/zcash-memo-monitor 

### Daily Batched Like Payouts

Likes are paid 50% to eligible posts (a post is eligible if it contains a valid Zcash address). These payments are batched and go out on a scheduled cron job on the job box every day at ~midnight. 

Like job code: https://github.com/michaelharms6010/zecpages-likes-payout-script

## Testnet Faucet

https://faucet.zecpages.com

Minimal React app with just enough node backend to middleman cors for the browser. I think this is the only part of the ZECpages stack that does fullnode Zcashd rpc.

Faucet code: https://github.com/michaelharms6010/zcash-faucet

The faucet lives on its own server and isn't even linked from ZECpages, but this seems like an appropriate place to link it.

## Contributing

Drop by our Trello!

https://trello.com/b/Bi7ghafG/zecpages
