// src/js/foodLog.js

const GOALS = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65
};

export function initFoodLog() {
    updateDate();
    renderFoodLog();
    setupEventListeners();
    renderWeeklyOverview(); // دي الفانكشن الجديدة
}

function updateDate() {
    const dateEl = document.getElementById('foodlog-date');
    if (dateEl) {
        const options = { weekday: 'long', month: 'short', day: 'numeric' };
        dateEl.innerText = new Date().toLocaleDateString('en-US', options);
    }
}

export function renderFoodLog() {
    let logs = JSON.parse(localStorage.getItem('nutriplan_logs')) || [];
    const listContainer = document.getElementById('logged-items-list');
    const clearBtn = document.getElementById('clear-foodlog');
    const countEl = document.getElementById('logged-count');

    if (logs.length === 0) {
        listContainer.innerHTML = `
        <div class="text-center py-8 text-gray-500">
            <p class="font-medium">No meals logged today</p>
        </div>`;
        if (clearBtn) clearBtn.style.display = 'none';
        if (countEl) countEl.innerText = `Logged Items (0)`;
        return;
    }

    if (clearBtn) clearBtn.style.display = 'flex';
    if (countEl) countEl.innerText = `Logged Items (${logs.length})`;

    let cartona = '';

    logs.forEach((item, index) => {
        let typeLabel = item.type === 'product' ? 'Product' : 'Recipe';
        let servingsOrBrand = item.type === 'product' ? (item.brand || item.name) : `${item.servings || 1} serving`;

        // لو مفيش وقت متسجل، هنحط وقت افتراضي زي الصورة
        let timeStr = '1:10 AM';
        if (item.dateAdded) {
            const d = new Date(item.dateAdded);
            timeStr = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        }

        cartona += `
        <div class="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
            <div class="flex items-center gap-4">
                <img src="${item.image || 'https://via.placeholder.com/150'}" alt="${item.name}" class="w-14 h-14 rounded-xl object-cover bg-white shadow-sm border border-gray-100 p-1">
                <div>
                    <h4 class="font-bold text-gray-900 text-base">${item.name}</h4>
                    <p class="text-xs text-gray-500 mt-1">${servingsOrBrand} • <span class="text-emerald-600">${typeLabel}</span></p>
                    <p class="text-[11px] text-gray-400 mt-0.5">${timeStr}</p>
                </div>
            </div>
            
            <div class="flex items-center gap-8">
                <div class="text-right">
                    <p class="text-lg font-bold text-emerald-600">${Math.round(item.totalCalories)} <span class="text-xs text-gray-500 font-normal">kcal</span></p>
                </div>
                
                <div class="hidden md:flex items-center gap-4 text-xs font-medium">
                    <span class="text-gray-700 bg-blue-50/50 px-2 py-1 rounded">${Math.round(item.totalProtein * 10) / 10}g <span class="text-gray-400">P</span></span>
                    <span class="text-gray-700 bg-amber-50/50 px-2 py-1 rounded">${Math.round(item.totalCarbs * 10) / 10}g <span class="text-gray-400">C</span></span>
                    <span class="text-gray-700 bg-purple-50/50 px-2 py-1 rounded">${Math.round(item.totalFat * 10) / 10}g <span class="text-gray-400">F</span></span>
                </div>
                
                <button data-index="${index}" class="delete-log-btn text-gray-400 hover:text-red-500 transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white shadow-sm border border-transparent hover:border-gray-200">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </div>`;
    });

    listContainer.innerHTML = cartona;

    document.querySelectorAll('.delete-log-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.currentTarget.getAttribute('data-index');
            removeLogItem(index);
        });
    });

    // بنحدث البيانات الكلية
    renderWeeklyOverview();
}

function renderWeeklyOverview() {
    const logs = JSON.parse(localStorage.getItem('nutriplan_logs')) || [];
    const container = document.getElementById('weekly-days-container');
    if (!container) return;

    const days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        days.push({
            dateObj: d,
            dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
            dayNum: d.getDate(),
            dateStr: d.toISOString().split('T')[0],
            isToday: i === 0
        });
    }

    let totalWeeklyCalories = 0;
    let totalWeeklyItems = 0;
    let daysOnGoal = 0;
    let html = '';

    days.forEach(day => {
        const dayLogs = logs.filter(log => {
            if (!log.dateAdded) return false;
            const logDate = new Date(log.dateAdded).toISOString().split('T')[0];
            return logDate === day.dateStr;
        });

        const dayItemsCount = dayLogs.length;
        const dayCalories = dayLogs.reduce((sum, log) => sum + (Number(log.totalCalories) || 0), 0);

        totalWeeklyCalories += dayCalories;
        totalWeeklyItems += dayItemsCount;

        if (dayCalories > 0 && dayCalories <= GOALS.calories) {
            daysOnGoal++;
        }

        const hasData = dayItemsCount > 0;

        if (day.isToday) {
            // تصميم اليوم الحالي (لون أزرق فاتح زي الصورة)
            html += `
            <div class="flex-1 flex flex-col items-center bg-indigo-50 rounded-2xl py-4 px-2 min-w-[80px]">
              <span class="text-sm text-gray-500 mb-1">${day.dayName}</span>
              <span class="text-base font-bold text-gray-900 mb-3">${day.dayNum}</span>
              <span class="text-xl font-bold text-emerald-600">${Math.round(dayCalories)}</span>
              <span class="text-xs text-emerald-600 font-medium">kcal</span>
              <span class="text-[11px] text-gray-500 mt-1">${dayItemsCount} items</span>
            </div>`;
        } else {
            // تصميم باقي الأيام
            let calColorClass = hasData ? 'text-emerald-600' : 'text-gray-300';
            let calLabelClass = hasData ? 'text-emerald-600' : 'text-gray-300';

            html += `
            <div class="flex-1 flex flex-col items-center py-4 px-2 min-w-[80px] bg-transparent">
              <span class="text-sm text-gray-400 mb-1">${day.dayName}</span>
              <span class="text-base font-bold text-gray-600 mb-3">${day.dayNum}</span>
              <span class="text-xl font-bold ${calColorClass}">${Math.round(dayCalories)}</span>
              <span class="text-xs ${calLabelClass} font-medium">kcal</span>
              ${hasData ? `<span class="text-[11px] text-gray-400 mt-1">${dayItemsCount} items</span>` : `<span class="text-[11px] text-transparent mt-1">0 items</span>`}
            </div>`;
        }
    });

    container.innerHTML = html;

    const weeklyAvg = totalWeeklyCalories > 0 ? Math.round(totalWeeklyCalories / 7) : 0;
    document.getElementById('weekly-average').innerText = `${weeklyAvg} kcal`;
    document.getElementById('weekly-total-items').innerText = `${totalWeeklyItems} items`;
    document.getElementById('weekly-days-goal').innerText = `${daysOnGoal} / 7`;
}

function updateProgressBars(totals) {
    const getPercent = (current, goal) => Math.min(100, Math.round((current / goal) * 100));

    document.getElementById('cal-text').innerText = `${Math.round(totals.calories)} / ${GOALS.calories} kcal`;
    document.getElementById('cal-bar').style.width = `${getPercent(totals.calories, GOALS.calories)}%`;

    document.getElementById('pro-text').innerText = `${Math.round(totals.protein)} / ${GOALS.protein} g`;
    document.getElementById('pro-bar').style.width = `${getPercent(totals.protein, GOALS.protein)}%`;

    document.getElementById('carb-text').innerText = `${Math.round(totals.carbs)} / ${GOALS.carbs} g`;
    document.getElementById('carb-bar').style.width = `${getPercent(totals.carbs, GOALS.carbs)}%`;

    document.getElementById('fat-text').innerText = `${Math.round(totals.fat)} / ${GOALS.fat} g`;
    document.getElementById('fat-bar').style.width = `${getPercent(totals.fat, GOALS.fat)}%`;
}

function removeLogItem(index) {
    let logs = JSON.parse(localStorage.getItem('nutriplan_logs')) || [];
    logs.splice(index, 1);
    localStorage.setItem('nutriplan_logs', JSON.stringify(logs));
    renderFoodLog();
    renderWeeklyOverview(); // بنحدث الرسم البياني لما نمسح حاجة
}

function setupEventListeners() {
    const clearBtn = document.getElementById('clear-foodlog');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You are about to clear today's entire food log!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#9ca3af',
                confirmButtonText: 'Yes, clear it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem('nutriplan_logs');
                    renderFoodLog();
                    renderWeeklyOverview(); // بنحدث الرسم البياني لما نمسح الكل
                    Swal.fire('Cleared!', 'Your food log has been cleared.', 'success');
                }
            });
        });
    }
}

