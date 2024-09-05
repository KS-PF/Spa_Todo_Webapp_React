import { FC, memo } from 'react';
import classes from "./priorityStatus.module.css";

const priorityMap = [
    '',
    '低い',
    '普通',
    '高い',
    '緊急',
];

type Props = {
    priority: number
}

export const PriorityStatusCss:FC<Props> = memo((props) => {
    let { priority } = props;
    if(priority < 0 || priority > 4){
        priority = 2
    }

    return (
        <>
        { 
            (priority === 1 ) ? (
                <span className={`${classes.priority} ${classes.p1}`}>
                    {priorityMap[1] }
                </span>
            ) : (priority === 2 ) ? (
                <span className={`${classes.priority} ${classes.p2}`}>
                    {priorityMap[2] }
                </span>
            ) : (priority === 3 ) ? (
                <span className={`${classes.priority} ${classes.p3}`}>
                    {priorityMap[3] }
                </span>
            ) : (priority === 4 ) ? (
                <span className={`${classes.priority} ${classes.p4}`}>
                    {priorityMap[4] }
                </span>
            ) : null
        }
    </>
    );
});