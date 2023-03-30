<script>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import Img from "../components/Img.vue";
import { useGoSubfile, useToggleInfo } from "../composition-api";

export default {
  components: { Img },
  props: {
    item: {
      type: Array,
      default: [],
    },
  },
  setup(props) {
    const { Subfile } = useGoSubfile();
    const { toggleInfo, idx } = useToggleInfo();

    return { props, Subfile, toggleInfo, idx };
  },
};
</script>
<template>
  <a
    class="card"
    v-for="(item, index) in props.item"
    :class="{ active: idx === index }"
    @dblclick.prevent="Subfile(item)"
    @click.prevent.stop="toggleInfo(item, index)"
    href="javascript:;"
    :key="item.filePath"
    :id="item.filePath"
  >
    <!-- 引入圖片Img/ -->
    <div class="img">
      <Img :item="item.fileExtension" :size="200" />
    </div>
    <p>{{ item.fileName }}</p>
  </a>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  margin: 0.25rem;
  padding: 0.5rem;

  .img {
    pointer-events: none;
    margin-bottom: 0.5rem;
  }
  p {
    pointer-events: none;
  }
}
</style>
