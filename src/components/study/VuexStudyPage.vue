<template>
    <div>
        Vuex学习
        <p>store.vuex测试:{{count}}<el-button @click="testAdd" style="margin-left:10px;">add</el-button></p>
        <p>vuex:mapState取值测试:{{username}}</p>
        <p>vuex:getters取值:{{$store.getters.todoCount}}</p>
        <p>vuex:getters函数取值:{{$store.getters.selectedTodo(1).item}}</p>
        <p>vuex:getters--mapGetters取值:{{testMapGetters}}</p>
        <p>vuex:mutation payload测试:{{slogen}}<el-button type="primary" @click="testSlogen">生成slogen</el-button></p>
        <p>vuex:mapMutations测试:{{testMutationMapResult}}
            <el-button type="primary" @click="testMutationMap">常规调用</el-button>
            <el-button type="primary" @click="mutationMapSuccess">别名调用</el-button>
        </p>
        <p>vuex:action: {{testActionResult}}<el-button type="primary" @click="testAction">action异步调用</el-button></p>
        <p>vuex:action异/同步测试:{{testActionAsyncStr}}<el-button type="primary" @click="testActionAsync">异/同步测试</el-button></p>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
export default {
    data(){
        return{
        }
    },
    computed:{
        ...mapState(['username','count','slogen','testMutationMapResult','testActionResult','testActionAsyncStr']),
        ...mapGetters(['testMapGetters'])
    },
    created(){
        console.log(this.$store.getters.todoCount);
        // this.count = this.$store.state.count
    },
    methods:{
        testAdd(){
            this.$store.commit('increment');
        },
        testSlogen(){
            let o = {
                firstname:"何",
                familyname:"呵"
            }
            this.$store.commit('payloadTest',o);
        },
        ...mapMutations(['testMutationMap']),
        ...mapMutations({
            mutationMapSuccess:'testMutationMap'
        }),
        testAction(){
            this.$store.dispatch('timeoutSetting')
        },
        testActionAsync(){
            this.$store.dispatch('asyncTest').then(() => {
                console.log('异/同步测试结束');
            })
        }
    }
}
</script>
<style scoped>
p{
    margin: 10px 0;
}
</style>