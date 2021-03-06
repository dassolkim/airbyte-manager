// const rp = require('request-promise-native')
// const configInfo = require('../../config/connectConfig.js')
const axios = require('axios').default
// const sourceLogic = require('./sourceLogic.js')

module.exports = {createLogic, connectionSync}

function createConnection(defaultUrl, data) {
    var url = defaultUrl + "connections/create"
    var result = axios.post(url, data)
    .then(function (response){
        var data = response.data
        return data

    }).catch(function (error){
        console.log(error)
    })
    return result
}

function connectionSync(defaultUrl, connectionId) {
    var url = defaultUrl + "connections/sync"
    var data = {
        connectionId: connectionId
    }
    var result = axios.post(url, data)
    .then(function (response){
        var data = response.data
        return data

    }).catch(function (error){
        console.log(error)
        return null
    })
    return result
}

function getConnection(defaultUrl, connectionId) {
    var url = defaultUrl + "connections/get"
    var data = {
        connectionId: connectionId
    }
    var result = axios.post(url, data)
    .then(function (response){
        var data = response.data
        return data

    }).catch(function (error){
        console.log(error)
        return null
    })
    return result
}

function fetchConnection(connectionId){
    var url = configInfo.defaultUrl + "state/get"
    var data = {
        connectionId: connectionId
    }
    var result = axios.post(url, data)
    .then(function (response){
        var data = response.data
        return data

    }).catch(function (error){
        console.log(error)
    })
    return result
}

async function createLogic(url, data, sync){
    try{
        var defaultUrl = url
        var connection = await createConnection(defaultUrl, data)
        var connectionId = connection.connectionId
        var getConnectionResult = await getConnection(defaultUrl, connectionId)
        if (getConnectionResult.connectionId == connectionId){
            console.log("getConnection succeeded")
        } else {
            console.log("getConnection failed")
        }
        // console.log(connection)
        console.log('createConnection succeeded')
        if (getConnectionResult.connectionId != null && sync == true){
            var syncResult = await connectionSync(defaultUrl, connectionId)
            if (syncResult != null){
                console.log(syncResult)
                console.log('syncConnection succeeded')
                return true
            } else {
                console.log("syncConnection failed")
                return false
            }
        }
    } catch (error) {
        console.log(error.response)
    }   
}
