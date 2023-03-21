<script>
import { computed, onMounted, reactive, watch, nextTick } from "vue";
import { useStore } from "vuex";
import NavBar from "./components/NavBar.vue";
import Header from "./components/Header.vue";
export default {
  components: { NavBar, Header },
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch("handInit");
    });
    return {};
  },
};
</script>
<template>
  <div class="nav">
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
  width: 270px;
  padding: 1rem;
}
.content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  .header {
    display: flex;
    position: relative;
    height: 60px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: #e5e5e5;
    margin: 20px 20px 0 20px;
  }
  .main {
    display: flex;
    flex-grow: 1;
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
