import handleCountries from "./countries"

handleCountries.makeCountryList()

const countryDiv = document.querySelector("#countries")
const interestsDiv = document.querySelector("#pointsOfInterest")
const modal = document.getElementById("myModal")


countryDiv.addEventListener("click", (e) => {
    e.preventDefault()
    if (e.target.className === "POI-btn") {
        let countryId = e.target.id.split("--")[1]
        handleCountries.makeInterestsList(countryId)
    } else if (e.target.className === "makeInterestBtn") {
        let countryId = e.target.id.split("--")[1]
        handleCountries.makeNewInterestForm(countryId)
    }
})

interestsDiv.addEventListener("click", (e) => {
    e.preventDefault()
    if (e.target.className === "newInterestBtn") {
        const interestName = document.querySelector("#name-input")
        const interestDesc = document.querySelector("#desc-input")
        const interestCost = document.querySelector("#cost-input")
        const interestReview = document.querySelector("#review-input")
        const interestCountry = document.querySelector("#country-input")

        handleCountries.addInterest(interestName.value, interestDesc.value, interestCost.value, interestReview.value, interestCountry.value)
    } else if (e.target.className === "deleteBtn") {
        let deleteId = e.target.id.split("--")[1]
        let countryForReload = e.target.parentNode.id.split("--")[1]
        modal.style.display = "block"
        handleCountries.makeModal(deleteId, countryForReload)
    } else if (e.target.className === "editBtn") {
        let editId = e.target.id.split("--")[1]
        handleCountries.editInterestForm(editId)
    } else if (e.target.className === "saveEditBtn") {
        let saveEditId = e.target.id.split("--")[1]
        const editCost = document.querySelector("#cost-edit")
        const editReview = document.querySelector("#review-edit")
        let countryForReload = e.target.parentNode.id.split("--")[1]

        handleCountries.editInterest(countryForReload, saveEditId, editCost.value, editReview.value)
    }
})

// span.addEventListener("click", (e) => {
//     e.preventDefault()
//     modal.style.display = "none"
// })

modal.addEventListener("click", (e) => {
    e.preventDefault()
    if (e.target.className === "deleteButton") {
        let id = e.target.getAttribute("data-deletebuttonid")
        let reloadId = e.target.getAttribute("data-countryreloadid")
        handleCountries.deleteInterest(id, reloadId)
        modal.style.display = "none"
    } else if (e.target.className === "close") {
        modal.style.display = "none"
    }
})
