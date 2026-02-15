/**
 * Скрипт для генерации PNG и JPEG версий логотипов
 * 
 * Использование:
 * 1. Установите зависимости: npm install canvas (или используйте HTML версию)
 * 2. Запустите: node generate-images.js
 * 
 * Альтернатива: Откройте generate-png-jpeg.html в браузере
 */

const fs = require('fs');
const path = require('path');

// SVG логотипы
const logos = {
    color: {
        name: 'logo-color',
        svg: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect x="60" y="60" width="30" height="30" fill="white" opacity="0.9"></rect>
            <rect x="110" y="60" width="30" height="30" fill="white" opacity="0.9"></rect>
            <rect x="60" y="110" width="30" height="30" fill="rgb(218, 103, 8)" opacity="0.9"></rect>
            <rect x="110" y="110" width="30" height="30" fill="white" opacity="0.9"></rect>
            <line x1="90" y1="75" x2="110" y2="75" stroke="white" stroke-width="2"></line>
            <line x1="75" y1="90" x2="75" y2="110" stroke="white" stroke-width="2"></line>
            <line x1="125" y1="90" x2="125" y2="110" stroke="white" stroke-width="2"></line>
            <line x1="90" y1="125" x2="110" y2="125" stroke="white" stroke-width="2"></line>
            <text x="100" y="195" text-anchor="middle" fill="white" font-family="Verdana, sans-serif" font-size="22" letter-spacing="3.5">TLIS</text>
        </svg>`,
        bgColor: '#1a1a1a'
    },
    white: {
        name: 'logo-white',
        svg: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect x="60" y="60" width="30" height="30" fill="white" opacity="0.9"></rect>
            <rect x="110" y="60" width="30" height="30" fill="white" opacity="0.9"></rect>
            <rect x="60" y="110" width="30" height="30" fill="white" opacity="0.9"></rect>
            <rect x="110" y="110" width="30" height="30" fill="white" opacity="0.9"></rect>
            <line x1="90" y1="75" x2="110" y2="75" stroke="white" stroke-width="2"></line>
            <line x1="75" y1="90" x2="75" y2="110" stroke="white" stroke-width="2"></line>
            <line x1="125" y1="90" x2="125" y2="110" stroke="white" stroke-width="2"></line>
            <line x1="90" y1="125" x2="110" y2="125" stroke="white" stroke-width="2"></line>
            <text x="100" y="195" text-anchor="middle" fill="white" font-family="Verdana, sans-serif" font-size="22" letter-spacing="3.5">TLIS</text>
        </svg>`,
        bgColor: '#1a1a1a'
    },
    dark: {
        name: 'logo-dark',
        svg: `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <rect x="60" y="60" width="30" height="30" fill="#1a1a1a" opacity="0.9"></rect>
            <rect x="110" y="60" width="30" height="30" fill="#1a1a1a" opacity="0.9"></rect>
            <rect x="60" y="110" width="30" height="30" fill="rgb(218, 103, 8)" opacity="0.9"></rect>
            <rect x="110" y="110" width="30" height="30" fill="#1a1a1a" opacity="0.9"></rect>
            <line x1="90" y1="75" x2="110" y2="75" stroke="#1a1a1a" stroke-width="2"></line>
            <line x1="75" y1="90" x2="75" y2="110" stroke="#1a1a1a" stroke-width="2"></line>
            <line x1="125" y1="90" x2="125" y2="110" stroke="#1a1a1a" stroke-width="2"></line>
            <line x1="90" y1="125" x2="110" y2="125" stroke="#1a1a1a" stroke-width="2"></line>
            <text x="100" y="195" text-anchor="middle" fill="#1a1a1a" font-family="Verdana, sans-serif" font-size="22" letter-spacing="3.5">TLIS</text>
        </svg>`,
        bgColor: '#f7e4d0'
    }
};

const sizes = [200, 400, 800, 1200];

console.log('⚠️  Для генерации PNG/JPEG через Node.js требуется библиотека canvas.');
console.log('📝 Рекомендуется использовать HTML версию: generate-png-jpeg.html');
console.log('');
console.log('Инструкция:');
console.log('1. Откройте generate-png-jpeg.html в браузере');
console.log('2. Нажмите кнопку "Сгенерировать все логотипы"');
console.log('3. Файлы автоматически скачаются');
console.log('4. Переместите скачанные файлы в папку marketing/logo/');
console.log('');
console.log('Или установите canvas и запустите этот скрипт:');
console.log('  npm install canvas');
console.log('  node generate-images.js');

// Проверяем наличие canvas
try {
    const { createCanvas, loadImage } = require('canvas');
    console.log('✅ Canvas найден, начинаю генерацию...\n');
    
    async function generateImages() {
        for (const [key, logo] of Object.entries(logos)) {
            for (const size of sizes) {
                // Создаем canvas с фоном
                const canvas = createCanvas(size, size);
                const ctx = canvas.getContext('2d');
                
                // Заполняем фон
                ctx.fillStyle = logo.bgColor;
                ctx.fillRect(0, 0, size, size);
                
                // Загружаем SVG как изображение
                const img = await loadImage('data:image/svg+xml;base64,' + Buffer.from(logo.svg).toString('base64'));
                ctx.drawImage(img, 0, 0, size, size);
                
                // Сохраняем PNG
                const pngBuffer = canvas.toBuffer('image/png');
                const pngPath = path.join(__dirname, `${logo.name}-${size}x${size}.png`);
                fs.writeFileSync(pngPath, pngBuffer);
                console.log(`✅ Создан: ${logo.name}-${size}x${size}.png`);
                
                // Сохраняем JPEG
                const jpegBuffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
                const jpegPath = path.join(__dirname, `${logo.name}-${size}x${size}.jpg`);
                fs.writeFileSync(jpegPath, jpegBuffer);
                console.log(`✅ Создан: ${logo.name}-${size}x${size}.jpg`);
            }
        }
        console.log('\n🎉 Все файлы успешно созданы!');
    }
    
    generateImages().catch(console.error);
    
} catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
        // Canvas не установлен - это нормально
    } else {
        console.error('Ошибка:', error.message);
    }
}

