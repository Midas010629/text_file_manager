<script>
import { computed, onMounted, reactive, ref, watch, nextTick } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useGoSubfile, useToggleInfo } from "@/composition-api";
import Img from "@/components/Img.vue";
import File from "../components/File.vue";
import Search from "@/components/SearchBar.vue";
import InfoBar from "@/components/InfoBar.vue";

export default {
  name: "_HomeView",
  components: {
    Img,
    Search,
    InfoBar,
    File,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    // 目前路徑的所有資料夾
    const flies = reactive({ data: [] });

    const infoIsShow = computed(() => {
      return store.getters.infoData.isShow;
    });

    const searchIsShow = computed(() => {
      return store.getters.searchData.isShow;
    });

    watch(
      () => store.getters.childrenData,
      (item) => {
        flies.data = item;
      }
    );

    return { flies, infoIsShow, searchIsShow, route };
  },
};
</script>
<template>
  <div class="container">
    <div class="path" v-show="!searchIsShow">
      <h2>當前路徑: {{ route.path }}</h2>
      <div class="cards">
        <File :item="flies.data" />
      </div>
    </div>
    <Search v-show="searchIsShow" />
  </div>
  <div class="info" v-if="infoIsShow">
    <InfoBar />
  </div>
</template>
<style lang="scss" scoped>
.container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: #e5e5e5;
  margin: 1rem;

  .path {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background-color: #e5e5e5;

    h2 {
      font-size: 1.25em;
      padding: 1rem 0 0 2rem;
    }
    .cards {
      display: flex;
      margin: 1rem;

      :hover:not(.active) {
        background-color: rgb(215, 221, 228);
      }
    }
  }
}
.info {
  width: 350px;
  height: 100%;
}
</style>
