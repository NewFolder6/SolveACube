export default class Cube {
    static Direction = {
        UP: 'UP',
        DOWN: 'DOWN',
        LEFT: 'LEFT',
        RIGHT: 'RIGHT',
        FORWARD: 'FRONT',
        BACKWARD: 'BACKWARD'
    };

    static PieceType = {
        EDGE: 'EDGE',
        CORNER: 'CORNER',
        CENTER: 'CENTER'
    };

    static PieceColor = {
        WHITE: 'WHITE',
        YELLOW: 'YELLOW',
        ORANGE: 'ORANGE',
        RED: 'RED',
        GREEN: 'GREEN',
        BLUE: 'BLUE'
    };

    ScrambleCube(steps){
        for (let i = 0; i < steps; i++){
            let clockwise = Math.random() >= 0.5;
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

    RotateLayer(cube, direction, layer, clockwise){
        // TODO
        GetLayerPieces(cube, direction, layer).forEach(piece => {
            switch (direction){
                case Direction.UP:
                    // TODO
                    cube.pieces[piece.Index].X = clockwise ? piece.Z : -piece.Z;
                    cube.pieces[piece.Index].Z = clockwise ? -piece.X : piece.X;
                    break;
                case Direction.DOWN:
                    cube.pieces[piece.Index].X = clockwise ? -piece.Z : piece.Z;
                    cube.pieces[piece.Index].Z = clockwise ? piece.X : -piece.X;
                    break;
                case Direction.LEFT:
                    cube.pieces[piece.Index].Y = clockwise ? piece.Z : -piece.Z;
                    cube.pieces[piece.Index].Z = clockwise ? -piece.Y : piece.Y;
                    break;
                case Direction.RIGHT:
                    cube.pieces[piece.Index].Y = clockwise ? -piece.Z : piece.Z;
                    cube.pieces[piece.Index].Z = clockwise ? piece.Y : -piece.Y;
                    break;
                case Direction.FRONT:
                    cube.pieces[piece.Index].X = clockwise ? piece.Y : -piece.Y;
                    cube.pieces[piece.Index].Y = clockwise ? -piece.X : piece.X;
                    break;
                case Direction.BACKWARD:
                    cube.pieces[piece.Index].X = clockwise ? -piece.Y : piece.Y;
                    cube.pieces[piece.Index].Y = clockwise ? piece.X : -piece.X;
                    break;
            }
        });
    }

    InitializePiece(index, cubeSize, x, y, z){
        var faces = 0;

        // green side is front 
        const front = (z === cubeSize - 1 ? Cube.PieceColor.GREEN : false);
        const back = (z === 0 ? Cube.PieceColor.BLUE : false);
        const left = (x === 0 ? Cube.PieceColor.ORANGE : false);
        const right = (x === cubeSize - 1 ? Cube.PieceColor.RED : false);
        const top = (y === cubeSize - 1 ? Cube.PieceColor.WHITE : false);
        const bottom = (y === 0 ? Cube.PieceColor.YELLOW : false);
        
        [front, back, left, right, top, bottom].forEach(side => {
            if (side != false) faces++;
        });

        if (faces === 0) return false;

        var type = (faces === 1 ?  Cube.PieceType.CENTER :
             (faces === 2 ? Cube.PieceType.EDGE :
                 Cube.PieceType.CORNER));
        const offset = Math.floor(cubeSize / 2);
        return {
            Index: index,
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

    GetLayerPieces(cube, direction, layer){
        var offset = Math.floor(cube.size / 2);
        layer--;
        switch (direction){
            case Direction.UP:
                return cube.pieces.filter(piece => piece.Y === offset - layer);
            case Direction.DOWN:
                return cube.pieces.filter(piece => piece.Y === -offset + layer);
            case Direction.LEFT:
                return cube.pieces.filter(piece => piece.X === -offset + layer);
            case Direction.RIGHT:
                return cube.pieces.filter(piece => piece.X === offset - layer);
            case Direction.FRONT:
                return cube.pieces.filter(piece => piece.Z === -offset + layer);
            case Direction.BACKWARD:
                return cube.pieces.filter(piece => piece.Z === offset - layer);
        }
    }

    constructor(cubeSize){
            this.size = cubeSize;
            this.pieces = [];
            var i = 0;
            for (let x = 0; x < cubeSize; x++){
                for (let y = 0; y < cubeSize; y++){
                    for (let z = 0; z < cubeSize; z++){
                        let piece = this.InitializePiece(i, cubeSize, x, y, z);
                        if (!piece) continue;
                        this.pieces.push(piece);
                        i++;
                    }
                }
            }
        }
}