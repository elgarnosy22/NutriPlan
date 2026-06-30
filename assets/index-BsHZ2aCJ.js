(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={calories:2e3,protein:150,carbs:250,fat:65};function t(){n(),r(),o(),i()}function n(){let e=document.getElementById(`foodlog-date`);e&&(e.innerText=new Date().toLocaleDateString(`en-US`,{weekday:`long`,month:`short`,day:`numeric`}))}function r(){let e=JSON.parse(localStorage.getItem(`nutriplan_logs`))||[],t=document.getElementById(`logged-items-list`),n=document.getElementById(`clear-foodlog`),r=document.getElementById(`logged-count`);if(e.length===0){t.innerHTML=`
        <div class="text-center py-8 text-gray-500">
            <p class="font-medium">No meals logged today</p>
        </div>`,n&&(n.style.display=`none`),r&&(r.innerText=`Logged Items (0)`);return}n&&(n.style.display=`flex`),r&&(r.innerText=`Logged Items (${e.length})`);let o=``;e.forEach((e,t)=>{let n=e.type===`product`?`Product`:`Recipe`,r=e.type===`product`?e.brand||e.name:`${e.servings||1} serving`,i=`1:10 AM`;e.dateAdded&&(i=new Date(e.dateAdded).toLocaleTimeString(`en-US`,{hour:`numeric`,minute:`2-digit`})),o+=`
        <div class="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
            <div class="flex items-center gap-4">
                <img src="${e.image||`https://via.placeholder.com/150`}" alt="${e.name}" class="w-14 h-14 rounded-xl object-cover bg-white shadow-sm border border-gray-100 p-1">
                <div>
                    <h4 class="font-bold text-gray-900 text-base">${e.name}</h4>
                    <p class="text-xs text-gray-500 mt-1">${r} • <span class="text-emerald-600">${n}</span></p>
                    <p class="text-[11px] text-gray-400 mt-0.5">${i}</p>
                </div>
            </div>
            
            <div class="flex items-center gap-8">
                <div class="text-right">
                    <p class="text-lg font-bold text-emerald-600">${Math.round(e.totalCalories)} <span class="text-xs text-gray-500 font-normal">kcal</span></p>
                </div>
                
                <div class="hidden md:flex items-center gap-4 text-xs font-medium">
                    <span class="text-gray-700 bg-blue-50/50 px-2 py-1 rounded">${Math.round(e.totalProtein*10)/10}g <span class="text-gray-400">P</span></span>
                    <span class="text-gray-700 bg-amber-50/50 px-2 py-1 rounded">${Math.round(e.totalCarbs*10)/10}g <span class="text-gray-400">C</span></span>
                    <span class="text-gray-700 bg-purple-50/50 px-2 py-1 rounded">${Math.round(e.totalFat*10)/10}g <span class="text-gray-400">F</span></span>
                </div>
                
                <button data-index="${t}" class="delete-log-btn text-gray-400 hover:text-red-500 transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white shadow-sm border border-transparent hover:border-gray-200">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </div>`}),t.innerHTML=o,document.querySelectorAll(`.delete-log-btn`).forEach(e=>{e.addEventListener(`click`,e=>{a(e.currentTarget.getAttribute(`data-index`))})}),i()}function i(){let t=JSON.parse(localStorage.getItem(`nutriplan_logs`))||[],n=document.getElementById(`weekly-days-container`);if(!n)return;let r=[];for(let e=6;e>=0;e--){let t=new Date;t.setDate(t.getDate()-e),r.push({dateObj:t,dayName:t.toLocaleDateString(`en-US`,{weekday:`short`}),dayNum:t.getDate(),dateStr:t.toISOString().split(`T`)[0],isToday:e===0})}let i=0,a=0,o=0,s=``;r.forEach(n=>{let r=t.filter(e=>e.dateAdded?new Date(e.dateAdded).toISOString().split(`T`)[0]===n.dateStr:!1),c=r.length,l=r.reduce((e,t)=>e+(Number(t.totalCalories)||0),0);i+=l,a+=c,l>0&&l<=e.calories&&o++;let u=c>0;if(n.isToday)s+=`
            <div class="flex-1 flex flex-col items-center bg-indigo-50 rounded-2xl py-4 px-2 min-w-[80px]">
              <span class="text-sm text-gray-500 mb-1">${n.dayName}</span>
              <span class="text-base font-bold text-gray-900 mb-3">${n.dayNum}</span>
              <span class="text-xl font-bold text-emerald-600">${Math.round(l)}</span>
              <span class="text-xs text-emerald-600 font-medium">kcal</span>
              <span class="text-[11px] text-gray-500 mt-1">${c} items</span>
            </div>`;else{let e=u?`text-emerald-600`:`text-gray-300`,t=u?`text-emerald-600`:`text-gray-300`;s+=`
            <div class="flex-1 flex flex-col items-center py-4 px-2 min-w-[80px] bg-transparent">
              <span class="text-sm text-gray-400 mb-1">${n.dayName}</span>
              <span class="text-base font-bold text-gray-600 mb-3">${n.dayNum}</span>
              <span class="text-xl font-bold ${e}">${Math.round(l)}</span>
              <span class="text-xs ${t} font-medium">kcal</span>
              ${u?`<span class="text-[11px] text-gray-400 mt-1">${c} items</span>`:`<span class="text-[11px] text-transparent mt-1">0 items</span>`}
            </div>`}}),n.innerHTML=s;let c=i>0?Math.round(i/7):0;document.getElementById(`weekly-average`).innerText=`${c} kcal`,document.getElementById(`weekly-total-items`).innerText=`${a} items`,document.getElementById(`weekly-days-goal`).innerText=`${o} / 7`}function a(e){let t=JSON.parse(localStorage.getItem(`nutriplan_logs`))||[];t.splice(e,1),localStorage.setItem(`nutriplan_logs`,JSON.stringify(t)),r(),i()}function o(){let e=document.getElementById(`clear-foodlog`);e&&e.addEventListener(`click`,()=>{Swal.fire({title:`Are you sure?`,text:`You are about to clear today's entire food log!`,icon:`warning`,showCancelButton:!0,confirmButtonColor:`#ef4444`,cancelButtonColor:`#9ca3af`,confirmButtonText:`Yes, clear it!`}).then(e=>{e.isConfirmed&&(localStorage.removeItem(`nutriplan_logs`),r(),i(),Swal.fire(`Cleared!`,`Your food log has been cleared.`,`success`))})})}var s=document.getElementById(`recipes-grid`),c=[];async function l(e,t=20){let n=e.toLowerCase()===`chicken`?`https://nutriplan-api.vercel.app/api/meals/search?q=chicken&page=1&limit=25`:`https://nutriplan-api.vercel.app/api/meals/filter?category=${e.toLowerCase()}&page=1&limit=${t}`;try{let e=await(await fetch(n)).json();e&&e.results&&(c=e.results,document.getElementById(`recipes-count`).innerHTML=`Showing ${c.length} recipes`,f())}catch(e){console.error(`Error fetching recipes:`,e)}}async function u(e,t=20){if(e===`All`){l(`chicken`);return}let n=`https://nutriplan-api.vercel.app/api/meals/filter?area=${e.toLowerCase()}&page=1&limit=${t}`;try{let t=await(await fetch(n)).json();t&&t.results?(c=t.results,document.getElementById(`recipes-count`).innerHTML=`Showing ${c.length} recipes`,f()):(s.innerHTML=`<div class="col-span-4 text-center py-8 text-gray-500 font-medium">No recipes found for ${e}</div>`,document.getElementById(`recipes-count`).innerHTML=`Showing 0 recipes`)}catch(e){console.error(`Error fetching recipes by area:`,e)}}var d=document.querySelectorAll(`.area-btn`);d.forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.dataset.area;d.forEach(e=>{e.classList.remove(`bg-emerald-600`,`text-white`),e.classList.add(`bg-gray-100`,`text-gray-700`)}),e.currentTarget.classList.remove(`bg-gray-100`,`text-gray-700`),e.currentTarget.classList.add(`bg-emerald-600`,`text-white`),s.innerHTML=`<div class="col-span-4 flex justify-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>`,u(t)})});function f(){let e=``;for(let t=0;t<c.length;t++){let n=c[t].category||`Meal`,r=c[t].area||`Global`;e+=`
            <div class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-meal-id="${c[t].idMeal||`52772`}">
                <div class="relative h-48 overflow-hidden">
                    <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="${c[t].thumbnail}" alt="${c[t].name}" loading="lazy" />
                    <div class="absolute bottom-3 left-3 flex gap-2">
                        <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">${n}</span>
                        <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">${r}</span>
                    </div>
                </div>
                <div class="p-4">
                    <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">${c[t].name}</h3>
                    <p class="text-xs text-gray-600 mb-3 line-clamp-2">${c[t].instructions||`View recipe for instructions.`}</p>
                    <div class="flex items-center justify-between text-xs">
                        <span class="font-semibold text-gray-900"><i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>${n}</span>
                        <span class="font-semibold text-gray-500"><i class="fa-solid fa-globe text-blue-500 mr-1"></i>${r}</span>
                    </div>
                </div>
            </div>`}s.innerHTML=e,p()}document.querySelectorAll(`.category-card`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.dataset.category;s.innerHTML=`<div class="col-span-4 flex justify-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>`,l(t)})});function p(){let e=document.querySelectorAll(`.recipe-card`);for(let t=0;t<e.length;t++)e[t].addEventListener(`click`,async()=>{document.getElementById(`search-filters-section`).classList.add(`hidden`),document.getElementById(`meal-categories-section`).classList.add(`hidden`),document.getElementById(`all-recipes-section`).classList.add(`hidden`),document.getElementById(`products-section`).classList.add(`hidden`),document.getElementById(`foodlog-section`).classList.add(`hidden`),document.getElementById(`meal-details`).classList.remove(`hidden`),await m(t)})}document.getElementById(`back-to-meals-btn`).addEventListener(`click`,()=>{document.getElementById(`search-filters-section`).classList.remove(`hidden`),document.getElementById(`meal-categories-section`).classList.remove(`hidden`),document.getElementById(`all-recipes-section`).classList.remove(`hidden`),document.getElementById(`products-section`).classList.add(`hidden`),document.getElementById(`foodlog-section`).classList.add(`hidden`),document.getElementById(`meal-details`).classList.add(`hidden`)});async function m(e){let t=c[e],n=t.ingredients||[];if(!t)return;let i=Math.floor(Math.random()*45)+15,a=1,o=0,s=0,l=0,u=0,d=0,f=0,p=0,m=n.map(e=>`${e.measure} ${e.ingredient}`);try{let e=await fetch(`https://nutriplan-api.vercel.app/api/nutrition/analyze`,{method:`POST`,headers:{"Content-Type":`application/json`,"x-api-key":`zprk1pBavLcs5182ptkPyIzV1sis1bxz9rNf3em4`},body:JSON.stringify({recipeName:t.name,ingredients:m})});if(e.ok){let t=await e.json();if(t.success&&t.data){let e=t.data;a=e.servings||1,e.perServing&&(o=Math.round(e.perServing.calories||0),s=Math.round(e.perServing.protein||0),l=Math.round(e.perServing.carbs||0),u=Math.round(e.perServing.fat||0),d=Math.round(e.perServing.fiber||0),f=Math.round(e.perServing.sugar||0),p=Math.round(e.perServing.saturatedFat||0))}}else console.error(`Failed to fetch nutrition data`)}catch(e){console.error(`Error fetching nutrition data:`,e)}let h=``;if(n.length>0)for(let e=0;e<n.length;e++){let t=n[e].measure||``,r=n[e].ingredient||``;h+=`
        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
            <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
            <span class="text-gray-700">
                <span class="font-medium text-gray-900">${t}</span> ${r}
            </span>
        </div>`}else h=`<p class="text-gray-500 col-span-2 py-2">No ingredients available for this meal filter.</p>`;let g=``;if(t.instructions)for(let e=0;e<t.instructions.length;e++)g+=`
        <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
            <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                ${e+1}
            </div>
            <p class="text-gray-700 leading-relaxed pt-2">
                ${t.instructions[e]}
            </p>
        </div>`;else g=`<p class="text-gray-500 py-2">No instructions available for this meal filter.</p>`;let _=``;if(t.youtube){let e=t.youtube.split(`v=`)[1];if(e){let t=e.indexOf(`&`);t!==-1&&(e=e.substring(0,t)),_=`
        <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-video text-red-500"></i>
                Video Tutorial
            </h2>
            <div class="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                <iframe src="https://www.youtube.com/embed/${e}" class="absolute inset-0 w-full h-full"
                    frameborder="0" allowfullscreen>
                </iframe>
            </div>
        </div>`}}let v=Math.min(100,Math.round(s/150*100)),y=Math.min(100,Math.round(l/250*100)),b=Math.min(100,Math.round(u/65*100)),x=Math.min(100,Math.round(d/30*100)),S=Math.min(100,Math.round(f/50*100)),C=Math.min(100,Math.round(p/20*100)),w=`
  <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
    <div class="relative h-80 md:h-96">
      <img src="${t.thumbnail||``}" alt="${t.name||`Meal`}" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
      <div class="absolute bottom-0 left-0 right-0 p-8">
        <div class="flex items-center gap-3 mb-3">
          <span class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">${t.category||`Category`}</span>
          <span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">${t.area||`Area`}</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">${t.name||``}</h1>
        <div class="flex items-center gap-6 text-white/90">
          <span class="flex items-center gap-2"><i class="fa-solid fa-clock"></i><span>${i} min</span></span>
          <span class="flex items-center gap-2"><i class="fa-solid fa-utensils"></i><span>${a} servings</span></span>
          <span class="flex items-center gap-2"><i class="fa-solid fa-fire"></i><span>${o} cal/serving</span></span>
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-wrap gap-3 mb-8">
    <button id="log-meal-btn" class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all" data-meal-id="${t.idMeal||``}">
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
          <span class="text-sm font-normal text-gray-500 ml-auto">${n.length} items</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${h}
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-lg p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
          Instructions
        </h2>
        <div class="space-y-4">
          ${g}
        </div>
      </div>

      ${_}
      
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
            <p class="text-4xl font-bold text-emerald-600">${o}</p>
            <p class="text-xs text-gray-500 mt-1">Total: ${o*a} cal</p>
          </div>
                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span class="text-gray-700">Protein</span>
                      </div>
                      <span class="font-bold text-gray-900">${s}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div class="bg-emerald-500 h-2 rounded-full" style="width: ${v}%"></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span class="text-gray-700">Carbs</span>
                      </div>
                      <span class="font-bold text-gray-900">${l}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div class="bg-blue-500 h-2 rounded-full" style="width: ${y}%"></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span class="text-gray-700">Fat</span>
                      </div>
                      <span class="font-bold text-gray-900">${u}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div class="bg-purple-500 h-2 rounded-full" style="width: ${b}%"></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span class="text-gray-700">Fiber</span>
                      </div>
                      <span class="font-bold text-gray-900">${d}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div class="bg-orange-500 h-2 rounded-full" style="width: ${x}%"></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span class="text-gray-700">Sugar</span>
                      </div>
                      <span class="font-bold text-gray-900">${f}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div class="bg-pink-500 h-2 rounded-full" style="width: ${S}%"></div>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span class="text-gray-700">SaturatedFat</span>
                      </div>
                      <span class="font-bold text-gray-900">${p}g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div class="bg-pink-500 h-2 rounded-full" style="width: ${C}%"></div>
                    </div>
                  </div>
      </div>
    </div>
  </div>`;document.getElementById(`detailData`).innerHTML=w;let T=document.getElementById(`log-meal-btn`);T&&(T.onclick=()=>{M(t,o,s,l,u)});let E=1,D=0,O=0,k=0,A=0;function j(){document.getElementById(`modal-calories`).innerText=D*E,document.getElementById(`modal-protein`).innerText=O*E+`g`,document.getElementById(`modal-carbs`).innerText=k*E+`g`,document.getElementById(`modal-fat`).innerText=A*E+`g`}function M(e,t,n,r,i){let a=document.getElementById(`log-meal-modal`),o=document.getElementById(`log-meal-content`);D=t,O=n,k=r,A=i,E=1,document.getElementById(`modal-meal-img`).src=e.thumbnail||``,document.getElementById(`modal-meal-name`).innerText=e.name||`Meal Name`,document.getElementById(`servings-input`).value=E,j(),a.classList.remove(`hidden`),a.classList.add(`flex`),setTimeout(()=>{a.classList.remove(`opacity-0`),o.classList.remove(`scale-95`)},10)}function N(){let e=document.getElementById(`log-meal-modal`),t=document.getElementById(`log-meal-content`);e.classList.add(`opacity-0`),t.classList.add(`scale-95`),setTimeout(()=>{e.classList.add(`hidden`),e.classList.remove(`flex`)},300)}document.getElementById(`cancel-log-btn`).onclick=N,document.getElementById(`log-meal-modal`).onclick=e=>{e.target.id===`log-meal-modal`&&N()},document.getElementById(`increase-servings`).onclick=()=>{E++,document.getElementById(`servings-input`).value=E,j()},document.getElementById(`decrease-servings`).onclick=()=>{E>1&&(E--,document.getElementById(`servings-input`).value=E,j())},document.getElementById(`confirm-log-btn`).onclick=()=>{let e=JSON.parse(localStorage.getItem(`nutriplan_logs`))||[],n={id:t.idMeal,name:t.name,image:t.thumbnail,servings:E,totalCalories:D*E,totalProtein:O*E,totalCarbs:k*E,totalFat:A*E,dateAdded:new Date().toISOString()};e.push(n),localStorage.setItem(`nutriplan_logs`,JSON.stringify(e)),r(),Swal.fire({title:`Meal Logged!`,text:`Meal saved to your Food Log!`,icon:`success`,confirmButtonColor:`#10b981`,timer:2e3,showConfirmButton:!1}),N()}}var h=document.getElementById(`search-input`);async function g(e){if(!e||e.trim()===``){l(`chicken`,25);return}let t=`https://nutriplan-api.vercel.app/api/meals/search?q=${e}&page=1&limit=25`;try{s.innerHTML=`<div class="col-span-4 flex justify-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>`;let n=await(await fetch(t)).json();n&&n.results&&n.results.length>0?(c=n.results,document.getElementById(`recipes-count`).innerHTML=`Showing ${c.length} recipes`,f()):(c=[],s.innerHTML=`
        <div class="col-span-4 flex flex-col items-center justify-center py-12 text-gray-500">
            <i class="fa-solid fa-search text-4xl mb-3 text-gray-300"></i>
            <p class="font-medium text-lg">No recipes found matching "${e}"</p>
        </div>`,document.getElementById(`recipes-count`).innerHTML=`Showing 0 recipes`)}catch(e){console.error(`Error searching recipes:`,e)}}h&&h.addEventListener(`input`,e=>{let t=e.target.value;g(t)});var _=[];async function v(){try{_=(await(await fetch(`https://nutriplan-api.vercel.app/api/products/category/snacks?page=3`)).json()).results,y()}catch(e){console.log(e)}}v();function y(e=_){let t=``;if(e.length===0){document.getElementById(`products-grid`).innerHTML=`
      <div class="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
        <i class="fa-solid fa-box-open text-4xl mb-3 text-gray-300"></i>
        <p class="font-medium text-lg">No products found</p>
      </div>`;return}for(let n=0;n<e.length;n++)t+=`
      <div class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-barcode="${e[n].barcode}">
        <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            src="${e[n].image}"
            alt="${e[n].name}" loading="lazy" />
          <div class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
            Nutri-Score ${e[n].nutritionGrade||`N/A`}
          </div>
          <div class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center" title="NOVA">
            ${e[n].novaGroup||`0`}
          </div>
        </div>
        <div class="p-4">
          <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">${e[n].brand||`Unknown Brand`}</p>
          <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">${e[n].name}</h3>
          <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <span><i class="fa-solid fa-fire mr-1"></i>${e[n].nutrients?.calories||0} kcal/100g</span>
          </div>
          <div class="grid grid-cols-4 gap-1 text-center">
            <div class="bg-emerald-50 rounded p-1.5"><p class="text-xs font-bold text-emerald-700">${e[n].nutrients?.protein||0}g</p><p class="text-[10px] text-gray-500">Protein</p></div>
            <div class="bg-blue-50 rounded p-1.5"><p class="text-xs font-bold text-blue-700">${e[n].nutrients?.carbs||0}g</p><p class="text-[10px] text-gray-500">Carbs</p></div>
            <div class="bg-purple-50 rounded p-1.5"><p class="text-xs font-bold text-purple-700">${e[n].nutrients?.fat||0}g</p><p class="text-[10px] text-gray-500">Fat</p></div>
            <div class="bg-orange-50 rounded p-1.5"><p class="text-xs font-bold text-orange-700">${e[n].nutrients?.sugar||0}g</p><p class="text-[10px] text-gray-500">Sugar</p></div>
          </div>
        </div>
      </div>`;document.getElementById(`products-grid`).innerHTML=t,document.querySelectorAll(`.product-card`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.getAttribute(`data-barcode`),r=e.find(e=>e.barcode==n);r&&j(r)})})}var b=document.getElementById(`search-product-btn`),x=document.getElementById(`product-search-input`);b.addEventListener(`click`,()=>{let e=x.value.trim();e?S(e):v()});async function S(e){try{document.getElementById(`products-grid`).innerHTML=`<div class="col-span-full flex justify-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>`,_=(await(await fetch(`https://nutriplan-api.vercel.app/api/products/search?q=${e}`)).json()).results||[],y(_)}catch(e){console.log(`Error searching products:`,e)}}var C=document.getElementById(`lookup-barcode-btn`),w=document.getElementById(`barcode-input`);C.addEventListener(`click`,()=>{let e=w.value.trim();e&&T(e)});async function T(e){try{document.getElementById(`products-grid`).innerHTML=`<div class="col-span-full flex justify-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>`;let t=await(await fetch(`https://nutriplan-api.vercel.app/api/products/${e}`)).json();t&&t.name?(_=[t],y(_)):(_=[],y(_))}catch(e){console.log(`Error finding barcode:`,e)}}document.querySelectorAll(`.nutri-score-filter`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.target.getAttribute(`data-grade`);y(t?_.filter(e=>e.nutritionGrade&&e.nutritionGrade.toLowerCase()===t.toLowerCase()):_)})});var E=document.querySelectorAll(`.product-category-btn`);E.forEach(e=>{e.addEventListener(`click`,e=>{E.forEach(e=>{e.classList.remove(`ring-2`,`ring-emerald-500`,`ring-offset-1`,`opacity-100`),e.classList.add(`opacity-70`)}),e.currentTarget.classList.remove(`opacity-70`),e.currentTarget.classList.add(`ring-2`,`ring-emerald-500`,`ring-offset-1`,`opacity-100`);let t=e.currentTarget.innerText.trim().toLowerCase(),n=document.getElementById(`products-count`);n&&(n.innerText=`Showing ${t} products...`),D(t)})});async function D(e){try{document.getElementById(`products-grid`).innerHTML=`
      <div class="col-span-full flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>`,_=(await(await fetch(`https://nutriplan-api.vercel.app/api/products/category/${e}?page=1`)).json()).results||[],y(_)}catch(e){console.log(`Error fetching product category:`,e),document.getElementById(`products-grid`).innerHTML=`
      <div class="col-span-full text-center text-red-500 py-8">
        Failed to load category products. Please try again.
      </div>`}}var O=null,k=document.getElementById(`product-modal`),A=document.getElementById(`product-modal-content`);function j(e){O=e,document.getElementById(`modal-product-img`).src=e.image||``,document.getElementById(`modal-product-name`).innerText=e.name||`Unknown Product`,document.getElementById(`modal-product-brand`).innerText=e.brand||`Unknown Brand`,document.getElementById(`modal-product-nutriscore`).innerText=`Nutri-Score ${e.nutritionGrade||`N/A`}`,document.getElementById(`modal-product-nova`).innerText=`NOVA ${e.novaGroup||`N/A`}`;let t=e.nutrients||{};document.getElementById(`modal-product-calories`).innerText=t.calories||0,document.getElementById(`modal-product-protein`).innerText=`${t.protein||0}g`,document.getElementById(`modal-product-carbs`).innerText=`${t.carbs||0}g`,document.getElementById(`modal-product-fat`).innerText=`${t.fat||0}g`,document.getElementById(`modal-product-sugar`).innerText=`${t.sugar||0}g`,k.classList.remove(`hidden`),k.classList.add(`flex`),setTimeout(()=>{k.classList.remove(`opacity-0`),A.classList.remove(`scale-95`)},10)}function M(){k.classList.add(`opacity-0`),A.classList.add(`scale-95`),setTimeout(()=>{k.classList.add(`hidden`),k.classList.remove(`flex`),O=null},300)}document.getElementById(`close-product-modal-btn`).addEventListener(`click`,M),document.getElementById(`close-product-modal-top`).addEventListener(`click`,M),k.addEventListener(`click`,e=>{e.target===k&&M()}),document.getElementById(`log-product-btn`).addEventListener(`click`,()=>{if(!O)return;let e=JSON.parse(localStorage.getItem(`nutriplan_logs`))||[],t=O.nutrients||{},n={id:O.barcode||Date.now().toString(),name:O.name,image:O.image,servings:1,totalCalories:t.calories||0,totalProtein:t.protein||0,totalCarbs:t.carbs||0,totalFat:t.fat||0,type:`product`,dateAdded:new Date().toISOString()};e.push(n),localStorage.setItem(`nutriplan_logs`,JSON.stringify(e)),r(),Toastify({text:`This Snack Original logged to your daily intake! 📝`,duration:3e3,destination:`https://github.com/apvarun/toastify-js`,newWindow:!0,close:!0,gravity:`bottom`,position:`right`,stopOnFocus:!0,style:{background:`linear-gradient(to right, #00b09b, #96c93d)`},onClick:function(){}}).showToast(),M()}),l(`chicken`,25),t();function N(){let e=document.getElementById(`Meals`),t=document.getElementById(`ProductScanner`),n=document.getElementById(`Food`),r=document.getElementById(`header-menu-btn`),i=document.getElementById(`sidebar-close-btn`),a=document.getElementById(`sidebar`),o=document.getElementById(`sidebar-overlay`),s=document.getElementById(`main-content`);a&&(a.style.transition=`transform 0.3s ease-in-out`),s&&(s.style.transition=`margin 0.3s ease-in-out`);let c=window.innerWidth>=1024;function l(){!a||!s||!o||(window.innerWidth<1024?(c?(a.style.transform=`translateX(0)`,o.style.display=`block`,o.className=`fixed inset-0 bg-black/50 z-40`):(a.style.transform=`translateX(-100%)`,o.style.display=`none`),s.style.marginLeft=`0px`):(o.style.display=`none`,c?(a.style.transform=`translateX(0)`,s.style.marginLeft=`18rem`):(a.style.transform=`translateX(-100%)`,s.style.marginLeft=`0px`)))}function u(){c=!c,l()}l(),window.addEventListener(`resize`,()=>{c=window.innerWidth>=1024,l()}),r&&r.addEventListener(`click`,u),i&&i.addEventListener(`click`,u),o&&o.addEventListener(`click`,u);let d=[document.getElementById(`search-filters-section`),document.getElementById(`meal-categories-section`),document.getElementById(`all-recipes-section`)],f=document.getElementById(`meal-details`),p=document.getElementById(`products-section`),m=document.getElementById(`foodlog-section`),h=document.querySelector(`#header h1`),g=document.querySelector(`#header p`);p&&p.classList.add(`hidden`),m&&m.classList.add(`hidden`);function _(r){if(!e||!t||!n)return;[e,t,n].forEach(e=>{let t=e.querySelector(`a`);if(t){t.className=`nav-link flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-all`;let e=t.querySelector(`span`);e&&(e.classList.remove(`font-semibold`),e.classList.add(`font-medium`))}});let i=document.getElementById(r)?.querySelector(`a`);if(i){i.className=`nav-link flex items-center gap-3 px-3 py-2.5 bg-emerald-50 text-emerald-700 rounded-lg transition-all`;let e=i.querySelector(`span`);e&&(e.classList.remove(`font-medium`),e.classList.add(`font-semibold`))}}function v(){d.forEach(e=>{e&&e.classList.add(`hidden`)}),f&&f.classList.add(`hidden`),p&&p.classList.add(`hidden`),m&&m.classList.add(`hidden`)}e&&e.addEventListener(`click`,e=>{e.preventDefault(),v(),d.forEach(e=>{e&&e.classList.remove(`hidden`)}),_(`Meals`),h&&(h.textContent=`Meals & Recipes`),g&&(g.textContent=`Discover delicious and nutritious recipes tailored for you`),window.innerWidth<1024&&u()}),t&&t.addEventListener(`click`,e=>{e.preventDefault(),v(),p&&p.classList.remove(`hidden`),_(`ProductScanner`),h&&(h.textContent=`Product Scanner`),g&&(g.textContent=`Search packaged foods by name or barcode`),window.innerWidth<1024&&u()}),n&&n.addEventListener(`click`,e=>{e.preventDefault(),v(),m&&m.classList.remove(`hidden`),_(`Food`),h&&(h.textContent=`Food Log`),g&&(g.textContent=`Track your daily nutrition and food intake`),window.innerWidth<1024&&u()})}N();