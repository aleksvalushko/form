const input = document.querySelector('.input'),
    checkbox = document.querySelector('.checkbox'),
    result = document.querySelector('#result'),
    checkboxOn = document.querySelector('.on'),
    checkboxOff = document.querySelector('.off');

let check = false,
    data = [];

const returnObjectFromJSONRequest = function (url) {
    let request = new XMLHttpRequest(),
        outputData = {};

    try {
        request.open('GET', url, false);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Access-Control-Allow-Origin', '*');
        request.send();
    } catch (e) {
        throw e;
    }

    if (request.status === 200) {
        return outputData = JSON.parse(request.response);
    }
    return outputData;
}

//данный URL используется для обхода проблемы с CORS
try {
    const response = returnObjectFromJSONRequest('https://cors-anywhere.herokuapp.com/http://www.mrsoft.by/data.json');
    data = response.data;
} catch (e) {
    alert('Ошибка получения данных!');
}

window.addEventListener('click', function (event) {
    event.target.type === 'checkbox' ? check = !check : '';
    check ? checkboxOn.style.textDecoration = 'line-through' : checkboxOn.style.textDecoration = 'none';
    !check ? checkboxOff.style.textDecoration = 'line-through' : checkboxOff.style.textDecoration = 'none';
    if (checkbox.checked) {
        if (event.target.innerText === 'Words length') {
            !isFinite(input.value) || input.value === '' ?
                result.value = 'Ошибка, введите число!' :
                result.value = data.filter(word => word.length > +input.value);
        } else if (event.target.innerText === 'Substring') {
            input.value === '' ? result.value = 'Ошибка, введите строку!' :
                result.value = data.filter(word => word.includes(input.value) === true);
        }
    } else {
        if (event.target.innerText === 'Words length') {
            !isFinite(input.value) || input.value === '' ?
                result.value = 'Ошибка, введите число!' :
                result.value = data.filter(word => word.length > +input.value);
        } else if (event.target.innerText === 'Substring') {
            input.value === '' ? result.value = 'Ошибка, введите строку!' :
                result.value = data.filter(word => word.toLowerCase().includes(input.value.toLowerCase()));
        }

    }
})