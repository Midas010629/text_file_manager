<script>
// nav-bar遞迴結構
import { computed, onBeforeUpate, reactive, ref, watch, nextTick } from "vue";
import NavTree from "./NavTree.vue";
import { useGoSubfile, useToggleInfo } from "../composition-api";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "NavTree",
  components: { NavTree },
  props: {
    item: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const { Subfile } = useGoSubfile();
    const { toggleInfo, idx } = useToggleInfo();

    // 接收資料
    const files = reactive({ data: [] });
    // 目前點擊索引

    // 上個被點擊的
    const navActive = computed(() => {
      return store.getters.navActive;
    });

    // 變更點擊樣式
    const toggleActive = (e, item, index) => {
      toggleInfo(item, index);

      // 上個被點擊的
      if (navActive.value != null) {
        navActive.value.classList.remove("jsActive", "jsActived");
      }

      store.dispatch("handNavActive", e.target);
    };

    // 展開的高度計算 ,綁偽元素
    const isOpen = (item, index) => {
      if (item.fileExtension === "folder") {
        // 綁偽元素
        item.isOpen = !item.isOpen;
        // icon
        item.isOpen
          ? (item.icon = "fa-solid fa-caret-right  fa-rotate-90")
          : (item.icon = "fa-solid fa-caret-right");

        // 高度
        if (item.isOpen) {
          const calculateHeight = (children) => {
            return children.reduce((acc, child) => {
              if (child.children != undefined) {
                acc += calculateHeight(child.children);
              }
              // li高度(list__item)20 + 8(mb-1 mt-1)
              return acc + 28;
            }, 0);
          };
          item.domH = calculateHeight(item.children);
        } else {
          item.domH = 0;
        }
      }
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
  <div class="navbar">
    <ul
      class="list"
      v-for="(item, index) in files.data"
      :key="item.filePath"
      :class="{ isOpen: item.isOpen }"
    >
      <li class="list__item d-flex mb-1 mt-1">
        <button
          class="list__item__btn btn--primary"
          type="button"
          @click="isOpen(item, index)"
        >
          <i
            v-if="item.fileExtension === 'folder'"
            class="fa-solid fa-caret-right"
            :class="item.icon"
          ></i>
        </button>
        <a
          class="d-flex align-items-center p-2"
          :class="{ jsActive: idx === index }"
          href="javascript:;"
          @click.prevent.stop="
            Subfile(item);
            toggleActive($event, item, index);
          "
          >{{ item.fileName }}</a
        >
      </li>

      <NavTree
        :item="item.children"
        class="subNav ml-4"
        :style="{ maxHeight: item.domH + 'px' }"
      >
        {{ item.fileName }}
      </NavTree>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.list {
  position: relative;
  &.isOpen {
    &::before {
      content: "";
      position: absolute;
      left: 10px;
      top: 20px;
      bottom: 0;
      border: 1px solid rgba($color: red, $alpha: 0.3);
    }
  }

  &__item {
    height: 20px;

    &__btn {
      color: red;
      i {
        font-size: 20px;
      }
    }
  }
}
.subNav {
  transition: all 0.2s linear;
  max-height: 0;
  overflow: hidden;
}
</style>
