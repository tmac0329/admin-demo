<template>
    <div>
        Vuex学习
        <p>store.vuex测试:<el-button @click="testAdd" style="margin-left:10px;">add</el-button></p>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data(){
        return{
        }
    },
    computed:{
        
    },
    created(){
        console.log(mapState);
        // this.count = this.$store.state.count
    },
    methods:{
        testAdd(){
            this.$store.commit('increment');
        }
    }
}
</script>
<style scoped>

</style>