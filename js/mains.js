const apiHost = 'games-details.p.rapidapi.com';
const apiKey = '6ccdbe8eddmsheaee38c8bd22937p16b1d2jsn608523a69ab1';
let currentPage = 1;
const TOTAL_PAGES = 10;

async function fetchGameDetails(page) {
    const url = `https://${apiHost}/page/${page}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': apiHost
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log("Fetched page", page, ":", result);

        if (result && result.data && result.data.pages) {
            return result.data.pages;
        } else {
            console.error("Unexpected API response structure:", result);
            return result;
        }
    } catch (error) {
        console.error("Error fetching games:", error.message);
        return null;
    }
}


function renderGames(array) {
    let cartona = "";
    for (let i = 0; i < array.length; i++) {
        cartona += `
          <div class="col-md-4 col-sm-6 mb-5" id="card">
        <div class="card text-white bg-transparent"  onclick="showDetails('${array[i].id}')">
            <img src="${array[i].img}" class="card-img-top" alt="...">
            <div class="card-body position-relative">
                <h3 class="card-title text-wrap">${array[i].name}</h3>
                <h5><span class="badge position-absolute ">${array[i].price || 'Free'}</span></h5>
                <p class="card-text">${array[i].release_date}</p>
            </div>
            <div class="card-footer bg-transparent d-flex justify-content-between">
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
            </div>
        </div>
        </div>
        `;
    }
    rowBody.innerHTML = cartona;
}





function renderPagination(totalPages, currentPage) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const maxVisible = 7; // Max buttons to show (adjust as needed)
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + maxVisible - 1, totalPages);

    if (end - start < maxVisible - 1) {
        start = Math.max(end - maxVisible + 1, 1);
    }



    // Page buttons
    for (let i = start; i <= end; i++) {
        const li = document.createElement("li");
        li.className = `page-item ${i === currentPage ? "active" : ""}`;
        li.innerHTML = `<button class="page-link" onclick="loadPage(${i})">${i}</button>`;
        pagination.appendChild(li);
    }

    // Previous button
    if (start > 1) {
        const li = document.createElement("li");
        li.className = "page-item";
        li.innerHTML = `<button class="page-link" onclick="loadPage(${start - 1})">&laquo;</button>`;
        pagination.insertBefore(li, pagination.firstChild);
    }

    // Next button
    if (end < totalPages) {
        const li = document.createElement("li");
        li.className = "page-item";
        li.innerHTML = `<button class="page-link" onclick="loadPage(${end + 1})">&raquo;</button>`;
        pagination.appendChild(li);
    }
}

async function showDetails(id) {
    const url = `https://games-details.p.rapidapi.com/gameinfo/about_game/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': apiHost
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const game = result.data;
console.log(game);

        if (!game) {
            alert("Game details not found.");
            return;
        }

        // Display details (customize as needed)
        const modalContent = `
            <p><strong>Release Date:</strong> ${game.about_game}</p>
        `;
        showModal(modalContent); 

    } catch (error) {
        console.error("Error fetching game details:", error);
        alert("Failed to load game details.");
    }
}
function showModal(content) {
    document.getElementById("modalContent").innerHTML = content;
    const modal = new bootstrap.Modal(document.getElementById("gameModal"));
    modal.show();
}


async function loadPage(page) {
    currentPage = page;
    const data = await fetchGameDetails(page);

    const games = data?.data?.pages || [];

    const totalPages = data?.data?.total_page || 10;

    renderGames(games);
    renderPagination(totalPages, page);
}

document.addEventListener("DOMContentLoaded", () => {
    loadPage(1);

});
