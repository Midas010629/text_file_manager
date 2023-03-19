<script>
import { computed, onMounted, reactive, watch, nextTick } from "vue";
import { useStore } from "vuex";
import NavBar from "./components/NavBar.vue";
import Info from "./components/Info.vue";

export default {
  components: { NavBar, Info },
  setup() {
    const store = useStore();
    const info = reactive({ childActive: null, isShow: false });

    const data = computed(() => {
      return store.getters.data;
    });

    const loadFile = (file) => {
      file.forEach((item) => {
        if (item.filePath == childActive.value.id) {
          info.childActive = item;
        } else if (item.fileExtension == "folder") {
          loadFile(item.children);
        }
      });
    };

    watch(
      () => store.getters.childActive,
      (newItem) => {
        info.isShow = false;
        const loadFile = (file) => {
          file.forEach((item) => {
            if (item.filePath == newItem.data.id) {
              info.childActive = item;
            } else if (item.fileExtension == "folder") {
              loadFile(item.children);
            }
          });
        };
        loadFile(data.value);
        nextTick(() => {
          info.isShow = true;
        });
      },
      { deep: true }
    );

    addEventListener("click", (e) => {
      info.isShow = false;
      let arr = document.querySelectorAll(".active");
      arr.forEach((item) => {
        item.classList.add("actived");
        item.classList.remove("active");
      });
    });

    onMounted(() => {});
    return { info };
  },
};
</script>
<template>
  <div class="nav">
    <!-- nav-bar遞迴結構 -->
    <NavBar />
  </div>

  <div class="main">
    <div class="header">
      <h1>檔案總管</h1>
    </div>

    <div class="content">
      <div class="abc">
        <div class="router">
          <router-view></router-view>
        </div>
        <div class="footer">search</div>
      </div>
      <div class="info" v-if="info.isShow">
        <Info :item="info.childActive" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
a {
  text-decoration: none;
  color: black;
}
.active {
  background-color: rgb(187, 203, 223);
}
.actived {
  border: 2px solid rgb(185, 189, 194);
}

#app {
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  background-color: #d9d9d9;
}
.nav {
  width: 250px;
  padding: 1rem;
}
.main {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  .header {
    display: flex;
    height: 60px;

    justify-content: center;
    align-items: center;
  }
  .content {
    flex-grow: 1;
    display: flex;

    .abc {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      background-color: #e5e5e5;
      margin: 1rem;
      .router {
        flex-grow: 1;
      }
      .footer {
        height: 250px;
        text-align: center;
        border-radius: 10px;
        background-color: #e5e5e5;
        border: 2px solid red;
      }
    }
    .info {
      width: 350px;
      height: 100%;
    }
  }
}
</style>

<!-- // 新增檔案///
const addFile = () => {
  let getID = active.value.getAttribute("id");

  if (getID != undefined) {
    let inputSplit = inputText.value.split(".");
    let inputName = inputSplit[0];
    if (Array.isArray(inputSplit) === true) {
      let inputType = inputSplit[1];
      // 如果是資料夾
      if (inputType === undefined) {
        inputName = `資料夾-${inputName}`;
        let obj = {
          name: inputName,
          type: "file",
          layer: addFileList.layer,
        };
        reState.files.splice(addFileList.id + 1, 0, obj);

        inputText.value = "";
      } else if (inputSplit.length > 2) {
        alert("輸入格式錯誤");
      }
      // 執行檔 type: inputType
      else {
        if (getID != undefined) {
          let obj = {
            name: inputName,
            type: "txt",
            layer: addFileList.layer,
          };
          reState.files.splice(addFileList.id + 1, 0, obj);

          inputText.value = "";
        }
      }
    }
  } else {
    alert("選擇路徑");
  }
}; -->
