const CLIENT_ID = "3cxNt3ISsU7BVt2T9RZttPMgbsPPAepY6ZPJyfpjCZGjBT1Zu7";
const CLIENT_SECRET = "lYouUIPLEMmlITEHSxwHXVx56rSx7SeU2JfuQxqz";

function getAccessToken() {
  const tokenURL = "https://api.petfinder.com/v2/oauth2/token";

  const details = {
    grant_type: "client_credentials",
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  const formBody = [];
  for (const property in details) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }

  return fetch(tokenURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formBody.join("&"),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.access_token; // Returns the access token
    })
    .catch((error) => {
      console.error("Error fetching access token:", error);
    });
}

function fetchCats(accessToken) {
  const CAT_API = `https://api.petfinder.com/v2/animals?type=cat`;

  fetch(CAT_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      displayCats(data.animals);
    })
    .catch((error) => {
      console.error("Error fetching cat data:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  getAccessToken().then((accessToken) => {
    if (accessToken) {
      fetchCats(accessToken);
    } else {
      console.error("Failed to retrieve access token");
    }
  });
});

function displayCats(cats) {
  const container = document.getElementById("cats-container");
  container.innerHTML = "";

  cats.forEach((cat) => {
    if (cat.photos && cat.photos.length > 0 && cat.photos[0].medium) {
      const catCard = document.createElement("div");
      catCard.className = "cat-card";

      const catImage = document.createElement("img");
      catImage.src = cat.photos[0].medium;
      catImage.alt = cat.name;

      const catName = document.createElement("h3");
      catName.textContent = cat.name;

      const catDetails = document.createElement("p");
      catDetails.textContent = `Breed: ${cat.breeds.primary}, Size: ${cat.size}, Age: ${cat.age}, Gender: ${cat.gender}`;

      const catTags = document.createElement("p");
      catTags.textContent = `Tags: ${cat.tags.join(", ")}`;

      const catColor = document.createElement("p");
      catColor.textContent = `Color: ${cat.colors.primary || "N/A"}`;

      catCard.addEventListener("click", () => {
        localStorage.setItem("selectedCat", JSON.stringify(cat));

        const link = document.createElement("a");
        link.href = "adoptionForm.html";
        link.target = "_blank";
        document.body.appendChild(link); // Append to body temporarily
        link.click(); // Simulate a click
        document.body.removeChild(link);
      });

      catCard.appendChild(catImage);
      catCard.appendChild(catName);
      catCard.appendChild(catDetails);
      catCard.appendChild(catTags);
      catCard.appendChild(catColor);

      container.appendChild(catCard);
    }
  });
}

document.addEventListener("DOMContentLoaded", fetchCats);
