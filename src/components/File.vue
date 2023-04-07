<script>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import Image from "./Image.vue";
import { useGoSubfile, useToggleInfo } from "../composition-api";
import { onBeforeRouteUpdate } from "vue-router";

export default {
  components: { Image },
  props: {
    item: {
      type: Array,
      default: [],
    },
  },
  setup(props) {
    const { Subfile } = useGoSubfile();
    const { toggleInfo, idx } = useToggleInfo();

    //  當引用同組件時 需要清空變數
    onBeforeRouteUpdate((to, from, next) => {
      idx.value = null;
      next();
    });

    return { props, Subfile, toggleInfo, idx };
  },
};
</script>
<template>
  <div class="cards d-flex flex-wrap">
    <a
      class="cards__item d-flex flex-column align-items-center m-1 p-2"
      :class="{ jsActive: idx === index }"
      v-for="(item, index) in props.item"
      @dblclick.prevent="Subfile(item)"
      @click.prevent.stop="toggleInfo(item, index)"
      href="javascript:;"
      :key="item.filePath"
      :id="item.filePath"
    >
      <!-- 引入圖片Img/ -->
      <Image class="cards__item__img mb-2" :item="item.fileExtension" />
      <p class="cards__item__title">{{ item.fileName }}</p>
    </a>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
.cards {
  &__item {
    width: 250px;
    @include pad {
      width: 200px;
    }
    &__img {
      pointer-events: none;
      font-size: 200px;
      @include pad {
        font-size: 180px;
      }
    }
    &__title {
      pointer-events: none;
    }
  }
}
</style>
