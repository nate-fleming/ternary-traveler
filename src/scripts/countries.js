import DBcalls from "./dbCalls"

const countryDiv = document.querySelector("#countries")
const interestsDiv = document.querySelector("#pointsOfInterest")
const modalContent = document.querySelector(".modal-content")
const setAttributes = (element, attributes) => {
    for (var key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

const handleCountries = {
    makeCountryList() {
        DBcalls.getCountries()
            .then(countries => {
                countries.forEach(country => {
                    countryDiv.innerHTML += `
                    <h3>${country.name}</h3>
                    <button id="POI--${country.id}" class="POI-btn">See Points of Interest</button>
                    `
                })
                countryDiv.innerHTML += `
                <hr>
                <h3>Add New Points of Interest</h3>
                <button id='makeInterestBtn' class='makeInterestBtn'>Add Interest</button>
                `
            })
    },
    makeInterestsList(countryId) {
        interestsDiv.innerHTML = ""
        interestsDiv.innerHTML = `<h2 class="point--${countryId}">Points of Interest</h2>`
        DBcalls.getInterests(countryId)
            .then(interests => {
                interests.forEach(interest => {
                    interestsDiv.innerHTML += `
                    <div id="interest--${interest.placeId}" class="interest">
                        <h2 id="name--${interest.id}" class="name">${interest.name}</h2>
                        <h3 id="cost--${interest.id}" class="cost">Cost $${interest.cost}</h3>
                        <h4 id="desc--${interest.id}" class="description">Description: ${interest.description}</h4>
                        <p id="review--${interest.id}" class="review">Review: ${interest.review}</p>
                        <button id="edit--${interest.id}" class="editBtn">Edit</button>
                        <button id="delete--${interest.id}" class="deleteBtn">Delete</button>
                    </div>
                    `
                })
            })
    },
    makeNewInterestForm() {
        interestsDiv.innerHTML = ""
        let interestFormDiv = document.createElement("div")
        interestFormDiv.className = "interest-form"

        let nameLabel = document.createElement("label")
        nameLabel.textContent = "Name:"

        let nameInput = document.createElement("input")
        setAttributes(nameInput, {
            id: "name-input",
            placeholder: "name of place"
        })

        let descLabel = document.createElement("label")
        descLabel.textContent = "Description:"

        let descInput = document.createElement("input")
        setAttributes(descInput, {
            id: "desc-input",
            placeholder: "descritption"
        })

        let costLabel = document.createElement("label")
        costLabel.textContent = "Cost:"

        let costInput = document.createElement("input")
        setAttributes(costInput, {
            id: "cost-input",
            placeholder: "cost"
        })

        let reviewLabel = document.createElement("label")
        reviewLabel.textContent = "Review:"

        let reviewInput = document.createElement("input")
        setAttributes(reviewInput, {
            id: "review-input",
            placeholder: "review"
        })

        let countryDropdown = document.createElement("select")
        countryDropdown.id = "country-input"

        let addButton = document.createElement("button")
        addButton.className = "newInterestBtn"
        addButton.textContent = "Add"

        DBcalls.getCountries()
            .then(countries => {
                countries.forEach(country => {
                    let countryOption = document.createElement("option")
                    countryOption.textContent = country.name
                    countryOption.value = country.id
                    countryDropdown.appendChild(countryOption)
                })
                interestFormDiv.append(nameLabel, nameInput, descLabel, descInput, costLabel, costInput, reviewLabel, reviewInput, countryDropdown, addButton)
                interestsDiv.appendChild(interestFormDiv)
            })
    },
    addInterest(name, desc, cost, review, countryId) {
        let object = {
            placeId: Number(countryId),
            name: name,
            description: desc,
            cost: cost,
            review: review
        }
        DBcalls.makeInterest(object)
            .then(result => {
                handleCountries.makeInterestsList(countryId)
            })
    },
    deleteInterest(interestId, countryId) {
        DBcalls.deleteInterest(interestId)
            .then(result => {
                handleCountries.makeInterestsList(countryId)
            })
    },
    editInterestForm(editId) {
        console.log(editId)
        DBcalls.getOneInterest(editId)
            .then(interest => {
                console.log(interest)
                interestsDiv.innerHTML = ""
                interestsDiv.innerHTML += `
            <div id="edit--${interest[0].placeId}" class="edit-form">
                <h2>${interest[0].name}</h2>
                <h4>${interest[0].description}</h4>
                <label>Cost:</label>
                <input id="cost-edit" placeholder="${interest[0].cost}"></input>
                <label>Review:</label>
                <input id="review-edit" placeholder="${interest[0].review}"></input>
                <button id="saveEdit--${interest[0].id}" class="saveEditBtn">Save Edits</button>
            </div>
            `
            })
    },
    editInterest(countryId, interestId, cost, review) {
        let object = {
            cost: cost,
            review: review
        }

        DBcalls.editInterest(interestId, object)
            .then(result => {
                handleCountries.makeInterestsList(countryId)
            })
    },
    makeModal(deleteId, countryId) {
        modalContent.innerHTML = ""

        let deleteButton = document.createElement("button")
        deleteButton.textContent = "yes"
        deleteButton.setAttribute("data-deletebuttonid", deleteId)
        deleteButton.setAttribute("data-countryreloadid", countryId)
        deleteButton.className = "deleteButton"

        let span = document.createElement("span")
        span.className = "close"
        span.textContent = "Cancel"

        let p = document.createElement("p")
        p.textContent = "Are you sure?"


        modalContent.appendChild(p)
        modalContent.appendChild(deleteButton)
        modalContent.appendChild(span)
    }
}

export default handleCountries


