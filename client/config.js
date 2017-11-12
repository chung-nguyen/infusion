import { Dimensions, PixelRatio, Platform } from "react-native";
import screenScale from "./utils/screenScale";

const isIOS = Platform.os === "ios";

const screen = Dimensions.get("window");

const UI_SCALE = screenScale(screen.width * screen.scale, screen.height * screen.scale, 768, 1280) / screen.scale;

const PASSWORD_SECRET = "r2JtLVFQFrk9jCZRkpYbgBc8xaY97Hbc";

export default {
    isIOS,

    UI_SCALE,

    SCREEN_WIDTH: screen.width / UI_SCALE,
    SCREEN_HEIGHT: screen.height / UI_SCALE,

    REAL_SCREEN_WIDTH: screen.width * screen.scale,
    REAL_SCREEN_HEIGHT: screen.height * screen.scale,

    PASSWORD_SECRET,

    GENERIC_FONT: "Myriad Pro"
};
