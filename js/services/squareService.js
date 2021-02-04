'use strict';

const SQUARE_KEY = 'squares';
var gSquares;


export default {
    createSquares,
    addSquare,
    getSquareForDisplay,

}

function createSquares() {
    console.log('create');
    gSquares = _loadSquares() || [
        _createSquare(100, 100, 50, 52, '#225588')
    ]
}

function getSquareForDisplay() {
    return gSquares.slice();
}


function addSquare(startX, startY, endX, endY, color = '#222222') {
    const square = _createSquare(startX, startY, endX, endY, color)
    gSquares.push(square)
    _saveSquares()
}

function _createSquare(startX, startY, endX, endY, color = '#555555') {
    return {
        id: _getNextId(),
        startX: Math.min(startX, endX),
        startY: Math.min(startY, endY),
        width: Math.abs(startX - endX),
        height: Math.abs(startY - endY),
        color
    }
}


function _saveSquares() {
    localStorage.setItem(SQUARE_KEY, JSON.stringify(gSquares));
}

function _loadSquares() {
    return JSON.parse(localStorage.getItem(SQUARE_KEY));
}

function _getNextId() {
    const NEXT_ID_KEY = 'nextId';
    const id = +localStorage.getItem(NEXT_ID_KEY) || 1001;
    localStorage.setItem(NEXT_ID_KEY, id + 1);
    return 's' + id;

}