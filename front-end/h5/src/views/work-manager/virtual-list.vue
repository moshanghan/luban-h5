<template>
  <a-list>
    <RecycleScroller
      style="height: 1600px"
      :items="chunkedItems"
      :item-size="470"
      key-field="rowIndex"
      v-infinite-scroll="handleInfiniteOnLoad"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="10"
    >
      <a-list-item slot-scope="{ item }" style="margin-bottom: 10px">
        <div class="mb-3" style="width:100%;">
          <a-row :gutter="16">
            <a-col :span="6" v-for="work in item.row" :key="work.id" >
              <!-- <ListItemCard :work="work" /> -->
              <slot v-bind:work="work">
                {{ work.id }}
              </slot>
            </a-col>
          </a-row>
        </div>
      </a-list-item>
    </RecycleScroller>
    <a-spin v-if="loading" class="demo-loading" />
  </a-list>
</template>
<script>
// import reqwest from 'reqwest'
import infiniteScroll from 'vue-infinite-scroll'
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

// const fakeDataUrl = 'https://randomuser.me/api/?results=10&inc=name,gender,email,nat&noinfo'
export default {
  directives: { infiniteScroll },
  components: {
    RecycleScroller
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    busy: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * 每行 n 个
     */
    chunkedItems () {
      const n = 4
      if (this.items.length <= n) {
        return [{
          row: Object.freeze(this.items),
          rowIndex: 0
        }]
      }
      const result = []
      const len = this.items.length
      const items = this.items
      let rowIndex = 0
      for (let i = 0; i < len; i += n) {
        result.push({
          row: items.slice(i, i + n),
          rowIndex: rowIndex++
        })
      }
      return Object.freeze(result)
    }
  },
  beforeMount () {
    // this.handleInfiniteOnLoad()
  },
  methods: {
    handleInfiniteOnLoad () {
      console.log(111)
      this.$emit('handleInfiniteOnLoad')
    }
  }
}
</script>
<style>
.demo-loading {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
</style>
