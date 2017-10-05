<template>
    <div id="app">
        <router-view></router-view>

        <!--添加间隙-->
        <div class="jianxi"></div>
        <!--底部导航区域-->
        <footer class="page-footer fixed-footer" id="footer">
            <ul>
                <li class="nav" v-bind:class="{ active: isActive1 }" @click="onTabClicked(1)">
                    <router-link to="index">
                        <div v-bind:class="{ bg_img1 : isActive1 , ic1: Active1 }"></div>
                        <p>首页</p>
                    </router-link>
                </li>
                <li class="nav" v-bind:class="{ active: isActive2 }" @click="onTabClicked(2)">
                    <router-link to="">
                        <div v-bind:class="{ bg_img2 : isActive2 , ic2: Active2 }"></div>
                        <p>珠宝</p>
                    </router-link>
                </li>
                <li class="nav" v-bind:class="{ active: isActive3 }" @click="onTabClicked(3)">
                    <router-link to="">
                        <div v-bind:class="{ bg_img3 : isActive3 , ic3: Active3 }"></div>
                        <p>社区</p>
                    </router-link>
                </li>
                <li class="nav" v-bind:class="{ active: isActive4 }" @click="onTabClicked(4)">
                    <router-link to="">
                        <div v-bind:class="{ bg_img4 : isActive4 , ic4: Active4 }"></div>
                        <p>个人中心</p>
                    </router-link>
                </li>
            </ul>
        </footer>

    </div>


</template>

<script type="text/ecmascript-6">
    import home from '../home/Home.vue'

    export default {
        data() {
            return {
                isActive1: true,
                isActive2: false,
                isActive3: false,
                isActive4: false,
                Active1:false,
                Active2:true,
                Active3:true,
                Active4:true
            }
        },
        methods: {
            onTabClicked(index) {
                this.isActive1 = false;
                this.isActive2 = false;
                this.isActive3 = false;
                this.isActive4 = false;

                this.Active1 = true;
                this.Active2 = true;
                this.Active3 = true;
                this.Active4 = true;

                switch (index) {
                    case 1:
                        this.isActive1 = true;
                        this.Active1 = false;
                        break;
                    case 2:
                        this.isActive2 = true;
                        this.Active2 = false;
                        break;
                    case 3:
                        this.isActive3 = true;
                        this.Active3 = false;
                        break;
                    case 4:
                        this.isActive4 = true;
                        this.Active4 = false;
                        break;
                }
            }
        },
        components: {
            home
        }
    }

</script>

<style scoped>

    /*文字高亮显示*/
    .page-footer ul .active a p {
        color: #FDD2D9;
        text-decoration: none;
    }

    /*添加间隙，解决底部问题*/
    .jianxi {
        width: 100%;
        height: 1.05rem;
    }

    /*footer区域*/
    .page-footer {
        width: 100%;
        height: 1.04rem;
        background: rgba(0, 52, 52, 1);
        font-size: 0.22rem;
    }

    .page-footer ul {
        width: 100%;
        height: 1.05rem;
    }

    .page-footer ul li {
        float: left;
        width: 25%;
        text-align: center;
        padding: 0.184rem 0 1%;
    }

    .page-footer ul li a {
        width: 100%;
        display: block;
    }

    .page-footer ul li a:link {
        text-decoration: none;
    }

    .page-footer ul li img {
        width: 20%;
    }

    .page-footer ul li p {
        font-size: 1.275em;
        color: rgba(218, 218, 218, 1);
        margin-top: 3%;
    }

    /*页面固定定位样式*/
    .fixed-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 1.04rem;
        z-index: 1000;
    }

</style>
