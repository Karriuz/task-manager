//interfaces
import { BooleanGoalStep, NumberGoalStep, TaskGoalStep } from '../../../interfaces';
//styles
import styles from './Steps.module.scss'
//components
import { BooleanStep } from './BooleanStep';
import { NumberStep } from './NumberStep';
import { TaskStep } from './TaskStep';

interface GoalStepsProps {
    steps: (NumberGoalStep | BooleanGoalStep | TaskGoalStep)[] | undefined
}

export const GoalSteps = ({ steps }: GoalStepsProps) => {
    return (
        <table className={styles.gsTable}>
            <caption>Current goal steps</caption>
            <tbody>
                {steps !== undefined && steps.length !== 0
                    ? steps.map(step =>
                        step.type === 'task' ?
                            <TaskStep
                                key={step.id!}
                                step={step}
                            />
                            : step.type === 'number' ?
                                <NumberStep
                                    key={step.id!}
                                    step={step} />
                                : <BooleanStep
                                    key={step.id!}
                                    step={step} />
                    ) :
                    <tr>
                        <td>You have not created any steps yet</td>
                    </tr>}
            </tbody>
        </table>
    );
}