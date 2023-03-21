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
    };

    // onMounted(() => {
    //   nextTick(() => {
    //     // console.log(data.value);
    //   });
    // });
    // const filteredArr = arr.filter((item) => item <= 5);

    return { keyEnter, searchText };
  },
};
</script>
<template>
  <h1>檔案總管</h1>
  <div class="searchBar">
    <label for="search"> <i class="fa-solid fa-magnifying-glass"></i></label>
    <input
      id="search"
      type="text"
      placeholder="請輸入搜尋內容"
      v-model="searchText"
      @keyup.enter="keyEnter()"
    />
  </div>
</template>

<style lang="scss" scoped>
.searchBar {
  position: absolute;
  left: 1rem;
  display: flex;
  align-items: center;

  i {
    font-size: 30px;
  }
  input {
    margin-left: 1rem;
    padding-left: 0.5rem;
    width: 300px;
    height: 30px;
    font-size: 20px;
    border: 1px solid black;
    border-radius: 3px;
  }
}
</style>
