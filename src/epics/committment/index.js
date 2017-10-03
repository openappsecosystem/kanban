import Rx from 'rxjs'
import { combineEpics } from 'redux-observable';
// import {
//   mineActionType,
//   rechargeActionType,
//   isMining,
//   isRecharging,
//   isNotMining,
//   isNotRecharging,
//   mineError,
//   rechargeError
// } from '../../actions/tabacchi'

export const createCommittmentEpic = (action$, store) => 'ciao'
//   action$
//     .ofType(mineActionType())
//     .mergeMap(() => mine()
//         .mapTo(isNotMining())
//         .catch(error => Rx.Observable.of(
//           mineError(error),
//           isNotMining()
//         ))
//         .startWith(isMining())
//       )


export const editCommittmentNameEpic = (action$, store) => 'ciao'
//  action$
    // .ofType(rechargeActionType())
    // .mergeMap(() => recharge()
    //     .mapTo(isNotRecharging())
    //     .catch(error => Rx.Observable.of(
    //       rechargeError(error),
    //       isNotRecharging()
    //     ))
    //     .startWith(isRecharging())
    //   )


export default combineEpics(createCommittmentEpic, editCommittmentNameEpic)
