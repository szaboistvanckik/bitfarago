const images = document.querySelectorAll('.image-container img');
const button = document.getElementById('image-toggle-btn');
const imgholder = document.getElementById('imgholder');
let currentIndex = -1;

button.addEventListener('click', () => {
    if (imgholder.classList.contains('d-none')) {
        imgholder.classList.remove('d-none');
        button.textContent = 'Következő kép';
    }
    currentIndex = (currentIndex + 1) % images.length;
    images.forEach(image => image.style.display = 'none');
    images[currentIndex].style.display = 'block';
});

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML =  h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}

function show(button) {
    const card = button.parentElement;
    const ps = card.querySelectorAll('p');
    const intro = ps[1];

    const cards = document.querySelectorAll('.card');
    const index = Array.from(cards).indexOf(card);

    const intros = [
      "Tiszta rosszul vagyok",
      "Tiszta gyagyás itt minden",
      "Be van rosszulva tisztára"
    ];

    if (intro.classList.contains('show')) {
        intro.innerText = "";
        intro.classList.remove('show');
        button.value = "Bemutatkozás";
    } else {
        intro.innerText = intros[index];
        intro.classList.add('show');
        button.value = "Bemutatkozás elrejtése";
    }
}