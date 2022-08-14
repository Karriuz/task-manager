
//interfaces
import { Status } from '../../interfaces'

//components
import Layout from "../../components/Layout/Layout";
import AddStatusForm from "../../components/Forms/AddStatusForm";
import AnimatedPopover from "../../components/AnimatedPopover/AnimatedPopover";
import TaskTable from './TaskTable'
import useDataContext from '../../hooks/useDataContext';
import styles from './ToDo.module.scss'

const TodoPage = () => {
    const { tasks, statuses, selectedSpace } = useDataContext()

    return (
        <Layout title='To-Do List'>
            <div className={styles.newStatusContainer}>
                <AnimatedPopover buttonClass={styles.newStatusButton} buttonText="ADD NEW STATUS">
                    <AddStatusForm />
                </AnimatedPopover>
            </div>
            {selectedSpace ? tasks && statuses && statuses.map((status: Status) =>
                <TaskTable
                    key={status.id}
                    status={status}
                    tasks={tasks}
                    statuses={statuses}
                    selectedSpace={selectedSpace}
                />) :
                <>Create at least one space to add new tasks!</>
            }
        </Layout>
    );
}

export default TodoPage;