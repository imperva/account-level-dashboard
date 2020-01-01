const fs = require('fs')
const axios = require('axios')
const querystring = require('querystring');


const sites_list = ({ api_id, api_key, account_id, period } = {}, callback) => {
    console.log("received JSON")
    console.log({ api_id, api_key, account_id, period })


    const post_data = {
        api_id: api_id,
        api_key: api_key,
        account_id: account_id
    }

    const post_data_sites = {
        api_id: api_id,
        api_key: api_key,
        account_id: account_id,
        page_size: 100,
        page_num: 0
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
        axios.post('https://my.imperva.com/api/prov/v1/sites/list', querystring.stringify(post_data_sites))
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

            } else {
                let sites_array = r_sites.data.sites

                if (r_sites.data.sites.length == 100) {    // perhaps take out this check
                    // callback({ res_message: "NOK", title: "Error", message: "I found 5 sites" + r_sites.data.res_message })
                    function loop_site_list() {
                        post_data_sites.page_num += 1
                        console.log(post_data_sites)
                        axios.post('https://my.imperva.com/api/prov/v1/sites/list', querystring.stringify(post_data_sites))
                            .then(function (r_sites_loop) {
                                console.log("SITES IN LOOP")
                                console.log(r_sites_loop.data.sites.length);
                                sites_array = sites_array.concat(r_sites_loop.data.sites)
                                if (r_sites_loop.data.sites.length == 100) {
                                    loop_site_list()
                                } else {
                                    fs.writeFileSync('public/export_sites.json', JSON.stringify(sites_array))
                                    callback({ res_message: "OK" })
                                }
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    }
                    loop_site_list()
                } else {
                    fs.writeFileSync('public/export_sites.json', JSON.stringify(sites_array))
                    callback({ res_message: "OK" })

                }
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




