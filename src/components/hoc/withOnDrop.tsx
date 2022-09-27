//interfaces
import { ElementType } from 'react';
import { Status } from '../../interfaces';
//hooks
import { useRef } from 'react'
import { useDb } from '../../hooks/useDb'
//styles
import styles from './DragAndDrop.module.scss';

interface withOnDropProps {
    status: Status
}

export const withOnDrop = (WrappedComponent: ElementType) => ({ status, ...props }: withOnDropProps) => {
    const ref = useRef<HTMLElement>(null)
    const { updateDocument } = useDb('tasks')

    const debounceDragOver = (() => {
        let timeout: NodeJS.Timeout
        return () => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                ref.current?.classList.remove(styles.dragOver)
            }, 150)
        }
    })()

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        ref.current?.classList.add(styles.dragOver)
        debounceDragOver()
    }

    const handleDrop = (e: React.DragEvent) => {
        try {
            const task = JSON.parse(e.dataTransfer.getData('text/json'))
            if (status.name !== task.status) {
                updateDocument(task.id, { statusId: status.id! })
            }
            ref.current?.classList.remove(styles.dragOver)
        } catch (e) {
            ref.current?.classList.remove(styles.dragOver)
        }
    }

    return <WrappedComponent
        ref={ref}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        status={status}
        {...props}
    />
}
