const fs = require('fs')
const axios = require('axios')
const querystring = require('querystring');

// site_list = site_id_input;

const_response = {
    res_message: "",
    status: "success"
}

/*
const post_data = {
    api_id: api_id,
    api_key: api_key,
    account_id: "account_id",
    page_site: 100
}


function bulk_changes  ({ api_id, api_key, site_id_input, rule_id, rule_id_2 }) {
    for(let i = 0; i<site_id_input.length; i++) {
    const site_id = site_id_input[i];
    if (rule_id == "api.threats.bot_access_control") {
        if (rule_id_2 == 'block_bad_bots') {
const post_action = {
        'account_id' : account_id,
        'api_id' : api_id,
        'api_key' : api_key,
        'site_id' : site_value,
        'rule_id' : rule_id,
        'block_bad_bots' : block_bad_bots	
}
        } else if (rule_id_2 == 'challenge_suspected_bots'){

        }
    }
}
}



//const bulk_changes_acl = ({ api_id, api_key, account_id, period } = {}, callback) => {
//}
/*
const post_data = {
    api_id: api_id,
    api_key: api_key,
    account_id: account_id
    //       'page_size': 100
}


/*
const sites_list = ({ api_id, api_key, account_id, period } = {}, callback) => {
    console.log("received JSON")
    console.log({ api_id, api_key, account_id, period })


    const post_data = {
        api_id: api_id,
        api_key: api_key,
        account_id: account_id
        //       'page_size': 100
    }

    const post_stats = {
        api_id: api_id,
        api_key: api_key,
        account_id: account_id,
        stats: 'visits_timeseries, hits_timeseries, bandwidth_timeseries, requests_geo_dist_summary, visits_dist_summary, caching, caching, caching_timeseries, threats, incap_rules, incap_rules_timeseries',
        time_range: period
    }


    // SITE LIST JSON



    // PROMISE FOR ALL CALLS
    axios.all([
        axios.post('https://my.imperva.com/api/prov/v1/accounts/listSubAccounts', querystring.stringify(post_data)),
        axios.post('https://my.imperva.com/api/stats/v1', querystring.stringify(post_stats)),
        axios.post('https://my.imperva.com/api/prov/v1/accounts/subscription', querystring.stringify(post_data)),
        axios.post('https://my.imperva.com/api/prov/v1/sites/list', querystring.stringify(post_data))
    ])

        .then(axios.spread((r_subaccounts, r_stats, r_sub, r_sites) => {

            console.log("POST SUBACCOUNT OK")
            //console.log(r_sub.data)
            fs.writeFileSync('public/export_subaccounts.json', JSON.stringify(r_subaccounts.data))

            console.log("POST STATS OK")
            //console.log(r_stats.data)
            fs.writeFileSync('public/export_account_stats.json', JSON.stringify(r_stats.data))

            console.log("POST SUBSCRIPTION OK")
            //console.log(r_sub.data)
            fs.writeFileSync('public/export_account_subscriptions.json', JSON.stringify(r_sub.data))

            console.log("POST LIST SITES")
            if (r_sites.data.res_message != "OK") {
                callback({ res_message: "NOK", title: "Error", message: "Make sure you are using Admin Keys\n Test on API explorer: /api/prov/v1/sites/list\n error code: " + r_sites.data.res_message })
                //ADD ERROR IN CASE OF API AUTH ERROR
                //                    text: ("Make sure you are using Admin Keys\n Test on API explorer: /api/prov/v1/sites/list\n error code: " + data.res_message),

            } else {
                console.log(r_sites.data)
                var sites_array = r_sites.data.sites
                console.log("export ARRAY")
                console.log(sites_array)
                console.log(sites_array.length)
                callback({ res_message: "OK" })
                fs.writeFileSync('public/export_sites.json', JSON.stringify(sites_array))

            }
        }))
        .catch((err) => {
            console.log('FAIL', err)
            callback({ res_message: "NOK", title: "error when running the API", message: "Connectivity error or NodeJS parser error.\n Try the command: node --http-parser=legacy src/app.js " })
        })

}

const version_check = ({ api_id, api_key, account_id, period } = {}, callback) => {
}

module.exports = {
    sites_list,
    version_check
}


module.exports = {
    bulk_changes
    //  bulk_changes_acl
}

*/
