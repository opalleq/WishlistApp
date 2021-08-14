<template>
  <div>
  <NewItem :wishes="wishes" />
  <WishList :wishes="wishes" />
  </div>
</template>

<script>
import NewItem from '../components/NewItem'
import WishList from '../components/WishList'

export default {
    components: {
        NewItem,
        WishList
    },
    data: () => ({
      totalWishes: 0,
      wishes: []
    })
}
</script>