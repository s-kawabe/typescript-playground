type Color = 'Black' | 'White'
type Col = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
type Row = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

// ゲームのメインクラス
class Game {
  private piecies = Game.makePieces()

  private static makePieces() {
    return [
      new King('White', 'E', 1),
      new King('Black', 'E', 8),
      
      new Queen('White', 'D', 1),
      new Queen('Black', 'D', 8),
      
      // and more ...
    ]
  }
}

// 駒の抽象クラス - 継承のみに使用する
abstract class Piece {
  protected position: Position
  constructor(
    private readonly color: Color,
    col: Col,
    row: Row
  ){
    this.position = new Position(row, col)
  }

  moveTo(position: Position) {
    this.position = position
  }

  abstract canMoveTo(position: Position): boolean
}

// 位置を示すクラス
class Position {
  constructor(
    private row: Row,
    private col: Col,
  ) {}

  distanceFrom(position: Position) {
    return {
      row: Math.abs(position.row - this.row),
      col: Math.abs(position.col.charCodeAt(0) - this.col.charCodeAt(0))
    }
  }
}

// 駒の具体的なクラス - canMoveToをオーバーライドしないとエラーになる。
class King extends Piece {}
class Queen extends Piece {}
class Rook extends Piece {}
class Bishop extends Piece {}
class Knight extends Piece {}
class Pawn extends Piece {}