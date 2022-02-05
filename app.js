// get element tag 'ul'
const draggable_list = document.getElementById('draggable-list');

// get element tag 'button' check
const check = document.getElementById('check')

// push into list the best film
const bestFilm = [
    'Snowdrop',
    'Our Beloved Summer',
    'All of us are dead',
    'EndGame'
];

// store list items
const listItems = [];

let dragStartIndex;

createList();

// insert list items into DOM
function createList(){
    [...bestFilm]
            // add map and sort for random list items
            .map(a => ({ value: a, sort: Math.random() }))

            .sort((a, b) => a.sort - b.sort)

            .map(a => a.value)

            // add forEach for push item into tag 'li'
            .forEach((film, index) => {

            const listItem = document.createElement('li');

            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
                <span class="number"> ${index + 1} </span>
                <div class="draggable" draggable="true">
                    <p class="person-name"> ${film} </p>
                    <i class="fas fa-grip-lines"></i>                
                </div>
            `;

            listItems.push(listItem);

            draggable_list.appendChild(listItem);
        }
    );
    addEventListeners();
}