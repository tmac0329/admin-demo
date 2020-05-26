<template>
    <el-container class="home-container">
        <el-aside class="home-side" width="180px">
            <div class="logo">
                <img src="../assets/logo_xhotel.png" alt="">
            </div>
            <el-menu default-active="2">
                <el-menu-item index="8" @click="$router.push('/order/example-page')">
                    <i class="el-icon-s-custom"></i>
                    <span slot="title">示例页面</span>
                </el-menu-item>
                <el-menu-item index="7" @click="$router.push('/study/base')">
                    <i class="el-icon-s-custom"></i>
                    <span slot="title">vue基础</span>
                </el-menu-item>
                <el-menu-item index="9" @click="$router.push('/order/list')">
                    <i class="el-icon-s-custom"></i>
                    <span slot="title">router学习</span>
                </el-menu-item>
                <el-menu-item index="10" @click="$router.push('/vuex/study')">
                    <i class="el-icon-s-custom"></i>
                    <span slot="title">vuex学习</span>
                </el-menu-item>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-s-order"></i>
                        <span>订单</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1" @click="$router.push('/order/list')">预订</el-menu-item>
                        <el-menu-item index="1-2">入住</el-menu-item>
                        <el-menu-item index="1-3">退房</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="home-header">Header</el-header>
            <el-main class="home-main">
                <transition name="anim">
                    <router-view></router-view>
                </transition>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    name:"Home",
    data(){
        return {
            
        }
    }
}
</script>

<style scoped>
.home-container{
    height: 100%;
}
.home-side{
    z-index: 2;
    background: #fff;
    box-shadow: 0 0 15px #dedede;
}
.home-header{
    z-index: 1;
    background: #fff;
    box-shadow:5px 0 15px 0 #dedede;
}
.home-main{
    height: 100%;
    background: #f5f6fa;
}
.logo img{
    width: 100%;
}
.logo-txt{
    display: flex;
    justify-content: center;
}
.el-menu{
    border: none;
}
.anim-leave-active,.anim-enter-active{
    transition: all .3s ease;
}
.anim-enter,.anim-leave{
    opacity: 0;
    transform: translateX(30px);
}

</style>