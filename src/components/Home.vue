<template>
    <el-container class="home-container">
        <el-aside class="home-side" width="180px">
            <div class="logo">
                <img src="../assets/logo_xhotel.png" alt="">
            </div>
            <el-menu default-active="2">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-s-order"></i>
                        <span>订单</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">预订</el-menu-item>
                        <el-menu-item index="1-2">入住</el-menu-item>
                        <el-menu-item index="1-3">退房</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-s-management"></i>
                        <span>房态中心</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1">房态图</el-menu-item>
                        <el-menu-item index="2-2">房态表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="3">
                    <i class="el-icon-s-custom"></i>
                    <span slot="title">服务操作</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-s-comment"></i>
                    <span slot="title">系统通知</span>
                </el-menu-item>
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-warning"></i>
                        <span>快反</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="5-1">名单管理</el-menu-item>
                        <el-menu-item index="5-2">预警信息</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="6">
                    <template slot="title">
                        <i class="el-icon-s-tools"></i>
                        <span>设置</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="6-1">WiFi</el-menu-item>
                        <el-menu-item index="6-2">客房服务</el-menu-item>
                        <el-menu-item index="6-3">房型管理</el-menu-item>
                        <el-menu-item index="6-4">房间管理</el-menu-item>
                        <el-menu-item index="6-5">房价管理</el-menu-item>
                        <el-menu-item index="6-6">客服服务</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="7">
                    <template slot="title">
                        <i class="el-icon-s-platform"></i>
                        <span>角色管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="7-1">普通管理员</el-menu-item>
                        <el-menu-item index="7-2">企业管理员</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="home-header">Header</el-header>
            <el-main class="home-main">Main</el-main>
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

</style>