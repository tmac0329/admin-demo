<template>
    <div>
        <h2>Vue基础知识学习</h2>
        <h3>全局指令</h3>
        <p><input v-focus/><input v-autocomplete="22222" data-pro="5555"/></p>
        <h3>过滤器</h3>
        <p>{{name | formateName}}</p>
    </div>
</template>
<script>
export default {
    data(){
        return{
            name:'tom'
        }
    },
    created(){
    },
    methods:{
        
    }
}
</script>
<style scoped>
p{
    margin: 10px 0;
}
</style>