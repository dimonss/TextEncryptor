# SecureText - AES Encryption Web App 🔒

SecureText is a modern, lightweight React web application that allows you to easily encrypt and decrypt text using the AES-256 algorithm. Featuring a clean, modern "Glassmorphism" UI, it offers a fast, user-friendly, and secure way to share confidential messages using a secret key.

## Features
- **AES-256 Encryption**: Robust and secure cryptographic implementation powered by `crypto-js`.
- **Modern UI**: A beautiful, translucent "Glassmorphism" interface with a dark theme and purple/blue neon accents.
- **Client-side Processing**: All encryption and decryption logic happens instantly inside your browser. No data is sent to external servers.
- **1-Click Copy**: Easily copy your ciphertext or decrypted messages directly to the clipboard.
- **Fast Setup**: Built with Vite + React + TypeScript for a blazing-fast development experience.

## Tech Stack
- React 18
- TypeScript
- Vite
- Crypto-JS
- Lucide React (for icons)
- Vanilla CSS 

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Clone the repository or navigate to the project directory.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173/`.

### Building for Production
To build a production-ready bundle, run:
```bash
npm run build
```
This will compile and minify your application into the `dist` folder.

---
---

# SecureText - Веб-приложение для AES-шифрования 🔒

SecureText — это современное и легкое веб-приложение на React, которое позволяет легко зашифровывать и дешифровывать текст с использованием алгоритма AES-256. Благодаря приятному современному интерфейсу с эффектом «матового стекла» (Glassmorphism), приложение предлагает быстрый, удобный и безопасный способ обмена конфиденциальными сообщениями с использованием секретного ключа (пароля).

## Особенности
- **Шифрование AES-256**: Надежная и безопасная криптография, реализованная с помощью `crypto-js`.
- **Современный UI / Дизайн**: Красивый полупрозрачный интерфейс в стиле Glassmorphism с темной темой и неоновыми оттенками.
- **Обработка на клиенте**: Вся логика шифрования и дешифрования происходит мгновенно прямо в вашем браузере. Ваши данные никуда не отправляются на сервер.
- **Копирование в 1 клик**: Удобно копируйте зашифрованный или расшифрованный текст в буфер обмена одним нажатием.
- **Быстрая настройка**: Создано на базе Vite + React + TypeScript для максимальной скорости работы.

## Стек технологий
- React 18
- TypeScript
- Vite
- Crypto-JS
- Lucide React (иконки)
- Vanilla CSS

## Быстрый старт

### Требования
Убедитесь, что на вашем компьютере установлен [Node.js](https://nodejs.org/).

### Установка
1. Склонируйте репозиторий или перейдите в папку проекта.
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Запустите сервер разработки:
   ```bash
   npm run dev
   ```
4. Откройте браузер и перейдите по адресу `http://localhost:5173/`.

### Сборка для Production
Чтобы собрать продакшен-версию приложения, выполните:
```bash
npm run build
```
Приложение будет скомпилировано и минифицировано в папку `dist`.
