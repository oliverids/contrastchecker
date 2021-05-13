const forecor = document.querySelector('.forecor');
const forecorInput = document.querySelector('.forecor-input');
const backcor = document.querySelector('.backcor');
const backcorInput = document.querySelector('.backcor-input');

checker();

let selects = [forecor, backcor];
selects.forEach(e => {
    e.addEventListener('change', checker)
})

function checker() {
    let Cor = forecor.value.slice(1, 7);
    let Corfundo = backcor.value.slice(1, 7);

    fetch(`https://webaim.org/resources/contrastchecker/?fcolor=${Cor}&bcolor=${Corfundo}&api`)
        .then(response => response.json())
        .then(r => {
            document.querySelector('.result p').innerText = r.ratio;
            forecorInput.value = forecor.value;
            backcorInput.value = backcor.value;

            let normalAA = document.querySelector('.normal .aa');
            let normalAAA = document.querySelector('.normal .aaa');
            let largeAA = document.querySelector('.large .aa');
            let largeAAA = document.querySelector('.large .aaa');

            function texto() {
                if (r.AA === 'pass') {
                    normalAA.classList.add('passa');
                } else {
                    normalAA.classList.add('falha');
                }

                if (r.AAA === 'pass') {
                    normalAAA.classList.add('passa');
                } else {
                    normalAAA.classList.add('falha');
                }

                if (r.AALarge === 'pass') {
                    largeAA.classList.add('passa');
                } else {
                    largeAA.classList.add('falha');
                }

                if (r.AAALarge === 'pass') {
                    largeAAA.classList.add('passa');
                } else {
                    largeAAA.classList.add('falha');
                }
            }

            let types = [normalAA, normalAAA, largeAA, largeAAA];
            types.forEach(e => {
                e.classList.remove('passa', 'falha');
            })
            texto();
        })

}

//https://webaim.org/resources/contrastchecker/?fcolor=fff&bcolor=000&api