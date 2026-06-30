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
    const headerMenuBtn = document.getElementById('header-menu-btn');
    const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const mainContent = document.getElementById('main-content');

    // 1. تثبيت الحركة باستخدام ستايل مباشر (عشان نتفادى مشاكل Tailwind)
    if (sidebar) sidebar.style.transition = 'transform 0.3s ease-in-out';
    if (mainContent) mainContent.style.transition = 'margin 0.3s ease-in-out';
    
    let isSidebarOpen = window.innerWidth >= 1024;

    function updateLayout() {
        if (!sidebar || !mainContent || !sidebarOverlay) return;
        
        if (window.innerWidth < 1024) {
            // إعدادات الموبايل
            if (isSidebarOpen) {
                sidebar.style.transform = 'translateX(0)';
                sidebarOverlay.style.display = 'block';
                sidebarOverlay.className = 'fixed inset-0 bg-black/50 z-40';
            } else {
                sidebar.style.transform = 'translateX(-100%)';
                sidebarOverlay.style.display = 'none';
            }
            mainContent.style.marginLeft = '0px';
        } else {
            // إعدادات الكمبيوتر
            sidebarOverlay.style.display = 'none';
            if (isSidebarOpen) {
                sidebar.style.transform = 'translateX(0)';
                mainContent.style.marginLeft = '18rem'; // اللي هي بتعادل w-72
            } else {
                sidebar.style.transform = 'translateX(-100%)';
                mainContent.style.marginLeft = '0px';
            }
        }
    }

    function toggleSidebar() {
        isSidebarOpen = !isSidebarOpen;
        updateLayout();
    }

    // تشغيل التظبيط أول ما الصفحة تفتح ولما مقاسها يتغير
    updateLayout();
    window.addEventListener('resize', () => {
        isSidebarOpen = window.innerWidth >= 1024;
        updateLayout();
    });

    if (headerMenuBtn) headerMenuBtn.addEventListener('click', toggleSidebar);
    if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', toggleSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', toggleSidebar);

    // ==========================================
    // 2. كود التنقل بين الأقسام
    // ==========================================
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

    if (sectionProducts) sectionProducts.classList.add('hidden');
    if (sectionFoodLog) sectionFoodLog.classList.add('hidden');

    function updateSidebarActive(activeId) {
        if (!navMeals || !navProducts || !navFood) return;
        
        [navMeals, navProducts, navFood].forEach(nav => {
            const link = nav.querySelector('a');
            if (link) {
                link.className = 'nav-link flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-all';
                const span = link.querySelector('span');
                if (span) {
                    span.classList.remove('font-semibold');
                    span.classList.add('font-medium');
                }
            }
        });

        const activeLink = document.getElementById(activeId)?.querySelector('a');
        if (activeLink) {
            activeLink.className = 'nav-link flex items-center gap-3 px-3 py-2.5 bg-emerald-50 text-emerald-700 rounded-lg transition-all';
            const activeSpan = activeLink.querySelector('span');
            if (activeSpan) {
                activeSpan.classList.remove('font-medium');
                activeSpan.classList.add('font-semibold');
            }
        }
    }

    function hideAllSections() {
        sectionsMeals.forEach(sec => { if (sec) sec.classList.add('hidden') });
        if (sectionDetails) sectionDetails.classList.add('hidden');
        if (sectionProducts) sectionProducts.classList.add('hidden');
        if (sectionFoodLog) sectionFoodLog.classList.add('hidden');
    }

    if (navMeals) navMeals.addEventListener('click', (e) => {
        e.preventDefault();
        hideAllSections();
        sectionsMeals.forEach(sec => { if (sec) sec.classList.remove('hidden') });
        updateSidebarActive('Meals');
        if (headerTitle) headerTitle.textContent = 'Meals & Recipes';
        if (headerDesc) headerDesc.textContent = 'Discover delicious and nutritious recipes tailored for you';
        if (window.innerWidth < 1024) toggleSidebar();
    });

    if (navProducts) navProducts.addEventListener('click', (e) => {
        e.preventDefault();
        hideAllSections();
        if (sectionProducts) sectionProducts.classList.remove('hidden');
        updateSidebarActive('ProductScanner');
        if (headerTitle) headerTitle.textContent = 'Product Scanner';
        if (headerDesc) headerDesc.textContent = 'Search packaged foods by name or barcode';
        if (window.innerWidth < 1024) toggleSidebar();
    });

    if (navFood) navFood.addEventListener('click', (e) => {
        e.preventDefault();
        hideAllSections();
        if (sectionFoodLog) sectionFoodLog.classList.remove('hidden');
        updateSidebarActive('Food');
        if (headerTitle) headerTitle.textContent = 'Food Log';
        if (headerDesc) headerDesc.textContent = 'Track your daily nutrition and food intake';
        if (window.innerWidth < 1024) toggleSidebar();
    });
}
initNavigation()



