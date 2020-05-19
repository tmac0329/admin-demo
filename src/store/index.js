import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        count:0,
        username:'Tracy',
        todos:[
            {id:1,item:'sing'},
            {id:2,item:'paint'},
        ],
        slogen:'默认名称',
        testMutationMapResult:'empty',
        testActionResult:'action将在两秒后调用mutation',
        testActionAsyncStr:'查看then回调',
    },
    getters:{
        todoCount:(state,getters)=>{
            return state.todos.length;
        },
        selectedTodo:(state,getters) => (id) => {
            return state.todos.filter(item => item.id === id)[0]
        },
        testMapGetters:(state,getters) => {
            return state.count + 10086;
        }
    },
    mutations:{
        increment(state){
            state.count++
        },
        payloadTest(state,{firstname,familyname}){
            state.slogen = `Hello ${firstname}${familyname}!!`
        },
        testMutationMap(state){
            state.testMutationMapResult = 'success'
        },
        testAction(state){
            state.testActionResult = 'test success'
        },
        testActionAsyncFun(state){
            state.testActionAsyncStr = state.testActionAsyncStr + 'success'
        }
    },
    actions:{
        timeoutSetting({commit}){
            setTimeout(() => {
                commit('testAction')
            },2000)
        },
        asyncTest({commit}){
            new Promise((resolve,reject) => {
                setTimeout(() => {
                    commit('testActionAsyncFun')
                    resolve()
                },2000)
            })
        }
    }
})

export default store;