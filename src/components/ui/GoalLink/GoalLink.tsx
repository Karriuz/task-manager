import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useDataContext from "../../../hooks/useDataContext";
import { BooleanGoalStep, Goal, NumberGoalStep, TaskGoalStep } from "../../../interfaces";
import { getGoalStepProgess } from "../../../utils/getGoalStepProgress";
import styles from './GoalLink.module.scss'

interface GoalLinkProps {
    goal: Goal
}

const drawCircle = (color: string, percent: number, ctx: CanvasRenderingContext2D) => {
    percent = Math.min(Math.max(0, percent), 1)
    ctx.beginPath()
    ctx.arc(0, 0, 53.5, 0, Math.PI * 2 * percent, false)
    ctx.strokeStyle = color
    ctx.lineCap = 'round'
    ctx.lineWidth = 5
    ctx.stroke()
}

const GoalLink = ({ goal }: GoalLinkProps) => {
    const { goalSteps } = useDataContext()
    const steps = goalSteps && goalSteps.filter(gs => gs.goalID === goal.id!)
    const goalProgress = steps ? getGoalStepProgess(steps) : 0
    const canvas = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvas.current) return
        canvas.current.width = canvas.current.height = 112
        const ctx = canvas.current.getContext('2d')!
        ctx.translate(112 / 2, 112 / 2)
        ctx.rotate(-0.5 * Math.PI)
        drawCircle('#e5e7eb', 100 / 100, ctx);
        drawCircle('#86efac', goalProgress / 100, ctx);
    }, [])

    return (
        <Link
            to={`../../Goals/${goal.id}`}
            key={goal.id}
            aria-label={`Go to ${goal.title} goal page`}
            className={styles.link}>
            <h3>{goal.title}</h3>
            <div
                className={styles.goalProgressCircle}
                style={{}}>
                <span>
                    {goalProgress.toFixed()}%
                </span>
                <canvas ref={canvas} />
            </div>
        </Link>
    );
}
export default GoalLink;
