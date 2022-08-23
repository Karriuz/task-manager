import { Status, Task } from "../../interfaces";
import styles from './Kanban.module.scss'
import TaskCard from "./TaskCard";
import StatusOrderChangeBtn from '../../components/ui/StatusOrderChangeBtn/StatusOrderChangeBtn'
import { useState } from "react";
import StatusDeleteBtn from '../../components/ui/StatusDeleteBtn/StatusDeleteBtn'
import AnimatedPopover from '../../components/AnimatedPopover/AnimatedPopover'
import AddTaskForm from '../../components/forms/AddTaskForm/AddTaskForm'
import DropToContainer from "../../components/DragAndDrop/DropToContainer/DropToContainer";
import StatusHideBtn from "../../components/ui/StatusHideBtn/StatusHideBtn";

interface StatusSectionProps {
    status: Status
    tasks: Task[]
}

const StatusSection = ({ status, tasks }: StatusSectionProps) => {
    const filteredTasks = tasks.filter((i: Task) => i.status === status.name)
    const [showSection, setShowSection] = useState(true)

    return (
        <>
            {showSection ?
                <section className={styles.section}>
                    <div className={styles.sectionHeader} style={{ backgroundColor: status.color }}>
                        <div>
                            <StatusHideBtn setShowStatus={setShowSection} showStatus={showSection} />
                            <StatusOrderChangeBtn variant='left' elemId={status.id!} current={status} />
                        </div>
                        <h2>{status.name}</h2>
                        <div>
                            <StatusDeleteBtn
                                status={status}
                                filteredTasks={filteredTasks}
                            />
                            <StatusOrderChangeBtn variant='right' elemId={status.id!} current={status} />
                        </div>
                    </div>
                    <>
                        <AnimatedPopover buttonClass={styles.addTaskBtn} buttonText='Add new task'>
                            <AddTaskForm
                                direction='column'
                                position='relative'
                                defaultStatus={status}
                            />
                        </AnimatedPopover>
                        <DropToContainer
                            Parent='div'
                            status={status}
                            parentStyles={styles.taskContainer}
                        >
                            {filteredTasks.map(task => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                />
                            ))}
                        </DropToContainer>
                    </>
                </section > :
                <section className={`${styles.section} ${styles.sectionHidden}`} style={{ backgroundColor: status.color }}>
                    <StatusHideBtn showStatus={showSection} setShowStatus={setShowSection} />
                </section>
            }
        </>
    );
}

export default StatusSection;