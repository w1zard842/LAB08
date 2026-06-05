# 📰 News Portal UA

Сучасний фронтенд-проєкт новинного порталу (Лабораторна робота №8). Проєкт демонструє побудову складного інтерфейсу користувача за допомогою HTML, Tailwind CSS та Vanilla JavaScript.

## 🚀 Основний функціонал
- **Стрічка новин та категорії:** Структурований вивід статей з тегами, авторами та часом публікації.
- **Динамічний пошук:** Живий пошук по статтях за ключовими словами та тегами.
- **Система підписок:** Асинхронне завантаження тарифних планів (місячні/річні) з JSON-файлу.
- **Магазин мерчу (E-commerce):** Сторінка товарів із вибором розмірів та функціональним кошиком (Drawer), що зберігає дані у `localStorage`.
- **UI/UX:** Адаптивна навігація, кастомні бруталістичні модальні вікна, підтримка мобільних пристроїв.

## 🛠 Технології
- **Структура:** HTML5
- **Стилізація:** Tailwind CSS (через CDN із кастомним конфігом констант)
- **Логіка:** Vanilla JavaScript
- **Типографіка та іконки:** Google Fonts (Inter), Material Symbols.

## 📁 Структура директорій
- `index.html` — Головна сторінка з breaking news.
- `categories.html` / `category-*.html` — Сторінки розділів.
- `articles.html` / `article-*.html` — Шаблони для читання новин.
- `pricing.html` / `pricing.js` / `pricing.json` — Сторінка підписок та логіка рендеру.
- `shop.html` — Магазин мерчу.
- `search.html` — Сторінка пошукової системи.
- `ui.js` — Глобальні скрипти (навігація, кошик, модальні вікна).


---
name: Precision Journal
colors:
  surface: '#fcf8fa'
  surface-dim: '#dcd9db'
  surface-bright: '#fcf8fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f4'
  surface-container: '#f0edee'
  surface-container-high: '#eae7e9'
  surface-container-highest: '#e5e2e3'
  on-surface: '#1b1b1d'
  on-surface-variant: '#45464c'
  inverse-surface: '#303031'
  inverse-on-surface: '#f3f0f1'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#575e70'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#141b2b'
  on-primary-container: '#7d8497'
  inverse-primary: '#c0c6db'
  secondary: '#b51822'
  on-secondary: '#ffffff'
  secondary-container: '#d93537'
  on-secondary-container: '#fffbff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002110'
  on-tertiary-container: '#2a955f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce2f7'
  primary-fixed-dim: '#c0c6db'
  on-primary-fixed: '#141b2b'
  on-primary-fixed-variant: '#404758'
  secondary-fixed: '#ffdad7'
  secondary-fixed-dim: '#ffb3ad'
  on-secondary-fixed: '#410004'
  on-secondary-fixed-variant: '#930013'
  tertiary-fixed: '#91f8b8'
  tertiary-fixed-dim: '#74db9d'
  on-tertiary-fixed: '#002110'
  on-tertiary-fixed-variant: '#00522f'
  background: '#fcf8fa'
  on-background: '#1b1b1d'
  surface-variant: '#e5e2e3'
  surface-paper: '#FFFFFF'
  ink-subtle: '#4B5563'
  breaking-news: '#E53E3E'
  state-success: '#38A169'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 60px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.7'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  section-gap: 80px

name: Precision Journal
colors:
  surface: '#fcf8fa'
  surface-dim: '#dcd9db'
  surface-bright: '#fcf8fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f4'
  surface-container: '#f0edee'
  surface-container-high: '#eae7e9'
  surface-container-highest: '#e5e2e3'
  on-surface: '#1b1b1d'
  on-surface-variant: '#45464c'
  inverse-surface: '#303031'
  inverse-on-surface: '#f3f0f1'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#575e70'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#141b2b'
  on-primary-container: '#7d8497'
  inverse-primary: '#c0c6db'
  secondary: '#b51822'
  on-secondary: '#ffffff'
  secondary-container: '#d93537'
  on-secondary-container: '#fffbff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002110'
  on-tertiary-container: '#2a955f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce2f7'
  primary-fixed-dim: '#c0c6db'
  on-primary-fixed: '#141b2b'
  on-primary-fixed-variant: '#404758'
  secondary-fixed: '#ffdad7'
  secondary-fixed-dim: '#ffb3ad'
  on-secondary-fixed: '#410004'
  on-secondary-fixed-variant: '#930013'
  tertiary-fixed: '#91f8b8'
  tertiary-fixed-dim: '#74db9d'
  on-tertiary-fixed: '#002110'
  on-tertiary-fixed-variant: '#00522f'
  background: '#fcf8fa'
  on-background: '#1b1b1d'
  surface-variant: '#e5e2e3'
  surface-paper: '#FFFFFF'
  ink-subtle: '#4B5563'
  breaking-news: '#E53E3E'
  state-success: '#38A169'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 60px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.7'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  section-gap: 80px
---



Brand & Style:
The design system is anchored in a Minimalist High-Contrast aesthetic, specifically tailored for high-stakes journalism and information density. It prioritizes clarity and authority, evoking a sense of "digital paper".

Components:

Buttons: Rectangular with a 0.25rem radius. High-contrast Primary background.

Cards: 1px stroke. Subtle hover state where the border color darkens.

Modals & Overlays: Sharp 4px hard shadow to maintain the "Modern Brutalist" editorial feel.
