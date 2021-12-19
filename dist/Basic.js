// react:
import { default as React, useState, } from 'react'; // base technology of our nodestrap components
import { 
// compositions:
composition, mainComposition, imports, 
// layouts:
layout, vars, 
// rules:
variants, states, rule, 
// utilities:
solidBackg, pascalCase, } from '@cssfn/cssfn'; // cssfn core
import { 
// hooks:
createUseSheet, } from '@cssfn/react-cssfn'; // cssfn for react
import { createCssVar, fallbacks, } from '@cssfn/css-var'; // Declares & retrieves *css variables* (css custom properties).
import { createCssConfig, 
// utilities:
usesGeneralProps, usesSuffixedProps, overwriteProps, } from '@cssfn/css-config'; // Stores & retrieves configuration using *css custom properties* (css variables)
// nodestrap utilities:
import { colors, themes as colorThemes, } from '@nodestrap/colors'; // configurable colors & theming defs
import { borders, borderRadiuses, } from '@nodestrap/borders'; // configurable borders & border radiuses defs
import spacers from '@nodestrap/spacers'; // configurable spaces defs
import typos from '@nodestrap/typos'; // configurable typography (texting) defs
// nodestrap components:
import { Element, } from '@nodestrap/element';
const [sizeRefs, sizeDecls] = createCssVar();
export const isSize = (sizeName, styles) => rule(`.sz${pascalCase(sizeName)}`, styles);
/**
 * Uses basic sizes.
 * For example: `sm`, `lg`.
 * @param factory Customize the callback to create sizing definitions for each size in `options`.
 * @param options Customize the size options.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents sizing definitions for each size in `options`.
 */
export const usesSizeVariant = (factory = sizeOf, options = sizeOptions()) => {
    return [
        () => composition([
            variants([
                options.map((sizeName) => isSize(sizeName, factory(sizeName))),
            ]),
        ]),
        sizeRefs,
        sizeDecls,
    ];
};
/**
 * Creates sizing definitions for the given `sizeName`.
 * @param sizeName The given size name written in camel case.
 * @returns A `StyleCollection` represents sizing definitions for the given `sizeName`.
 */
export const sizeOf = (sizeName) => composition([
    layout({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }),
]);
/**
 * Gets the all available size options.
 * @returns A `SizeName[]` represents the all available size options.
 */
export const sizeOptions = () => ['sm', 'lg'];
export const useSizeVariant = (props) => {
    const sizeName = props.size;
    return {
        class: sizeName ? `sz${pascalCase(sizeName)}` : null,
    };
};
export const defaultBlockOrientationRuleOptions = { defaultOrientation: 'block' };
export const defaultInlineOrientationRuleOptions = { defaultOrientation: 'inline' };
export const normalizeOrientationRule = (options, defaultOptions) => {
    const defaultOrientation = options?.defaultOrientation ?? defaultOptions.defaultOrientation ?? 'block';
    const orientationBlockSelector = options?.orientationBlockSelector ?? defaultOptions.orientationBlockSelector ?? ((defaultOrientation === 'block') ? ':not(.inline)' : '.block');
    const orientationInlineSelector = options?.orientationInlineSelector ?? defaultOptions.orientationInlineSelector ?? ((defaultOrientation === 'inline') ? ':not(.block)' : '.inline');
    return {
        ...options,
        defaultOrientation,
        orientationBlockSelector,
        orientationInlineSelector,
    };
};
export const usesOrientationRule = (options) => {
    // options:
    const { orientationBlockSelector, orientationInlineSelector, } = normalizeOrientationRule(options, { defaultOrientation: 'block' });
    return [
        orientationBlockSelector,
        orientationInlineSelector,
    ];
};
export const useOrientationVariant = (props) => {
    return {
        class: props.orientation ? props.orientation : null,
    };
};
//#endregion orientation
//#region nude
export const notNude = (styles) => rule(':not(.nude)', styles);
export const isNude = (styles) => rule('.nude', styles);
export const usesNudeVariant = () => {
    // dependencies:
    // borders:
    const [, , borderStrokeDecls] = usesBorderStroke();
    // const [, , borderRadiusDecls] = usesBorderRadius();
    // spacings:
    const [, , paddingDecls] = usesPadding();
    return composition([
        variants([
            isNude([
                layout({
                    // backgrounds:
                    backg: 'none !important',
                    // borders:
                    [borderStrokeDecls.borderWidth]: '0px',
                    // // remove rounded corners on top:
                    // [borderRadiusDecls.borderStartStartRadius] : '0px', // do not discard borderRadius, causing boxShadow looks weird
                    // [borderRadiusDecls.borderStartEndRadius  ] : '0px', // do not discard borderRadius, causing boxShadow looks weird
                    // // remove rounded corners on bottom:
                    // [borderRadiusDecls.borderEndStartRadius  ] : '0px', // do not discard borderRadius, causing boxShadow looks weird
                    // [borderRadiusDecls.borderEndEndRadius    ] : '0px', // do not discard borderRadius, causing boxShadow looks weird
                    // spacings:
                    [paddingDecls.paddingInline]: '0px',
                    [paddingDecls.paddingBlock]: '0px', // discard padding
                }),
            ]),
        ]),
    ]);
};
export const useNudeVariant = (props) => {
    return {
        class: props.nude ? 'nude' : null,
    };
};
const [themeRefs, themeDecls] = createCssVar();
export const isTheme = (themeName, styles) => rule(`.th${pascalCase(themeName)}`, styles);
/**
 * Uses theme colors.
 * For example: `primary`, `secondary`, `danger`, `success`, etc.
 * @param factory Customize the callback to create color definitions for each color in `options`.
 * @param options Customize the color options.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents color definitions for each color in `options`.
 */
export const usesThemeVariant = (factory = themeOf, options = themeOptions()) => {
    return [
        () => composition([
            variants([
                options.map((themeName) => isTheme(themeName, factory(themeName))),
            ]),
        ]),
        themeRefs,
        themeDecls,
    ];
};
/**
 * Creates color definitions for the given `themeName`.
 * @param themeName The given theme name written in camel case.
 * @returns A `StyleCollection` represents color definitions for the given `themeName`.
 */
export const themeOf = (themeName) => composition([
    vars({
        [themeDecls.foreg]: colors[`${themeName}Text`],
        [themeDecls.backg]: colors[themeName],
        [themeDecls.border]: colors[`${themeName}Bold`],
        [themeDecls.foregOutlined]: themeRefs.backg,
        [themeDecls.foregMild]: themeRefs.border,
        [themeDecls.backgMild]: colors[`${themeName}Mild`],
        [themeDecls.focus]: colors[`${themeName}Thin`], // 50% transparency of base color
    }),
]);
/**
 * Gets the all available theme options.
 * @returns A `ThemeName[]` represents the all available theme options.
 */
export const themeOptions = () => Object.keys(colorThemes);
/**
 * Creates the default color definitions for unspecified `themeName`.
 * @param themeName The theme name as the default, written in camel case -or- `null`.
 * @returns A `StyleCollection` represents color definitions for the default `themeName`.
 */
export const usesThemeDefault = (themeName = null) => {
    return usesThemeCond(themeName);
};
/**
 * Creates a conditional color definitions for the given `themeName`.
 * @param themeName The given theme name written in camel case -or- `null` to keep the current theme.
 * @returns A `StyleCollection` represents the conditional color definitions for the given `themeName`.
 */
export const usesThemeCond = (themeName) => composition([
    vars({
        [themeDecls.foregCond]: !themeName ? null : colors[`${themeName}Text`],
        [themeDecls.backgCond]: !themeName ? null : colors[themeName],
        [themeDecls.borderCond]: !themeName ? null : colors[`${themeName}Bold`],
        [themeDecls.foregOutlinedCond]: !themeName ? null : themeRefs.backgCond,
        [themeDecls.foregMildCond]: !themeName ? null : themeRefs.borderCond,
        [themeDecls.backgMildCond]: !themeName ? null : colors[`${themeName}Mild`],
        [themeDecls.focusCond]: !themeName ? null : colors[`${themeName}Thin`], // 50% transparency of base color
    }),
]);
/**
 * Creates an important conditional color definitions for the given `themeName`.
 * @param themeName The given theme name written in camel case -or- `null` to keep the current theme.
 * @returns A `StyleCollection` represents the important conditional color definitions for the given `themeName`.
 */
export const usesThemeImpt = (themeName) => composition([
    vars({
        [themeDecls.foregImpt]: !themeName ? null : colors[`${themeName}Text`],
        [themeDecls.backgImpt]: !themeName ? null : colors[themeName],
        [themeDecls.borderImpt]: !themeName ? null : colors[`${themeName}Bold`],
        [themeDecls.foregOutlinedImpt]: !themeName ? null : themeRefs.backgImpt,
        [themeDecls.foregMildImpt]: !themeName ? null : themeRefs.borderImpt,
        [themeDecls.backgMildImpt]: !themeName ? null : colors[`${themeName}Mild`],
        [themeDecls.focusImpt]: !themeName ? null : colors[`${themeName}Thin`], // 50% transparency of base color
    }),
]);
export const useThemeVariant = (props, themeDefault) => {
    const themeName = props.theme ?? themeDefault;
    return {
        class: themeName ? `th${pascalCase(themeName)}` : null,
    };
};
const [gradientRefs, gradientDecls] = createCssVar();
// grandpa ?? `.gradient` and parent not `.gradient` and current not `.gradient`:
export const notGradient = (styles) => rule(':where(:not(.gradient)) :where(:not(.gradient))&:not(.gradient)', styles);
// grandpa is `.gradient` or  parent is  `.gradient` or  current is  `.gradient`:
export const isGradient = (styles) => rule(['.gradient &', '.gradient&', '&.gradient'], styles);
/**
 * Uses toggleable gradient.
 * @param factory Customize the callback to create gradient definitions for each toggle state.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents toggleable gradient definitions.
 */
export const usesGradientVariant = (factory = gradientOf) => {
    return [
        () => composition([
            variants([
                notGradient(factory(false)),
                isGradient(factory(true)),
            ]),
        ]),
        gradientRefs,
        gradientDecls,
    ];
};
/**
 * Creates gradient definitions based on the given `toggle`.
 * @param toggle `true` to activate the gradient -or- `false` to deactivate -or- `null` to keep the original.
 * @returns A `StyleCollection` represents gradient definitions based on the given `toggle`.
 */
export const gradientOf = (toggle = true) => composition([
    vars({
        // *toggle on/off* the background gradient prop:
        [gradientDecls.backgGradTg]: toggle ? cssProps.backgGrad : ((toggle !== null) ? 'initial' : null),
    }),
]);
export const useGradientVariant = (props) => {
    return {
        class: props.gradient ? 'gradient' : null,
    };
};
const [outlinedRefs, outlinedDecls] = createCssVar();
// grandpa ?? `.outlined` and parent not `.outlined` and current not `.outlined`:
export const notOutlined = (styles) => rule(':where(:not(.outlined)) :where(:not(.outlined))&:not(.outlined)', styles);
// grandpa is `.outlined` or  parent is  `.outlined` or  current is  `.outlined`:
export const isOutlined = (styles) => rule(['.outlined &', '.outlined&', '&.outlined'], styles);
/**
 * Uses toggleable outlining.
 * @param factory Customize the callback to create outlining definitions for each toggle state.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents toggleable outlining definitions.
 */
export const usesOutlinedVariant = (factory = outlinedOf) => {
    // dependencies:
    const [themes, themeRefs] = usesThemeVariant();
    return [
        () => composition([
            imports([
                // `usesOutlinedVariant()` implicitly `usesThemeVariant()`
                // `usesOutlinedVariant()` requires `usesThemeVariant()` to work correctly, otherwise it uses the parent themes (that's not intented)
                themes(),
            ]),
            vars({
                [outlinedDecls.foregFn]: fallbacks(themeRefs.foregOutlinedImpt, // first  priority
                themeRefs.foregOutlined, // second priority
                themeRefs.foregOutlinedCond, // third  priority
                cssProps.foreg),
                [outlinedDecls.backgFn]: 'transparent', // set background to transparent, regardless of the theme colors
            }),
            variants([
                notOutlined(factory(false)),
                isOutlined(factory(true)),
            ]),
        ]),
        outlinedRefs,
        outlinedDecls,
    ];
};
/**
 * Creates outlining definitions based on the given `toggle`.
 * @param toggle `true` to activate the outlining -or- `false` to deactivate -or- `null` to keep the original.
 * @returns A `StyleCollection` represents outlining definitions based on the given `toggle`.
 */
export const outlinedOf = (toggle = true) => composition([
    vars({
        // *toggle on/off* the outlined props:
        [outlinedDecls.foregTg]: toggle ? outlinedRefs.foregFn : ((toggle !== null) ? 'initial' : null),
        [outlinedDecls.backgTg]: toggle ? outlinedRefs.backgFn : ((toggle !== null) ? 'initial' : null),
    }),
]);
export const useOutlinedVariant = (props) => {
    return {
        class: props.outlined ? 'outlined' : null,
    };
};
const [mildRefs, mildDecls] = createCssVar();
// by design: grandpa's `.mild` does not affect current `.mild`
// parent not `.mild` and current not `.mild`:
export const notMild = (styles) => rule(':where(:not(.mild))&:not(.mild)', styles);
// parent is  `.mild` or  current is  `.mild`:
export const isMild = (styles) => rule(['.mild&', '&.mild'], styles);
/**
 * Uses toggleable mildification.
 * @param factory Customize the callback to create mildification definitions for each toggle state.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents toggleable mildification definitions.
 */
export const usesMildVariant = (factory = mildOf) => {
    // dependencies:
    const [themes, themeRefs] = usesThemeVariant();
    return [
        () => composition([
            imports([
                // `usesMildVariant()` implicitly `usesThemeVariant()`
                // `usesMildVariant()` requires `usesThemeVariant()` to work correctly, otherwise it uses the parent themes (that's not intented)
                themes(),
            ]),
            vars({
                [mildDecls.foregFn]: fallbacks(themeRefs.foregMildImpt, // first  priority
                themeRefs.foregMild, // second priority
                themeRefs.foregMildCond, // third  priority
                cssProps.foreg),
                [mildDecls.backgFn]: fallbacks(themeRefs.backgMildImpt, // first  priority
                themeRefs.backgMild, // second priority
                themeRefs.backgMildCond, // third  priority
                cssProps.backg),
            }),
            variants([
                notMild(factory(false)),
                isMild(factory(true)),
            ]),
        ]),
        mildRefs,
        mildDecls,
    ];
};
/**
 * Creates mildification definitions based on the given `toggle`.
 * @param toggle `true` to activate the mildification -or- `false` to deactivate -or- `null` to keep the original.
 * @returns A `StyleCollection` represents mildification definitions based on the given `toggle`.
 */
export const mildOf = (toggle = true) => composition([
    vars({
        // *toggle on/off* the mildification props:
        [mildDecls.foregTg]: toggle ? mildRefs.foregFn : ((toggle !== null) ? 'initial' : null),
        [mildDecls.backgTg]: toggle ? mildRefs.backgFn : ((toggle !== null) ? 'initial' : null),
    }),
]);
export const useMildVariant = (props) => {
    return {
        class: props.mild ? 'mild' : null,
    };
};
const [foregRefs, foregDecls] = createCssVar();
/**
 * Uses foreground color (text color).
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents foreground color definitions.
 */
export const usesForeg = () => {
    // dependencies:
    const [, themeRefs] = usesThemeVariant();
    const [, outlinedRefs] = usesOutlinedVariant();
    const [, mildRefs] = usesMildVariant();
    return [
        () => composition([
            vars({
                [foregDecls.foregFn]: fallbacks(themeRefs.foregImpt, // first  priority
                themeRefs.foreg, // second priority
                themeRefs.foregCond, // third  priority
                cssProps.foreg),
                [foregDecls.foreg]: fallbacks(outlinedRefs.foregTg, // toggle outlined (if `usesOutlinedVariant()` applied)
                mildRefs.foregTg, // toggle mild     (if `usesMildVariant()` applied)
                foregRefs.foregFn),
            }),
        ]),
        foregRefs,
        foregDecls,
    ];
};
const [backgRefs, backgDecls] = createCssVar();
/**
 * Uses background layer(s).
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents background layer(s) definitions.
 */
export const usesBackg = () => {
    // dependencies:
    const [, themeRefs] = usesThemeVariant();
    const [, gradientRefs] = usesGradientVariant();
    const [, outlinedRefs] = usesOutlinedVariant();
    const [, mildRefs] = usesMildVariant();
    return [
        () => composition([
            vars({
                [backgDecls.backgNone]: solidBackg('transparent'),
                [backgDecls.backgFn]: fallbacks(themeRefs.backgImpt, // first  priority
                themeRefs.backg, // second priority
                themeRefs.backgCond, // third  priority
                cssProps.backg),
                [backgDecls.backgCol]: fallbacks(outlinedRefs.backgTg, // toggle outlined (if `usesOutlinedVariant()` applied)
                mildRefs.backgTg, // toggle mild     (if `usesMildVariant()` applied)
                backgRefs.backgFn),
                [backgDecls.backg]: [
                    // layering: backg1 | backg2 | backg3 ...
                    // top layer:
                    fallbacks(gradientRefs.backgGradTg, // toggle gradient (if `usesGradientVariant()` applied)
                    backgRefs.backgNone),
                    // bottom layer:
                    backgRefs.backgCol,
                ],
            }),
        ]),
        backgRefs,
        backgDecls,
    ];
};
const [borderRefs, borderDecls] = createCssVar();
/**
 * Uses border color.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents border color definitions.
 */
export const usesBorder = () => {
    // dependencies:
    const [, themeRefs] = usesThemeVariant();
    const [, outlinedRefs] = usesOutlinedVariant();
    return [
        () => composition([
            vars({
                [borderDecls.borderFn]: fallbacks(themeRefs.borderImpt, // first  priority
                themeRefs.border, // second priority
                themeRefs.borderCond, // third  priority
                cssProps.borderColor),
                [borderDecls.borderCol]: fallbacks(outlinedRefs.foregTg, // toggle outlined (if `usesOutlinedVariant()` applied)
                borderRefs.borderFn),
            }),
        ]),
        borderRefs,
        borderDecls,
    ];
};
const [borderStrokeRefs, borderStrokeDecls] = createCssVar();
/**
 * Uses border stroke.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents border stroke definitions.
 */
export const usesBorderStroke = () => {
    return [
        () => composition([
            vars({
                [borderStrokeDecls.border]: cssProps.border,
                [borderStrokeDecls.borderWidth]: cssProps.borderWidth, // default => uses config's border width
            }),
        ]),
        borderStrokeRefs,
        borderStrokeDecls,
    ];
};
export const expandBorderStroke = (cssProps) => {
    // dependencies:
    // colors:
    const [, borderRefs] = usesBorder();
    // borders:
    const [, borderStrokeRefs, borderStrokeDecls] = usesBorderStroke();
    return vars({
        // borders:
        // cssProps.borderStroke** => ref.borderStroke**
        ...(cssProps ? {
            [borderStrokeDecls.border]: cssProps.border,
            [borderStrokeDecls.borderWidth]: cssProps.borderWidth,
        } : null),
        border: borderStrokeRefs.border,
        borderColor: borderRefs.borderCol,
        borderWidth: borderStrokeRefs.borderWidth, // overwrite width prop
    });
};
const [borderRadiusRefs, borderRadiusDecls] = createCssVar();
/**
 * Uses border radius.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents border radius definitions.
 */
export const usesBorderRadius = () => {
    return [
        () => composition([
            vars({
                [borderRadiusDecls.borderStartStartRadius]: cssProps.borderRadius,
                [borderRadiusDecls.borderStartEndRadius]: cssProps.borderRadius,
                [borderRadiusDecls.borderEndStartRadius]: cssProps.borderRadius,
                [borderRadiusDecls.borderEndEndRadius]: cssProps.borderRadius, // default => uses config's border radius
            }),
        ]),
        borderRadiusRefs,
        borderRadiusDecls,
    ];
};
export const expandBorderRadius = (cssProps) => {
    // dependencies:
    // borders:
    const [, borderRadiusRefs, borderRadiusDecls] = usesBorderRadius();
    return vars({
        // borders:
        // cssProps.borderRadius** => ref.borderRadius**
        ...(cssProps ? {
            [borderRadiusDecls.borderStartStartRadius]: cssProps.borderRadius,
            [borderRadiusDecls.borderStartEndRadius]: cssProps.borderRadius,
            [borderRadiusDecls.borderEndStartRadius]: cssProps.borderRadius,
            [borderRadiusDecls.borderEndEndRadius]: cssProps.borderRadius,
        } : null),
        borderRadius: undefined,
        borderStartStartRadius: borderRadiusRefs.borderStartStartRadius,
        borderStartEndRadius: borderRadiusRefs.borderStartEndRadius,
        borderEndStartRadius: borderRadiusRefs.borderEndStartRadius,
        borderEndEndRadius: borderRadiusRefs.borderEndEndRadius, // overwrite radius prop
    });
};
const [paddingRefs, paddingDecls] = createCssVar();
/**
 * Uses paddings.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents paddings definitions.
 */
export const usesPadding = () => {
    return [
        () => composition([
            vars({
                [paddingDecls.paddingInline]: cssProps.paddingInline,
                [paddingDecls.paddingBlock]: cssProps.paddingBlock, // default => uses config's padding block
            }),
        ]),
        paddingRefs,
        paddingDecls,
    ];
};
export const expandPadding = (cssProps) => {
    // dependencies:
    // spacings:
    const [, paddingRefs, paddingDecls] = usesPadding();
    return vars({
        // spacings:
        // cssProps.padding** => ref.padding**
        ...(cssProps ? {
            [paddingDecls.paddingInline]: cssProps.paddingInline,
            [paddingDecls.paddingBlock]: cssProps.paddingBlock,
        } : null),
        padding: undefined,
        paddingInline: paddingRefs.paddingInline,
        paddingBlock: paddingRefs.paddingBlock, // overwrite padding prop
    });
};
const [animRefs, animDecls] = createCssVar();
const setsBoxShadow = new Set(['0 0 transparent']);
const setsFilter = new Set(['brightness(100%)']);
const setsAnim = new Set(['0']);
const propsManager = {
    boxShadows: () => Array.from(setsBoxShadow),
    registerBoxShadow: (item) => setsBoxShadow.add(item),
    unregisterBoxShadow: (item) => setsBoxShadow.delete(item),
    filters: () => Array.from(setsFilter),
    registerFilter: (item) => setsFilter.add(item),
    unregisterFilter: (item) => setsFilter.delete(item),
    anims: () => Array.from(setsAnim),
    registerAnim: (item) => setsAnim.add(item),
    unregisterAnim: (item) => setsAnim.delete(item),
};
export const convertRefToDecl = (ref) => (ref.match(/(?<=var\(\s*)--[\w-]+(?=\s*(?:,[^)]*)?\))/)?.[0] ?? null);
export const usesAnim = () => {
    return [
        () => composition([
            vars({
                [animDecls.boxShadowNone]: [[0, 0, 'transparent']],
                [animDecls.boxShadow]: [
                    // layering: boxShadow1 | boxShadow2 | boxShadow3 ...
                    // layers:
                    ...propsManager.boxShadows().map(fallbackNoneBoxShadow),
                ],
                [animDecls.filterNone]: 'brightness(100%)',
                [animDecls.filter]: [[
                        // combining: filter1 * filter2 * filter3 ...
                        // layers:
                        ...propsManager.filters().map(fallbackNoneFilter),
                    ]],
                [animDecls.transfNone]: 'translate(0)',
                [animDecls.animNone]: 'none',
                [animDecls.anim]: [
                    // layering: anim1 | anim2 | anim3 ...
                    // layers:
                    ...propsManager.anims().map(fallbackNoneAnim),
                ],
            }),
            vars(Object.fromEntries([
                ...propsManager.boxShadows().filter(filterRef).map(convertRefToDecl).map((decl) => [decl, animRefs.boxShadowNone]),
                ...propsManager.filters().filter(filterRef).map(convertRefToDecl).map((decl) => [decl, animRefs.filterNone]),
                ...propsManager.anims().filter(filterRef).map(convertRefToDecl).map((decl) => [decl, animRefs.animNone]),
            ])),
        ]),
        animRefs,
        animDecls,
        propsManager,
    ];
};
export const isRef = (expr) => (typeof (expr) === 'string') && expr.startsWith('var(--');
export const filterRef = (expr) => isRef(expr);
export const fallbackNoneBoxShadow = (boxShadow) => isRef(boxShadow) ? fallbacks(boxShadow, animRefs.boxShadowNone) : boxShadow;
export const fallbackNoneFilter = (filter) => isRef(filter) ? fallbacks(filter, animRefs.filterNone) : filter;
export const fallbackNoneTransf = (transf) => isRef(transf) ? fallbacks(transf, animRefs.transfNone) : transf;
export const fallbackNoneAnim = (anim) => isRef(anim) ? fallbacks(anim, animRefs.animNone) : anim;
const [excitedRefs, excitedDecls] = createCssVar();
{
    const [, , , propsManager] = usesAnim();
    propsManager.registerFilter(excitedRefs.filter);
    propsManager.registerAnim(excitedRefs.anim);
}
const selectorIsExcited = '.excited';
const selectorNotExcited = ':not(.excited)';
export const isExcited = (styles) => rule(selectorIsExcited, styles);
export const notExcited = (styles) => rule(selectorNotExcited, styles);
/**
 * Uses excited states.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents excited state definitions.
 */
export const usesExcitedState = () => {
    return [
        () => composition([
            states([
                isExcited([
                    vars({
                        [excitedDecls.filter]: cssProps.filterExcited,
                        [excitedDecls.anim]: cssProps.animExcited,
                    }),
                ]),
            ]),
        ]),
        excitedRefs,
        excitedDecls,
    ];
};
export const useExcitedState = (props) => {
    // states:
    const [excited, setExcited] = useState(props.excited ?? false); // true => excited, false => normal
    const [needRestart, setNeedRestart] = useState(false);
    /*
     * state is excited/normal based on [controllable excited]
     */
    const excitedFn = !needRestart && (props.excited /*controllable*/ ?? false);
    if (excited !== excitedFn) { // change detected => apply the change & start animating
        setExcited(excitedFn); // remember the last change
        if (needRestart) {
            // wait until DOM rendered the removed `.excited` then reset the `setNeedRestart(false)` then re-render again
            setTimeout(() => {
                setNeedRestart(false);
            }, 0);
        } // if
    }
    const handleIdle = () => {
        // clean up finished animation
        props.onExcitedChange?.(false); // request to stop. If not changed => the next render => `setExcited(true)`
        if (excitedFn)
            setNeedRestart(true); // need animation restart on next render
    };
    return {
        excited: excited,
        class: (() => {
            // fully excited:
            if (excited)
                return 'excited';
            // fully normal:
            return null;
        })(),
        handleAnimationEnd: (e) => {
            if (e.target !== e.currentTarget)
                return; // no bubbling
            if (/((?<![a-z])(excited)|(?<=[a-z])(Excited))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
    };
};
//#endregion excited
// styles:
export const usesBasicLayout = () => {
    // dependencies:
    // colors:
    const [foreg, foregRefs] = usesForeg();
    const [backg, backgRefs] = usesBackg();
    const [border] = usesBorder();
    // borders:
    const [borderStroke] = usesBorderStroke();
    const [borderRadius] = usesBorderRadius();
    const [padding] = usesPadding();
    // animations:
    const [anim, animRefs] = usesAnim();
    return composition([
        imports([
            // colors:
            usesThemeDefault(),
            foreg(),
            backg(),
            border(),
            // borders:
            borderStroke(),
            borderRadius(),
            // spacings:
            padding(),
            // animations:
            anim(),
        ]),
        layout({
            // layouts:
            display: 'block',
            // customize:
            ...usesGeneralProps(cssProps),
            // foregrounds:
            foreg: foregRefs.foreg,
            // backgrounds:
            backg: backgRefs.backg,
            // borders:
            ...expandBorderStroke(cssProps),
            ...expandBorderRadius(cssProps),
            // spacings:
            ...expandPadding(cssProps),
            // animations:
            boxShadow: animRefs.boxShadow,
            filter: animRefs.filter,
            anim: animRefs.anim,
        }),
    ]);
};
export const usesBasicVariants = () => {
    // dependencies:
    // layouts:
    const [sizes] = usesSizeVariant();
    // colors:
    const [themes] = usesThemeVariant();
    const [gradient] = usesGradientVariant();
    const [outlined] = usesOutlinedVariant();
    const [mild] = usesMildVariant();
    return composition([
        imports([
            // layouts:
            sizes(),
            usesNudeVariant(),
            // colors:
            themes(),
            gradient(),
            outlined(),
            mild(),
        ]),
    ]);
};
export const useBasicSheet = createUseSheet(() => [
    mainComposition([
        imports([
            // layouts:
            usesBasicLayout(),
            // variants:
            usesBasicVariants(),
        ]),
    ]),
], /*sheetId :*/ 'rbkpy0qh2b'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names
// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    // dependencies:
    const [, , , propsManager] = usesAnim();
    const filters = propsManager.filters();
    const [, { filter: filterExcited }] = usesExcitedState();
    //#region keyframes
    const keyframesExcited = {
        from: {
            filter: [[
                    ...filters.filter((f) => (f !== filterExcited)),
                    // filterExcited, // missing the last => let's the browser interpolated it
                ].map(fallbackNoneFilter)],
        },
        to: {
            filter: [[
                    ...filters.filter((f) => (f !== filterExcited)),
                    filterExcited, // existing the last => let's the browser interpolated it
                ].map(fallbackNoneFilter)],
        },
    };
    //#endregion keyframes
    const keyframesNone = {};
    const transDuration = '300ms';
    return {
        //#region foreg, backg, borders
        foreg: 'currentColor',
        backg: 'transparent',
        backgGrad: [['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box']],
        border: [[borders.style, borders.defaultWidth, borders.color]],
        borderWidth: borders.defaultWidth,
        borderColor: borders.color,
        borderRadius: borderRadiuses.md,
        borderRadiusSm: borderRadiuses.sm,
        borderRadiusLg: borderRadiuses.lg,
        //#endregion foreg, backg, borders
        //#region spacings
        paddingInline: [['calc((', spacers.sm, '+', spacers.md, ')/2)']],
        paddingBlock: [['calc((', spacers.xs, '+', spacers.sm, ')/2)']],
        paddingInlineSm: spacers.sm,
        paddingBlockSm: spacers.xs,
        paddingInlineLg: spacers.md,
        paddingBlockLg: spacers.sm,
        //#endregion spacings
        // appearances:
        opacity: 1,
        //#region typos
        fontSize: typos.fontSizeNm,
        fontSizeSm: [['calc((', typos.fontSizeSm, '+', typos.fontSizeNm, ')/2)']],
        fontSizeLg: typos.fontSizeMd,
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        fontStyle: 'inherit',
        textDecoration: 'inherit',
        lineHeight: 'inherit',
        //#endregion typos
        //#region animations
        transDuration: transDuration,
        transition: [
            // foreg, backg, borders:
            ['color', transDuration, 'ease-out'],
            ['background', transDuration, 'ease-out'],
            ['border', transDuration, 'ease-out'],
            // sizes:
            ['inline-size', transDuration, 'ease-out'],
            ['block-size', transDuration, 'ease-out'],
            // spacings:
            // ['padding'    , transDuration, 'ease-out'], // beautiful but uncomfortable
            // appearances:
            ['opacity', transDuration, 'ease-out'],
            // typos:
            ['font-size', transDuration, 'ease-out'],
        ],
        // boxShadow            : [[0, 0, 'transparent']],
        // filter               : 'brightness(100%)',
        // transf               : 'translate(0)',
        '@keyframes none': keyframesNone,
        // anim                 : [[keyframesNone]],
        filterExcited: [['invert(80%)']],
        '@keyframes excited': keyframesExcited,
        animExcited: [['150ms', 'ease', 'both', 'alternate-reverse', 5, keyframesExcited]],
        //#endregion animations
    };
}, { prefix: 'bsc' });
export function Basic(props) {
    // styles:
    const sheet = useBasicSheet();
    // variants:
    const sizeVariant = useSizeVariant(props);
    const nudeVariant = useNudeVariant(props);
    const themeVariant = useThemeVariant(props);
    const gradientVariant = useGradientVariant(props);
    const outlinedVariant = useOutlinedVariant(props);
    const mildVariant = useMildVariant(props);
    // jsx:
    return (React.createElement(Element, { ...props, 
        // classes:
        mainClass: props.mainClass ?? sheet.main, variantClasses: [...(props.variantClasses ?? []),
            sizeVariant.class,
            nudeVariant.class,
            themeVariant.class,
            gradientVariant.class,
            outlinedVariant.class,
            mildVariant.class,
        ] }));
}
export { Basic as default };
