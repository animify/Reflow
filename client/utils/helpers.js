export const checkIntersection = (a, b) => a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom;

export const checkVisible = (rect, canvas) => {
    const { e, f } = canvas.matrix;
    const scale = canvas.scale;
    const canvasBounds = {
        top: (f * -1) / scale,
        left: (e * -1) / scale,
        right: (canvas.innerWidth - e) / scale,
        bottom: (canvas.innerHeight - f) / scale,
    };

    return checkIntersection(canvasBounds, rect);
};

export const scaleWheelDelta = (delta, isCtrl, isMac) => {
    const scrollDiff = delta / (isCtrl && isMac ? 4000 : 1200);
    return 1 + scrollDiff;
};

export const clientPoint = (targetSvg, point, matrix) => {
    const initialPoint = targetSvg.createSVGPoint();
    initialPoint.x = point.x;
    initialPoint.y = point.y;

    return initialPoint.matrixTransform(matrix.inverse());
};

export const getBoundingbox = (entities) => {
    const lefts = [];
    const tops = [];
    const rights = [];
    const bottoms = [];

    entities.forEach((entity) => {
        const bounds = {
            top: entity.position.y,
            left: entity.position.x,
            bottom: entity.position.y + entity.size.h,
            right: entity.position.x + entity.size.w,
        };

        lefts.push(bounds.left);
        tops.push(bounds.top);
        rights.push(bounds.right);
        bottoms.push(bounds.bottom);
    });

    let left = Math.min(...lefts);
    let top = Math.min(...tops);
    let right = Math.max(...rights);
    let bottom = Math.max(...bottoms);

    left = isFinite(left) ? left : 0;
    top = isFinite(top) ? top : 0;
    right = isFinite(right) ? right : 0;
    bottom = isFinite(bottom) ? bottom : 0;

    return {
        left,
        top,
        right,
        bottom,
        width: right - left,
        height: bottom - top,
    };
};


export const generateDiamondPath = (size) => {
    const points = [
        {
            x: size.w / 2,
            y: 0,
        },
        {
            x: size.w,
            y: size.h / 2,
        },
        {
            x: size.w / 2,
            y: size.h,
        },
        {
            x: 0,
            y: size.h / 2,
        },
    ];

    const pointString = points.reduce((str, point) => (str += ` ${point.x},${point.y}`, str), '');

    return `M${pointString} z`;
}
