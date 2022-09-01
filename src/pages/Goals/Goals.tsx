import { Link } from 'react-router-dom';
import GoalLink from '../../components/ui/GoalLink/GoalLink';
import Layout from '../../components/Layout/Layout/Layout'
import useDataContext from '../../hooks/useDataContext';
import styles from './Goals.module.scss'

const Goals = () => {
    const { goals, goalSteps } = useDataContext()

    return (
        <Layout title='Goals' showSpaceSelect={false}>
            <div className={styles.container}>
                <h2 className={styles.subtitle}>Break your goals into small targets, track their progress and make your dreams come true!</h2>
                <section className={styles.goalList}>
                    {goals?.map(goal =>
                        <GoalLink
                            key={goal.id}
                            goal={goal}
                            steps={goalSteps?.filter(gs => gs.goalID === goal.id)}
                        />)}
                    <Link to='NewGoal' className={styles.newGoalLink}>Create new goal</Link>
                </section>
            </div>
        </Layout>
    );
}

export default Goals;