import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

var store = {
    state: {
        close_state: null
    },
    mutations: {
        set_close_state: function (state) {
            state.close_state = 'not_close'
        }
    }
}
var stores = new Vuex.Store(store)
export default stores;