import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '~/plugins/firebase'
import { firebaseMutations, firebaseAction } from 'vuexfire'
const db = firebase.database()
const usersRef = db.ref('/users')
const issuesRef = db.ref('/issues')
const messagesRef = db.ref('/messages')
const provider = new firebase.auth.TwitterAuthProvider()

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      issue: null,
      users: [],
      issues: [],
      messages: {}
    },
    getters: {
      issues: state => {
        return state.issues.map((issue) => {
          issue.user = state.users.find((user) => user['.key'] === issue.from)
          return issue
        }).reverse()
      },
      issue: state => {
        const issue = state.issue
        if (!issue) return null
        issue.user = state.users.find((user) => user['.key'] === issue.from)
        return issue
      },
      users: state => state.users,
      user: state => state.user,
      messages: state => id => {
        if (!state.messages[id]) return null
        return Object.keys(state.messages[id]).map((key) => {
          const message = state.messages[id][key]
          message.user = state.users.find((user) => user['.key'] === message.from)
          return message
        })
      },
      message: state => {
        const message = state.message
        if (!message) return null
        message.user = state.users.find((user) => user['.key'] === message.from)
      }
    },
    mutations: {
      setCredential (state, { user }) {
        state.user = user
      },
      saveIssue (state, { issue }) {
        state.issue = issue
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
        const snapshot = await issuesRef.child(id).once('value')
        commit('saveIssue', { issue: {...snapshot.val(), '.key': id} })
      },
      INIT_USERS: firebaseAction(({ bindFirebaseRef }) => {
        bindFirebaseRef('users', usersRef)
      }),
      INIT_ISSUES: firebaseAction(({ bindFirebaseRef }) => {
        bindFirebaseRef('issues', issuesRef)
      }),
      INIT_MESSAGES: firebaseAction(({ bindFirebaseRef }) => {
        bindFirebaseRef('messages', messagesRef)
      }),
      ADD_ISSUE: firebaseAction((ctx, { userId, body }) => {
        issuesRef.push({
          from: userId,
          body
        })
      }),
      ADD_MESSAGE: firebaseAction((ctx, { userId, body, issueId }) => {
        messagesRef.child(issueId).push({
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
