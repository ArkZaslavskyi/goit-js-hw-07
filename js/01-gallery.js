/*
 * Задание 1 - галерея изображений
 * Создай галерею с возможностью клика по её элементам и просмотра полноразмерного изображения в модальном окне.
 *
 * Выполняй это задание в файлах 01-gallery.html и 01-gallery.js.
 * Разбей его на несколько подзадач:
 * 
 * 1. Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи.
 * 2. Реализация делегирования на div.gallery и получение url большого изображения.
 * 3. Подключение скрипта и стилей библиотеки модального окна basicLightbox. Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
 * 
 * <script src="https://cdn.jsdelivr.net/npm/basiclightbox@5.0.4/dist/basicLightbox.min.js"></script>
 * <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/basiclightbox@5.0.4/dist/basicLightbox.min.css">
 * 
 * https://cdn.jsdelivr.net/npm/basiclightbox@5.0.4/dist/basicLightbox.min.js
 * https://cdn.jsdelivr.net/npm/basiclightbox@5.0.4/dist/basicLightbox.min.css
 * 
 * 4. Открытие модального окна по клику на элементе галереи. Для этого ознакомься с документацией и примерами.
 * 5. Замена значения атрибута src элемента <img> в модальном окне перед открытием. Используй готовую разметку модального окна с изображением из примеров библиотеки basicLightbox.
 * 
 * Разметка элемента галереи
 * Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе <img>, и указываться в href ссылки. Не добавляй другие HTML теги или CSS классы кроме тех, что есть в этом шаблоне.
 * 
    <div class="gallery__item">
    <a class="gallery__link" href="large-image.jpg">
    <img
        class="gallery__image"
        src="small-image.jpg"
        data-source="large-image.jpg"
        alt="Image description"
    />
    </a>
    </div>
 *
 * Обрати внимание на то, что изображение обернуто в ссылку, а значит при клике по умолчанию пользователь будет перенаправлен на другую страницу.
 * Запрети это поведение по умолчанию.
 *
 * Закрытие с клавиатуры
 * ВНИМАНИЕ
 * Этот функционал не обязателен при сдаче задания, но будет хорошей дополнительной практикой.
 * Добавь закрытие модального окна по нажатию клавиши Escape. Сделай так, чтобы прослушивание клавиатуры было только пока открыто модальное окно. У библиотеки basicLightbox есть метод для программного закрытия модального окна.
 */

import { galleryItems } from './gallery-items.js';
// Change code below this line
console.log(galleryItems);

// 
const galleryRef = document.querySelector('.gallery');
createGallery();

// 
galleryRef.addEventListener('click', (e) => onGalleryClk(e));

let instance = {};

function onGalleryClk(e) {
    e.preventDefault();
    
    if (!e.target.dataset.source) return;

    const instanceOptions = {
        onShow: (instance) => {
            document.addEventListener('keyup', onKeyPress);
        },
        onClose: (instance) => { 
            document.removeEventListener('keyup', onKeyPress);
        },
    };

    instance = basicLightbox.create(`
            <img src="${e.target.dataset.source}" width="800" height="600">
        `, instanceOptions);
    instance.show();

};

function onKeyPress(e) {
    console.log('onKeyPress: started');
    console.log('code :', e.code);
    
    if (e.code === 'Escape') { instance.close(); };
}


// 
function createGallery() {
    const galleryMarkup = galleryItems.map(createGaleryItemMarkup).join("");

    galleryRef.insertAdjacentHTML('afterbegin', galleryMarkup);
}
// 
function createGaleryItemMarkup({ preview, original, description }) {
    return `<div class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/></a></div>`;
}

