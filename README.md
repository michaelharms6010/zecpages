# Zecpages

Zecpages is a Zcash-focused social site with a Zcash-powered message board. It uses a react frontend connected to a express/node/knex/postgres backend in its present state. You can see the app at https://zecpages.com. Note that this repo is just for the React app - the backend and a few other jobs that drive the app are in other repositories linked below.

Zecpages is built and maintained by [Michael Harms](https://twitter.com/michaelharms70). 

## Backend

The backend is hosted w/AWS EB / RDS. I wouldn't choose them again, but here we are. 

Its source code, public API details, and deployment information can be seen here: https://github.com/michaelharms6010/be-zeitpages

## Zcash Jobs

These jobs all run on a t2.micro instance using adityapk00's [zecwallet-cli](https://github.com/adityapk00/zecwallet-light-cli).

### Wallet Daemon

The wallet daemon listns for and handles new transactions. Credit where it's due, this is mostly cribbed and adapted from Andrew Miller's staked polling script: https://gist.github.com/amiller/63f78b6c5fb5a9aadcd8a34012986a76 . Thank you vm sir. This box uses admin auth to make posts to the rds db.

Wallet daemon code: https://github.com/michaelharms6010/zcash-memo-monitor 

### Daily Batched Like Payouts

Likes are paid 50% to eligible posts (a post is eligible if it contains a valid zcash address). These payments are batched and go out on a scheudled cron job on the job box every day at ~midnight. 

Like job code: https://github.com/michaelharms6010/zecpages-likes-payout-script

## Testnet Faucet

The testnet faucet is a minimal react app with just enough node backend to middleman cors for the browser. I think this is the only part of the zecpages stack that does full on zcash rpc 

Faucet code: https://github.com/michaelharms6010/zcash-faucet

It lives on its own server and is just linked from Zecpages, but this seems like an appt place to leave the link for now.
