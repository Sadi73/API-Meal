function initialFetch(name) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(res => res.json())
        .then(data => loadMeals(data))
}


const loadMeals = (data) => {
    const mealContainer = document.getElementById('meal-container');
    for (meal of data.meals) {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <button onclick="detailsFromID('${meal.idMeal}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailsMOdal">
                        Recipe
                    </button>
                </div>
            </div>
        `
        mealContainer.appendChild(div);
    }
}

const buttonDetails = (idMeal) => console.log(idMeal);
const detailsFromID = (idMeal) => {

    const IdURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    console.log(IdURL);
    fetch(IdURL)
        .then(res => res.json())
        .then(data => modal(data));
}

const modal = (data) => {
    console.log(data.meals[0]);
    document.getElementById('exampleModalLabel').innerText = `${data.meals[0].strMeal}`;
    document.getElementById('modal-body').innerHTML = `
        <img src="${data.meals[0].strMealThumb}" class="img-fluid">
        <p>Instructions: ${data.meals[0].strInstructions}</p>
    
    `
}

initialFetch('rice');

document.getElementById('search-btn').addEventListener('click', function(){
    const searchItem = document.getElementById('search-input').value;
    const url2 = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`;
    console.log(url2);
    fetch(url2)
    .then(res => res.json())
    .then(data => searchFunction(data))
})

const searchFunction = (data) =>{
    document.getElementById('meal-container').innerHTML = '';
    loadMeals(data)
}