# Zecpages

This is a Zcash-focused social site with a Zcash-powered message board. It's a react frontend connected to a express/node/knex/postgres backend in its present state. You can see the site at https://zecpages.com

Zecpages is built and maintained by Michael Harms. 

## Backend

The users API is public and reachable via a GET https://be.zecpages.com/users

### Disclaimer - This is weird byzantine devops architecture from my bootcamp days. Elastic Beanstalk is not great. Someday This'll be reworked to run on one server but for now all the zcash operations run on a goofy ec2 side job box.

The board functionality is powered by a t2.micro ec2 instance running this code https://github.com/michaelharms6010/zcash-memo-monitor . Credit where it's due, this is mostly cribbed and adapted from Andrew Miller's staked polling script: https://gist.github.com/amiller/63f78b6c5fb5a9aadcd8a34012986a76 . Thank you vm sir

The backend is hosted w/AWS EB / RDS. Its source code and deployment information can be seen here: https://github.com/michaelharms6010/be-zeitpages
