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
  it('create FETCH_INIT_INFO when fetching initial infomation have been done', () => {
    const roomId = 'roomId'
    const videoId = 'videoId'
    nock('http://luobodispatch.v.163.com')
      .get('/api/center/loginserver/distributeAnony')
      .query({
        roomId,
        videoId,
        callback: 'jsonp_init'
      })
      .reply(200, 'jsonp_init({ "data": { "status": "success" }})')
    const store = mockStore({})
    return store.dispatch(actions.fetchInitInfo(roomId, videoId))
      .then(() => {
        expect(store.getActions()[0].type).to.equal(types.FETCH_INIT_INFO)
        expect(store.getActions()[0].room.status).to.equal('success')
      })
  })
  it('create FETCH_INFO when fetching room information has been done', () => {
    const ids = {
      videoId: 'videoId',
      roomId: 'roomId',
      anchorId: 'userId',
      type: 'type'
    }
    nock('http://luoboapi.v.163.com')
      .get('/api/web/beforeEnterWebRoom')
      .query({
        videoId: 'videoId',
        roomId: 'roomId',
        userId: 'userId',
        type: 'type',
        callback: 'jsonp_room'
      })
      .reply(200, 'jsonp_room({ "result": { "status": "success" }})')
    const store = mockStore({})
    return store.dispatch(actions.fetchInfo(ids))
      .then(() => {
        expect(store.getActions()[0].type).to.equal(types.FETCH_INFO)
        expect(store.getActions()[0].info.status).to.equal('success')
      })
  })
  it('create FETCH_HOT when fetching hot videos have been done', () => {
    nock('http://luoboapi.v.163.com')
      .get('/api/web/list/hotwebVideos')
      .query({ 
        num: 10,
        currpage: 1,
        callback: 'jsonp_hot'
      })
      .reply(200, 'jsonp_hot({"result": {videos: [{a: 1}]}})')
    const store = mockStore({})
    return store.dispatch(actions.fetchHot())
      .then(() => {
        expect(store.getActions()[0].type).to.equal(types.FETCH_HOT)
        expect(store.getActions()[0].videos.length).to.not.equal(0)
      })
  })

})