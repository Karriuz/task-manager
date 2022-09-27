import { forwardRef, useState, ComponentPropsWithoutRef } from 'react'
import { useDataContext } from '../../hooks/useDataContext'
//interfaces
import { Status, Task } from '../../interfaces'
//styles
import styles from './List.module.scss'
//components
import { withOnDrop } from '../../components/hoc/withOnDrop'
import { AnimatedPopover } from '../../components/AnimatedPopover/AnimatedPopover'
import { AddTaskForm } from '../../components/forms/AddTaskForm/AddTaskForm'
import { StatusOrderChangeBtn } from '../../components/ui/StatusOrderChangeBtn/StatusOrderChangeBtn'
import { StatusDeleteModal } from '../../components/ui/StatusDeleteModal/StatusDeleteModal'
import { StatusHideBtn } from '../../components/ui/StatusHideBtn/StatusHideBtn'
import { DraggableLinkTaskTableItem } from '../../components/TaskTableItem/TaskTableItem'

interface TaskTableProps {
    status: Status
}

const TaskTable = forwardRef(({ status, ...props }: TaskTableProps & ComponentPropsWithoutRef<'table'>, ref) => {
    const { tasks } = useDataContext()
    const [showTable, setShowTable] = useState(true)
    const statusTasks = tasks?.filter((i: Task) => i.statusId === status.id)

    return (
        <table className={styles.listContainer} ref={ref as React.LegacyRef<HTMLTableElement>} {...props}>
            <caption>
                <StatusHideBtn showStatus={showTable} setShowStatus={setShowTable} />
                <span
                    className={styles.statusText}
                    style={{ backgroundColor: status.color }}>
                    {status.name.toUpperCase()}
                </span>
                <AnimatedPopover
                    className={styles.addTaskBtn}
                    buttonText='+'
                    aria-label='Click to open window where you can add new task'
                    type='button'
                >
                    <AddTaskForm
                        className={styles.addTaskForm}
                        defaultStatus={status}
                    />
                </AnimatedPopover>
            </caption>
            <tbody>
                <tr>
                    <th colSpan={2} aria-hidden='true' />
                    <th className={`${styles.thDueDate} ${styles.smallCell}`}>
                        Due:
                    </th>
                    <th className={styles.smallCell}>
                        <StatusOrderChangeBtn
                            variant='up'
                            elemId={status.id!}
                            current={status}
                        />
                        <StatusOrderChangeBtn
                            variant='down'
                            elemId={status.id!}
                            current={status} />
                    </th>
                    <th className={styles.smallCell}>
                        <StatusDeleteModal status={status} />
                    </th>
                </tr>
                {showTable ? <>
                    {!statusTasks || statusTasks.length === 0 ?
                        <tr>
                            <td
                                className={styles.noTasks}
                                colSpan={5}>
                                No tasks
                            </td>
                        </tr>
                        : statusTasks.map((task: Task) => (
                            <DraggableLinkTaskTableItem key={task.id} task={task} />
                        ))}</>
                    :
                    <tr>
                        <td
                            colSpan={5}
                            className={styles.hiddenTableCell} />
                    </tr>}
            </tbody>
        </table >
    );
})

export const DropToTaskTable = withOnDrop(TaskTable)
