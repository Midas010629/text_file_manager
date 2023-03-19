<script>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import { useStore } from "vuex";
import { useGoSubfile } from "../composition-api";
import Img from "../components/Img.vue";
export default {
  name: "Files",
  components: {
    Img,
  },
  setup() {
    const { Subfile } = useGoSubfile();

    const store = useStore();
    const flies = reactive({ data: [] });

    const childrenData = computed(() => {
      return store.getters.childrenData;
    });

    const childActive = computed(() => {
      return store.getters.childActive.data;
    });

    watch(
      () => childrenData.value,
      (item) => {
        flies.data = item;
      }
    );

    const toggleChildActive = (e) => {
      if (childActive.value != null) {
        childActive.value.classList.remove("active");
        if (childActive.value.classList.contains("actived")) {
          childActive.value.classList.remove("actived");
        }
      }
      e.target.classList.add("active");
      store.dispatch("handChildActive", e.target);
    };

    return { flies, Subfile, toggleChildActive };
  },
};
</script>
<template>
  <div class="cards">
    <a
      href="javascript:;"
      @dblclick.prevent="Subfile(item)"
      @click.prevent.stop="toggleChildActive($event)"
      v-for="item in flies.data"
      :key="item.filePath"
      class="card"
      :id="item.filePath"
    >
      <!-- 圖片 -->

      <div class="img">
        <Img :item="item.fileExtension" :size="200" />
      </div>

      <!-- 檔名 -->
      <p>{{ item.fileName }}</p>
    </a>
  </div>
</template>
<style lang="scss" scoped>
.cards {
  display: flex;
  margin: 1rem;

  :hover:not(.active) {
    background-color: rgb(215, 221, 228);
  }
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;
    margin: 0.25rem;

    .img {
      pointer-events: none;
    }
    p {
      pointer-events: none;
    }
  }
}
</style>
