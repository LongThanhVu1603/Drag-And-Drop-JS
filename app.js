// get element tag 'ul'
const draggable_list = document.getElementById('draggable-list');

// get element tag 'button' check
const check = document.getElementById('check')

// push into list the best film
const bestFilm = [
    'Snowdrop',
    'Our Beloved Summer',
    'All of us are dead',
    'EndGame',
    'Happiness'
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
            
            // set Data-Index ( each list item is a number)
            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
                <span class="number"> ${index + 1} </span>
                <div class="draggable" draggable="true">
                    <p class="film-name"> ${film} </p>
                    <i class="fas fa-grip-lines"></i>                
                </div>
            `;

            listItems.push(listItem);

            draggable_list.appendChild(listItem);
        }
    );
    addEventListeners();
}

// add function catch event drag ---------------------------------------------------------
function addEventListeners(){
    // get tag 'li'
    const dragListItems = document.querySelectorAll('.draggable-list li')

    // get div drag able in tag 'li'
    const draggables = document.querySelectorAll('.draggable');

    // add event into tag 'li'
    dragListItems.forEach(item =>{
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
    })

    // add event into tag div drag able into tag 'li'
    draggables.forEach(draggable =>{
        draggable.addEventListener('dragstart', dragStart);
    })
}


// add function when start drag ----------------------------------------------------------
function dragStart(){
    // get data-index ( a number )
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

// add function change css when drag enter
function dragEnter(){
    this.classList.add('over');
}
// add function remove css when drag leave
function dragLeave(){
    this.classList.remove('over');
}

function dragOver(e){
    e.preventDefault();
}

// add function when drop ( swap StartIndex and EndIndex)
function dragDrop(){
    const dragEndIndex = +this.getAttribute('data-index');

    // add function swap
    swapItems(dragStartIndex, dragEndIndex)

    this.classList.remove('over');
}

// function swap item
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

// check the order of list items ---------------------------------------------------------
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const filmName = listItem.querySelector('.draggable').innerText.trim();

        if (filmName !== bestFilm[index]) {
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}

check.addEventListener('click', checkOrder);
