<template>
  <div>
    <div v-for="(row, i) in board" v-bind:key="-i" class="row">
      <div
        v-for="(cell, j) in row"
        v-bind:key="row.length * i + j"
        v-on:mouseover="update(i, j)"
        class="cell"
        v-bind:class="cell.cls"
      ></div>
    </div>
  </div>
</template>

<script>
import solve from "./tiling.js";

export default {
  name: "Board",
  data() {
    return {
      board: this.init(),
    };
  },
  methods: {
    update(i, j) {
      const board = this.init();
      board[i][j].cls.push("bg-dark-0");
      solve({ i, j }, this.board).forEach(({ depth, tiles: [a, b, c] }) => {
        board[a.i][a.j].cls.push(`bg-dark-${depth}`);
        board[b.i][b.j].cls.push(`bg-dark-${depth}`);
        board[c.i][c.j].cls.push(`bg-dark-${depth}`);
        // (1) .a   (2) c.   (3) bc   (4) ab
        //     cb       ba       a.       .c
        if (a.j === b.j && b.i === c.i) {
          if (a.i < b.i) {
            // (1)
            board[a.i][a.j].cls.push("clear-bottom");
            board[b.i][b.j].cls.push("clear-top");
            board[b.i][b.j].cls.push("clear-left");
            board[c.i][c.j].cls.push("clear-right");
          } else {
            // (3)
            board[a.i][a.j].cls.push("clear-top");
            board[b.i][b.j].cls.push("clear-bottom");
            board[b.i][b.j].cls.push("clear-right");
            board[c.i][c.j].cls.push("clear-left");
          }
        } else {
          if (a.i < c.i) {
            // (4)
            board[a.i][a.j].cls.push("clear-right");
            board[b.i][b.j].cls.push("clear-left");
            board[b.i][b.j].cls.push("clear-bottom");
            board[c.i][c.j].cls.push("clear-top");
          } else {
            // (2)
            board[a.i][a.j].cls.push("clear-left");
            board[b.i][b.j].cls.push("clear-right");
            board[b.i][b.j].cls.push("clear-top");
            board[c.i][c.j].cls.push("clear-bottom");
          }
        }
      });
      board.forEach((row, idx) => {
        this.board[idx].splice(0, this.board[idx].length, ...row);
      });
    },
    init() {
      const n = 16;
      const board = [];
      for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
          row.push({ i, j, cls: [] });
        }
        board.push(row);
      }
      return board;
    },
  },
};
</script>

<style>
.cell {
  display: inline-block;
  width: 15px;
  height: 100%;
  border: solid 1px #151515;
}
.row {
  height: 15px;
}
.bg-dark-0 {
  background: #151515;
}
.bg-dark-1 {
  background: #6a6a6a;
}
.bg-dark-2 {
  background: #d9d9d9;
}
.bg-dark-3 {
  background: #fcfcfc;
}
.clear-top {
  border-top-color: transparent;
}
.clear-bottom {
  border-bottom-color: transparent;
}
.clear-left {
  border-left-color: transparent;
}
.clear-right {
  border-right-color: transparent;
}
</style>
