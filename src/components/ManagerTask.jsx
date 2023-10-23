import React from 'react'
import { nanoid } from 'nanoid'

export default function ManagerTask(props) {

    const {manager} = props;

    return (
        <div className="task" key={nanoid()}>
            <span>{manager.name}</span>
            <span>
                {manager.tasks.length === 0
                ? "No tasks"
                : `${manager.tasks.length}/5`}
            </span>
        </div>
    )
}
