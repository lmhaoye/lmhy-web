import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        order: {},
        weight: 0,
        user: {
            all: [],
            m: [],
            w: []
        },
        opt: {
            m: [],
            w: []
        }
    },
    mutations: {
        addYd(state,code){
            state.order.ydCode = code;
        },
        resetUser(state,list){
            state.user.all = [];
            state.user.m = [];
            state.user.all = [];
            list.forEach(ele=>{
                this.commit('addUser',ele);
            })
        },
        addUser(state, user) {
            state.user.all.push(user);
            switch (user.type) {
                case 0: {
                    state.user.m.push(user);
                    state.opt.m.push({
                        value: user.adr,
                        label: user.name
                    })
                } break;
                case 1: {
                    state.user.w.push(user);
                    state.opt.w.push({
                        value: user.adr,
                        label: user.name
                    })
                } break;
            }
        }
    }
})