<script>
import { computed, reactive, watch } from "vue";
import { useStore } from "vuex";
import File from "../components/File.vue";
export default {
  components: { File },
  setup() {
    const store = useStore();
    let flatData = [];

    const flies = reactive({ data: [], isShow: false });
    const fetchData = computed(() => {
      return store.getters.fetchData;
    });

    watch(
      () => store.getters.searchData,
      (newItem) => {
        const flatArr = (file) => {
          file.forEach((item) => {
            flatData.push(item);
            if (item.children) {
              flatArr(item.children);
            }
          });
        };
        flatArr(fetchData.value);

        const filterArr = (arr) => {
          return arr.filter((item) => {
            return item.fileName.includes(newItem.data);
          });
        };

        flies.data = filterArr(flatData);
        flatData = [];
        flies.isShow = newItem.isShow;
      },
      { deep: true }
    );

    const closeBar = () => {
      store.dispatch("handSearchData", { isShow: false });
    };
    return { flies, closeBar };
  },
};
</script>
<template>
  <div class="SearchBar">
    <div class="title">
      <a href="javascript:;" @click.prevent.stop="closeBar">
        <i class="fa-regular fa-circle-xmark"></i>
      </a>
      <h2>搜尋結果</h2>
    </div>
    <div class="cards" v-if="flies.isShow">
      <File :item="flies.data" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.SearchBar {
  // flex-grow: 1;
  border-radius: 10px;
  background-color: #e5e5e5;
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 1rem;
    h2 {
      font-size: 1.5rem;
    }
    i {
      margin-right: 0.5rem;
      font-size: 25px;
    }
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    margin: 1rem;

    :hover:not(.active) {
      background-color: rgb(215, 221, 228);
    }
  }
}
</style>
