<template>
    <div>
        <h1>order-common</h1>
        <p>路由通配符测试</p>
    </div>
</template>
<script>
export default {
    data(){
        return{
        }
    },
    created(){
        console.log(this.$route.params);
    },
    methods:{
        
    }
}
</script>
<style scoped>

</style>