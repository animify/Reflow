const pointsToD = (p) => {
    let d = '';
    let i = 0;
    let firstPoint;

    p.forEach((point) => {
        const { moveTo, x, y } = point;
        const isFirstPoint = i === 0 || moveTo;
        const isLastPoint = i === p.length - 1 || p[i + 1].moveTo;
        const prevPoint = i === 0 ? null : p[i - 1];

        if (isFirstPoint) {
            firstPoint = point;

            if (!isLastPoint) {
                d += `M${x},${y}`;
            }
        } else if (isLastPoint && x === firstPoint.x && y === firstPoint.y) {
            d += 'Z';
        } else if (x !== prevPoint.x && y !== prevPoint.y) {
            d += `L${x},${y}`;
        } else if (x !== prevPoint.x) {
            d += `H${x}`;
        } else if (y !== prevPoint.y) {
            d += `V${y}`;
        }

        i++;
    });

    return d;
};

const toPath = s => pointsToD(s);

export default toPath;
