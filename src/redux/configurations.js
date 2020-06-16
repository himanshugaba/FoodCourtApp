import {createStore, combineReducers, applyMiddleware}  from 'redux'
import {Dish} from './dishes'
import {Comments} from './comments'
import {Leaders} from  './leaders'
import {Promotions} from './promotions'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {createForms} from 'react-redux-form'
import { initialFeedback } from './Forms'



export const ConfigureStore=() =>{
    const store = createStore(
        combineReducers({
            dishes:Dish,
            comments:Comments,
            leaders:Leaders,
            promotions:Promotions,
            ...createForms({
                feedback: initialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    )
    return store
}
