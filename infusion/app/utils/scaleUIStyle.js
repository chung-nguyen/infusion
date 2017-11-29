import config from '../config';

const scalableValues = [
    'top', 'left', 'right', 'bottom', 'width', 'height',
    'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'marginHorizontal', 'marginVertical',
    'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingHorizontal', 'paddingVertical',
    'borderRadius'
];

const scalableIntegerValues = ['lineHeight', 'fontSize'];

export function scaleStyleSheet(styles) {
    for (const k in styles) {
        scaleStyle(styles[k]);
    }

    return styles;
}

export function scaleStyle(style) {
    for (const v in style) {
        if (style[v] != null) {
            if (scalableValues.indexOf(v) >= 0) {
                style[v] = style[v] * config.UI_SCALE;
            } else if (scalableIntegerValues.indexOf(v) >= 0) {
                style[v] = Math.floor(style[v] * config.UI_SCALE);
            }
        }        
    }

    return style;
}
