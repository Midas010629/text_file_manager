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
        console.log("1");
        navActive.value.classList.remove("active", "actived");
      }
      store.dispatch("handNavActive", e.target);
    };
    const isOpen = (item) => {
      item.isOpen = !item.isOpen;
    };

    // 判斷資料串,並接收資料
    if (props.item.length === 0) {
      watch(
        () => store.getters.fetchData,
        (item) => {
          files.data = item;
        }
      );
    } else {
      files.data = props.item;
    }

    return { files, Subfile, toggleActive, idx, isOpen };
  },
};
</script>
<template>
  <div>
    <div
      class="nav-bar"
      v-for="(item, index) in files.data"
      :key="item.filePath"
    >
      <div class="menu">
        <div class="toggle-icon" @click="isOpen(item)">
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
          :class="{ active: idx === index }"
          href="javascript:;"
          @click.prevent.stop="
            Subfile(item);
            toggleActive($event, index);
          "
          >{{ item.fileName }}</a
        >
      </div>

      <NavBar
        :item="item.children"
        class="subMenu"
        :class="{ open: item.isOpen }"
      >
        {{ item.fileName }}
      </NavBar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-bar {
  .menu {
    display: flex;
    .toggle-icon {
      width: 20px;
      color: red;
      cursor: pointer;
      text-decoration: none;
      text-align: center;
    }
    a {
      padding: 0 0.25rem;
    }
    a:hover:not(.active) {
      background-color: rgb(215, 221, 228);
    }
  }

  .subMenu {
    margin-left: 10px;
    transition: max-height 0.2s ease-in-out;
    max-height: 0;
    overflow: hidden;
  }
  .subMenu.open {
    max-height: 200px;
  }
}
</style>
