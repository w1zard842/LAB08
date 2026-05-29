let fetchedMonthlyPlans = [];
let fetchedYearlyPlans = [];
let isYearly = false;

const plansContainer = document.getElementById('plans-container');
const btnMonthly = document.getElementById('btn-monthly');
const btnYearly = document.getElementById('btn-yearly');
const searchBtn = document.getElementById('search-plan-btn');
const searchInput = document.getElementById('search-plan-input');
const searchError = document.getElementById('search-error');

async function loadPricingData() {
  try {
    plansContainer.innerHTML = '<p class="col-span-1 md:col-span-3 text-center font-label-bold text-ink-subtle mt-10">Завантаження тарифів з сервера...</p>';
    const response = await fetch('pricing.json');
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    const data = await response.json();
    fetchedMonthlyPlans = data.monthly;
    fetchedYearlyPlans = data.yearly;

    renderPlans(fetchedMonthlyPlans);
  } catch (error) {
    console.error('Помилка:', error);
    plansContainer.innerHTML = `<p class="col-span-1 md:col-span-3 text-center text-error font-label-bold">Не вдалося завантажити тарифи.</p>`;
  }
}

const renderPlans = (plansToRender) => {
  plansContainer.innerHTML = ''; 

  plansToRender.forEach(planItem => {
    const { id, plan, price, period, isPopular, features } = planItem;

    const featuresHTML = features.map(f => `
      <li class="flex items-start gap-3">
        <span class="material-symbols-outlined text-${isPopular ? 'primary' : 'secondary'} text-[20px]">check</span>
        <span class="font-body-md text-body-md text-on-surface">${f}</span>
      </li>
    `).join('');
    const borderStyle = isPopular ? 'border-2 border-primary shadow-[0_4px_0_0_#000000] -mt-4' : 'border border-outline';
    const badgeHTML = isPopular ? `<div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-on-primary px-4 py-1 font-label-bold text-label-bold tracking-widest uppercase">ПОПУЛЯРНИЙ</div>` : '';
    const btnColor = isPopular ? 'bg-primary' : 'bg-secondary';

    const cardHTML = `
      <div class="bg-surface-container-lowest ${borderStyle} p-8 flex flex-col rounded-lg relative plan-card ${id} transition-transform duration-300">
        ${badgeHTML}
        <div class="mb-8">
          <h2 class="font-headline-md text-headline-md mb-2 plan-name">${plan}</h2>
          <p class="font-body-md text-body-md text-ink-subtle">Вибір читачів.</p>
        </div>
        <div class="mb-8 flex-grow">
          <div class="mb-6">
            <span class="font-headline-lg text-headline-lg">₴${price}</span>
            <span class="font-body-md text-body-md text-ink-subtle">${period}</span>
          </div>
          <ul class="space-y-4">
            ${featuresHTML}
          </ul>
        </div>
        <button class="w-full py-3 ${btnColor} text-on-primary font-label-bold text-label-bold rounded-lg hover:opacity-90 transition-opacity plan-btn">Обрати план</button>
      </div>
    `;
    plansContainer.insertAdjacentHTML('beforeend', cardHTML);
  });
};

const updateToggleUI = () => {
  if (isYearly) {
    btnYearly.classList.replace('text-ink-subtle', 'text-on-primary');
    btnYearly.classList.add('bg-primary');
    btnMonthly.classList.replace('text-on-primary', 'text-ink-subtle');
    btnMonthly.classList.remove('bg-primary');
    renderPlans(fetchedYearlyPlans);
  } else {
    btnMonthly.classList.replace('text-ink-subtle', 'text-on-primary');
    btnMonthly.classList.add('bg-primary');
    btnYearly.classList.replace('text-on-primary', 'text-ink-subtle');
    btnYearly.classList.remove('bg-primary');
    renderPlans(fetchedMonthlyPlans);
  }
};

btnMonthly.addEventListener('click', () => { isYearly = false; updateToggleUI(); });
btnYearly.addEventListener('click', () => { isYearly = true; updateToggleUI(); });

searchBtn.addEventListener('click', () => {
  searchError.classList.add('hidden');
  const query = searchInput.value.trim().toLowerCase();
  try {
    if (!query) throw new Error('Введіть назву тарифу!');
    const currentPlans = isYearly ? fetchedYearlyPlans : fetchedMonthlyPlans;
    const foundPlan = currentPlans.find(p => p.plan.toLowerCase() === query);
    if (!foundPlan) throw new Error(`Тариф "${query}" не знайдено!`);
    renderPlans([foundPlan]);
  } catch (error) {
    searchError.textContent = error.message;
    searchError.classList.remove('hidden');
    renderPlans(isYearly ? fetchedYearlyPlans : fetchedMonthlyPlans);
  }
});

plansContainer.addEventListener('click', (event) => {
  const clickedCard = event.target.closest('.plan-card');
  if (!clickedCard) return;

  document.querySelectorAll('.plan-card').forEach(card => card.classList.remove('scale-105', 'ring-4', 'ring-error'));
  clickedCard.classList.add('scale-105', 'ring-4', 'ring-error');

  if (event.target.classList.contains('plan-btn')) {
    const btn = event.target;
    const planName = clickedCard.querySelector('.plan-name').textContent;
    const originalText = btn.textContent;
    const originalColor = btn.className;

    btn.className = 'w-full py-3 bg-outline text-on-primary font-label-bold rounded-lg flex justify-center items-center gap-2 cursor-wait';
    btn.innerHTML = `<span class="material-symbols-outlined animate-spin">sync</span> Обробка...`;
    btn.disabled = true;

    setTimeout(() => {
      btn.className = 'w-full py-3 bg-state-success text-on-primary font-label-bold rounded-lg flex justify-center items-center gap-2';
      btn.innerHTML = `<span class="material-symbols-outlined">check_circle</span> Підтверджено!`;
      
      showCustomModal(`Дякуємо! Ви успішно обрали тариф: ${planName}`);
      
      setTimeout(() => {
        btn.className = originalColor;
        btn.textContent = originalText;
        btn.disabled = false;
        clickedCard.classList.remove('scale-105', 'ring-4', 'ring-error');
      }, 2000);
    }, 2000); 
  }
});

loadPricingData();