const fs = require('fs')
const axios = require('axios')
const querystring = require('querystring');

const_response = {
    res_message: "",
    status: "success"
}


//const bulk_changes = ({ api_id, api_key, account_id, site_id_input, rule_id, rule_id_2, rule_id_2_value }, callback) => {
const bulk_changes = ({ api_id, api_key, account_id, site_id_input, rule_id, rule_id_2, rule_id_2_value }, callback) => {

    let post_security = {
        "api_id": api_id,
        "api_key": api_key,
        "account_id": account_id,
        "site_id": site_id_input[0],
        "rule_id": rule_id
    }

    let param = {}
    const res_message = "OK"

    if (rule_id == "api.threats.bot_access_control") {
        if (rule_id_2 == 'block_bad_bots') {
            param = { "block_bad_bots": rule_id_2_value }
        } else if (rule_id_2 == "challenge_suspected_bots") {
            param = { "challenge_suspected_bots": rule_id_2_value }
        }
    }
    else if (rule_id = "") {
        res_message = "NOK"
        // RETURN THIS ERROR MESSAGE
    }
    else {
        param = { "security_rule_action": rule_id_2_value }
    }

    post_security = { ...post_security, ...param }
    console.log("POST SECURITY   ")
    console.log(post_security)
    console.log("SITE INPUT " + site_id_input)
    axios.post('https://my.incapsula.com/api/prov/v1/sites/configure/security', querystring.stringify(post_security))
        .then(function (response) {
            console.log(response.data.domain)
            if (site_id_input.length > 1) {
                site_id_input.shift()
                bulk_changes({ "api_id": api_id, "api_key": api_key, "account_id": account_id, "site_id_input": site_id_input, "rule_id": post_security.rule_id, "rule_id_2": rule_id_2, "rule_id_2_value": rule_id_2_value }, callback)
            } else {
                callback({ res_message: "OK", message: "c bon" })
            }
        })
        .catch(error => {
            console.log("ERROR")
            console.log(error)
        })
}

module.exports = {
    bulk_changes
    //  bulk_changes_acl
}

                /* axios.post('https://localhost:3000/dashboard_scripts', querystring.stringify(post_fetch_all), callback)
                .then( function(res){
                    console.log("success dashboard script")
                    console.log(res)
                    callback({ res_message: "OK", message: "c bon" })
                }) 
                .catch(err => {
                    console.log("error in dashboard scrip")
                    callback({ res_message: "NOT OK", message:err.response })
                    console.log(err.response)
                })*/



/*

//const bulk_changes_acl = ({ api_id, api_key, account_id, period } = {}, callback) => {
//}


    .then(axios.spread((r_subaccounts, r_stats, r_sub, r_sites) => {

        console.log("POST SUBACCOUNT OK")
        //console.log(r_sub.data)
        fs.writeFileSync('public/export_subaccounts.json', JSON.stringify(r_subaccounts.data))

    }))
    .catch((err) => {
        console.log('FAIL', err)
        callback({ res_message: "NOK", title: "error when running the API", message: "Connectivity error or NodeJS parser error.\n Try the command: node --http-parser=legacy src/app.js " })
    })

}

*/
