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
    axios.post('https://my.imperva.com/api/prov/v1/sites/configure/security', querystring.stringify(post_security))
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

//const bulk_changes = ({ api_id, api_key, account_id, site_id_input, rule_id, rule_id_2, rule_id_2_value }, callback) => {
/*
const bulk_changes_acl = ({ api_id, api_key, account_id, site_id_input, rule_id, rule_id_2, rule_id_2_value }, callback) => {

        let post_site_conf = {
            "api_id": api_id,
            "api_key": api_key,
            "site_id": site_id_input[0]
        }

        axios.post('https://www.imperva.com/api/prov/v1/sites/status', querystring.stringify(post_site_conf))
        .then(function (response) {
            if (response.data.security.acls === 'undefined'){
              //  IF THERE IS NO IP CONFIGURED
            } else {
                // IF THERE ARE IPS CONFIGURED
            }
            console.log(response.data.domain)
            if (site_id_input.length > 1) {
                site_id_input.shift()
                bulk_changes_acl({ "api_id": api_id, "api_key": api_key, "account_id": account_id, "site_id_input": site_id_input, "rule_id": post_security.rule_id, "rule_id_2": rule_id_2, "rule_id_2_value": rule_id_2_value }, callback)
            } else {
                callback({ res_message: "OK", message: "c bon" })
            }
        })
        .catch(error => {
            console.log("ERROR")
            console.log(error)
        })
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
        axios.post('https://www.incapse.ml/api/prov/v1/sites/configure/security', querystring.stringify(post_security))
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
*/

module.exports = {
    bulk_changes
}



