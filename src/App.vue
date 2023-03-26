<script>
import { computed, onMounted, reactive, watch, nextTick } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import NavBar from "./components/NavBar.vue";
import Header from "./components/Header.vue";
export default {
  components: { NavBar, Header },
  setup() {
    return {};
  },
};
</script>
<template>
  <div class="nav">
    <h1>檔案總管</h1>
    <NavBar />
  </div>
  <div class="content">
    <div class="header">
      <Header />
    </div>
    <div class="main">
      <router-view></router-view>
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
  border: 1px solid rgb(185, 189, 194);
}

#app {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #d9d9d9;
}
.nav {
  flex-basis: 270px;
  flex-shrink: 0;
  padding: 1rem;
  h1 {
    margin-bottom: 1rem;
  }
}
.content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  .header {
    margin: 1rem 0 0.5rem 0;
  }
  .main {
    display: flex;
    flex-grow: 1;
    margin: 0 1rem 1rem 0;
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
