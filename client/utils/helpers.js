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

