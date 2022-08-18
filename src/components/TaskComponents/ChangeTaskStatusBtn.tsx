import React from 'react';
import useDataContext from '../../hooks/useDataContext';
import useDb from '../../hooks/useDb';
import { Task } from '../../interfaces';
import AnimatedPopover from '../AnimatedPopover/AnimatedPopover'
import styles from './ChangeTaskStatusBtn.module.scss'

interface ChangeTaskStatusBtnProps {
    task: Task
}

const ChangeTaskStatusBtn = ({ task }: ChangeTaskStatusBtnProps) => {
    const { updateDocument, res } = useDb('tasks') // handle error res here
    const { statuses } = useDataContext()
    const btnColor = statuses.filter(status => status.name === task.status)[0].color

    const handleStatusChange = (status: string) => {
        if (status !== task.status) {
            updateDocument(task.id!, { status: status })
            document.body.focus()
            document.body.click()
        }
    }

    return (
        <AnimatedPopover buttonClass={styles.outsideBtn} buttonColor={btnColor}>
            <div className={styles.container}>
                {statuses.map(({ name, color, id }) => (
                    <button
                        key={id}
                        onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleStatusChange(name) }}
                        style={{ backgroundColor: color }}>
                        {name}
                    </button>
                ))}
            </div>
        </AnimatedPopover>
    );
}

export default ChangeTaskStatusBtn;