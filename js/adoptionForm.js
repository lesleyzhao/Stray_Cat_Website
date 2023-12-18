document.addEventListener("DOMContentLoaded", () => {
    const selectedCat = localStorage.getItem("selectedCat");
    if (selectedCat) {
        const cat = JSON.parse(selectedCat);
        const catInfoDiv = document.getElementById("cat-info");

        const environmentListItems = Object.entries(cat.environment)
            .filter(([key, value]) => value)
            .map(([key]) => `<li>${key.charAt(0).toUpperCase() + key.slice(1)}</li>`)
            .join('');

        // Convert tags array to an HTML list
        const tagsListItems = cat.tags.map(tag => `<li>${tag}</li>`).join('');

        catInfoDiv.innerHTML = `
            <h3>${cat.name}</h3>
            <h5>${cat.description}</h5>
            <p>Breed: ${cat.breeds.primary}<br> Size: ${cat.size}<br> Age: ${cat.age}<br> Gender: ${cat.gender}</p>
            <p>Environment:</p>
            <ul>${environmentListItems}</ul>
            <p>Tags:</p>
            <ul>${tagsListItems}</ul>
            <a href="${cat.url}" target="_blank">Link to Official Adoption Site</a><br>
            <img src="${cat.photos[0].medium}" alt="${cat.name}" style="max-width:100%;height:auto;">
        `;
        document.getElementById("selectedCat").value = selectedCat;
    }
});