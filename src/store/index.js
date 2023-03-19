import { createStore } from "vuex";

export default createStore({
	getters: {
		Alert: (state) => {
			return state.Alert
		},
		PageLoader: (state) => {
			return state.PageLoader
		}
	},
	actions: {
		alert(context, data) {
			context.commit('SET_ALERT', data)
		},
		pageLoader(context, data) {
			context.commit('SET_PAGELOADER', data)
		}
	},
	mutations: {
		SET_ALERT(state, payload) {
			state.Alert = payload
		},
		SET_PAGELOADER(state, payload) {
			state.PageLoader = payload
		}
	},
	state: {
		Alert: {
			show: false,
			messages: null,
			timeout: 4000,
			alertClass: 'danger',
		},
		PageLoader: {
			show: false,
			text: null
		}
	}
})