import { ChangeEvent } from "react"

export type RetrieveInputProps = {
    checked: boolean,
    value: string,
    e: ChangeEvent<HTMLInputElement>
}
const retrieveInput = (e: ChangeEvent<HTMLInputElement>): RetrieveInputProps => {
    const { checked, value: _value } = e.currentTarget
    const name = e.currentTarget.getAttribute('name') as string
    let value: any = {}
    value[name] = _value
    return {
        checked,
        value,
        e,
    }
}

export {
    retrieveInput
}