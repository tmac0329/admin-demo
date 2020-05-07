<template>
    <div>
        <h1>组件内路由守卫</h1>
    </div>
</template>
<script>
export default {
    data(){
        return{
        }
    },
    created(){
        
    },
    methods:{
        
    },
    beforeRouteEnter(to,from,next){
        console.log('触发组件内路由守卫beforeRouteEnter');
        next();
    },
    beforeRouteLeave(to,from,next){
        console.log('触发组件内路由守卫bbeforeRouteLeave');
        // next(false);
        next();
    }
}
</script>
<style scoped>

</style>