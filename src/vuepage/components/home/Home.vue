<template>
    <div id="app">
        <!--内容区-->
        <section class="main animated fadeInUp">
            <i class="tag" @click="onShow()"></i>
            <div @click="onHide()" class="slide" v-for="(item, index) in imgArray"
                 v-bind:class="{ativity:isAtivity === index}">
                <img class="img" :src="item" alt="" width="100%"/>
            </div>
            <transition name="slide-fade">
                <ul class="nav" v-if="isShow">
                    <li class="line" @click.stop="onSearch()">搜索</li>
                    <li class="line" @click.stop="onClass()">分类</li>
                    <li class="line" @click.stop="onPersonal()">个人中心</li>
                    <li class="line">购物车</li>
                </ul>
            </transition>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">

    export default {
        data() {
            return {
                isShow: false,
                isAtivity: 0,
                i: 0,
                scroll: '',
                imgArray: [
                    'http://oy158wtwk.bkt.clouddn.com/bg_001.png',
                    'http://oy158wtwk.bkt.clouddn.com/bg_002.png',
                    'http://oy158wtwk.bkt.clouddn.com/bg_003.png',
                    'http://oy158wtwk.bkt.clouddn.com/bg_004.png',
                    'http://oy158wtwk.bkt.clouddn.com/bg_001.png',
                    'http://oy158wtwk.bkt.clouddn.com/bg_002.png',
                ]
            }
        },
        methods: {
            onHide() {
                this.isShow = false
            },
            onShow() {
                if (this.isShow === false) {
                    this.isShow = true
                } else {
                    this.isShow = false
                }
            },
            onSearch() {
                this.$router.push({path: '/search'})
            },
            onClass() {
                this.$router.push({path: '/classify'})
            },
            onPersonal() {
                this.$router.push({path: '/personal'})
            }
        },
        mounted() {
            let that = this;

            //微信浏览器禁止页面下拉方法
            function stopDrop() {
                var lastY;//最后一次y坐标点
                $(document.body).on('touchstart', function (event) {
                    lastY = event.originalEvent.changedTouches[0].clientY;//点击屏幕时记录最后一次Y度坐标。
                });
                $(document.body).on('touchmove', function (event) {
                    var y = event.originalEvent.changedTouches[0].clientY;
                    var st = $(this).scrollTop(); //滚动条高度
                    if (y >= lastY && st <= 10) {//如果滚动条高度小于0，可以理解为到顶了，且是下拉情况下，阻止touchmove事件。
                        lastY = y;
                        event.preventDefault();
                    }
                    lastY = y;

                });
            }

            //执行微信浏览器禁止页面下拉查看网址
            stopDrop();

            //返回角度
            function GetSlideAngle(dx, dy) {
                return Math.atan2(dy, dx) * 180 / Math.PI;
            }

            //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
            function GetSlideDirection(startX, startY, endX, endY) {
                var dy = startY - endY;
                var dx = endX - startX;
                var result = 0;

                //如果滑动距离太短
                if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                    return result;
                }

                var angle = GetSlideAngle(dx, dy);
                if (angle >= 0 && angle < 180) {
                    result = 1;
                } else if (angle >= -180 && angle < -0) {
                    result = 2;
                }

                return result;
            }

            //滑动处理
            var startX, startY;
            document.addEventListener('touchstart', function (ev) {
                startX = ev.touches[0].pageX;
                startY = ev.touches[0].pageY;
            }, false);
            document.addEventListener('touchend', function (ev) {
                var endX, endY;
                endX = ev.changedTouches[0].pageX;
                endY = ev.changedTouches[0].pageY;
                var direction = GetSlideDirection(startX, startY, endX, endY);
                switch (direction) {
                    case 0:
                        console.log('没有滑动');
                        break;
                    case 1:
                        console.log('上滑');
                        that.i += 1;
                        if (that.i > that.imgArray.length || that.i === that.imgArray.length) {
                            that.i = that.imgArray.length - 1
                        }
                        that.isAtivity = that.i;
//                        $('.slide').css({
//                            'height': '0'
//                        })
                        break;
                    case 2:
                        console.log('下滑');
                        that.i -= 1;
                        if (that.i < 0 || that.i === 0) {
                            that.i = 0
                        }
                        that.isAtivity = that.i;
                        break;
                    default:
                }
            }, false);
        }
    }
</script>

<style scoped>
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */
    {
        transform: translateY(0.50rem);
        opacity: 0;
    }

    .main {
        -vendor-animation-duration: 3s;
        -vendor-animation-delay: 2s;
        -vendor-animation-iteration-count: infinite;
        position: relative;
        background-color: black;
    }

    .main .tag {
        position: fixed;
        width: 0.64rem;
        height: 0.64rem;
        background: rgba(20, 20, 20, 0.6);
        top: 0.28rem;
        right: 0.28rem;
        z-index: 100;
        border-radius: 100%;
    }

    .nav {
        width: 100%;
        height: 3.79rem;
        background: rgba(51, 51, 51, 0.9);
        position: fixed;
        bottom: 0;
    }

    .nav .line {
        width: 3rem;
        height: 0.37rem;
        font-size: 0.26rem;
        font-family: PingFangSC-Regular;
        color: rgba(233, 233, 233, 1);
        line-height: 0.37rem;
        margin: 0.45rem 0 0.45rem 3.5rem;
        position: relative;
    }

    .nav .line::after {
        content: '';
        position: absolute;
        background: url("../../../assets/img/ic_search.png") no-repeat;
        width: 0.25rem;
        height: 0.25rem;
        background-size: 100%;
        top: 0.05rem;
        left: -0.5rem;
    }

    .slide {
        width: auto;
        height: 1.80rem;
        overflow: hidden;
        transition: all 0.3s ease-in;
        line-height: 0 !important;
    }

    .ativity {
        width: 100%;
        height: 8.13rem !important;
    }

    .slide .img {
        transform: translateY(-20%);
        transition: all 0.5s;
    }

    .ativity .img {
        transform: translateY(0);
        transition: all 0.5s;
    }
</style>
