<template>
    <div>
        <h1>order-detail</h1>
        <div @click="back"><el-button type="primary">{{link}}</el-button></div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            link: 'tap to back'
        }
    },
    methods:{
        back(){
            this.$router.go(-1);
        }
    }
}
</script>
<style scoped>

</style>