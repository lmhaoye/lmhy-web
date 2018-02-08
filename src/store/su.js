import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        step: 0,
        order:null,
        user: {
            all: [],
            c: [],
            s: [],
            m: []
        },
        splic:[],
        load:[]
    },
    mutations: {
        resetLoad(state,list){
            state.load = list;
        },
        resetSplic(state,list){
            state.splic = list;
        },
        runSplic(state,order){
            state.splic.push(order);
        },
        uStep(state,step){
            state.step = step;
        },
        rOrder(state,order){
            state.order = order;
        },
        cleanUser(state){
            state.user.all = [];
            state.user.c = [];
            state.user.s = [];
            state.user.m = [];
        },
        addUser(state, user) {
            let all = state.user.all;
            for (let i = 0; i < all.length; i++) {
                if(user.id == all[i].id){
                    return;
                }
            }
            state.user.all.push(user);
            switch (user.cate) {
                case 0: {
                    state.user.c.push(user);
                } break;
                case 1: {
                    state.user.s.push(user);
                } break;
                case 2: {
                    state.user.m.push(user);
                } break;
            }
        }
    }
})
export default store