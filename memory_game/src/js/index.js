const EMOJIS = ['🥑', '🍇', '🍒', '🌽', '🥕', '🍉', '🥔', '🍌', '🥭', '🍍']

/**
 *
 * @param {strings[]} items - Абстрактные данные для перемешивания и сортировки
 * @returns {strings[]} - Перемешанный массив с данными
 */
function shuffleAndPickRandom(items) {
	if (items && Array.isArray(items)) {
		// сортировка исходного массива в случайном порядку
		const sortedArr = items.sort(() => Math.random(items) - 0.5)

		// достаем из 10 элементов первые 8
		const duplicateArr = [...sortedArr].slice(0, 8)

		// делаем 16 элементов
		const dupleArr = [...duplicateArr, ...duplicateArr]

		// сортировка массива из 16 элементов
		const sortedDupleArr = dupleArr.sort(() => Math.random(dupleArr) - 0.5)

		return sortedDupleArr
	} else {
		console.error('Передайте параметр в виде массива')
	}
}

/**
 *  Переворачивает карту и обрабатывает ход игрока
 * @param {HTMLDivElement} card - Карточка для переворачивания
 */
const flipCard = card => {
	console.log(card)
}

/**
 * Состояние игры
 * @property {boolean} isGameStarted - Игра началась или нет.
 * @property {number} totalTime - Общее время в игре.
 * @property {number} flippedCards - Количество перевернутых карточек.
 * @property {number} totalFlips - Общее количество перевернутых карточек.
 */
const STATE = {
	isGameStarted: false,
	totalTime: 0,
	flippedCards: 0,
	totalFlips: 0,
}

/**
 * Контролы игры
 * @property {HTMLDivElement} boardContainer - Контейнер игрового поля.
 * @property {HTMLDivElement} board - Основное содержимое поля (4x4).
 * @property {HTMLDivElement} moves - Контрол для учета шагов.
 * @property {HTMLDivElement} timer - Контрол для учета времени.
 * @property {HTMLButtonElement} start - Кнопка для старта игры.
 */
const SELECTORS = {
	boardContainer: document.querySelector('.board-container'),
	board: document.querySelector('.board'),
	moves: document.querySelector('.moves'),
	timer: document.querySelector('.timer'),
	start: document.querySelector('button'),
}

/**
 * Генерация игрового поля
 */
const generateGame = () => {
	// Получение data атрибута
	const dimensions = SELECTORS.board.dataset.dimension

	if (dimensions % 2 !== 0) {
		throw new Error('Размер игрового поля должен быть четным!')
	}

	// вызываем функцию перемешивания и получения случайной карточки для эмодзи
	const shuffleAndPickEmoji = shuffleAndPickRandom(EMOJIS)

	// Итерация по карточкам
	const cardsHTML = shuffleAndPickEmoji
		.map(emoji => {
			return `
        <div class="card">
            <div class="card-front"></div>
            <div class="card-back">${emoji}</div>
        </div>
    `
		})
		.join('')

	// Вставка карточек в игровое поле
	SELECTORS.board.insertAdjacentHTML('beforeend', cardsHTML)
}

/**
 *  Функция обработки событий (клик по карточке)
 */
const attachEventListener = () => {
	// получения HTMLCollection родителя карточек (card)
	const cardsCollection = SELECTORS.board.children;

	if (cardsCollection) {
		// HTMLCollection в массив
		[...cardsCollection].forEach(card => {
			// добавление клика на отдельную карточку
			card.addEventListener('click', event => {
				// получаем цель события (элемент по которому произошел клик)
				// и его родительский элемент
				const eventTarget = event.target;
				const eventParent = eventTarget.closest('.card');

				// если родитель содержит класс "card" и он еще не перевернут
				// вызываем функцию flipCard()
				if (
					eventParent.classList.contains('card') &&
					!eventParent.classList.contains('flipped')
				) {
					flipCard(eventParent);
				}
			});
		});
	}
};

/* Вызов необходимых функция при загрузке страницы */
document.addEventListener('DOMContentLoaded', () => {
	generateGame() // Генерируем игру
	attachEventListener() // Прикрепляем обработчик событий
})
