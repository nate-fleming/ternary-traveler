const DBcalls = {
    getCountries: function () {
        return fetch(`http://localhost:8088/places`)
            .then(response => response.json())
    },
    getInterests: function (countryId) {
        return fetch(`http://localhost:8088/interests?placeId=${countryId}`)
            .then(response => response.json())
    },
    getOneInterest: function (interestId) {
        return fetch(`http://localhost:8088/interests?id=${interestId}`)
            .then(response => response.json())
    },
    deleteInterest: function (interestId) {
        return fetch(`http://localhost:8088/interests/${interestId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
    },
    makeInterest: function (obj) {
        return fetch('http://localhost:8088/interests', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    editInterest: function (interestId, obj) {
        return fetch(`http://localhost:8088/interests/${interestId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    }
}


export default DBcalls