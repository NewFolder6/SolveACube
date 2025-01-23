
public class Cube {
    public Piece[] pieces;
    public int size;


    public void Rotate(int layer, boolean isClockwise){
        //TODO
    }

    public Cube(int _size){
        size = _size;
        pieces = new Piece[(int) (Math.pow(size, 3) - Math.pow(size - 2, 3))];

        int index = 0;
        int offset = (int)(size / 2);
        for (int x = 0; x < size; x++) {
            for (int y = 0; y < size; y++) {
                for (int z = 0; z < size; z++) {
                    if (x == 0 || x == size - 1 || y == 0 || y == size - 1 || z == 0 || z == size - 1) {
                        pieces[index++] = new Piece(x - offset, y - offset, z - offset);
                    }
                }
            }
        }

        System.out.println(pieces.length);
        for (Piece piece : pieces) {
            System.out.println(piece);
        }
    }
}

class Piece{
    public int x, y, z;
    public Color front, left, top;
    public Orientation orientation;

    public String toString(){
        return "x: " + x + " y: " + y + " z: " + z;
    }

    public Piece(int _x, int _y, int _z){
        x = _x;
        y = _y;
        z = _z;
    }
}

enum Color{
    TOPCOLOR, BOTTOMCOLOR, LEFTCOLOR, RIGHTCOLOR, FRONTCOLOR, BACKCOLOR
}

enum Orientation {
    TOP, BOTTOM, LEFT, RIGHT, FRONT, BACK
}