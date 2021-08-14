<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  font-family: "Verdana", sans-serif;
  font-size: 14px;
}

div {
  box-sizing: border-box;
}

#app {
  width: 1200px;
  margin: 0 auto;
}

.centered {
  text-align: center;
}

.btn {
  text-transform: uppercase;
  background: #1eb98e;
  border: 2px solid #20a07d;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  font-family: "Verdana", sans-serif;
  font-size: 15px;
  color: #fff;
  letter-spacing: 1px;
}
.btn:hover {
  background: #20a07d;
}
.btn:focus {
  outline: none;
}
.btn.disabled {
  background: #1eb98e;
  cursor: default;
  opacity: 0.6;
}
.btn-icon {
  outline: none;
  border: none;
  color: #1eb9b9;
  width: 32px;
  border-radius: 4px;
  font-size: 24px;
  cursor: pointer;
}
.btn-icon:hover {
  background: #e2fbfb;
}
</style>