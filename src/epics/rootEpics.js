import { combineEpics, createEpicMiddleware} from 'redux-observable'
import committment from './committment'


export const rootEpic = combineEpics(
  committment
)
