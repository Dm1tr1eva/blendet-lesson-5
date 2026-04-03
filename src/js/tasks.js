import refs from './refs';
import {
  getItem,
  RAW_FORM_DATA_OBJECT,
  removeItem,
  setItem,
  TASKS_LIST_ARR,
} from './local-storage-api';
import { nanoid } from 'nanoid';
import { createItem, mapItems } from './markup-tasks';

// !проверяем есть ли в LocalStorage данные при загрузке страницы,
// !чтобы сразу их отобразить

document.addEventListener('DOMContentLoaded', e => {
  // получаем данные из localStorage
  const savedToLocalStorage = getItem(RAW_FORM_DATA_OBJECT);

  // подставляем название в input
  refs.addItemForm.elements.taskName.value = savedToLocalStorage?.title
    ? savedToLocalStorage.title
    : '';
  refs.addItemForm.elements.taskDescription.value =
    savedToLocalStorage?.description ? savedToLocalStorage.description : '';

  const itemListFromLocalStorage = getItem(TASKS_LIST_ARR) ?? [];
  const marcup = mapItems(itemListFromLocalStorage);
  refs.itemList.innerHTML = marcup;
});

// !Сохранение при каждом вводе текста

refs.addItemForm.addEventListener('input', function (e) {
  // извлекаем данные из формы
  const rawFormData = extractFormData(e);

  //  сохраняем в localStorage
  setItem(RAW_FORM_DATA_OBJECT, rawFormData);
});

// !Отправка формы

refs.addItemForm.addEventListener('submit', function (e) {
  // извлекаем данные из формы
  const rawFormData = extractFormData(e);

  // проверяет заполнены ли оба поля формы
  if (rawFormData.title === '' || rawFormData.description === '') {
    alert('Please complete form');
    return;
  }

  // добавляем id
  const submitObject = {
    id: nanoid(),
    title: rawFormData.title,
    description: rawFormData.description,
  };

  // добавляем разметку
  const markup = createItem(submitObject);

  const itemListFromLocalStorage = getItem(TASKS_LIST_ARR) ?? [];
  setItem(TASKS_LIST_ARR, [...itemListFromLocalStorage, submitObject]);

  refs.itemList.insertAdjacentHTML('beforeend', markup);

  // удаляем данные из localStorage
  removeItem(RAW_FORM_DATA_OBJECT);

  // очищаем форму
  refs.addItemForm.reset();
});

// ! Функция извлечения данных

function extractFormData(e) {
  e.preventDefault();

  // собираем все данные из формы
  const formData = new FormData(e.currentTarget);

  // достаем название и описание
  const rawFormData = {
    title: formData.get('taskName'),
    description: formData.get('taskDescription'),
  };

  // возвращаем красивый объект
  return rawFormData;
}

// кнопка удаления

refs.itemList.addEventListener('click', e => {
    if (e.target.classList.contains('task-list-item-btn')) return;
    
    const list = e.currentTarget
});
