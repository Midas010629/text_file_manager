<script>
import { computed, onMounted, reactive, watch, nextTick } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useClickActive } from "./composition-api";
import NavTree from "./components/NavTree.vue";
import HeaderBar from "./components/HeaderBar.vue";

export default {
  components: { NavTree, HeaderBar },
  setup() {
    const { clickActive } = useClickActive();
    clickActive();
    return {};
  },
};
</script>
<template>
  <nav class="m-4">
    <h1 class="h1 mb-4">檔案總管</h1>
    <NavTree />
  </nav>
  <main>
    <HeaderBar />

    <div class="container d-flex mr-4">
      <router-view></router-view>
    </div>
  </main>
</template>

<style lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/mixin.scss";

nav {
  flex: 0 0 250px;
  @include pad {
    display: none;
  }
}
main {
  width: 100%;
  height: 100%;
  @include pad {
    width: 90%;
    margin: 0 auto;
  }
  header {
    height: 40px;
  }
  .container {
    height: 90%;
    position: relative;
    @include pad {
      margin: 0;
    }
    @include mob {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    article {
      width: 100%;
      border-radius: 10px;
      background-color: $bg-color-secondary;
      overflow: auto;
      @include mob {
        width: auto;
      }
    }
    aside {
      flex: 0 0 280px;
      border-radius: 10px;
      background-color: $bg-color-secondary;
      @include pad {
        flex: 0 0 250px;
      }

      @include mob {
        width: 100%;
        margin: 0 auto;
        border: 1px solid black;
      }
    }
  }
}
</style>
