<template>
  <div>
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="login">
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        placeholder="请输入用户名"
        :error-message="nameMessage"
      />
      <van-field
        v-model="password"
        required
        label="密码"
        type="password"
        placeholder="请输入密码"
        :error-message="passwordMessage"
      />
      <div class="button">
        <van-button
          color="linear-gradient(to right, #4bb0ff, #6149f6)"
          @click="login"
          :loading="openloading"
          >确认登录</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import url from "../service";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      openloading: false, // 开启用户的loading
      nameMessage: "", // 用户名出错的信息
      passwordMessage: "" // 用密码出错的信息
    };
  },
  created() {
    if (localStorage.userInfo) {
      this.$toast.success("登录成功");
      this.$router.push("/");
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    login() {
      this.checkForm() && this.loginOk();
    },
    checkForm() {
      let isOk = true;
      if (this.username.length < 2) {
        this.nameMessage = "用户名不得少于两位";
        isOk = false;
      } else {
        this.nameMessage = "";
        isOk = true;
      }
      if (this.password.length < 5) {
        this.passwordMessage = "密码不得少于五位";
        isOk = false;
      } else {
        this.passwordMessage = "";
        isOk = true;
      }
      return isOk;
    },
    loginOk() {
      this.openloading = true;
      this.$axios
        .post(url.login, {
          userName: this.username,
          password: this.password
        })
        .then(res => {
          // console.log(res);
          if (res.data.code == 200 && res.data.message == "用户名密码正确") {
            new Promise((resolve, reject) => {
              localStorage.userInfo = { userName: this.username };
              setTimeout(() => {
                resolve(), 500;
              });
            })
              .then(() => {
                this.$toast.success("登录成功");
                this.$router.push("/");
              })
              .catch(err => {
                console.log(err);
                this.$toast.fail("登录账号保存失败");
              });
          } else {
            this.openloading = false;
            console.log(res.data.message);
            this.$toast.fail("登录失败");
          }
        })
        .catch(err => {
          this.openloading = false;
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 96%;
  margin: 20px auto;
  .button {
    padding-left: 35%;
    padding-top: 10px;
  }
}
</style>
