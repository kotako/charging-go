import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '~/plugins/firebase'
import { firebaseMutations, firebaseAction } from 'vuexfire'
const db = firebase.database()
const usersRef = db.ref('/users')
const postsRef = db.ref('/posts')
const chatsRef = db.ref('/chats')
const provider = new firebase.auth.TwitterAuthProvider()

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      post: null,
      users: [],
      posts: [],
      chats: []
    },
    getters: {
      posts: state => {
        return state.posts.map((post) => {
          post.user = state.users.find((user) => user.email === post.from)
          return post
        }).reverse()
      },
      post: state => {
        const post = state.post
        if (!post) return null
        post.user = state.users.find((user) => user.email === post.from)
        return post
      },
      users: state => state.users,
      user: state => state.user,
      chats: state => state.chats
    },
    mutations: {
      setCredential (state, { user }) {
        state.user = user
      },
      savePost (state, { post }) {
        state.post = post
      },
      ...firebaseMutations
    },
    actions: {
      async SET_CREDENTIAL ({commit}, { user }) {
        if (!user) return
        await usersRef.child(user.uid).set({
          name: user.displayName,
          email: user.email,
          icon: user.photoURL
        })
        commit('setCredential', { user })
      },
      async INIT_SINGLE ({commit}, { id }) {
        const snapshot = await postsRef.child(id).once('value')
        commit('savePost', { post: snapshot.val() })
      },
      INIT_USERS: firebaseAction(({ bindFirebaseRef }) => {
        bindFirebaseRef('users', usersRef)
      }),
      INIT_POSTS: firebaseAction(({ bindFirebaseRef }) => {
        bindFirebaseRef('posts', postsRef)
      }),
      INIT_CHATS: firebaseAction(({ bindFirebaseRef }) => {
        bindFirebaseRef('chats', chatsRef)
      }),
      ADD_POST: firebaseAction((ctx, { email, body }) => {
        postsRef.push({
          from: email,
          body
        })
      }),
      ADD_COMMENT: firebaseAction((ctx, { userId, body, post }) => {
        chatsRef.child(post).push({
          from: userId,
          body
        })
      }),
      callAuth () {
        firebase.auth().signInWithRedirect(provider)
      }
    }
  })
}

export default createStore
