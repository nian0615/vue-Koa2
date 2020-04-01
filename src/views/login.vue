<template>
  <div>
    <van-nav-bar
      title="用户注册"
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
      />
      <van-field
        v-model="password"
        required
        label="密码"
        type="password"
        placeholder="请输入密码"
      />
      <div class="button">
        <van-button
          color="linear-gradient(to right, #4bb0ff, #6149f6)"
          @click="ok"
          >确认注册</van-button
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
      password: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    ok() {
      this.$axios
        .post(url.login, {
          username: this.username,
          password: this.password
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
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
