<script>
import { computed, onMounted, reactive, ref } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import { useStore } from "vuex";
import { useGoSubfile } from "../composition-api";
export default {
  name: "Home",
  setup() {
    const { Subfile } = useGoSubfile();

    const store = useStore();
    const flies = reactive({ data: [] });

    const data = computed(() => {
      return store.getters.data;
    });

    onMounted(() => {
      flies.data = data.value;
    });
    onBeforeRouteUpdate((to, from, next) => {
      flies.data = data.value;
      next();
    });

    const toggleChildActive = (e) => {
      if (store.getters.childActive != null) {
        store.getters.childActive.classList.remove("active");
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
      v-for="(item, index) in flies.data"
      :key="item.filePath"
      class="card"
    >
      <!-- 圖片 -->
      <div class="img">
        <i
          class="fa-sharp fa-regular fa-folder"
          v-if="item.fileExtension === 'folder'"
        ></i>
        <i
          class="fa-sharp fa-regular fa-file-powerpoint"
          v-if="item.fileExtension === 'pptx'"
        ></i>
        <i
          class="fa-regular fa-file-image"
          v-if="item.fileExtension === 'jpg'"
        ></i>
        <i class="fa-regular fa-file" v-if="item.fileExtension === 'docx'"></i>
      </div>
      <!-- 檔名 -->
      <p>{{ item.fileName }}</p>
    </a>
  </div>
</template>
<style lang="scss" scoped>
.cards {
  display: flex;
  margin: 0.25rem;
  :hover:not(.active) {
    background-color: rgb(215, 221, 228);
  }
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;
    .img {
      pointer-events: none;
      i {
        padding: 1rem;
        font-size: 200px;
      }
    }

    p {
      pointer-events: none;
    }
  }
  .active {
    background-color: rgb(154, 163, 173);
  }
}
</style>
