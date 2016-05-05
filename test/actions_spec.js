import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../src/js/actions'
import * as types from '../src/js/action_type'
import nock from 'nock'
import { expect } from 'chai'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
describe('Test actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  it('create FETCH_INFO when fetching anthor information has been done', () => {
    const anchorId = 'anchorId'
    const store = mockStore({})
    return store.dispatch(actions.fetchInfo(anchorId))
      .then(() => {
        expect(store.getActions()[0].type).to.equal(types.FETCH_INFO)
        expect(store.getActions()[0].data.status).to.equal('success')
      })
  })
  it('create FETCH_HOT when fetching hot videos have been done', () => {
    const store = mockStore({})
    return store.dispatch(actions.fetchHot())
      .then(() => {
        expect(store.getActions()[0].type).to.equal(types.FETCH_HOT)
        expect(store.getActions()[0].videos.length).to.not.equal(0)
      })
  })
  // it('create SET_CONNECTION_STATE and set it to true when connection has been created', () => {
  //   const 
  // })

})