<template>
<div class="wish-items-wrapper">
  <h3 class="wish-counter" v-if="wishes.length">You've got {{ getTotal()}}</span>!</h3>
  <h3 class="wish-counter" v-else>You haven't created any wish yet.</h3>

  <div class="view-mode-wrapper" v-if="wishes.length">View as:
    <span :class="[{ active: this.viewMode === 'table' }, 'view-mode']" v-on:click="toggleViewMode('table')">table</span>
    <span :class="[{active: this.viewMode === 'list'}, 'view-mode']" v-on:click="toggleViewMode('list')">list</span>
  </div>

  <ul class="wish-items-table" v-if="viewMode ==='table'">
    <li v-for="(wish, i) in wishes" class="wish-item" :key="i">
      <span class="action-close" v-on:click="deleteItem(wish._id)"></span>
      <div class="wish-img-wrapper">
        <img class="wish-item-pic" :src="wish && wish.pic || ''" width="80"/>
      </div>
      <h3 class="wish-item-name">{{wish.name}}</h3>
      <p class="wish-item-descr">{{wish.description}}</p>
    </li>
  </ul>

  <div class="wish-items-list" v-else-if="viewMode === 'list'">
    <div v-for="(wish, i) in wishes" class="wish-item" :key="i">
      <div class="wish-img-wrapper">
        <img class="wish-item-pic" :src="wish && wish.pic" width="80"/>
      </div>
      <div class="wish-item-name">{{wish.name}}</div>
      <div class="action-close" v-on:click="deleteItem(wish._id)"></div>
    </div>
  </div>
</div>
</template>

<script>
import service from '../services/service';
import { listener } from '../main';

export default {
  name: 'WishList',
  data: () => ({
    viewMode: 'table',
    wishes: []
  }),
  methods: {
    async getItems() {
      const response = await service.getItems();
      this.wishes = response.data;
    },
    getTotal() {
      return this.wishes.length + (this.wishes.length === 1 ? ' wish' : ' wishes');
    },
    toggleViewMode(mode) {
      this.viewMode = mode;
    },
    deleteItem(id) {
      service.deleteItem(id)
      .then(data => {
        this.getItems();
      })
    }
  },
  mounted() {
    this.getItems();
    listener.$on('itemsListUpdated', () => this.getItems());
  }
};
</script>

<style scoped>
.view-mode-wrapper {
  margin: 12px 0 16px;
}

.view-mode {
  padding: 2px 8px 3px;
  border-radius: 6px;
  margin-right: 2px;
  cursor: pointer;
}

.view-mode.active {
  background: rgba(30, 185, 142, .4);
}

.wish-items-wrapper {
  margin: 0 auto 42px;
}

.wish-items-table .wish-item {
  display: inline-block;
  position: relative;
  padding: 20px;
  border: 2px solid #cacaca;
  width: 180px;
  height: 180px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  margin: 0 8px 8px 0;
}

.wish-items-table .wish-item:hover {
  border: 2px solid #77d4bb;
}

.wish-items-table .wish-img-wrapper {
  width: 180px;
  height: 100px;
  margin: 0 auto 10px;
}

.wish-items-table .wish-item-pic {
  width: auto;
  max-width: 180px;
  max-height: 100px;
}

.wish-items-table .action-close::before {
  position: absolute;
  top: -10px;
  right: 5px;
  border: 2px solid #77d4bb;
  border-radius: 20px;
  width: 20px;
  height: 20px;
  background: #fff;
  content: '\00d7';
  cursor: pointer;
}

.hint {
  font-size: 10px;
}

.wish-items-list .wish-item {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #cacaca;
  border-left: 1px solid #cacaca;
  border-right: 1px solid #cacaca;
  color: #3c3c3c;
}

.wish-items-list .wish-item:hover {
    background-color: rgba(119, 212, 187, .1);
}

.wish-items-list .wish-item:last-child {
  border-bottom: 1px solid #cacaca;
}

.wish-items-list .wish-img-wrapper {
  width: 65px;
  height: 64px;
  display: flex;
  align-items: center;
  border-right: 1px solid #cacaca;
}

.wish-items-list .wish-img-wrapper img {
  margin: 0 auto;
}

.wish-items-list .wish-item-pic {
  width: auto;
  max-width: 64px;
  max-height: 64px;
}

.wish-items-list .wish-item-name {
  font-size: 24px;
  padding-left: 24px;
  line-height: 64px;
  flex-grow: 1;
}

.wish-items-list .action-close::before {
  font-size: 30px;
  line-height: 64px;
  content: '\00d7';
  cursor: pointer;
  padding: 0 6px;
}
</style>