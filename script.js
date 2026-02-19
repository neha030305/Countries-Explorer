console.log("JS connected successfully");

const sortSelect = document.getElementById("sortSelect");

const countriesList = document.getElementById("countriesList");
const searchInput = document.getElementById("searchName");
const searchCode = document.getElementById("searchCode");
const searchRegion = document.getElementById("searchRegion");
const searchCapital = document.getElementById("searchCapital");

const modal = document.getElementById("countryModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");


let allCountries = [];

// 🔹 Fetch Countries
async function getCountries() {
    try {
		const response = await fetch(
		    "https://restcountries.com/v3.1/all?fields=name,capital,region,cca2,flags,population"
		);


        allCountries = await response.json();

        displayCountries(allCountries);
    } catch (error) {
        console.error("Error fetching countries:", error);
    }
}

// 🔹 Display Countries
function displayCountries(countries) {

    countriesList.innerHTML = "";

    countries.forEach(country => {

        const div = document.createElement("div");
        div.classList.add("country-card");

        div.innerHTML = `
            <img src="${country.flags?.png}" alt="flag">
            <h3>${country.name.common}</h3>
            <p><strong>Code:</strong> ${country.cca2}</p>
            <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
            <p><strong>Region:</strong> ${country.region || "N/A"}</p>
        `;

        div.addEventListener("click", function() {
            console.log("Clicked:", country.name.common);
            openModal(country);
        });

        countriesList.appendChild(div);
    });
}



//Open Modal
function openModal(country) {

    modalBody.innerHTML = `
        <h2>${country.name.common}</h2>
        <img src="${country.flags?.png}" style="width:200px">
        <p><strong>Code:</strong> ${country.cca2}</p>
        <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
        <p><strong>Region:</strong> ${country.region || "N/A"}</p>
    `;

    modal.style.display = "block";
}






// 🔹 Filter Function
function filterCountries() {

    if (allCountries.length === 0) return;

    const nameValue = searchInput.value.toLowerCase();
    const codeValue = searchCode.value.toLowerCase();
    const regionValue = searchRegion.value.toLowerCase();
    const capitalValue = searchCapital.value.toLowerCase();

    let filtered = allCountries.filter(country => {

        const nameMatch = country.name.common
            .toLowerCase()
            .includes(nameValue);

        const codeMatch = country.cca2
            .toLowerCase()
            .includes(codeValue);

        const regionMatch = (country.region || "")
            .toLowerCase()
            .includes(regionValue);

        const capitalMatch = (country.capital?.[0] || "")
            .toLowerCase()
            .includes(capitalValue);

        return nameMatch && codeMatch && regionMatch && capitalMatch;
    });
	const sortValue = sortSelect.value;

	if (sortValue === "az") {
	    filtered.sort((a, b) => a.name.common.localeCompare(b.name.common));
	}

	if (sortValue === "za") {
	    filtered.sort((a, b) => b.name.common.localeCompare(a.name.common));
	}

	if (sortValue === "popHigh") {
	    filtered.sort((a, b) => b.population - a.population);
	}

	if (sortValue === "popLow") {
	    filtered.sort((a, b) => a.population - b.population);
	}

    displayCountries(filtered);
}

// 🔹 Event Listeners
searchInput.addEventListener("input", filterCountries);
searchCode.addEventListener("input", filterCountries);
searchRegion.addEventListener("input", filterCountries);
searchCapital.addEventListener("input", filterCountries);

// 🔹 Load Data
getCountries();


closeModal.addEventListener("click", function() {
    modal.style.display = "none";
});

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀ Light Mode";
    } else {
        themeToggle.textContent = "🌙 Dark Mode";
    }
});


sortSelect.addEventListener("change", filterCountries);
