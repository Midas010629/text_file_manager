<script>
import { computed, onMounted, reactive, ref, watch, nextTick } from "vue";
import { useStore } from "vuex";
import { useRoute, onBeforeRouteUpdate } from "vue-router";

import File from "../components/File.vue";
import Search from "@/components/SearchBar.vue";
import InfoBar from "@/components/InfoBar.vue";

export default {
  name: "_HomeView",
  components: {
    Search,
    InfoBar,
    File,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    // 目前路徑的所有資料夾
    const flies = reactive({ data: [], title: null });

    const infoIsShow = computed(() => {
      return store.getters.infoData.isShow;
    });

    const searchIsShow = computed(() => {
      return store.getters.searchData.isShow;
    });

    const fetchData = computed(() => {
      return store.getters.fetchData;
    });

    // 遞迴找資料
    const findObject = (arr) => {
      for (const item of arr) {
        if (item.filePath === route.path) {
          return item;
        } else if (item.children !== undefined) {
          const children = findObject(item.children);
          if (children !== undefined) {
            return children;
          }
        }
      }
      return undefined;
    };

    watch(
      () => route.path,
      (newItem) => {
        //  路徑名
        if (route.path !== "/") {
          flies.title = route.path.split("/").slice(1);
        } else {
          flies.title = "";
        }

        // data
        if (route.path === "/") {
          flies.data = fetchData.value;
        } else {
          flies.data = findObject(fetchData.value).children;
        }
      }
    );

    onMounted(() => {
      store.dispatch("handInit").then((res) => {
        // 路徑名
        if (route.path !== "/") {
          flies.title = route.path.split("/").slice(1);
        } else {
          flies.title = "";
        }

        // data
        if (route.path === "/") {
          flies.data = fetchData.value;
        } else {
          flies.data = findObject(fetchData.value).children;
        }
      });
    });

    return { flies, infoIsShow, searchIsShow, route };
  },
};
</script>
<template>
  <article class="p-4">
    <div class="d-flex mb-4" v-show="!searchIsShow">
      <h2 class="h2">
        <router-link to="/" class="p-1">
          <i class="fa-solid fa-house"></i
        ></router-link>
      </h2>
      <h2 class="h2 mr-1" v-for="item in flies.title">>{{ item }}</h2>
    </div>
    <File :item="flies.data" v-show="!searchIsShow" />

    <Search v-show="searchIsShow" />
  </article>
  <transition name="animate__info">
    <InfoBar v-if="infoIsShow" />
  </transition>
</template>
<style lang="scss" scoped></style>
