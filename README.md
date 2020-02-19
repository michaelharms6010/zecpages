# Zeitpages

In its current state, this is a one man, 6 hour hackathon project. It's a react frontend connected to a express/node/knex/postgres backend in its present state. You can see the site at https://zecpages.com

## Backend

The users API is public and reachable via a GET https://be.zecpages.com/users

The board functionality is powered by a t2.micro ec2 instance running this code https://github.com/michaelharms6010/zcash-memo-monitor . Credit where it's due, this is mostly cribbed and adapted from Andrew Miller's staked polling script: https://gist.github.com/amiller/63f78b6c5fb5a9aadcd8a34012986a76 . Thank you vm sir

The backend is hosted w/AWS EB / RDS. Its source code and deployment information can be seen here: https://github.com/michaelharms6010/be-zeitpages
