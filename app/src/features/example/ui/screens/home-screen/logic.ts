import { UILogic, UIEvent, IncomingUIEvent, UIMutation } from "ui-logic-core"

export interface State {
    addressBarText: string
    currentUrl: string
}

export type Event = UIEvent<{
    setCurrentUrl : { url : string }
    setAddressBarText : { text : string }
}>

export default class Logic extends UILogic<State, Event> {
    static DEF_URL = 'https://duckduckgo.com'

    getInitialState() {
        return {
            currentUrl: Logic.DEF_URL,
            addressBarText: Logic.DEF_URL,
        }
    }

    setAddressBarText(incoming : IncomingUIEvent<State, Event, 'setAddressBarText'>) : UIMutation<State> {
        return { addressBarText: { $set: incoming.event.text } }
    }

    setCurrentUrl(incoming : IncomingUIEvent<State, Event, 'setCurrentUrl'>) : UIMutation<State> {
        return { currentUrl: { $set: incoming.event.url } }
    }
}
