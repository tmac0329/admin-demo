<template>
    <div>
        <h1>param-persist</h1>
        <p>页面参数：{{query}}</p>
    </div>
</template>
<script>
export default {
    data(){
        return{
            query:{}
        }
    },
    methods:{
        
    },
    created(){
        this.query = this.$route.query;
    }
}
</script>
<style scoped>

</style>