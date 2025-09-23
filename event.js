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

    intro.innerText = intros[index] || "Bemutatkozás nem elérhető.";
    intro.classList.add('show');
}