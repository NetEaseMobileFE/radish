import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../src/js/actions'
import * as types from '../src/js/constants'
import nock from 'nock'
import { expect } from 'chai'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
describe('Test actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  it('create FETCH_ANCHOR when fetching anthor information has been done', () => {
    const anchorId = 'anchorId'
    const expectedActions = [{
      type: types.FETCH_ANCHOR,
      anchorId
    }]
    const store = mockStore({})
    return store.dispatch(actions.fetchAnchor(anchorId))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions)
      })
  })
})