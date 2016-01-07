const chai = require('chai');
const assert = chai.assert;

var Square = require('../lib/square');
var Piece = require('../lib/piece');
var King = require('../lib/pieces/king');
var Bishop = require('../lib/pieces/bishop');
var Pawn = require('../lib/pieces/pawn');

describe('Piece', function () {

  beforeEach (function () {
    this.square = new Square ("board", 0, 0);
  });

  it('should instantiate a new piece', function () {
    let piece = new Piece ();
    assert.isObject(piece);
  });

  it('should know its color', function () {
    let piece = new Piece (this.square, "black");
    assert.equal(piece.color, "black");
  });

  it('should know its square', function () {
    let piece = new Piece (this.square, "black");
    assert.equal(piece.square, this.square);
  });

  it('should start its move counter at 0', function () {
    let piece = new Piece ();
    assert.equal(piece.moveCount, 0);
  });

  it('should cannot move if result puts own king in check', function () {
    var square = this.board.findSquare(1, 6);
    var king = new King (square, "white");
    square.piece = king;
    var squareTwo = this.board.findSquare(4,3);
    var squareThree = this.board.findSquare(3,4);
    var squareFour = this.board.findSquare(3,3);
    let bishop = new Bishop (squareTwo, "black");
    squareTwo.piece = bishop;
    let pawn = new Pawn (squareThree, "white");
    squareThree.piece = pawn;

    assert(pawn.canMoveTo(squareTwo));
    assert(!pawn.canMoveTo(squareFour));
  });

});
