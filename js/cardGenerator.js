for (let i = 0; i < 12; i++) {
    let cardHtml = `<div id="${i}" class="card down"><div class="card-inner"><div class="card-front"></div><div class="card-back"><div class="suit upcorner"></div><div class="suit downcorner"></div><div class="number"></div></div></div></div>`;
    document.getElementsByClassName('cardholder')[0].insertAdjacentHTML("beforeend", cardHtml)
}