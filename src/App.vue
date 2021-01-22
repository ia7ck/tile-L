<template>
  <div id="app">
    <Board />
  </div>
</template>

<script>
import Board from "./components/Board.vue";
export default {
  name: "App",
  components: {
    Board,
  },
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 60px;
}
</style>
