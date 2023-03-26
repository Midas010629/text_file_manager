<template>
  <div class="nav-bar">
    <div
      class="nav-bar-item"
      v-for="(item, index) in files.data"
      :key="item.filePath"
    >
      <div class="menu" :class="{ active: idx === index }">
        <div class="toggle-icon" @click="item.isOpen = !item.isOpen">
          {{
            item.isOpen === true && item.fileExtension === "folder"
              ? "▼"
              : item.isOpen === false && item.fileExtension === "folder"
              ? "▶"
              : item.fileExtension != "folder"
              ? ""
              : "▶"
          }}
        </div>
        <a
          href="javascript:;"
          @click.prevent.stop="
            Subfile(item);
            toggleActive($event, index);
          "
          >{{ item.fileName }}</a
        >
      </div>
      <div class="subMenu">
        <NavBar v-if="item.children" :item="item.children" v-show="item.isOpen">
          {{ item.fileName }}
        </NavBar>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-bar {
  height: 100%;
  border-radius: 10px;
  background-color: #e5e5e5;
  .nav-bar-item {
    padding: 0.25rem 0.25rem 0 0.25rem;
    .menu {
      display: flex;

      .toggle-icon {
        width: 20px;
        color: red;
        cursor: pointer;
        text-decoration: none;
        text-align: center;
      }
    }
    .menu:hover:not(.active) {
      background-color: rgb(215, 221, 228);
    }

    .subMenu {
      margin-left: 20px;
    }
  }
}
</style>
<script>
// nav-bar遞迴結構
import { computed, onBeforeUpate, reactive, ref, watch, nextTick } from "vue";
import NavBar from "./NavBar.vue";
import { useGoSubfile } from "../composition-api";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "NavBar",
  components: { NavBar },
  props: {
    item: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const { Subfile } = useGoSubfile();

    // 接收資料
    const files = reactive({ data: [] });
    // 目前點擊索引
    const idx = ref(null);

    // 上個被點擊的
    const navActive = computed(() => {
      return store.getters.navActive;
    });

    // 變更點擊樣式
    const toggleActive = (e, index) => {
      idx.value = null;
      nextTick(() => {
        idx.value = index;
      });
      // 上個被點擊的
      if (navActive.value != null) {
        navActive.value.classList.remove("active", "actived");
      }
      store.dispatch("handNavActive", e.target.parentElement);
    };

    // 判斷資料串,並接收資料
    if (props.item.length === 0) {
      watch(
        () => store.getters.fetchData,
        (item) => {
          files.data = item;
        }
      );
      // F5重整回首頁;
      // router.push({ path: "/" });
    } else {
      files.data = props.item;
    }

    return { files, Subfile, toggleActive, idx };
  },
};
</script>
