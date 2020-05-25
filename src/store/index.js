import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    paths: ['isAuthenticated', 'role']
  })],
  namespaced: true,
  state: {
    isAuthenticated: false,
    role: 'student',
    user: null,
    documents: [],
    upload: {
      error: null,
      message: null,
      file: null,
      filename: 'Lisa uus dokument'
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.isAuthenticated
    },
    role (state) {
      return state.role
    },
    isAdmin(state) {
      return state.user.role == 'admin'
    },
    user(state) {
      return state.user
    },
    documents (state) {
      return state.documents
    },
    filename(state) {
      return state.upload.filename
    },
    file(state) {
      return state.upload.file
    },
    upload_message(state) {
      return state.upload.message
    },
    upload_error(state) {
      return state.upload.error
    }
  },
  mutations: {
    SET_AUTHENTICATION(state, status) {
      state.isAuthenticated = status;
    },
    SET_USER(state, data) {
      state.user = data;
      state.role = data.role
    },
    LOGOUT(state) {
      state.isAuthenticated = false;
      state.role = null;
      state.user = null;
    },
    SELECT_DOCUMENT(state, payload) {
      state.upload.file = payload.file;
      state.upload.filename = payload.filename;
    },
    SET_DOCUMENT(state, documents) {
      state.documents = documents;
    },
    SET_UPLOAD_STATUS(state, payload) {
      state.upload.error = payload.error;
      state.upload.message = payload.message;
    }
  },
  actions: {

    async getDocuments({commit}) {
      try {
        let response = await axios.get('https://praktika.ikt.khk.ee:5000/api/documents', {withCredentials: true});
        commit('SET_DOCUMENT', response.data)
      } catch (error) {
        commit('LOGOUT')
        router.push('/')
      }
    },

    async selectDocument({commit}, payload) { 
      if (!payload.file) {
        commit('SET_UPLOAD_STATUS', true, 'Fail puudub')
      } else {
        commit('SELECT_DOCUMENT', payload)
        commit('SET_UPLOAD_STATUS', false, null)
      }
    },

    async uploadDocument({commit, dispatch}, formData) {
      try {
        await axios.post('https://praktika.ikt.khk.ee:5000/api/documents/', formData, {withCredentials: true})
        commit('SET_UPLOAD_STATUS', {error: false, message:'Dokument üles laetud'})
        await dispatch('getDocuments')

        setTimeout(() => {
          commit('SET_UPLOAD_STATUS', {error: false, message: null})
        }, 5000)

      }catch(err) {
        commit('SET_UPLOAD_STATUS', {error: true, message:'Midagi läks valesti. Proovi uuesti.'})
      } finally {
        commit('SELECT_DOCUMENT', {file: null, filename: 'Lisa uus dokument'})
      }
    },

    async removeDocument({dispatch}, document) {
      await axios.delete(`https://praktika.ikt.khk.ee:5000/api/documents/${document._id}`, {withCredentials: true});
      dispatch('getDocuments')
    },

    async signIn ({ dispatch }, credentials) {
      const options = { headers: {'Content-Type': 'application/json'}, withCredentials: true}
      await axios.post('https://praktika.ikt.khk.ee:5000/api/auth/login', credentials, options)
      
      dispatch('attempt')
    },

    async attempt({ commit }) {
      try {

        let {data} = await axios.get('https://praktika.ikt.khk.ee:5000/api/users/me', {withCredentials: true})
          const role = data.role;
          
          commit('SET_USER', data)
          commit('SET_AUTHENTICATION', true)
          if (role === 'admin') {
            router.push('/koordinaator')
          } else {
            router.push('/opilane')
          }
      } catch(error) {
        commit('SET_AUTHENTICATION', false)
        commit('SET_USER', null)
      }
    }
  }
})
