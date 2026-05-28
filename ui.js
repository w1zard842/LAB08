document.addEventListener('DOMContentLoaded', () => {
    // Profile Dropdown
    const profileBtn = document.getElementById('profile-menu-btn');
    const profileDropdown = document.getElementById('profile-dropdown');

    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.add('hidden');
            }
        });
    }

    // Cart Drawer
    const cartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartContentContainer = cartDrawer ? cartDrawer.querySelector('.flex-grow') : null;

    const openCart = () => {
        if (cartDrawer && cartOverlay) {
            cartDrawer.classList.remove('translate-x-full');
            cartOverlay.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
            renderCart();
        }
    };

    const closeCart = () => {
        if (cartDrawer && cartOverlay) {
            cartDrawer.classList.add('translate-x-full');
            cartOverlay.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    };

    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeCart();
        });
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', (e) => {
            e.preventDefault();
            closeCart();
        });
    }

    // Escape key listener to close both
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCart();
            if (profileDropdown) {
                profileDropdown.classList.add('hidden');
            }
        }
    });

    // Cart Business Logic (localStorage integration)
    const getCart = () => JSON.parse(localStorage.getItem('news_portal_cart') || '[]');
    const saveCart = (cart) => localStorage.setItem('news_portal_cart', JSON.stringify(cart));

    const updateCartBadge = () => {
        const cart = getCart();
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartBtns = document.querySelectorAll('#cart-btn');
        cartBtns.forEach(btn => {
            let badge = btn.querySelector('.cart-badge');
            if (totalCount > 0) {
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'cart-badge absolute -top-1 -right-1 bg-secondary text-on-secondary font-label-sm text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-primary font-bold';
                    btn.classList.add('relative');
                    btn.appendChild(badge);
                }
                badge.textContent = totalCount;
            } else {
                if (badge) {
                    badge.remove();
                }
            }
        });
    };

    const updateCartContainerClasses = (isEmpty) => {
        if (!cartContentContainer) return;
        if (isEmpty) {
            cartContentContainer.className = 'flex-grow p-8 flex flex-col items-center justify-center gap-6 text-center bg-surface-container-lowest';
        } else {
            cartContentContainer.className = 'flex-grow flex flex-col bg-surface-container-lowest overflow-hidden';
        }
    };

    const renderCart = () => {
        if (!cartContentContainer) return;
        const cart = getCart();

        if (cart.length === 0) {
            updateCartContainerClasses(true);
            cartContentContainer.innerHTML = `
                <div class="w-20 h-20 rounded-full border-2 border-primary bg-surface-container-low flex items-center justify-center shadow-[4px_4px_0_0_#000000]">
                    <span class="material-symbols-outlined text-primary text-[40px]">shopping_bag</span>
                </div>
                <div class="flex flex-col gap-2">
                    <p class="font-headline-md text-headline-md text-primary uppercase">Ваш кошик порожній</p>
                    <p class="font-body-md text-body-md text-ink-subtle">Додайте товари з нашого магазину мерчу, щоб підтримати якісну журналістику.</p>
                </div>
                <a href="shop.html" class="bg-secondary text-on-secondary px-6 py-4 font-label-bold text-label-bold uppercase tracking-wider hover:bg-secondary-container transition-colors border-2 border-primary shadow-[4px_4px_0_0_#000000] inline-block mt-4 focus:outline-none focus:ring-2 focus:ring-secondary">
                    Перейти до магазину
                </a>
            `;
        } else {
            updateCartContainerClasses(false);
            const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            let itemsHtml = '';
            cart.forEach((item, index) => {
                const sizeMarkup = item.size 
                    ? `<span class="font-label-sm text-label-sm text-ink-subtle uppercase tracking-wider">Розмір: ${item.size}</span>`
                    : '';
                
                itemsHtml += `
                    <div class="border-2 border-primary bg-surface-paper p-4 flex gap-4 relative shadow-[4px_4px_0_0_#000000] flex-shrink-0">
                        <div class="flex-grow flex flex-col gap-1">
                            <h4 class="font-bold text-primary font-body-lg text-body-lg">${item.name}</h4>
                            ${sizeMarkup}
                            <div class="font-bold text-primary mt-1">$${item.price.toFixed(2)}</div>
                        </div>
                        <div class="flex flex-col justify-between items-end gap-2">
                            <button class="remove-item-btn text-outline hover:text-error transition-colors" data-index="${index}" aria-label="Видалити товар">
                                <span class="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                            <div class="flex items-center border-2 border-primary bg-surface-container-low rounded overflow-hidden">
                                <button class="qty-dec-btn px-2 py-0.5 hover:bg-outline-variant transition-colors text-primary font-bold text-sm" data-index="${index}">-</button>
                                <span class="px-3 font-label-bold text-label-bold text-primary border-l-2 border-r-2 border-primary bg-surface-paper text-xs py-0.5">${item.quantity}</span>
                                <button class="qty-inc-btn px-2 py-0.5 hover:bg-outline-variant transition-colors text-primary font-bold text-sm" data-index="${index}">+</button>
                            </div>
                        </div>
                    </div>
                `;
            });

            cartContentContainer.innerHTML = `
                <div class="flex-grow overflow-y-auto p-6 flex flex-col gap-4 text-left">
                    ${itemsHtml}
                </div>
                <div class="border-t-2 border-primary p-6 bg-surface-paper flex flex-col gap-4 text-left">
                    <div class="flex justify-between items-center font-bold text-primary font-headline-md text-headline-md uppercase">
                        <span>Загальна сума</span>
                        <span>$${totalPrice.toFixed(2)}</span>
                    </div>
                    <button id="checkout-btn" class="w-full bg-secondary text-on-secondary py-4 font-label-bold text-label-bold uppercase tracking-wider hover:bg-secondary-container transition-colors border-2 border-primary shadow-[4px_4px_0_0_#000000] focus:outline-none focus:ring-2 focus:ring-secondary">
                        Оформити замовлення
                    </button>
                </div>
            `;

            const checkoutBtn = cartContentContainer.querySelector('#checkout-btn');
            if (checkoutBtn) {
                checkoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    openInfoModal("Замовлення", "Дякуємо за ваше замовлення! Функціонал оформлення замовлення знаходиться в розробці. Дякуємо за вашу підтримку News Portal UA!");
                });
            }
        }
    };

    const addToCart = (name, price, size) => {
        let cart = getCart();
        const existingItem = cart.find(item => item.name === name && item.size === size);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, size, quantity: 1 });
        }
        saveCart(cart);
        updateCartBadge();
        renderCart();
        openCart();
    };

    // Add to Cart Button Listener on Shop Page
    document.addEventListener('click', (e) => {
        const addToCartBtn = e.target.closest('button');
        if (addToCartBtn && addToCartBtn.textContent.includes('До кошика')) {
            e.preventDefault();
            const card = addToCartBtn.closest('article');
            if (card) {
                const nameEl = card.querySelector('h2');
                const priceEl = card.querySelector('span.font-body-lg') || card.querySelector('span.text-primary');
                const sizeSelect = card.querySelector('select');

                if (nameEl && priceEl) {
                    const name = nameEl.textContent.trim();
                    const priceText = priceEl.textContent.trim();
                    const price = parseFloat(priceText.replace('$', '').replace('€', '').trim());
                    const size = sizeSelect ? sizeSelect.value.trim() : null;

                    addToCart(name, price, size);
                }
            }
        }
    });

    // Cart Items Quantity / Removal Listeners
    if (cartContentContainer) {
        cartContentContainer.addEventListener('click', (e) => {
            const decBtn = e.target.closest('.qty-dec-btn');
            const incBtn = e.target.closest('.qty-inc-btn');
            const removeBtn = e.target.closest('.remove-item-btn');

            if (decBtn || incBtn || removeBtn) {
                e.preventDefault();
                let cart = getCart();
                const index = parseInt((decBtn || incBtn || removeBtn).getAttribute('data-index'), 10);

                if (decBtn) {
                    if (cart[index].quantity > 1) {
                        cart[index].quantity -= 1;
                    } else {
                        cart.splice(index, 1);
                    }
                } else if (incBtn) {
                    cart[index].quantity += 1;
                } else if (removeBtn) {
                    cart.splice(index, 1);
                }

                saveCart(cart);
                updateCartBadge();
                renderCart();
            }
        });
    }

    // Initial Badge & Render Setup
    updateCartBadge();
    renderCart();

    // Modal Popup Logic
    const modalContents = {
        privacy: {
            title: "Політика конфіденційності",
            body: "Ця політика конфіденційності описує, як News Portal UA збирає, використовує та захищає вашу інформацію. Ми поважаємо вашу конфіденційність і прагнемо забезпечити максимальний захист персональних даних. Усі зібрані дані використовуються виключно для покращення користувацького досвіду та надання якісних інформаційних послуг."
        },
        terms: {
            title: "Умови використання",
            body: "Використовуючи News Portal UA, ви погоджуєтеся з цими умовами використання. Весь контент є власністю порталу і не може бути скопійований або відтворений без письмового дозволу. Ми залишаємо за собою право вносити зміни до умов використання у будь-який час."
        },
        rss: {
            title: "RSS Стрічка",
            body: "RSS стрічка знаходиться в розробці. Слідкуйте за нашими оновленнями найближчим часом!"
        }
    };

    const modalLinks = document.querySelectorAll('[data-modal]');
    modalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalType = link.getAttribute('data-modal');
            const content = modalContents[modalType];
            if (content) {
                openInfoModal(content.title, content.body);
            }
        });
    });

    function openInfoModal(title, bodyText) {
        // Create Modal Overlay
        const overlay = document.createElement('div');
        overlay.id = 'info-modal-overlay';
        overlay.className = 'fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300';
        
        // Create Modal Container
        const container = document.createElement('div');
        container.className = 'w-full max-w-lg bg-surface-paper border-2 border-primary shadow-[8px_8px_0_0_#000000] p-8 flex flex-col gap-6 relative transform scale-95 opacity-0 transition-all duration-300';
        
        container.innerHTML = `
            <div class="flex justify-between items-center border-b-2 border-primary pb-4">
                <h3 class="font-headline-md text-headline-md text-primary uppercase">${title}</h3>
                <button id="modal-close-icon" class="p-1 hover:opacity-75 flex items-center justify-center focus:outline-none">
                    <span class="material-symbols-outlined text-[24px]">close</span>
                </button>
            </div>
            <div class="font-body-md text-body-md text-on-surface-variant max-h-[300px] overflow-y-auto pr-2">
                <p class="leading-relaxed">${bodyText}</p>
            </div>
            <div class="flex justify-end pt-4 border-t border-outline-variant">
                <button id="modal-close-btn" class="bg-secondary text-on-secondary hover:bg-secondary-container transition-colors border-2 border-primary shadow-[4px_4px_0_0_#000000] px-6 py-3 font-label-bold text-label-bold uppercase focus:outline-none">
                    Закрити
                </button>
            </div>
        `;
        
        overlay.appendChild(container);
        document.body.appendChild(overlay);
        document.body.classList.add('overflow-hidden'); // Lock body scroll

        // Animate open
        setTimeout(() => {
            container.classList.remove('scale-95', 'opacity-0');
            container.classList.add('scale-100', 'opacity-100');
        }, 10);

        const closeModal = () => {
            container.classList.remove('scale-100', 'opacity-100');
            container.classList.add('scale-95', 'opacity-0');
            overlay.classList.add('opacity-0');
            setTimeout(() => {
                overlay.remove();
                // Check if cart drawer is NOT open before removing overflow-hidden
                const cartDrawer = document.getElementById('cart-drawer');
                if (!cartDrawer || cartDrawer.classList.contains('translate-x-full')) {
                    document.body.classList.remove('overflow-hidden');
                }
            }, 300);
        };

        // Event listeners for close
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });
        overlay.querySelector('#modal-close-btn').addEventListener('click', closeModal);
        overlay.querySelector('#modal-close-icon').addEventListener('click', closeModal);
        
        // Escape key support
        const modalKeydownHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', modalKeydownHandler);
            }
        };
        document.addEventListener('keydown', modalKeydownHandler);
    }
});
