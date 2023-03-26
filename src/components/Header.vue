<script>
import { computed, onMounted, watch, nextTick, ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const searchText = ref("");
    const keyEnter = () => {
      store.dispatch("handSearchData", {
        data: searchText.value,
        isShow: true,
      });
      searchText.value = "";
    };

    return { keyEnter, searchText };
  },
};
</script>
<template>
  <div class="searchBar">
    <input
      type="text"
      placeholder="請輸入搜尋內容"
      v-model="searchText"
      @keyup.enter="keyEnter()"
    />

    <a href="javascript:;" @click.prevent.stop="keyEnter()"
      ><i class="fa-solid fa-magnifying-glass"></i
    ></a>
  </div>
</template>

<style lang="scss" scoped>
.searchBar {
  display: flex;

  input {
    width: 400px;
    height: 40px;
    font-size: 20px;
    padding-left: 10px;
    border: 1px solid black;
    border-right: none;
    border-radius: 20px 0 0 20px;
  }
  a {
    background-color: white;
    height: 40px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    border-radius: 0 20px 20px 0;

    i {
      font-size: 20px;
    }
  }
}
</style>
