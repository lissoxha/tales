
let clickCounts = {};//кол-во кликов

function parse() {
    const inputString = document.getElementById('inputString').value;
    const result = parseString(inputString);
    const container = document.getElementById('container');

    container.innerHTML = '';
    let stringResult = '';

    let currentLeft = 410; 
    let currentTop = 100; 

    for (const key in result) {
        stringResult += `<div class="draggable" onmousedown="startDrag(event)" style="display: inline-block; margin-right: 10px; position: absolute; top: ${currentTop}px; left: ${currentLeft}px;">${key}: ${result[key]}</div>`;
        currentLeft += 90; 
    }
    container.innerHTML = stringResult.trim();//удаляем возможные пробелы
}


function parseString(inputString) {
    const words = inputString.split('-');
    const alphabetical = words.filter(word => isNaN(word)).sort();
    const numerical = words.filter(word => !isNaN(word)).sort((a, b) => a - b);

    const associativeArray = {};
    alphabetical.forEach((word, index) => {
        associativeArray[`a${index + 1}`] = word;
    });

    numerical.forEach((number, index) => {
        associativeArray[`n${index + 1}`] = number;
    });

    return associativeArray;
  
}

function startDrag(event) {
    const draggedElement = event.target;
    const elementId = draggedElement.textContent.split(': ')[0];
    const content = draggedElement.textContent.split(': ')[1];

    if (!clickCounts[elementId]) {
        clickCounts[elementId] = { count: 0, content };
    }

    clickCounts[elementId].count += 1;

    updateClickInfo();
    
    console.log(alphabetical);

    let offsetX = event.clientX - draggedElement.getBoundingClientRect().left;
    let offsetY = event.clientY - draggedElement.getBoundingClientRect().top;

    function dragMove(e) {
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;
    
        // новые координаты должны оставаться в пределах 
        newX = Math.min(Math.max(newX, -740), 340 - draggedElement.offsetWidth);
        newY = Math.min(Math.max(newY, 90), 510 - draggedElement.offsetHeight);

        draggedElement.style.left = newX + 'px';
        draggedElement.style.top = newY + 'px';
    }
    

    function dragEnd() {
        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('mouseup', dragEnd);
    }

    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);
}

function updateClickInfo() {
    const clickInfo = document.getElementById('clickInfo');
    clickInfo.innerHTML = '';

    for (const key in clickCounts) {
        const content = clickCounts[key].content;
        const count = clickCounts[key].count;
        clickInfo.innerHTML += `"${key}:${content}" было нажато ${count} раз<br>`;
    }
}

