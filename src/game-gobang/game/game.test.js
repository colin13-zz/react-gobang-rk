
import  { updateMatrix } from "./game";
import { checkWin, createMatrix } from "../matrix/matrix";

describe("Winner Checking", () => {
  // check if there is a winner

  it("Check0(Horizontal)", () => {
    let matrix = createMatrix(15, 15, 0);
    let isBlack = true,
      active,
      index = 0;

    let X = [0, 1, 2, 3, 4];
    X.forEach(x => {
      [matrix, isBlack, active, index] = updateMatrix(
        matrix,
        isBlack,
        index,
        x,
        0
      );
      if (x < 4)
        [matrix, isBlack, active, index] = updateMatrix(
          matrix,
          isBlack,
          index,
          x,
          1
        );
    });

    let check = checkWin(matrix);
    expect(check.win).toBeTruthy();
  });

  it("Check90(Vertical)", () => {
    let matrix = createMatrix(15, 15, 0);
    let isBlack = true,
      active,
      index = 0;

    let Y = [0, 1, 2, 3, 4];
    Y.forEach(y => {
      [matrix, isBlack, active, index] = updateMatrix(
        matrix,
        isBlack,
        index,
        0,
        y
      );
      if (y < 4)
        [matrix, isBlack, active, index] = updateMatrix(
          matrix,
          isBlack,
          index,
          1,
          y
        );
    });

    let check = checkWin(matrix);
    expect(check.win).toBeTruthy();
  });

  it("Check135(Diagonal)", () => {
    let matrix = createMatrix(15, 15, 0);
    let isBlack = true,
      active,
      index = 0;

    let Y = [0, 1, 2, 3, 4];
    let X = [0, 1, 2, 3, 4];
    X.forEach((x, i) => {
      let y = Y[i];
      [matrix, isBlack, active, index] = updateMatrix(
        matrix,
        isBlack,
        index,
        x,
        y
      );
      if (y < 4)
        [matrix, isBlack, active, index] = updateMatrix(
          matrix,
          isBlack,
          index,
          0,
          y + 1
        );
    });

    let check = checkWin(matrix);
    expect(check.win).toBeTruthy();
  });

  it("Check45(Diagonal)", () => {
    let matrix = createMatrix(15, 15, 0);
    let isBlack = true,
      active,
      index = 0;

    let Y = [4, 3, 2, 1, 0];
    let X = [4, 3, 2, 1, 0];
    X.forEach((x, i) => {
      let y = Y[i];
      [matrix, isBlack, active, index] = updateMatrix(
        matrix,
        isBlack,
        index,
        x,
        y
      );
      if (y > 0)
        [matrix, isBlack, active, index] = updateMatrix(
          matrix,
          isBlack,
          index,
          x + 1,
          y - 1
        );
    });

    let check = checkWin(matrix);
    expect(check.win).toBeTruthy();
  });
});



it("Created matrix is empty", () => {
  let matrix = createMatrix(15, 15, 0);
  let empty = true;

  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      if (matrix[x][y] !== 0) {
        empty = false;
        break;
      }
    }
    if (!empty) break;
  }
  expect(empty).toBeTruthy();
});
