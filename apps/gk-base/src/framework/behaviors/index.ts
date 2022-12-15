import {EGoalType, Goal} from '../Goal';
import Arrive from './Arrive';
import Seek from './Seek';

// add behaviors here
const registry = {
    [EGoalType.toSeekAgent]: Seek,
    [EGoalType.toArriveAgent]: Arrive,
};

export const calculate2DBehavior = (...args) => {
    const goal = args[0];
    try {
        const cls = registry[goal._type];
        return cls.calculate2D(...args);
    } catch (error) {
        console.error(error);
    }
};

export const calculate3DBehavior = (...args) => {
    const goal = args[0];
    try {
        const cls = registry[goal._type];
        return cls.calculate3D(...args);
    } catch (error) {
        console.error(error);
    }
};
