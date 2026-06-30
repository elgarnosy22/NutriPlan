import { renderFoodLog } from './foodLog.js';
export const recipes = document.getElementById("recipes-grid");
export let finalData = [];

export async function fetchRecipesByCategory(category, limit = 20) {
  let url = category.toLowerCase() === 'chicken'
    ? `https://nutriplan-api.vercel.app/api/meals/search?q=chicken&page=1&limit=25`
    : `https://nutriplan-api.vercel.app/api/meals/filter?category=${category.toLowerCase()}&page=1&limit=${limit}`;

  try {
    let response = await fetch(url);
    let data = await response.json();

    if (data && data.results) {
      finalData = data.results;
      document.getElementById("recipes-count").innerHTML = `Showing ${finalData.length} recipes`;
      displayRecipes();
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

export async function fetchRecipesByArea(area, limit = 20) {
  if (area === 'All') {
    fetchRecipesByCategory('chicken');
    return;
  }

  let url = `https://nutriplan-api.vercel.app/api/meals/filter?area=${area.toLowerCase()}&page=1&limit=${limit}`;

  try {
    let response = await fetch(url);
    let data = await response.json();

    if (data && data.results) {
      finalData = data.results;
      document.getElementById("recipes-count").innerHTML = `Showing ${finalData.length} recipes`;
      displayRecipes();
    } else {
      recipes.innerHTML = `<div class="col-span-4 text-center py-8 text-gray-500 font-medium">No recipes found for ${area}</div>`;
      document.getElementById("recipes-count").innerHTML = `Showing 0 recipes`;
    }
  } catch (error) {
    console.error("Error fetching recipes by area:", error);
  }
}

const areaButtons = document.querySelectorAll(".area-btn");

areaButtons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    const area = e.currentTarget.dataset.area;

    areaButtons.forEach(b => {
      b.classList.remove('bg-emerald-600', 'text-white');
      b.classList.add('bg-gray-100', 'text-gray-700');
    });
    e.currentTarget.classList.remove('bg-gray-100', 'text-gray-700');
    e.currentTarget.classList.add('bg-emerald-600', 'text-white');

    recipes.innerHTML = `<div class="col-span-4 flex justify-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>`;

    fetchRecipesByArea(area);
  });
});

export function displayRecipes() {
  let cartona = ``;
  for (let i = 0; i < finalData.length; i++) {
    let categoryName = finalData[i].category || 'Meal';
    let areaName = finalData[i].area || 'Global';

    cartona += `
            <div class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-meal-id="${finalData[i].idMeal || '52772'}">
                <div class="relative h-48 overflow-hidden">
                    <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="${finalData[i].thumbnail}" alt="${finalData[i].name}" loading="lazy" />
                    <div class="absolute bottom-3 left-3 flex gap-2">
                        <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">${categoryName}</span>
                        <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">${areaName}</span>
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">${finalData[i].name}</h3>
                    <p class="text-xs text-gray-600 mb-3 line-clamp-2">${finalData[i].instructions || 'View recipe for instructions.'}</p>
                    <div class="flex items-center justify-between text-xs">
                        <span class="font-semibold text-gray-900"><i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>${categoryName}</span>
                        <span class="font-semibold text-gray-500"><i class="fa-solid fa-globe text-blue-500 mr-1"></i>${areaName}</span>
                    </div>
                </div>
            </div>`;
  }
  recipes.innerHTML = cartona;
  details();
}

const categoryCards = document.querySelectorAll(".category-card");

categoryCards.forEach(card => {
  card.addEventListener("click", (e) => {
    const category = e.currentTarget.dataset.category;

    recipes.innerHTML = `<div class="col-span-4 flex justify-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>`;

    fetchRecipesByCategory(category);
  });
});

export function details() {
  const cards = document.querySelectorAll(".recipe-card")
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', async () => {
      document.getElementById("search-filters-section").classList.add("hidden")
      document.getElementById("meal-categories-section").classList.add("hidden")
      document.getElementById("all-recipes-section").classList.add("hidden")
      document.getElementById("products-section").classList.add("hidden")
      document.getElementById("foodlog-section").classList.add("hidden")
      document.getElementById("meal-details").classList.remove("hidden")

      await displayDetails(i);
    })
  }
}

const backBtn = document.getElementById("back-to-meals-btn")
backBtn.addEventListener('click', () => {
  document.getElementById("search-filters-section").classList.remove("hidden")
  document.getElementById("meal-categories-section").classList.remove("hidden")
  document.getElementById("all-recipes-section").classList.remove("hidden")
  document.getElementById("products-section").classList.add("hidden")
  document.getElementById("foodlog-section").classList.add("hidden")
  document.getElementById("meal-details").classList.add("hidden")
})

export async function displayDetails(index) {
  const meal = finalData[index];
  const meal2 = meal.ingredients || [];

  const goalProtein = 150;
  const goalCarbs = 250;
  const goalFat = 65;
  const goalFiber = 30;
  const goalSugar = 50;
  const goalSatFat = 20;

  const proteinWidth = Math.min(100, Math.round((Protein / goalProtein) * 100));
  const carbsWidth = Math.min(100, Math.round((Carbs / goalCarbs) * 100));
  const fatWidth = Math.min(100, Math.round((Fat / goalFat) * 100));
  const fiberWidth = Math.min(100, Math.round((Fiber / goalFiber) * 100));
  const sugarWidth = Math.min(100, Math.round((Sugar / goalSugar) * 100));
  const satFatWidth = Math.min(100, Math.round((SaturatedFat / goalSatFat) * 100));
  if (!meal) return;

  const prepTime = Math.floor(Math.random() * 45) + 15;

  let servings = 1;
  let calories = 0, Protein = 0, Carbs = 0, Fat = 0, Fiber = 0, Sugar = 0, SaturatedFat = 0;

  const ingredientsList = meal2.map(item => `${item.measure} ${item.ingredient}`);

  try {
    const response = await fetch('https://nutriplan-api.vercel.app/api/nutrition/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'zprk1pBavLcs5182ptkPyIzV1sis1bxz9rNf3em4'
      },
      body: JSON.stringify({
        recipeName: meal.name,
        ingredients: ingredientsList
      })
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      if (jsonResponse.success && jsonResponse.data) {
        const apiData = jsonResponse.data;
        servings = apiData.servings || 1;

        if (apiData.perServing) {
          calories = Math.round(apiData.perServing.calories || 0);
          Protein = Math.round(apiData.perServing.protein || 0);
          Carbs = Math.round(apiData.perServing.carbs || 0);
          Fat = Math.round(apiData.perServing.fat || 0);
          Fiber = Math.round(apiData.perServing.fiber || 0);
          Sugar = Math.round(apiData.perServing.sugar || 0);
          SaturatedFat = Math.round(apiData.perServing.saturatedFat || 0);
        }
      }
    } else {
      console.error("Failed to fetch nutrition data");
    }
  } catch (error) {
    console.error("Error fetching nutrition data:", error);
  }

  let ingredientsCartona = '';
  if (meal2.length > 0) {
    for (let i = 0; i < meal2.length; i++) {
      const measure = meal2[i].measure || '';
      const ingredient = meal2[i].ingredient || '';
      ingredientsCartona += `
        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
            <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
            <span class="text-gray-700">
                <span class="font-medium text-gray-900">${measure}</span> ${ingredient}
            </span>
        </div>`;
    }
  } else {
    ingredientsCartona = `<p class="text-gray-500 col-span-2 py-2">No ingredients available for this meal filter.</p>`;
  }

  let instructionsCartona = '';
  if (meal.instructions) {
    for (let i = 0; i < meal.instructions.length; i++) {
      instructionsCartona += `
        <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
            <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                ${i + 1}
            </div>
            <p class="text-gray-700 leading-relaxed pt-2">
                ${meal.instructions[i]}
            </p>
        </div>`;
    }
  } else {
    instructionsCartona = `<p class="text-gray-500 py-2">No instructions available for this meal filter.</p>`;
  }

  let youtubeEmbed = '';
  if (meal.youtube) {
    let videoId = meal.youtube.split('v=')[1];
    if (videoId) {
      let ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
      youtubeEmbed = `
        <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-video text-red-500"></i>
                Video Tutorial
            </h2>
            <div class="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                <iframe src="https://www.youtube.com/embed/${videoId}" class="absolute inset-0 w-full h-full"
                    frameborder="0" allowfullscreen>
                </iframe>
            </div>
        </div>`;
    }
  }

  let cartona = `
  <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
    <div class="relative h-80 md:h-96">
      <img src="${meal.thumbnail || ''}" alt="${meal.name || 'Meal'}" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
      <div class="absolute bottom-0 left-0 right-0 p-8">
        <div class="flex items-center gap-3 mb-3">
          <span class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">${meal.category || 'Category'}</span>
          <span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">${meal.area || 'Area'}</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">${meal.name || ''}</h1>
        <div class="flex items-center gap-6 text-white/90">
          <span class="flex items-center gap-2"><i class="fa-solid fa-clock"></i><span>${prepTime} min</span></span>
          <span class="flex items-center gap-2"><i class="fa-solid fa-utensils"></i><span>${servings} servings</span></span>
          <span class="flex items-center gap-2"><i class="fa-solid fa-fire"></i><span>${calories} cal/serving</span></span>
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-wrap gap-3 mb-8">
    <button id="log-meal-btn" class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all" data-meal-id="${meal.idMeal || ''}">
      <i class="fa-solid fa-clipboard-list"></i>
      <span>Log This Meal</span>
    </button>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div class="lg:col-span-2 space-y-8">
      
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <i class="fa-solid fa-list-check text-emerald-600"></i>
          Ingredients
          <span class="text-sm font-normal text-gray-500 ml-auto">${meal2.length} items</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${ingredientsCartona}
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-lg p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
          Instructions
        </h2>
        <div class="space-y-4">
          ${instructionsCartona}
        </div>
      </div>

      ${youtubeEmbed}
      
    </div>

    <div class="space-y-6">
      <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
        <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <i class="fa-solid fa-chart-pie text-emerald-600"></i>
          Nutrition Facts
        </h2>
        <div id="nutrition-facts-container">
          <p class="text-sm text-gray-500 mb-4">Per serving</p>
          <div class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">
            <p class="text-sm text-gray-600">Calories per serving</p>
            <p class="text-4xl font-bold text-emerald-600">${calories}</p>
            <p class="text-xs text-gray-500 mt-1">Total: ${calories * servings} cal</p>
          </div>
                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span class="text-gray-700">Protein</span>
                      </div>
                      <span class="font-bold text-gray-900">${Protein}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div class="bg-emerald-500 h-2 rounded-full" style="width: ${proteinWidth}%"></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span class="text-gray-700">Carbs</span>
                      </div>
                      <span class="font-bold text-gray-900">${Carbs}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div class="bg-blue-500 h-2 rounded-full" style="width: ${carbsWidth}%"></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span class="text-gray-700">Fat</span>
                      </div>
                      <span class="font-bold text-gray-900">${Fat}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div class="bg-purple-500 h-2 rounded-full" style="width: ${fatWidth}%"></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span class="text-gray-700">Fiber</span>
                      </div>
                      <span class="font-bold text-gray-900">${Fiber}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div class="bg-orange-500 h-2 rounded-full" style="width: ${fiberWidth}%"></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span class="text-gray-700">Sugar</span>
                      </div>
                      <span class="font-bold text-gray-900">${Sugar}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div class="bg-pink-500 h-2 rounded-full" style="width: ${sugarWidth}%"></div>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span class="text-gray-700">SaturatedFat</span>
                      </div>
                      <span class="font-bold text-gray-900">${SaturatedFat}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div class="bg-pink-500 h-2 rounded-full" style="width: ${satFatWidth}%"></div>
                    </div>
                  </div>
      </div>
    </div>
  </div>`;

  document.getElementById("detailData").innerHTML = cartona;
  const logBtn = document.getElementById("log-meal-btn");
  if (logBtn) {
    logBtn.onclick = () => {
      openLogModal(meal, calories, Protein, Carbs, Fat);
    };
  }

  let currentServings = 1;
  let baseCalories = 0, baseProtein = 0, baseCarbs = 0, baseFat = 0;

  function updateModalNutrition() {
    document.getElementById('modal-calories').innerText = baseCalories * currentServings;
    document.getElementById('modal-protein').innerText = (baseProtein * currentServings) + 'g';
    document.getElementById('modal-carbs').innerText = (baseCarbs * currentServings) + 'g';
    document.getElementById('modal-fat').innerText = (baseFat * currentServings) + 'g';
  }

  function openLogModal(mealData, cal, pro, carb, f) {
    const modal = document.getElementById('log-meal-modal');
    const modalContent = document.getElementById('log-meal-content');

    baseCalories = cal; baseProtein = pro; baseCarbs = carb; baseFat = f;
    currentServings = 1;

    document.getElementById('modal-meal-img').src = mealData.thumbnail || '';
    document.getElementById('modal-meal-name').innerText = mealData.name || 'Meal Name';
    document.getElementById('servings-input').value = currentServings;

    updateModalNutrition();

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      modalContent.classList.remove('scale-95');
    }, 10);
  }

  function closeLogModal() {
    const modal = document.getElementById('log-meal-modal');
    const modalContent = document.getElementById('log-meal-content');

    modal.classList.add('opacity-0');
    modalContent.classList.add('scale-95');
    setTimeout(() => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }, 300);
  }

  document.getElementById('cancel-log-btn').onclick = closeLogModal;

  document.getElementById('log-meal-modal').onclick = (e) => {
    if (e.target.id === 'log-meal-modal') closeLogModal();
  };

  document.getElementById('increase-servings').onclick = () => {
    currentServings++;
    document.getElementById('servings-input').value = currentServings;
    updateModalNutrition();
  };

  document.getElementById('decrease-servings').onclick = () => {
    if (currentServings > 1) {
      currentServings--;
      document.getElementById('servings-input').value = currentServings;
      updateModalNutrition();
    }
  };

  document.getElementById('confirm-log-btn').onclick = () => {
    let loggedMeals = JSON.parse(localStorage.getItem('nutriplan_logs')) || [];

    const newMealLog = {
      id: meal.idMeal,
      name: meal.name,
      image: meal.thumbnail,
      servings: currentServings,
      totalCalories: baseCalories * currentServings,
      totalProtein: baseProtein * currentServings,
      totalCarbs: baseCarbs * currentServings,
      totalFat: baseFat * currentServings,
      dateAdded: new Date().toISOString()
    };

    loggedMeals.push(newMealLog);
    localStorage.setItem('nutriplan_logs', JSON.stringify(loggedMeals));
    renderFoodLog();
    Swal.fire({
      title: 'Meal Logged!',
      text: 'Meal saved to your Food Log!',
      icon: 'success',
      confirmButtonColor: '#10b981',
      timer: 2000,
      showConfirmButton: false
    });

    closeLogModal();
  };
}

const searchInput = document.getElementById("search-input");
async function fetchRecipesBySearch(query) {
  if (!query || query.trim() === "") {
    fetchRecipesByCategory('chicken', 25);
    return;
  }
  let url = `https://nutriplan-api.vercel.app/api/meals/search?q=${query}&page=1&limit=25`;
  try {
    recipes.innerHTML = `<div class="col-span-4 flex justify-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>`;
    let response = await fetch(url);
    let data = await response.json();
    if (data && data.results && data.results.length > 0) {
      finalData = data.results;
      document.getElementById("recipes-count").innerHTML = `Showing ${finalData.length} recipes`;
      displayRecipes();
    } else {
      finalData = [];
      recipes.innerHTML = `
        <div class="col-span-4 flex flex-col items-center justify-center py-12 text-gray-500">
            <i class="fa-solid fa-search text-4xl mb-3 text-gray-300"></i>
            <p class="font-medium text-lg">No recipes found matching "${query}"</p>
        </div>`;
      document.getElementById("recipes-count").innerHTML = `Showing 0 recipes`;
    }
  } catch (error) {
    console.error("Error searching recipes:", error);
  }
}

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    let query = e.target.value;
    fetchRecipesBySearch(query);
  });
}

