<template>
  <div id="app">
   <NewItem :wishes="wishes" />
   <WishList :wishes="wishes" />
  </div>
</template>

<script>
import NewItem from '@/components/NewItem';
import WishList from '@/components/WishList';

export default {
    name: 'App',
    components: {
      NewItem,
      WishList
    },
    data: () => ({
      totalWishes: 0,
      wishes: []
    })
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html, body {
  font-family: 'Verdana', sans-serif;
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
  background: #1EB98E;
  border: 2px solid #20A07D;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  font-family: 'Verdana', sans-serif;
  font-size: 15px;
  color: #fff;
  letter-spacing: 1px;
}
.btn:hover {
  background: #20A07D;
}
.btn:focus {
  outline: none;
}
.btn.disabled {
  background: #1EB98E;
  cursor: default;
  opacity: .6;
}
</style>