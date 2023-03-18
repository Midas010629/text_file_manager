<script>
// nav-bar遞迴結構
import { computed, onBeforeUpdate, onMounted, reactive, ref } from "vue";
import FileTree from "./FileTree.vue";
import { useGoSubfile } from "../composition-api";
import { useStore } from "vuex";

export default {
  name: "FileTree",
  components: { FileTree },
  props: {
    item: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    // const active = ref();
    const store = useStore();
    const { Subfile } = useGoSubfile();
    // files接收資料結構
    const files = reactive({ data: [] });
    const navActive = computed(() => {
      return store.getters.navActive;
    });

    const toggleNavActive = (e) => {
      if (store.getters.navActive != null) {
        navActive.value.classList.remove("active");
        if (navActive.value.classList.contains("actived")) {
          navActive.value.classList.remove("actived");
        }
      }

      e.target.parentElement.classList.add("active");
      store.dispatch("handNavActive", e.target.parentElement);
    };

    onMounted(() => {
      // files變數執行初始化 ,接下來接收props值
      if (props.item.length === 0) {
        store.dispatch("handInit").then((res) => {
          files.data = res;
        });
      } else {
        files.data = props.item;
      }
    });

    return { files, Subfile, toggleNavActive };
  },
};
</script>
<template>
  <div class="nav-bar">
    <div
      class="nav-bar-item"
      v-for="(item, index) in files.data"
      :key="item.filePath"
    >
      <div class="menu">
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
            toggleNavActive($event);
          "
          >{{ item.fileName }}</a
        >
      </div>
      <div class="subMenu">
        <FileTree
          v-if="item.children"
          :item="item.children"
          v-show="item.isOpen"
        >
          {{ item.fileName }}
        </FileTree>
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
    padding: 0.25rem 0 0 0.25rem;
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
