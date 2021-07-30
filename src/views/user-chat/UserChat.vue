<template>
  <div class="user-chat">
    <!-- 导航 -->
    <van-nav-bar
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 消息 -->
    <van-cell-group class="message-list" ref="messages">
      <van-cell
        v-for="(item, index) in messages"
        :key="index"
        title="单元格"
       />
    </van-cell-group>
    <!-- 底部 -->
    <div class="footer">
        <van-field
            v-model="message"
            center
            clearable
            placeholder="请输入内容"
        >
          <template #button>
            <van-button size="small" type="primary">发送</van-button>
          </template>
        </van-field>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { getStorage, setStorage } from 'store/storage'
export default {
  name: 'userChat',
  data () {
    return {
      message: '',
      socket: null,
      // 保存消息数据
      messages: getStorage('chat-messages') || null
    }
  },
  created () {
    // 建立连接
    const socket = io('http://ttapi.research.itcast.cn')
    this.socket = socket
    // 当客户端与服务器建立连接成功，触发 connect 事件
    socket.on('connect', () => {
      console.log('建立连接成功！')
    })
    // 监听接收服务端消息
    socket.on('message', data => {
      this.messages.push(data)
    })
  },
  mounted () {
    this.scropllToBottom()
  },
  watch: {
    messages (newValue) {
      setStorage('chat-messages', newValue)
      this.$nextTick(() => {
        this.scropllToBottom()
      })
    }
  },
  methods: {
    onSendMessage () {
      const message = this.message.trim()
      if (!message) {
        return
      }
      // 发送消息
      const data = {
        msg: message,
        timestamp: Date.now()
      }
      this.socket.emit('message', data)
      this.messages.push(data)
      this.message = ''
    },
    scropllToBottom () {
      const messagesRef = this.$refs.messages
      console.log(messagesRef)
      messagesRef.scrollTop = messagesRef.scrollHeight
    }
  }
}
</script>

<style lang="scss" scoped>
.user-chat {
    .message-list {
        position: fixed;
        left: 0;
        right: 0;
        top: 46px;
        bottom: 44px;
        overflow-y: auto;
    }
    .footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
    }
}
</style>
