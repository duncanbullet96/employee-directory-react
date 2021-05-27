const ActiveDirectory = require('activedirectory2')
const domain = '@heart.local'
const config = { url: 'ldap://hciad3.heart.local',
               baseDN: 'OU=domain users,dc=heart,dc=local'
             };

exports.userAdminAuthorization = (req, res) => {
    const ad = new ActiveDirectory(config);
    const username = req.body.username + domain;
    const groupName = 'USR-EmpDir-Admin';

    ad.isUserMemberOf(username, groupName, function(err, isMember){
        if(err){
            console.log('ERROR: '+JSON.stringify(err));
            return;
        }
        console.log(username + ' isMemberOf ' + groupName + ': ' + isMember);
    })
};







exports.authRequest = (req, res) => {
    const ad = new ActiveDirectory(config);
    const username = req.body.username + domain;
    const password = req.body.password;
    ad.authenticate(username, password, function(err, auth) {
        if (err) {
            console.log(username);
            console.log(password);
            ///console.log('ERROR: '+JSON.stringify(err));.
            res.send({
                message: 'Auth failed'
            })
            return;
        }
        if (auth) {
            console.log('Authenticated!');
            res.send({
                message: 'Auth successful',
                ldap_response_code: '0'
            })
        } else {
            console.log('Authentication failed!');
        }
    })

};