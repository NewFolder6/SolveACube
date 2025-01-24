import * as THREE from 'three';
const Direction = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    FORWARD: 'FORWARD',
    BACKWARD: 'BACKWARD'
};

const Types = {
    EDGE: 'EDGE',
    CORNER: 'CORNER',
    CENTER: 'CENTER'
}

// cannot be 1
const cubeSize = 3;
var pieces = [];

function InitalizePiece(index, x, y, z){

    // TODO
    var orientation = Direction.UP;
    var type;
    if (x == 0 || x == cubeSize - 1){
        
    }

    pieces.push(index, {
        X: x,
        Y: y,
        Z: z,
        Orentiation: orientation,
        Type: type
    });

    pieces[index].Direction = Direction.BACKWARD;
}

function InitilizeCube(){
    let i = 0;
    for (let x = 0; x < cubeSize; x++){
        for (let y = 0; y < cubeSize; y++){
            for (let z = 0; z < cubeSize; z++){
                if (x == 0 || x == cubeSize - 1 || y == 0 || y == cubeSize - 1 || z == 0 || z == cubeSize - 1){
                    InitalizePiece(i, x, y, z);
                    i++;
                }
            }
        }
    }
}

