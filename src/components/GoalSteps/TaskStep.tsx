import dayjs from "dayjs";
import { useEffect, useState } from "react";
import useDataContext from "../../hooks/useDataContext";
import useDb from "../../hooks/useDb";
import { BooleanGoalStep, GoalStep, NumberGoalStep, Task, TaskGoalStep } from "../../interfaces";
import ChangeTaskPrioBtn from "../TaskComponents/ChangeTaskPrioBtn";
import ChangeTaskStatusBtn from "../TaskComponents/ChangeTaskStatusBtn";
import DeleteTaskBtn from "../TaskComponents/DeleteTaskBtn";
import GoalStepCheckbox from "../Inputs/GoalStepCheckbox";
import styles from './Steps.module.scss'

interface TaskStepProps {
    step: NumberGoalStep | BooleanGoalStep | TaskGoalStep
    task: Task
}

const TaskStep = ({ step, task }: TaskStepProps) => {
    return (
        <>{task && <tr>
            <td className={styles.smallCell}>
                <GoalStepCheckbox goalStep={step} />
            </td>
            <td>
                <ChangeTaskStatusBtn task={task} />
            </td>
            <td className={styles.descriptionCell}>
                {task.description}
            </td>
            <td>
                {task.dueDate ? dayjs.unix(task.dueDate).format('DD/MM') : '-/-'}
            </td>
            <td className={styles.smallCell}>
                <ChangeTaskPrioBtn task={task} />
            </td>
            <td className={styles.smallCell}>
                <DeleteTaskBtn task={task} goalStep={step} />
            </td>
        </tr>}</>
    );
}

export default TaskStep;