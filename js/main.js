
const card = document.getElementById("card");


async function fetchGameDetails(q = 730) {
  const url = `https://games-details.p.rapidapi.com/gameinfo/single_game/${q}`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '92bd7f72f4msh83adf71fbdadad8p110642jsn71f7a599b9ba',
		'x-rapidapi-host': 'games-details.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(Data(result))
	console.log(result);
} catch (error) {
	console.error(error);
}

}
fetchGameDetails();



async function Data(Body) {
 card.innerHTML =`
 <div class="card text-white bg-transparent " data-id=${Body.id} >
  <img src="https:${imageUrl}" class="card-img-top" alt="...">
  <div class="card-body position-relative">
    <h3 class="card-title">${Body.name}</h3>
 <h5><span class="badge position-absolute">${price}</span></h5>
    <p class="card-text">${Body.desc}</p>
  </div>
 
  <div class="card-footer bg-transparent d-flex justify-content-between">
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>

  `;
 
 
}
Data("730");
console.log(Data());




function getPages(){

const url = 'https://games-details.p.rapidapi.com/page/1';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '92bd7f72f4msh83adf71fbdadad8p110642jsn71f7a599b9ba',
		'x-rapidapi-host': 'games-details.p.rapidapi.com'
	}
};
async function fetchProcess(){
try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
}
}
getPages();














