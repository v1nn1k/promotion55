var panelIsVisible = false;
let mainForm = document.getElementById('promotion-1');
let currentFormID = 1;
let additionalOptions = {};
let oldClient = false;

let forms = document.querySelectorAll('.form');
let formCount = document.querySelectorAll('.form').length;

let timeline = document.querySelector('.timeline');
let tl_items = document.querySelectorAll('.timeline__item');

function nextOnEnter(curForm) {
    console.log(`CformID: ${currentFormID}`);

    curForm.addEventListener('keypress', function(e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            let btn = curForm.querySelector('.btn');
            console.log(btn.classList);

            btn.click();

        }
    }, this);
}



tl_items.forEach(function(element) {
    element.addEventListener('click', function() {
        if (this.getAttribute('form') >= currentFormID) {
            return;
        }
        currentFormID = +this.getAttribute('form') + 1;
        console.log(currentFormID);

        emitChange(document.querySelector(`#promotion-${currentFormID}`), true);
        console.log(currentFormID);


    })
}, this);



let userData = {
    name: '',
    addOptions: [],
    contact: '',
    discount: false
};


function drawTimeline(count, curForm, backwards) {
    let tl = document.querySelector('.timeline');
    let items = document.querySelectorAll('.timeline__item');

    items.forEach(function(element) {
        element.classList.remove('timeline__item--active');
    }, this);
    if (backwards) {
        items[curForm].classList.add('timeline__item--active')
        return;
    }
    items[curForm - 1].classList.add('timeline__item--active')


}

function btnCheckboxClick(form) {
    let boxes = form.querySelectorAll('.checkbox');
    let arr = []

    boxes.forEach(function(element) {
        if (element.classList.contains('checked')) {
            arr.push(element.innerText);
        }
    }, this);

    emitChange(document.querySelector('#promotion-3'));

    additionalOptions[form.getAttribute('id')] = arr;
    userData.addOptions = arr;



}

function makeBorder(elemen) {
    elemen.style.borderBottom = "1.5px solid #D7453F";
    setTimeout(function() {
        elemen.style.borderBottom = "1.5px solid #fff";

    }, 2000);
}

function btnInputClick(container) {
    let data = container.querySelector('.form__textinput').value;
    if (!data) {
        makeBorder(container.querySelector('.form__textinput'));
        return;
    }
    //let label = form.parentNode.querySelector('.form__label').innerText;
    userData.name = data;
    emitChange(container.parentNode);
}

function btnEmailClick(form) {
    let data = form.querySelector('.form__textinput').value;
    if (!data) {
        alert('name');
        return;
    }
    userData.contact = data;
    emitChange(form.parentNode);

}

function createResField(prop, val) {

    if (prop === 'addOptions') {
        let ul = document.createElement("ul");
        ul.classList.add('form__result__list');
        ul.innerText = "Доп. опции: ";
        userData[prop].forEach(function(el) {
            let li = document.createElement("li");
            li.classList.add('result__list__item');
            li.innerText = el;
            ul.appendChild(li);
        });
        return ul;
    }
    let res = document.createElement("div");
    res.classList.add('form__result-item');
    res.innerHTML = `${prop}: <strong>${val}</strong>`;
    return res;
}

function createResultForm() {
    var result = document.createElement("div");

    result.classList.add('container', 'container-result');

    Object.keys(userData).forEach(function(key) {
        result.appendChild(createResField(key, userData[key]));
    });


    let btnS = document.createElement("button");
    btnS.classList.add('btn', 'btn-sendform');
    btnS.setAttribute('onclick', 'emitChange(this.parentNode)');
    btnS.innerText = 'Отправить форму';

    document.querySelector('#promotion-9').appendChild(btnS);
    document.querySelector('#promotion-9').appendChild(result);




}

function changeInputState(inputElement) {
    let disabled = inputElement.disabled;

    if (disabled) {
        inputElement.classList.remove('input--disabled');
        inputElement.disabled = !disabled;
        inputElement.selectionStart = inputElement.selectionEnd = inputElement.value.length;

        inputElement.focus();
    } else {
        inputElement.classList.add('input--disabled');
        inputElement.disabled = !disabled;

    }



}

function inputEnter(e) {

    let key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter



    }

}

function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

function createResultItem(prop, val) {
    let res = document.createElement("div");
    res.classList.add('result__item');

    let name = document.createElement("div");
    name.classList.add('result__item__name');
    name.innerText = prop;

    let value = document.createElement("div");
    value.classList.add('result__item__value');

    let value_input = document.createElement("input");

    setAttributes(value_input, { "type": "text", "value": val, "disabled": true });


    value_input.classList.add('input');
    value_input.classList.add('input--disabled');
    value_input.style.cursor = 'textedit';

    //value.setAttribute('onclick', 'result_handleChange(this.parentNode)');
    //value.setAttribute('onfocusout', 'result_handleChange(this.parentNode)');
    //value.setAttribute('spellcheck', false);
    //value.setAttribute('onkeyup', 'inputEnter(event)');
    setAttributes(value, { "onclick": "result_handleChange(this.parentNode)", "onfocusout": 'result_handleChange(this.parentNode)', "spellcheck": false });




    value.appendChild(value_input);


    //let c = document.createElement("div");
    //c.classList.add('result__item__change');
    //c.setAttribute('fieldName', prop);
    //console.log(c.getAttribute('fieldName'));
    //c.innerText = "Изменить";
    //c.setAttribute('onclick', 'result_handleChange(this.parentNode)');

    res.appendChild(name);
    res.appendChild(value);
    //res.appendChild(c);

    return res;
}


function result_handleChange(fName) {
    let inp = fName.querySelector('.input');
    changeInputState(inp);
}

function createResult() {
    let result = document.createElement("div");
    result.classList.add('result');

    Object.keys(userData).forEach(function(key) {
        result.appendChild(createResultItem(key, userData[key]));
    });



    let btnS = document.createElement("button");
    btnS.classList.add('btn', 'btn-sendform');
    btnS.setAttribute('onclick', 'emitChange(this.parentNode)');
    btnS.innerText = 'Отправить форму';
    result.appendChild(btnS);
    document.querySelector('#promotion-9').appendChild(result);


}


function showVK() {
    let panel = document.querySelector('.form__vk');

    if (panelIsVisible) {
        panelIsVisible = false;
        panel.classList.remove('visible');
    } else {
        panelIsVisible = true;
        panel.classList.add('visible');
    }
}


function oldClientFunc(isClient) {
    console.log(isClient);
    //oldClient = isClient;

    if (isClient) {
        emitChange(document.querySelector('#promotion-4'));
    } else {
        emitChange(document.querySelector('#promotion-4'), false, document.querySelector('#promotion-8'));
    }
    //currentFormID = isClient ? 4 : 7;
    //emitChange(document.querySelector('#promotion-4'))


}

function checkDatabase(input) {
    //let text = input.value;
    // Check DB for value for text var


    let dbSuccess = true;

    if (dbSuccess) {
        userData.discount = true;
        emitChange(document.querySelector('#promotion-5'));
        setTimeout(function() {
            currentFormID = 7;
            emitChange(document.querySelector('#promotion-6'));
        }, 2000);
    }



}

function nextForm(curForm, nextForm) {

    currentFormID++;
    curForm.classList.add('hidden');
    $(nextForm).fadeIn();
    $(curForm).fadeOut(.1);
    drawTimeline(0, currentFormID);


}

function previousForm(curForm, prev) {
    currentFormID--;

    curForm.classList.add('hidden');
    $(prev).fadeIn();
    $(curForm).fadeOut(.1);
    drawTimeline(0, currentFormID - 1, true);

}

function emitChange(parent, backwards, nextForma) {
    addFormListeners(document.querySelector(`#promotion-${currentFormID+1}`));
    //addEnterL(document.querySelector(`#promotion-${currentFormID+1}`));
    if (currentFormID === 8) {
        createResult();
    }

    if (currentFormID === 2) {
        let chBoxArray = document.querySelectorAll('.promo-3');
        chBoxArray.forEach(function(element) {
            element.addEventListener('click', function() {


                if (this.getAttribute('checked') === 'false') {

                    this.setAttribute('checked', 'true');
                    this.classList.add('checked');

                } else {

                    this.setAttribute('checked', 'false');
                    this.classList.remove('checked');

                }

            })
        }, this);
    }
    if (nextForma) {
        nextForm(parent, nextForma);
        currentFormID = 8;
        console.log('id: ' + currentFormID);

        return;
    }


    if (currentFormID === 7) {
        let form = document.getElementById(`promotion-${currentFormID-1}`);
        let next = document.getElementById(`promotion-${currentFormID+1}`);
        nextForm(form, next);
        console.log('id: ' + currentFormID);

        return;
    }

    let form = document.getElementById(`promotion-${currentFormID}`);
    let next = document.getElementById(`promotion-${currentFormID+1}`);
    if (backwards) {
        let prev = document.getElementById(`promotion-${currentFormID-1}`);
        previousForm(form, prev);
        console.log('id: ' + currentFormID);
        return;
    }

    nextForm(form, next);
    console.log('id: ' + currentFormID);
}


let textInputs = document.querySelectorAll('.form__textinput');

textInputs.forEach(function(element) {
    element.addEventListener('focusout', function() {
        let lbl = element.nextElementSibling;

        if (element.value !== '') {
            lbl.classList.add('form__label--moved');
        } else if (lbl.classList.contains('form__label--moved')) {
            lbl.classList.remove('form__label--moved');
        }

    })
}, this);


function addFormListeners(form) {
    let inp = hasTextInputs(form);

    if (!inp) {
        return;
    } else {
        inp.addEventListener('focusout', function() {
            //let lbl = inp.nextElementSibling;
            let lbl = inp.parentNode.querySelector('.form__label');

            if (inp.value !== '') {
                lbl.classList.add('form__label--moved');
            } else if (lbl.classList.contains('form__label--moved')) {
                lbl.classList.remove('form__label--moved');
            }

        })

    }
}

function checkInputValidity(input) {
    let btn = input.parentNode.querySelector('.btn');

    if (input.value === '') {

        btn.classList.add('btn--negative');

    } else {
        btn.classList.remove('btn--negative');
    }
}

function hasTextInputs(form) {
    return form.querySelector('.form__textinput');
}


nextOnEnter(document.querySelector('#promotion-1'));



/* forms.forEach(function(element) {
    addFormListeners(element);
}, this);
 */


function cycle(btn) {
    let dir = btn.getAttribute('cycle-dir');
    let form = document.querySelector(`#promotion-${currentFormID}`);

    if (dir === 'right') {
        emitChange(form);
    } else if (currentFormID === 1) { return; } else {
        emitChange(form, true);
    }
}
/* 
function addEnterL(form) {

    form.addEventListener('keypress', function(e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter

            let btn = form.querySelector('.btn');
            btn.click();

        }
    }, this);

}
forms.forEach(function(element) {
    addEnterL(element);
}, this);
 */
/* 
document.getElementsByTagName('body')[0].addEventListener('keypress', function(e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        console.log('Ent clicked on: ' + currentFormID);

        let btn = document.querySelector(`#promotion-${currentFormID}`).querySelector('.btn');
        btn.click();
        console.log('btn clicked');


    }
}) */