'use strict';

import squareServise from './services/squareService.js';

const gElWorkSpace = document.querySelector('.work-space')
window.addEventListener('load', onInit);


function onInit(){
    console.log('INIT!');

    gElWorkSpace.addEventListener('mousedown', onStartPoint);
    console.dir(gElWorkSpace);
    
    

    squareServise.createSquares();
    renderSquares();
}


function renderSquares() {
    const squares = squareServise.getSquareForDisplay();
    let strHtml = squares.map((square) =>{
        const squareStyle = `
        left: ${square.startX}px;
        top: ${square.startY}px;
        width: ${square.width}px;
        height: ${square.height}px;
        background: ${square.color};
        `        
        return `
        <div class="square" data-id="${square.id}"
        style="${squareStyle}"></div>
        `
    }).join('')

    gElWorkSpace.innerHTML = strHtml;
}

function onStartPoint(ev) {
    if (ev.target !== gElWorkSpace) return
    console.log('ev',ev);
    gElWorkSpace.addEventListener('mouseup', onEndPoint);

    function onEndPoint({offsetX, offsetY, target}) {
        console.log("🚀 ~ file: main.js ~ line 46 ~ onEndPoint ~ offsetX, offsetY", offsetX, offsetY)
        gElWorkSpace.removeEventListener('mouseup', onEndPoint);
        if (target !== gElWorkSpace) return
        squareServise.addSquare(ev.offsetX, ev.offsetY, offsetX, offsetY)
        renderSquares()
        
    }

}