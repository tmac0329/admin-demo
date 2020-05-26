<template>
    <div>
        <h1>order-list</h1>
        <div class="row">
            <router-link to="/order/detail">to Detail</router-link>
        </div>
        <div class="row">
            <router-link to="/order/dynamic/100">to Dynamic 123</router-link>
        </div>
        <div class="row">
            <router-link to="/order/dynamic/101">to Dynamic 101</router-link>
        </div>
        <div class="row">
            <router-link to="/order/dynamic/102?type=2">to URL with query</router-link>
        </div>
        <div class="row">
            <router-link to="/order/order-common">to common page</router-link>
        </div>
        <div class="row">
            <router-link to="/order/child-detail">router change</router-link>
        </div>
        <div class="row" style="background:#fff;display:inline-block;padding:15px;">观察路由变化，以下内容为嵌套在router-view中内容<router-view></router-view></div>
        <div class="row">
            <el-button @click="routerPush">router push</el-button>
        </div>
        <div class="row">
            <el-button @click="routerReplace">router replace</el-button>
        </div>
        <div class="row">
            <el-button @click="routerName">命名路由</el-button>
        </div>
        <div class="row">
            <el-button @click="routerNameView">命名视图（待重新理解）</el-button>
        </div>
        <div class="row">
            <el-button @click="redirectUrl">重定向</el-button>
        </div>
        <div class="row">
            <el-button @click="alias">别名</el-button>
        </div>
        <div class="row">
            <el-button @click="transportParam">路由组件间传参</el-button>
        </div>
        <div class="row">
            <router-link to="/order/before-enter">before-enter路由独享前置守卫</router-link>
        </div>
        <div class="row">
            <router-link to="/order/component-guard">component-guard组件内守卫</router-link>
        </div>
        <div class="row">
            <el-button @click="paramPersist">路由传参持久化（刷新仍生效）</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            transportParams:[1,2,3]
        }
    },
    methods:{
        routerPush(){
            // this.$router.push({path:'/order/detail'});
            // this.$router.push({name:'OrderDetail'});
            this.$router.push({path:'/order/detail',query:{id:'123'}});
        },
        routerReplace(){
            this.$router.replace({path:'/order/detail',query:{id:'123'}});
        },
        routerName(){
            this.$router.push({name:'OrderDynamic',params:{id:'121'}});
        },
        routerNameView(){
            this.$router.push({path: '/order/multi/view'});
        },
        redirectUrl(){
            this.$router.push({path:'/order/redirect'});
        },
        alias(){
            this.$router.push({path:'/isAlias'});
        },
        transportParam(){
            this.$router.push({name:'OrderParam',params:{param1:11,param2:this.transportParams}});
        },
        paramPersist(){
            this.$router.push({
                path:'/router/param-persist',
                query:{
                    a:1,
                    name:'Tom'
                }
            })
        }
    }
}
</script>

<style scoped>
.row{
    margin: 10px 0;
}
</style>