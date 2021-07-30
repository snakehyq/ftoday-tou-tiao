<template>
  <div class="login-container">
    <!-- 导航 -->
    <van-nav-bar
      left-arrow
      title="登录"
      @click-left="$router.back()"
    />
    <!-- 表单 -->
    <van-form
      ref="loginFrom"
      :show-error="false"
      :show-error-message="false"
      @submit="onSubmit"
      @failed="onFailed"
      >
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        name="mobile"
        placeholder="请输入手机号"
        :border="false"
        center
        autofocus
        :rules="rulesForm.mobileRule"
      />
      <van-field
        v-model="user.code"
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        name="code"
        placeholder="请输入验证码"
        :border="false"
        center
        :rules="rulesForm.codeRule"
      >
        <template #button>
          <van-button
          v-if="isShowCodeDown"
          size="small"
          round
          class="yan-btn"
          @click.prevent="codeClick"
          :loading="isCodeShow"
          >获取验证码</van-button>
          <van-count-down
            v-else
            :time="time"
            format="ss s"
            @finish="finish"
            />
        </template>
      </van-field>
      <div style="margin: 26px 16px;">
        <van-button class="login-btn" block native-type="submit">登录</van-button>
      </div>
    </van-form>
    <van-divider>账号：13911111111 密码：246810</van-divider>
    <van-divider>如果收不到验证码，请使用万能验证码：246810</van-divider>
  </div>
</template>

<script>
import { login, getCode } from 'network/user'

export default {
  name: 'login',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      // 表单验证规则
      rulesForm: {
        mobileRule: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        codeRule: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      // 验证码的加载
      isCodeShow: false,
      // 倒计时
      time: 60 * 1000,
      // 验证码和倒计时的隐藏和显示
      isShowCodeDown: true
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 倒计时完成
    finish () {
      this.isShowCodeDown = true
    },
    // 验证码验证
    async codeClick () {
      try {
        // 验证手机号
        await this.$refs.loginFrom.validate('mobile')
        // 请求期间禁用按钮点击
        this.isCodeShow = true
        // 请求发送短信
        await getCode(this.user.mobile)
        // 处理倒计时
        this.isShowCodeDown = false
      } catch (error) {
        // 验证手机号错误
        let message = ''
        if (error && error.resopnse && error.response.status === 429) {
          message = '发送验证码太频繁，请稍后再试'
        } else if (error.name === 'mobile') {
          message = error.message
        } else {
          message = '发送失败，请稍后重试'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }
      // 无论发送验证码成功还是失败，最后都要关闭发送按钮的 loading 状态
      this.isCodeShow = false
      // 发送失败，显示发送按钮，关闭倒计时
      this.isShowCodeDown = true
    },
    // 表单验证失败
    onFailed (error) {
      if (error && error.errors && error.errors[0]) {
        this.$toast({
          message: error.errors[0].message, // 提示消息
          position: 'top' // 防止手机键盘太高看不见提示消息
        })
      }
    },
    // 登录提交表单
    async onSubmit () {
      this.$toast.loading({
        message: '加载中...',
        duration: 0,
        forbidClick: true
      })
      try {
        const data = await login(this.user)
        console.log(data)
        this.$toast.success('登录成功')
        this.$store.commit('saveUser', data.data)
        this.$router.replace(this.$route.query.redirection || '/')
        this.$store.commit('removeCachePage', 'layout')
      } catch (error) {
        this.$toast.fail('登录失败，手机号或者验证码错误')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login-container {
  .yan-btn {
    width: 78px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666666;
    }
  }
  /deep/ .van-field__left-icon {
    margin-right: 15px;
  }
  .login-btn {
    background-color: #6db4fb;
    border: none;
    border-radius: 8px;
    .van-button__text {
      font-size: 15px;
      color: $text-color;
    }
  }
}
</style>
