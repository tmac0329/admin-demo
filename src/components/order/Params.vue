<template>
    <div>
        <h1>路由组件传参</h1>
        <p>{{$route.params.param1}}</p>
        <p>22+{{param1}}</p>
    </div>
</template>
<script>
export default {
    data(){
        return{
        }
    },
    props:['param1','param2'],
    created(){
        console.log(this.param1);
        console.log(this.param2);
    },
    methods:{
        
    }
}
</script>
<style scoped>

</style>