// 进行窗口rem适配，原理：1rem=html的font-size，通过动态改变html的font-size达到字体自适应
const remSize = () => {
  let deviceWidth = document.documentElement.clientWidth || window.innerWidth
  if (deviceWidth > 750)
    deviceWidth = 750
  if (deviceWidth < 320)
    deviceWidth = 320
  // 设置1rem
  document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'
  document.body.style.fontSize = 0.3 + 'rem'
}
remSize()
window.onresize = () => remSize()