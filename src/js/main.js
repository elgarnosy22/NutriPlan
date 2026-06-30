/**
 * NutriPlan - Main Entry Point
 * 
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */

import { fetchRecipesByCategory, details } from "./Meals & Recipes.js";
import { initFoodLog } from "./foodLog.js";
import "./products.js";
fetchRecipesByCategory('chicken', 25);
initFoodLog();

// src/js/navigation.js

function initNavigation() {
    // تعريف زراير الـ Sidebar
    const navMeals = document.getElementById('Meals');
    const navProducts = document.getElementById('ProductScanner');
    const navFood = document.getElementById('Food');

    // تعريف الأقسام المختلفة
    const sectionsMeals = [
        document.getElementById('search-filters-section'),
        document.getElementById('meal-categories-section'),
        document.getElementById('all-recipes-section')
    ];
    const sectionDetails = document.getElementById('meal-details');
    const sectionProducts = document.getElementById('products-section');
    const sectionFoodLog = document.getElementById('foodlog-section');

    // تعريف عناصر الـ Header
    const headerTitle = document.querySelector('#header h1');
    const headerDesc = document.querySelector('#header p');

    // الحالة الافتراضية أول ما الموقع يفتح: إخفاء المنتجات وسجل الأكل
    sectionProducts.classList.add('hidden');
    sectionFoodLog.classList.add('hidden');

    // دالة لتحديث شكل الزرار النشط (Active) في القايمة
    function updateSidebar(activeId) {
        // إرجاع كل الزراير للشكل الافتراضي
        [navMeals, navProducts, navFood].forEach(nav => {
            const link = nav.querySelector('a');
            link.className = 'nav-link flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-all';
            link.querySelector('span').classList.remove('font-semibold');
            link.querySelector('span').classList.add('font-medium');
        });

        // تمييز الزرار اللي تم اختياره
        const activeLink = document.getElementById(activeId).querySelector('a');
        activeLink.className = 'nav-link flex items-center gap-3 px-3 py-2.5 bg-emerald-50 text-emerald-700 rounded-lg transition-all';
        activeLink.querySelector('span').classList.remove('font-medium');
        activeLink.querySelector('span').classList.add('font-semibold');
    }

    // دالة لإخفاء كل الأقسام
    function hideAllSections() {
        sectionsMeals.forEach(sec => sec.classList.add('hidden'));
        sectionDetails.classList.add('hidden');
        sectionProducts.classList.add('hidden');
        sectionFoodLog.classList.add('hidden');
    }

    // لما تدوس على Meals & Recipes
    navMeals.addEventListener('click', (e) => {
        e.preventDefault();
        hideAllSections();
        sectionsMeals.forEach(sec => sec.classList.remove('hidden'));
        updateSidebar('Meals');
        headerTitle.textContent = 'Meals & Recipes';
        headerDesc.textContent = 'Discover delicious and nutritious recipes tailored for you';
    });

    // لما تدوس على Product Scanner
    navProducts.addEventListener('click', (e) => {
        e.preventDefault();
        hideAllSections();
        sectionProducts.classList.remove('hidden');
        updateSidebar('ProductScanner');
        headerTitle.textContent = 'Product Scanner';
        headerDesc.textContent = 'Search packaged foods by name or barcode';
    });

    // لما تدوس على Food Log
    navFood.addEventListener('click', (e) => {
        e.preventDefault();
        hideAllSections();
        sectionFoodLog.classList.remove('hidden');
        updateSidebar('Food');
        headerTitle.textContent = 'Food Log';
        headerDesc.textContent = 'Track your daily nutrition and food intake';
    });
}
initNavigation()