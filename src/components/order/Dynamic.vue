<template>
    <div>
        <h1>order-dynamic</h1>
        <p>动态路由：打印params.id试试</p>
    </div>
</template>
<script>
export default {
    data(){
        return{
        }
    },
    created(){
        console.log(this.$route.params.id);
        console.log(this.$route.query.type);
    },
    methods:{
        
    }
}
</script>
<style scoped>

</style>