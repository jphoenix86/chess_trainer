const chai = require('chai');
const assert = chai.assert;

var Square = require('../lib/square');
var King = require('../lib/pieces/king');
var Rook = require('../lib/pieces/rook');
var Pawn = require('../lib/pieces/pawn');

describe('Square', function () {

  it('should instantiate a new square', function () {
    let square = new Square ();
    assert.isObject(square);
  });

  it('should know its coordinates', function () {
    let square = new Square (this.board, 3, 5);
    assert.equal(square.xCoordinate, 3);
    assert.equal(square.yCoordinate, 5);
  });

  it('should know the board it belongs to', function () {
    let square = new Square (this.board, 3, 5);
    assert.equal(square.board, this.board);
  });

  it('should remove piece from the board when another piece enters', function () {
    let whiteKingsSquare = this.board.findSquare(0, 0);
    let whiteKing = new King (whiteKingsSquare, "white");
    whiteKingsSquare.piece = whiteKing;
    let blackKingsSquare = this.board.findSquare(0, 0);
    let blackKing = new King (blackKingsSquare, "black");
    blackKingsSquare.piece = blackKing;
    let square = this.board.findSquare(6, 0);
    let blackRook = new Rook (square, "black");
    square.piece = blackRook;
    let squareTwo = this.board.findSquare(2, 0);
    let whiteRook = new Rook (squareTwo, "white");
    squareTwo.piece = whiteRook;
    let squareThree = this.board.findSquare(1, 1);
    let pawn = new Pawn (squareThree, "white");
    squareThree.piece = pawn;
    var preCount = this.board.pieceCount();

    whiteRook.move(square);

    assert.equal(this.board.pieceCount(), (preCount - 1));
    assert.equal(square.piece, whiteRook);
    assert.equal(whiteRook.square, square);
    assert.equal(blackRook.square, null);
  });
});
