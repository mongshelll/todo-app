
/* 날씨정보 API KEY */
const API_KEY = 'b306de69216d048912b66ddeb322d4cc';


/* 시계영역 */
const $clock = document.querySelector('.clock');

const getClock = () => {
	const date = new Date();
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");
	$clock.innerText = `${hours}:${minutes}:${seconds}`;
}
getClock();
const seconds = setInterval(getClock, 1000);



/* 명연영역 */
const quotes = [
	{
		quote: 'I never dreamed about success, I worked for it',
		author: 'Estee Lauder'
	},
	{
		quote: 'Do not try to be original, just try to be good.',
		author: 'Paul Rand'
	},
	{
		quote: 'Do not be afraid to give up the good to go for the great',
		author: 'John D. Rockefeller'
	},
	{
		quote: 'If you cannot fly then run. If you cannot run, then walk. And if you cannot walk, then crawl, but whatever you do, you have to keep moving forward.',
		author: 'Martin Luther King Jr.'
	},
	{
		quote: 'Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.',
		author: 'Thomas Edison'
	},
	{
		quote: 'The fastest way to change yourself is to hang out with people who are already the way you want to be',
		author: 'REid Hoffman'
	},
	{
		quote: 'Money is like gasoline during a road trip. You do not want to run out of gas on your trip, but you are not doing a tour of gas stations',
		author: 'Tim O Reilly'
	},
	{
		quote: 'Some people dream of success, while other people get up every morning and make it happen',
		author: 'Wayne Huizenga'
	},
	{
		quote: 'The only thing worse than starting something and falling.. is not starting something',
		author: 'SEth Godin'
	},
	{
		quote: 'If you really want to do something, you will find a way. If you do not, you will find an excuse.',
		author: 'Jim Rohn'
	},
];
const $quote = document.querySelector('.quote-wrap .quote');
const $author = document.querySelector('.quote-wrap .author');
const toDaysQuote = quotes[Math.floor((Math.random() * quotes.length))];

$quote.innerText = toDaysQuote.quote;
$author.innerText = toDaysQuote.author;



/* todo */
const $addListInput = document.querySelector('.add-list');
const $todoListWrap = document.querySelector('.todo-list');

const TODO_LIST_KEY = 'todoList';

let todoListArray = [];

const saveTodoList = () => {
	localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoListArray));
}

const deleteTodoList = (e) => {
	const $targetLi = e.target.parentElement;
	$targetLi.remove();
	todoListArray = todoListArray.filter( todo => todo.id !== parseInt($targetLi.id) );
	saveTodoList();
}

const paintTodo = (newTodo) => {
	const todoListLi = document.createElement('li');
	todoListLi.id = newTodo.id;
	const todoListText = document.createElement('span');
	const removeButton = document.createElement('button');

	removeButton.setAttribute('type', 'button');
	removeButton.innerText = '❌';

	todoListLi.appendChild(todoListText);
	todoListText.innerText = newTodo.text;
	todoListLi.appendChild(removeButton);

	$todoListWrap.appendChild(todoListLi);

	removeButton.addEventListener('click', deleteTodoList)
}

const addListFn = (e) => {
	if(e.keyCode === 13) {
		const newTodo = $addListInput.value;
		$addListInput.value = "";
		const newTodoObj = {
			text: newTodo,
			id: Date.now(),
		}
		todoListArray.push(newTodoObj);
		paintTodo(newTodoObj);
		saveTodoList();
	}
}

$addListInput.addEventListener('keydown', (e) => {
	addListFn(e);
})

const savedTodoList = localStorage.getItem(TODO_LIST_KEY);

if (savedTodoList) {
	const parsedTodoList = JSON.parse(savedTodoList);
	todoListArray = parsedTodoList
	parsedTodoList.forEach(paintTodo);
}



/* 날씨영역 */
const onGeoSuccess = (position) => {
	const lat = position.coords.latitude;
	const lng = position.coords.longitude;
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=kr`;
	const $city = document.querySelector('.city');
	const $weathr = document.querySelector('.city-weather');

	fetch(url)
		.then(response => response.json())
		.then(data => {
			console.log(data);
			$city.innerText = `지역 : ${data.name}`;
			$weathr.innerText = `날씨 : ${data.weather[0].main} / 온도 : ${data.main.temp}`;
		})
		.catch(error => {
			console.error('Error fetching URL data:', error);
		})
}
const onGeoError = () => {
	alert("위치를 찾지 못하였습니다. 날씨정보를 얻지 못하였습니다.")
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);