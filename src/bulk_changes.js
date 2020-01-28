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


const bulk_changes_acl = ({ api_id, api_key, account_id, site_id_input, rule_id, ips_url_country }, callback) => {

    const post_site_conf = {
        "api_id": api_id,
        "api_key": api_key,
        "site_id": site_id_input[0]
    }

    axios.post('https://my.imperva.com/api/prov/v1/sites/status', querystring.stringify(post_site_conf))
        .then(function (response) {
            const old_ips = { blacklist: "", whitelist: "" }
            const old_ips_blacklist = []
            if (response.data.security.acls === undefined) {
                console.log("not IP found in White/blacklist")

            } else {
                console.log("there are IPs in White/blacklist")
                console.log(response.data.security.acls)
                const acl_rules_1 = response.data.security.acls
                // LOOP to check if there are existing IPs in black/whitelist
                for (let i = 0; i < acl_rules_1.length; i++) {
                    if (response.data.security.acls.rules[i].id == "api.acl.whitelisted_ips") {
                        old_ips_whitelist = response.data.security.acls.rules[i].ips
                    } else if (response.data.security.acls.rules[i].id == "api.acl.blacklisted_ips") {
                        old_ips_blacklist = response.data.security.acls.rules[i].ips
                    }
                }

            }
            let new_ip_list = ""
            if (rule_id == "api.acl.whitelisted_ips") {
                // IMPLODE THE OLD BLACKLIST FROM ARRAYT TO ,,,
                const old_ips_string = old_ips_whitelist.join();
                new_ip_list = old_ips_string + "," + ips_url_country
            } else if (rule_id == "api.acl.blacklisted_ips") {

                let old_ips_string = old_ips_blacklist.join();
                console.log("old_ips_string")
                console.log(old_ips_blacklist)
                console.log(old_ips_string)
                if (old_ips_string == "") {
                    new_ip_list =  ips_url_country 
                } else {
                new_ip_list = old_ips_string + "," + ips_url_country
                }
            }
            console.log(new_ip_list)

            const post_site_new_conf = {
                "api_id": api_id,
                "api_key": api_key,
                "site_id": site_id_input[0],
                "rule_id": rule_id,
                "ips": new_ip_list
            }

            axios.post('https://my.imperva.com/api/prov/v1/sites/configure/acl', querystring.stringify(post_site_new_conf))
                .then(function (response) {
                    console.log("CONFIRMATION OF UPDATED SECURITY")
                    console.log(site_id_input)
                    console.log(post_site_new_conf)
                    response.data
                    if (site_id_input.length > 1) {
                        site_id_input.shift()
                        bulk_changes_acl({ api_id, api_key, account_id, site_id_input, rule_id, ips_url_country }, callback)
                    } else {
                        callback({ res_message: "OK", message: "c bon" })
                    }
                })
                .catch(error => {
                    console.log("ERROR")
                    console.log(error)
                    callback({ res_message: "NOK", message: error })
                })
        })
        .catch(error => {
            console.log("ERROR")
            console.log(error)
            callback({ res_message: "NOK", message: error })
        })

}


module.exports = {
    bulk_changes,
    bulk_changes_acl
}