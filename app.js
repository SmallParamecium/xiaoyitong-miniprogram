// app.js — 校易通 校园综合服务系统
App({
  onLaunch: function () {
    // 初始化云开发
    if (wx.cloud) {
      wx.cloud.init({
        env: 'new-1-d1gkb8gno16c9f4bc',
        traceUser: true
      });
      // 调用云函数获取 openid
      wx.cloud.callFunction({
        name: 'login',
        success: (res) => {
          this.globalData.openid = res.result.openid;
          this.globalData.isLogin = true;
        },
        fail: (err) => {
          console.warn('云函数 login 调用失败:', err);
        }
      });
    }

    // 获取系统信息
    const sysInfo = wx.getSystemInfoSync();
    this.globalData.systemInfo = sysInfo;
    this.globalData.statusBarHeight = sysInfo.statusBarHeight;
    this.globalData.navBarHeight = sysInfo.platform === 'ios' ? 44 : 48;
  },

  globalData: {
    userInfo: null,
    openid: null,
    isLogin: false,
    systemInfo: null,
    statusBarHeight: 0,
    navBarHeight: 0
  }
});