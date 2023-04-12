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
      searchText.value = null;
    };

    return { keyEnter, searchText };
  },
};
</script>
<template>
  <header class="mt-4 mb-4 d-flex">
    <input
      class="btn--secondary"
      type="text"
      placeholder="請輸入搜尋內容"
      v-model="searchText"
      @keyup.enter="keyEnter()"
    />

    <button class="btn--secondary" @click.prevent.stop="keyEnter()">
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>
  </header>
</template>

<style lang="scss" scoped>
input {
  width: 400px;
  border: 1px solid black;
  border-radius: 20px 0 0 20px;

  font-size: 20px;
  padding-left: 10px;
  &:focus {
    border: 1px solid rgba($color: red, $alpha: 0.25);
  }
}

button {
  width: 60px;
  border: 1px solid black;
  border-left: none;
  border-radius: 0 20px 20px 0;

  i {
    font-size: 20px;
  }
}
</style>
