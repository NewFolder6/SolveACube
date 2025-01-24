//import * as THREE from 'three';

const Direction = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    FORWARD: 'FRONT',
    BACKWARD: 'BACKWARD'
};

const PieceType = {
    EDGE: 'EDGE',
    CORNER: 'CORNER',
    CENTER: 'CENTER'
}

const PieceColor = {
    WHITE: 'WHITE',
    YELLOW: 'YELLOW',
    ORANGE: 'ORANGE',
    RED: 'RED',
    GREEN: 'GREEN',
    BLUE: 'BLUE'
}

// cannot be 1
const Size = 3;

function ScrambleCube(steps){
    for (let i = 0; i < steps; i++){
        const clockwise = Math.random() >= 0.5;
    switch (Math.floor(Math.random() * 6)){
        case 0:
            RotateLayer(Direction.UP, clockwise);
            break;
        case 1:
            RotateLayer(Direction.DOWN, clockwise);
            break;
        case 2:
            RotateLayer(Direction.LEFT, clockwise);
            break;
        case 3:
            RotateLayer(Direction.RIGHT, clockwise);
            break;
        case 4:
            RotateLayer(Direction.FORWARD, clockwise);
            break;
        case 5:
            RotateLayer(Direction.BACKWARD, clockwise);
            break;
    }
    }
}

function InitializePiece(cubeSize, x, y, z){
    var faces = 0;

    // green side is front 
    const front = (z === 0 ? PieceColor.GREEN : false);
    const back = (z === cubeSize - 1 ? PieceColor.BLUE : false);
    const left = (x === 0 ? PieceColor.ORANGE : false);
    const right = (x === cubeSize - 1 ? PieceColor.RED : false);
    const top = (y === cubeSize - 1 ? PieceColor.WHITE : false);
    const bottom = (y === 0 ? PieceColor.YELLOW : false);
    
    [front, back, left, right, top, bottom].forEach(side => {
        if (side) faces++;
    });

    if (faces === 0) return false;

    // TODO
    var type = (faces === 1 ? PieceType.CENTER : (faces === 2 ? PieceType.EDGE : PieceType.CORNER));
    const offset = Math.floor(cubeSize / 2);
    return {
        X: x - offset,
        Y: y - offset,
        Z: z - offset,
        Type: type,
        Faces: faces,
        Color: {
            Front: front,
            Back: back,
            Left: left,
            Right: right,
            Top: top,
            Bottom: bottom
        }
    };
}

function PiecesFacingUp(pieces, color){
    if (color === undefined) return pieces.filter(piece => piece.Color.Top !== false);
    return pieces.filter(piece => (piece.Color.Top === color));
}

function Cube(cubeSize){
    this.size = cubeSize;
    this.pieces = [];
    var i = 0;
    for (let x = 0; x < cubeSize; x++){
        for (let y = 0; y < cubeSize; y++){
            for (let z = 0; z < cubeSize; z++){
                let piece = InitializePiece(cubeSize, x, y, z);
                if (!piece) continue;
                this.pieces.push(piece);
                i++;
            }
        }
    }
}

var cube = new Cube(Size);
console.log(PiecesFacingUp(cube.pieces, PieceColor.WHITE));
