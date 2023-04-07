<script>
import { computed, reactive, watch } from "vue";
import { useStore } from "vuex";
import File from "../components/File.vue";
export default {
  components: { File },
  setup() {
    const store = useStore();

    const flies = reactive({ data: [] });
    const fetchData = computed(() => {
      return store.getters.fetchData;
    });
    watch(
      () => store.getters.searchData,
      (newItem) => {
        const flatData = [];

        /// fetchData 資料一維
        const flatArr = (file) => {
          file.forEach((item) => {
            flatData.push(item);
            if (item.children) {
              flatArr(item.children);
            }
          });
        };
        flatArr(fetchData.value);

        // 一維後資料過濾
        const filterArr = (arr) => {
          return arr.filter((item) => {
            return item.fileName.includes(newItem.data);
          });
        };
        flies.data = filterArr(flatData);
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
  <div class="searchBar">
    <div class="searchBar__title d-flex justify-content-center mb-4">
      <button class="btn--secondary" @click.prevent.stop="closeBar">
        <i class="fa-regular fa-circle-xmark"></i>
      </button>
      <h2 class="h2">搜尋結果</h2>
    </div>

    <File :item="flies.data" />
  </div>
</template>

<style lang="scss" scoped>
.searchBar {
  &__title {
    i {
      margin-right: 0.5rem;
      font-size: 25px;
    }
  }
}
</style>
