/* //active directory auth model for employee directory app
const ActiveDirectory = require('activedirectory');


var adConfig = {
    url:'ldap://hciad3.heart.loacal:389',
    baseDN: 'dc=heart,dc=local',

};


var username = 'wduncan@heart.local'



var ad = new ActiveDirectory(adConfig);
//do the authenitcation
ad.authenticate(username, password, function(err, auth){
    if(err) {
        console.log('ERROR: '+JSON.stringify(err));
    }
    if(auth){
        console.log('Authenticated');
    }
    else{
        console.log('Auth Failed!');
    }
}); */

