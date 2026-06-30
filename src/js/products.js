//====> products.js <====
import { renderFoodLog } from './foodLog.js';
let productList = []
export async function fetchByProduct() {
    try {
        let respnose = await fetch(`https://nutriplan-api.vercel.app/api/products/category/snacks?page=3`)
        let data = await respnose.json()
        productList = data.results
        displayProduct()



    } catch (error) {
        console.log(error);
    }
}
fetchByProduct()

export function displayProduct(dataToDisplay = productList) {
    let cartona = ``;

    if (dataToDisplay.length === 0) {
        document.getElementById("products-grid").innerHTML = `
      <div class="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
        <i class="fa-solid fa-box-open text-4xl mb-3 text-gray-300"></i>
        <p class="font-medium text-lg">No products found</p>
      </div>`;
        return;
    }

    for (let i = 0; i < dataToDisplay.length; i++) {
        cartona += `
      <div class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-barcode="${dataToDisplay[i].barcode}">
        <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            src="${dataToDisplay[i].image}"
            alt="${dataToDisplay[i].name}" loading="lazy" />
          <div class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
            Nutri-Score ${dataToDisplay[i].nutritionGrade || 'N/A'}
          </div>
          <div class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center" title="NOVA">
            ${dataToDisplay[i].novaGroup || '0'}
          </div>
        </div>
        <div class="p-4">
          <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">${dataToDisplay[i].brand || 'Unknown Brand'}</p>
          <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">${dataToDisplay[i].name}</h3>
          <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <span><i class="fa-solid fa-fire mr-1"></i>${dataToDisplay[i].nutrients?.calories || 0} kcal/100g</span>
          </div>
          <div class="grid grid-cols-4 gap-1 text-center">
            <div class="bg-emerald-50 rounded p-1.5"><p class="text-xs font-bold text-emerald-700">${dataToDisplay[i].nutrients?.protein || 0}g</p><p class="text-[10px] text-gray-500">Protein</p></div>
            <div class="bg-blue-50 rounded p-1.5"><p class="text-xs font-bold text-blue-700">${dataToDisplay[i].nutrients?.carbs || 0}g</p><p class="text-[10px] text-gray-500">Carbs</p></div>
            <div class="bg-purple-50 rounded p-1.5"><p class="text-xs font-bold text-purple-700">${dataToDisplay[i].nutrients?.fat || 0}g</p><p class="text-[10px] text-gray-500">Fat</p></div>
            <div class="bg-orange-50 rounded p-1.5"><p class="text-xs font-bold text-orange-700">${dataToDisplay[i].nutrients?.sugar || 0}g</p><p class="text-[10px] text-gray-500">Sugar</p></div>
          </div>
        </div>
      </div>`;
    }

    document.getElementById("products-grid").innerHTML = cartona;

    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach((card) => {
        card.addEventListener("click", () => {
            const barcode = card.getAttribute("data-barcode");
            const product = dataToDisplay.find((p) => p.barcode == barcode);
            if (product) {
                openProductModal(product);
            }
        });
    });
}

// ====== Product Search (By Name) ======
const searchProductBtn = document.getElementById("search-product-btn");
const productSearchInput = document.getElementById("product-search-input");

searchProductBtn.addEventListener("click", () => {
    const query = productSearchInput.value.trim();
    if (query) {
        fetchProductsBySearch(query);
    } else {
        fetchByProduct();
    }
});

async function fetchProductsBySearch(query) {
    try {
        document.getElementById("products-grid").innerHTML = `<div class="col-span-full flex justify-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>`;
        let response = await fetch(`https://nutriplan-api.vercel.app/api/products/search?q=${query}`);
        let data = await response.json();
        productList = data.results || [];
        displayProduct(productList);
    } catch (error) {
        console.log("Error searching products:", error);
    }
}

// ====== Barcode Lookup ======
const lookupBarcodeBtn = document.getElementById("lookup-barcode-btn");
const barcodeInput = document.getElementById("barcode-input");

lookupBarcodeBtn.addEventListener("click", () => {
    const barcode = barcodeInput.value.trim();
    if (barcode) {
        fetchProductByBarcode(barcode);
    }
});

async function fetchProductByBarcode(barcode) {
    try {
        document.getElementById("products-grid").innerHTML = `<div class="col-span-full flex justify-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>`;
        let response = await fetch(`https://nutriplan-api.vercel.app/api/products/${barcode}`);
        let data = await response.json();

        if (data && data.name) {
            productList = [data];
            displayProduct(productList);
        } else {
            productList = [];
            displayProduct(productList);
        }
    } catch (error) {
        console.log("Error finding barcode:", error);
    }
}
// ====== Nutri-Score Filtering ======
const nutriScoreBtns = document.querySelectorAll(".nutri-score-filter");

nutriScoreBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        const grade = e.target.getAttribute("data-grade");

        if (!grade) {
            displayProduct(productList);
        } else {
            const filteredData = productList.filter(product =>
                product.nutritionGrade && product.nutritionGrade.toLowerCase() === grade.toLowerCase()
            );
            displayProduct(filteredData);
        }
    });
});

// ====== Browse by Category ======
const productCategoryBtns = document.querySelectorAll(".product-category-btn");

productCategoryBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        productCategoryBtns.forEach(b => {
            b.classList.remove('ring-2', 'ring-emerald-500', 'ring-offset-1', 'opacity-100');
            b.classList.add('opacity-70');
        });

        e.currentTarget.classList.remove('opacity-70');
        e.currentTarget.classList.add('ring-2', 'ring-emerald-500', 'ring-offset-1', 'opacity-100');

        const categoryText = e.currentTarget.innerText.trim().toLowerCase();

        const countElement = document.getElementById("products-count");
        if (countElement) {
            countElement.innerText = `Showing ${categoryText} products...`;
        }

        fetchProductsByCategory(categoryText);
    });
});

async function fetchProductsByCategory(category) {
    try {
        document.getElementById("products-grid").innerHTML = `
      <div class="col-span-full flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>`;

        let response = await fetch(`https://nutriplan-api.vercel.app/api/products/category/${category}?page=1`);
        let data = await response.json();

        productList = data.results || [];
        displayProduct(productList);

    } catch (error) {
        console.log("Error fetching product category:", error);
        document.getElementById("products-grid").innerHTML = `
      <div class="col-span-full text-center text-red-500 py-8">
        Failed to load category products. Please try again.
      </div>`;
    }
}



let currentSelectedProduct = null;




const productModal = document.getElementById("product-modal");
const productModalContent = document.getElementById("product-modal-content");

function openProductModal(product) {
    currentSelectedProduct = product;

    document.getElementById("modal-product-img").src = product.image || "";
    document.getElementById("modal-product-name").innerText = product.name || "Unknown Product";
    document.getElementById("modal-product-brand").innerText = product.brand || "Unknown Brand";
    document.getElementById("modal-product-nutriscore").innerText = `Nutri-Score ${product.nutritionGrade || 'N/A'}`;
    document.getElementById("modal-product-nova").innerText = `NOVA ${product.novaGroup || 'N/A'}`;

    const nutrients = product.nutrients || {};
    document.getElementById("modal-product-calories").innerText = nutrients.calories || 0;
    document.getElementById("modal-product-protein").innerText = `${nutrients.protein || 0}g`;
    document.getElementById("modal-product-carbs").innerText = `${nutrients.carbs || 0}g`;
    document.getElementById("modal-product-fat").innerText = `${nutrients.fat || 0}g`;
    document.getElementById("modal-product-sugar").innerText = `${nutrients.sugar || 0}g`;

    productModal.classList.remove("hidden");
    productModal.classList.add("flex");
    setTimeout(() => {
        productModal.classList.remove("opacity-0");
        productModalContent.classList.remove("scale-95");
    }, 10);
}

function closeProductModal() {
    productModal.classList.add("opacity-0");
    productModalContent.classList.add("scale-95");
    setTimeout(() => {
        productModal.classList.add("hidden");
        productModal.classList.remove("flex");
        currentSelectedProduct = null;
    }, 300);
}

// close buttons
document.getElementById("close-product-modal-btn").addEventListener("click", closeProductModal);
document.getElementById("close-product-modal-top").addEventListener("click", closeProductModal);
productModal.addEventListener("click", (e) => {
    if (e.target === productModal) closeProductModal();
});


document.getElementById("log-product-btn").addEventListener("click", () => {
    if (!currentSelectedProduct) return;

    let loggedMeals = JSON.parse(localStorage.getItem('nutriplan_logs')) || [];
    const nutrients = currentSelectedProduct.nutrients || {};

    const newLog = {
        id: currentSelectedProduct.barcode || Date.now().toString(),
        name: currentSelectedProduct.name,
        image: currentSelectedProduct.image,
        servings: 1,
        totalCalories: nutrients.calories || 0,
        totalProtein: nutrients.protein || 0,
        totalCarbs: nutrients.carbs || 0,
        totalFat: nutrients.fat || 0,
        type: "product",
        dateAdded: new Date().toISOString()
    };

    loggedMeals.push(newLog);
    localStorage.setItem('nutriplan_logs', JSON.stringify(loggedMeals));
    renderFoodLog();
    Toastify({
        text: `This Snack Original logged to your daily intake! 📝`,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { } // Callback after click
    }).showToast();

    closeProductModal();
});