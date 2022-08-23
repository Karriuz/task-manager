import { FormEvent, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout/Layout";
import useDb from "../../hooks/useDb";
import styles from './NewGoal.module.scss'
import AddStep from "../../components/AddStep/AddStep";
import GoalSteps from "../../components/GoalSteps/GoalSteps";
import { BooleanGoalStep, Goal, GoalStep, NumberGoalStep, TaskGoalStep } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import { DocumentReference } from "firebase/firestore";
import useDataContext from "../../hooks/useDataContext";

const NewGoal = () => {
    const navigate = useNavigate()
    const { addDocument: addGoal } = useDb('goals')
    const { addDocument: addGoalStep } = useDb('goalSteps')

    const [title, setTitle] = useState('New Goal')
    const [goalRef, setGoalRef] = useState<DocumentReference<any> | null>(null)
    const { tasks } = useDataContext()
    const [description, setDescription] = useState('')
    const [steps, setSteps] = useState<(NumberGoalStep | BooleanGoalStep | TaskGoalStep)[]>([])

    const addStep = (step: NumberGoalStep | BooleanGoalStep | TaskGoalStep) => {
        setSteps(current => [...current, { ...step, id: steps.length.toString() }])
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const newGoal: Goal = {
            title: title,
            description: description
        }
        addGoal(newGoal).then(ref => ref && setGoalRef(ref))
    }

    useEffect(() => {
        if (goalRef) {
            steps.forEach(step => { delete step.id; addGoalStep({ ...step, goalID: goalRef.id }) })
            navigate(-1)
        }
    }, [goalRef])


    return (
        <Layout title={'Goals'} spaceSelect={false}>
            <form className={styles.addGoalForm} id='newGoalForm' onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        className={`${styles.formInput} ${styles.goalTitle}`}
                        type="text"
                        maxLength={25}
                        required
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </label>
                <label>
                    Description: (optional)
                    <input className={styles.formInput} type="text" maxLength={200} value={description} onChange={(e) => { setDescription(e.target.value) }} />
                </label>
                <GoalSteps steps={steps} tasks={tasks} />
            </form>
            <AddStep addStepToNewGoal={addStep} />
            <button className={styles.submitButton} type='submit' form='newGoalForm'>Save new goal</button>
        </Layout>
    );
}

export default NewGoal;