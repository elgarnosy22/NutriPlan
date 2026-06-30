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


function initNavigation() {
    const navMeals = document.getElementById('Meals');
    const navProducts = document.getElementById('ProductScanner');
    const navFood = document.getElementById('Food');

    const sectionsMeals = [
        document.getElementById('search-filters-section'),
        document.getElementById('meal-categories-section'),
        document.getElementById('all-recipes-section')
    ];
    const sectionDetails = document.getElementById('meal-details');
    const sectionProducts = document.getElementById('products-section');
    const sectionFoodLog = document.getElementById('foodlog-section');

    const headerTitle = document.querySelector('#header h1');
    const headerDesc = document.querySelector('#header p');

    sectionProducts.classList.add('hidden');
    sectionFoodLog.classList.add('hidden');

    function updateSidebar(activeId) {
        [navMeals, navProducts, navFood].forEach(nav => {
            const link = nav.querySelector('a');
            link.className = 'nav-link flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-all';
            link.querySelector('span').classList.remove('font-semibold');
            link.querySelector('span').classList.add('font-medium');
        });

        const activeLink = document.getElementById(activeId).querySelector('a');
        activeLink.className = 'nav-link flex items-center gap-3 px-3 py-2.5 bg-emerald-50 text-emerald-700 rounded-lg transition-all';
        activeLink.querySelector('span').classList.remove('font-medium');
        activeLink.querySelector('span').classList.add('font-semibold');
    }

    function hideAllSections() {
        sectionsMeals.forEach(sec => sec.classList.add('hidden'));
        sectionDetails.classList.add('hidden');
        sectionProducts.classList.add('hidden');
        sectionFoodLog.classList.add('hidden');
    }

    navMeals.addEventListener('click', (e) => {
        e.preventDefault();
        hideAllSections();
        sectionsMeals.forEach(sec => sec.classList.remove('hidden'));
        updateSidebar('Meals');
        headerTitle.textContent = 'Meals & Recipes';
        headerDesc.textContent = 'Discover delicious and nutritious recipes tailored for you';
    });

    navProducts.addEventListener('click', (e) => {
        e.preventDefault();
        hideAllSections();
        sectionProducts.classList.remove('hidden');
        updateSidebar('ProductScanner');
        headerTitle.textContent = 'Product Scanner';
        headerDesc.textContent = 'Search packaged foods by name or barcode';
    });

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



function initNavigation() {

    const headerMenuBtn = document.getElementById('header-menu-btn');
    const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    sidebar.classList.add('transition-transform', 'duration-300', 'z-50');
    
    if (window.innerWidth < 1024) {
        sidebar.classList.add('-translate-x-full');
        sidebarOverlay.style.display = 'none';
    }

    function toggleSidebar() {
        sidebar.classList.toggle('-translate-x-full');
        
        if (sidebarOverlay.style.display === 'block') {
            sidebarOverlay.style.display = 'none';
        } else {
            sidebarOverlay.style.display = 'block';
        }
    }

    if (headerMenuBtn) headerMenuBtn.addEventListener('click', toggleSidebar);
    if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', toggleSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', toggleSidebar);

}