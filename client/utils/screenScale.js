import { Dimensions, PixelRatio, Platform } from "react-native";

function isScaleFitDesignResolution(factor, screenWidth, screenHeight, designWidth, designHeight) {
    return screenWidth / factor >= designWidth && screenHeight / factor >= designHeight;
}

export default function(screenWidth, screenHeight, designWidth, designHeight) {
    let scaleX = screenWidth / designWidth;
    let scaleY = screenHeight / designHeight;

    const logWidth = Math.log2(scaleX);
    const logHeight = Math.log2(scaleY);
    const t = 0.5;
    const logWeightedAverage = logWidth * (1 - t) + logHeight * t;

    let factor = Math.pow(2, logWeightedAverage);
    if (isScaleFitDesignResolution(factor, screenWidth, screenHeight, designWidth, designHeight)) {
        return factor;
    } else {
        factor = Math.max(scaleX, scaleY);
        if (isScaleFitDesignResolution(factor, screenWidth, screenHeight, designWidth, designHeight)) {
            return factor;
        } else if (isScaleFitDesignResolution(scaleX, screenWidth, screenHeight, designWidth, designHeight)) {
            return scaleX;
        } else if (isScaleFitDesignResolution(scaleY, screenWidth, screenHeight, designWidth, designHeight)) {
            return scaleY;
        }
    }

    return 1;
}
