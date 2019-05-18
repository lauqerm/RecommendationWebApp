import React, { ReactChild } from 'react'

type GenericCardProps = {
    children?: ReactChild | ReactChild[],
    type: 'error' | 'success' | 'danger'
}
export type CardProps = {
    children: ReactChild | ReactChild[],
}
const $Card = (props: GenericCardProps) => {
    const { children, type } = props
    let _type
    switch (type) {
        case 'error': _type = 'danger'; break
        default: _type = type
    }

    return <div className={`text-${_type}`}>
        {children}
    </div>
}

export const Card = {
    Error: (props: CardProps) => <$Card type="danger">{props.children}</$Card>,
    Danger: (props: CardProps) => <$Card type="danger">{props.children}</$Card>,
    Success: (props: CardProps) => <$Card type="success">{props.children}</$Card>
}