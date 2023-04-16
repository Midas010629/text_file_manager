<script>
import { computed, onMounted, reactive, ref, watch, nextTick } from "vue";
import { useStore } from "vuex";
import { useRoute, onBeforeRouteUpdate } from "vue-router";

import File from "../components/File.vue";
import Search from "@/components/SearchBar.vue";
import InfoBar from "@/components/InfoBar.vue";
import router from "@/router";

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
    const files = reactive({ data: [], title: [], path: [] });

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

    // 根據path找data
    const findPathData = () => {
      // data
      if (route.path === "/") {
        // 找到首頁
        files.data = fetchData.value;
        files.title = null;
      } else {
        if (findObject(fetchData.value)) {
          //找到路徑分頁
          files.data = findObject(fetchData.value).children;
          files.title = route.path.split("/").slice(1);
          files.path = files.title.map((value, index) =>
            files.title.slice(0, index + 1).join("/")
          );
        } else {
          // 無此分頁 導入首頁
          router.push({ path: "/" });
        }
      }
    };

    const titleGoPath = (index) => {
      router.push({ path: `/${files.path[index]}` });
    };

    watch(
      () => route.path,
      (newItem) => {
        findPathData();
      }
    );

    onMounted(async () => {
      await store.dispatch("handInit");
      findPathData();
    });

    return { files, infoIsShow, searchIsShow, route, titleGoPath };
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
      <h2 class="h2" v-for="(item, index) in files.title">
        ><a class="p-1" href="javascript:;" @click="titleGoPath(index)">
          {{ item }}
        </a>
      </h2>
    </div>
    <File :item="files.data" v-show="!searchIsShow" />

    <Search v-show="searchIsShow" />
  </article>
  <transition name="animate__info">
    <InfoBar v-if="infoIsShow" />
  </transition>
</template>
<style lang="scss" scoped></style>
