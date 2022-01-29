const forecor = document.querySelector('.forecor'),
    forecorInput = document.querySelector('.forecor-input'),
    backcor = document.querySelector('.backcor'),
    backcorInput = document.querySelector('.backcor-input');

forecorInput.value = forecor.value;
backcorInput.value = backcor.value;
checker(forecorInput.value, backcorInput.value);

let selects = [forecor, backcor];
selects.forEach(e => {
    e.addEventListener('input', () => {
        forecorInput.value = forecor.value;
        backcorInput.value = backcor.value;
        checker(forecorInput.value, backcorInput.value);

    })
})

let inputs = [forecorInput, backcorInput];
inputs.forEach(e => {
    e.addEventListener('change', () => {
        forecor.value = forecorInput.value;
        backcor.value = backcorInput.value;
        checker(forecorInput.value, backcorInput.value);

    })
})

function checker(cor, fundo) {
    cor = forecor.value.slice(1, 7);
    fundo = backcor.value.slice(1, 7);

    fetch(`https://webaim.org/resources/contrastchecker/?fcolor=${cor}&bcolor=${fundo}&api`)
        .then(response => response.json())
        .then(r => {
            document.querySelector('.result p').innerText = r.ratio;
            let normalAA = document.querySelector('.normal .aa'),
                normalAAA = document.querySelector('.normal .aaa'),
                largeAA = document.querySelector('.large .aa'),
                largeAAA = document.querySelector('.large .aaa');


            let types = [normalAA, normalAAA, largeAA, largeAAA];
            types.forEach(e => {
                e.classList.remove('passa', 'falha');
            })

            function texto() {
                r.AA == 'pass' ? normalAA.classList.add('passa') : normalAA.classList.add('falha');
                r.AAA == 'pass' ? normalAAA.classList.add('passa') : normalAAA.classList.add('falha');

                r.AALarge == 'pass' ? largeAA.classList.add('passa') : largeAA.classList.add('falha');
                r.AAALarge == 'pass' ? largeAAA.classList.add('passa') : largeAAA.classList.add('falha');
            }
            texto()
        })
}