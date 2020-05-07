<template>
    <div>
        <router-view class="view-a" name="a"></router-view>
        <router-view class="view-b" name="b"></router-view>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    methods:{
        
    }
}
</script>
<style scoped>
.view-a{
    background: #eee;
}
.view-b{
    background: #ddd;
}
</style>