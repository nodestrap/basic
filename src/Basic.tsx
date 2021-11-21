// react:
import {
    default as React,
    useState,
}                           from 'react'         // base technology of our nodestrap components

// cssfn:
import type {
    DictionaryOf,
}                           from '@cssfn/types'       // cssfn's types
import type {
    Cust,
    PropEx,
}                           from '@cssfn/css-types'   // ts defs support for cssfn
import {
    // general types:
    StyleCollection,
    SelectorCollection,
    PropList,
    
    
    
    // compositions:
    composition,
    mainComposition,
    imports,
    
    
    
    // layouts:
    layout,
    vars,
    
    
    
    // rules:
    variants,
    states,
    rule,
    
    
    
    // utilities:
    solidBackg,
    pascalCase,
}                           from '@cssfn/cssfn'       // cssfn core
import {
    // hooks:
    createUseSheet,
}                           from '@cssfn/react-cssfn' // cssfn for react
import {
    createCssVar,
    fallbacks,
}                           from '@cssfn/css-var'     // Declares & retrieves *css variables* (css custom properties).
import {
    createCssConfig,
    
    
    
    // utilities:
    usesGeneralProps,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/css-config'  // Stores & retrieves configuration using *css custom properties* (css variables)

// nodestrap utilities:
import {
    colors,
    themes as colorThemes,
}                           from '@nodestrap/colors'      // configurable colors & theming defs
import {
    borders,
    borderRadiuses,
}                           from '@nodestrap/borders'     // configurable borders & border radiuses defs
import spacers              from '@nodestrap/spacers'     // configurable spaces defs
import typos                from '@nodestrap/typos'       // configurable typography (texting) defs

// nodestrap components:
import {
    // react components:
    ElementProps,
    Element,
}                           from '@nodestrap/element'



// hooks:

// layouts:

//#region sizes
export type SizeName = 'sm'|'lg' | (string & {})
export interface SizeVars {
    // empty (might be added soon)
}
const [sizeRefs, sizeDecls] = createCssVar<SizeVars>();

export const isSize = (sizeName: SizeName, styles: StyleCollection) => rule(`.sz${pascalCase(sizeName)}`, styles);

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
                options.map((sizeName) => isSize(sizeName,
                    factory(sizeName)
                )),
            ]),
        ]),
        sizeRefs,
        sizeDecls,
    ] as const;
};
/**
 * Creates sizing definitions for the given `sizeName`.
 * @param sizeName The given size name written in camel case.
 * @returns A `StyleCollection` represents sizing definitions for the given `sizeName`.
 */
export const sizeOf = (sizeName: SizeName) => composition([
    layout({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }),
]);
/**
 * Gets the all available size options.
 * @returns A `SizeName[]` represents the all available size options.
 */
export const sizeOptions = (): SizeName[] => ['sm', 'lg'];

export interface SizeVariant {
    size?: SizeName
}
export const useSizeVariant = (props: SizeVariant) => {
    const sizeName = props.size;
    return {
        class: sizeName ? `sz${pascalCase(sizeName)}` : null,
    };
};
//#endregion sizes

//#region orientation
export type OrientationName = 'block'|'inline'

export interface OrientationRuleOptions {
    defaultOrientation?        : OrientationName
    orientationBlockSelector?  : SelectorCollection
    orientationInlineSelector? : SelectorCollection
}
export const defaultBlockOrientationRuleOptions : OrientationRuleOptions = { defaultOrientation: 'block'  };
export const defaultInlineOrientationRuleOptions: OrientationRuleOptions = { defaultOrientation: 'inline' };
export const normalizeOrientationRule = (options: OrientationRuleOptions|undefined, defaultOptions: OrientationRuleOptions): Required<OrientationRuleOptions> => {
    const defaultOrientation    = options?.defaultOrientation    ?? defaultOptions.defaultOrientation    ?? 'block';
    
    const orientationBlockSelector  = options?.orientationBlockSelector  ?? defaultOptions.orientationBlockSelector  ?? ((defaultOrientation === 'block' ) ? ':not(.inline)' : '.block' );
    const orientationInlineSelector = options?.orientationInlineSelector ?? defaultOptions.orientationInlineSelector ?? ((defaultOrientation === 'inline') ? ':not(.block)'  : '.inline');
    
    return {
        ...options,
        
        defaultOrientation,
        orientationBlockSelector,
        orientationInlineSelector,
    };
};
export const usesOrientationRule = (options?: OrientationRuleOptions) => {
    // options:
    const {
        orientationBlockSelector,
        orientationInlineSelector,
    } = normalizeOrientationRule(options, { defaultOrientation: 'block' });
    
    
    
    return [
        orientationBlockSelector,
        orientationInlineSelector,
    ] as const;
};

export interface OrientationVariant {
    orientation?: OrientationName
}
export const useOrientationVariant = (props: OrientationVariant) => {
    return {
        class: props.orientation ? props.orientation : null,
    };
};
//#endregion orientation

//#region nude
export const notNude = (styles: StyleCollection) => rule(':not(.nude)', styles);
export const isNude = (styles: StyleCollection) => rule('.nude', styles);
export const usesNudeVariant = () => {
    // dependencies:
    
    // borders:
    const [, , borderStrokeDecls] = usesBorderStroke();
 // const [, , borderRadiusDecls] = usesBorderRadius();
    
    // spacings:
    const [, , paddingDecls     ] = usesPadding();
    
    
    
    return composition([
        variants([
            isNude([
                layout({
                    // backgrounds:
                    backg : 'none !important', // discard background, no valid/invalid animation
                    
                    
                    
                    // borders:
                    [borderStrokeDecls.borderWidth           ] : '0px', // discard border
                 // // remove rounded corners on top:
                 // [borderRadiusDecls.borderStartStartRadius] : '0px', // do not discard borderRadius, causing boxShadow looks weird
                 // [borderRadiusDecls.borderStartEndRadius  ] : '0px', // do not discard borderRadius, causing boxShadow looks weird
                 // // remove rounded corners on bottom:
                 // [borderRadiusDecls.borderEndStartRadius  ] : '0px', // do not discard borderRadius, causing boxShadow looks weird
                 // [borderRadiusDecls.borderEndEndRadius    ] : '0px', // do not discard borderRadius, causing boxShadow looks weird
                    
                    
                    
                    // spacings:
                    [paddingDecls.paddingInline] : '0px', // discard padding
                    [paddingDecls.paddingBlock ] : '0px', // discard padding
                }),
            ]),
        ]),
    ]);
};

export interface NudeVariant {
    nude?: boolean
}
export const useNudeVariant = (props: NudeVariant) => {
    return {
        class: props.nude ? 'nude' : null,
    };
};
//#endregion nude


// colors:

//#region themes
export type ThemeName = (keyof typeof colorThemes) | (string & {})
export interface ThemeVars {
    /**
     * themed foreground color.
     */
    foreg             : any
    /**
     * themed background color.
     */
    backg             : any
    /**
     * themed border color.
     */
    border            : any
    
    /**
     * themed foreground color - at outlined variant.
     */
    foregOutlined     : any
    
    /**
     * themed foreground color - at mild variant.
     */
    foregMild         : any
    /**
     * themed background color - at mild variant.
     */
    backgMild         : any
    
    /**
     * themed focus color - at focused state.
     */
    focus             : any
    
    
    
    /**
     * conditional unthemed foreground color.
     */
    foregCond         : any
    /**
     * conditional unthemed background color.
     */
    backgCond         : any
    /**
     * conditional unthemed border color.
     */
    borderCond        : any
    
    /**
     * conditional unthemed foreground color - at outlined variant.
     */
    foregOutlinedCond : any
    
    /**
     * conditional unthemed foreground color - at mild variant.
     */
    foregMildCond     : any
    /**
     * conditional unthemed background color - at mild variant.
     */
    backgMildCond     : any
    
    /**
     * conditional unthemed focus color - at focused state.
     */
    focusCond         : any
    
    
    
    /**
     * important conditional unthemed foreground color.
     */
    foregImpt         : any
    /**
     * important conditional unthemed background color.
     */
    backgImpt         : any
    /**
     * important conditional unthemed border color.
     */
    borderImpt        : any
    
    /**
     * important conditional unthemed foreground color - at outlined variant.
     */
    foregOutlinedImpt : any
    
    /**
     * important conditional unthemed foreground color - at mild variant.
     */
    foregMildImpt     : any
    /**
     * important conditional unthemed background color - at mild variant.
     */
    backgMildImpt     : any
    
    /**
     * important conditional unthemed focus color - at focused state.
     */
    focusImpt         : any
}
const [themeRefs, themeDecls] = createCssVar<ThemeVars>();

export const isTheme = (themeName: ThemeName, styles: StyleCollection) => rule(`.th${pascalCase(themeName)}`, styles);

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
                options.map((themeName) => isTheme(themeName,
                    factory(themeName)
                )),
            ]),
        ]),
        themeRefs,
        themeDecls,
    ] as const;
};
/**
 * Creates color definitions for the given `themeName`.
 * @param themeName The given theme name written in camel case.
 * @returns A `StyleCollection` represents color definitions for the given `themeName`.
 */
export const themeOf = (themeName: ThemeName) => composition([
    vars({
        [themeDecls.foreg            ] : (colors as DictionaryOf<typeof colors>)[`${themeName}Text`], // light on dark base color | dark on light base color
        [themeDecls.backg            ] : (colors as DictionaryOf<typeof colors>)[   themeName      ], // base color
        [themeDecls.border           ] : (colors as DictionaryOf<typeof colors>)[`${themeName}Bold`], // 20% base color + 80% page's foreground
        
        [themeDecls.foregOutlined    ] : themeRefs.backg,
        
        [themeDecls.foregMild        ] : themeRefs.border,
        [themeDecls.backgMild        ] : (colors as DictionaryOf<typeof colors>)[`${themeName}Mild`], // 20% base color + 80% page's background
        
        [themeDecls.focus            ] : (colors as DictionaryOf<typeof colors>)[`${themeName}Thin`], // 50% transparency of base color
    }),
]);
/**
 * Gets the all available theme options.
 * @returns A `ThemeName[]` represents the all available theme options.
 */
export const themeOptions = () => Object.keys(colorThemes) as ThemeName[];

/**
 * Creates the default color definitions for unspecified `themeName`.
 * @param themeName The theme name as the default, written in camel case -or- `null`.
 * @returns A `StyleCollection` represents color definitions for the default `themeName`.
 */
export const usesThemeDefault = (themeName: ThemeName|null = null) => {
    return usesThemeCond(themeName);
};
/**
 * Creates a conditional color definitions for the given `themeName`.
 * @param themeName The given theme name written in camel case -or- `null` to keep the current theme.
 * @returns A `StyleCollection` represents the conditional color definitions for the given `themeName`.
 */
export const usesThemeCond = (themeName: ThemeName|null) => composition([
    vars({
        [themeDecls.foregCond        ] : !themeName ? null : (colors as DictionaryOf<typeof colors>)[`${themeName}Text`], // light on dark base color | dark on light base color
        [themeDecls.backgCond        ] : !themeName ? null : (colors as DictionaryOf<typeof colors>)[   themeName      ], // base color
        [themeDecls.borderCond       ] : !themeName ? null : (colors as DictionaryOf<typeof colors>)[`${themeName}Bold`], // 20% base color + 80% page's foreground
        
        [themeDecls.foregOutlinedCond] : !themeName ? null : themeRefs.backgCond,
        
        [themeDecls.foregMildCond    ] : !themeName ? null : themeRefs.borderCond,
        [themeDecls.backgMildCond    ] : !themeName ? null : (colors as DictionaryOf<typeof colors>)[`${themeName}Mild`], // 20% base color + 80% page's background
        
        [themeDecls.focusCond        ] : !themeName ? null : (colors as DictionaryOf<typeof colors>)[`${themeName}Thin`], // 50% transparency of base color
    }),
]);
/**
 * Creates an important conditional color definitions for the given `themeName`.
 * @param themeName The given theme name written in camel case -or- `null` to keep the current theme.
 * @returns A `StyleCollection` represents the important conditional color definitions for the given `themeName`.
 */
export const usesThemeImpt = (themeName: ThemeName|null) => composition([
    vars({
        [themeDecls.foregImpt        ] : !themeName ? null : (colors as DictionaryOf<typeof colors>)[`${themeName}Text`], // light on dark base color | dark on light base color
        [themeDecls.backgImpt        ] : !themeName ? null : (colors as DictionaryOf<typeof colors>)[   themeName      ], // base color
        [themeDecls.borderImpt       ] : !themeName ? null : (colors as DictionaryOf<typeof colors>)[`${themeName}Bold`], // 20% base color + 80% page's foreground
        
        [themeDecls.foregOutlinedImpt] : !themeName ? null : themeRefs.backgImpt,
        
        [themeDecls.foregMildImpt    ] : !themeName ? null : themeRefs.borderImpt,
        [themeDecls.backgMildImpt    ] : !themeName ? null : (colors as DictionaryOf<typeof colors>)[`${themeName}Mild`], // 20% base color + 80% page's background
        
        [themeDecls.focusImpt        ] : !themeName ? null : (colors as DictionaryOf<typeof colors>)[`${themeName}Thin`], // 50% transparency of base color
    }),
]);

export interface ThemeVariant {
    theme?: ThemeName
}
export const useThemeVariant = (props: ThemeVariant, themeDefault?: ThemeName) => {
    const themeName = props.theme ?? themeDefault;
    return {
        class: themeName ? `th${pascalCase(themeName)}` : null,
    };
};
//#endregion themes

//#region gradient
export interface GradientVars {
    /**
     * toggles on background gradient - at gradient variant.
     */
    backgGradTg : any
}
const [gradientRefs, gradientDecls] = createCssVar<GradientVars>();

// grandpa ?? `.gradient` and parent not `.gradient` and current not `.gradient`:
export const notGradient = (styles: StyleCollection) => rule(':where(:not(.gradient)) :where(:not(.gradient))&:not(.gradient)', styles);
// grandpa is `.gradient` or  parent is  `.gradient` or  current is  `.gradient`:
export const isGradient = (styles: StyleCollection) => rule([           '.gradient &',          '.gradient&',   '&.gradient'], styles);

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
    ] as const;
};
/**
 * Creates gradient definitions based on the given `toggle`.
 * @param toggle `true` to activate the gradient -or- `false` to deactivate -or- `null` to keep the original.
 * @returns A `StyleCollection` represents gradient definitions based on the given `toggle`.
 */
export const gradientOf = (toggle: (boolean|null) = true) => composition([
    vars({
        // *toggle on/off* the background gradient prop:
        [gradientDecls.backgGradTg] : toggle ? cssProps.backgGrad : ((toggle !== null) ? 'initial' : null),
    }),
]);

export interface GradientVariant {
    gradient?: boolean
}
export const useGradientVariant = (props: GradientVariant) => {
    return {
        class: props.gradient ? 'gradient' : null,
    };
};
//#endregion gradient

//#region outlined
export interface OutlinedVars {
    /**
     * functional foreground color - at outlined variant.
     */
    foregFn : any
    /**
     * toggles on foreground color - at outlined variant.
     */
    foregTg : any
    
    
    
    /**
     * functional background color - at outlined variant.
     */
    backgFn : any
    /**
     * toggles on background color - at outlined variant.
     */
    backgTg : any
}
const [outlinedRefs, outlinedDecls] = createCssVar<OutlinedVars>();

// grandpa ?? `.outlined` and parent not `.outlined` and current not `.outlined`:
export const notOutlined = (styles: StyleCollection) => rule(':where(:not(.outlined)) :where(:not(.outlined))&:not(.outlined)', styles);
// grandpa is `.outlined` or  parent is  `.outlined` or  current is  `.outlined`:
export const isOutlined = (styles: StyleCollection) => rule([           '.outlined &',          '.outlined&',   '&.outlined'], styles);

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
                [outlinedDecls.foregFn] : fallbacks(
                    themeRefs.foregOutlinedImpt,  // first  priority
                    themeRefs.foregOutlined,      // second priority
                    themeRefs.foregOutlinedCond,  // third  priority
                    
                    cssProps.foreg,               // default => uses config's foreground
                ),
                
                [outlinedDecls.backgFn] : 'transparent', // set background to transparent, regardless of the theme colors
            }),
            variants([
                notOutlined(factory(false)),
                isOutlined(factory(true)),
            ]),
        ]),
        outlinedRefs,
        outlinedDecls,
    ] as const;
};
/**
 * Creates outlining definitions based on the given `toggle`.
 * @param toggle `true` to activate the outlining -or- `false` to deactivate -or- `null` to keep the original.
 * @returns A `StyleCollection` represents outlining definitions based on the given `toggle`.
 */
export const outlinedOf = (toggle: (boolean|null) = true) => composition([
    vars({
        // *toggle on/off* the outlined props:
        [outlinedDecls.foregTg] : toggle ? outlinedRefs.foregFn : ((toggle !== null) ? 'initial' : null),
        [outlinedDecls.backgTg] : toggle ? outlinedRefs.backgFn : ((toggle !== null) ? 'initial' : null),
    }),
]);

export interface OutlinedVariant {
    outlined?: boolean
}
export const useOutlinedVariant = (props: OutlinedVariant) => {
    return {
        class: props.outlined ? 'outlined' : null,
    };
};
//#endregion outlined

//#region mild
export interface MildVars {
    /**
     * functional foreground color - at mild variant.
     */
    foregFn : any
    /**
     * toggles on foreground color - at mild variant.
     */
    foregTg : any
    
    
    
    /**
     * functional background color - at mild variant.
     */
    backgFn : any
    /**
     * toggles on background color - at mild variant.
     */
    backgTg : any
}
const [mildRefs, mildDecls] = createCssVar<MildVars>();

// by design: grandpa's `.mild` does not affect current `.mild`
// parent not `.mild` and current not `.mild`:
export const notMild = (styles: StyleCollection) => rule(':where(:not(.mild))&:not(.mild)', styles);
// parent is  `.mild` or  current is  `.mild`:
export const isMild = (styles: StyleCollection) => rule([           '.mild&',   '&.mild'], styles);

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
                [mildDecls.foregFn] : fallbacks(
                    themeRefs.foregMildImpt,  // first  priority
                    themeRefs.foregMild,      // second priority
                    themeRefs.foregMildCond,  // third  priority
                    
                    cssProps.foreg,           // default => uses config's foreground
                ),
                
                [mildDecls.backgFn] : fallbacks(
                    themeRefs.backgMildImpt,  // first  priority
                    themeRefs.backgMild,      // second priority
                    themeRefs.backgMildCond,  // third  priority
                    
                    cssProps.backg,           // default => uses config's background
                ),
            }),
            variants([
                notMild(factory(false)),
                isMild(factory(true)),
            ]),
        ]),
        mildRefs,
        mildDecls,
    ] as const;
};
/**
 * Creates mildification definitions based on the given `toggle`.
 * @param toggle `true` to activate the mildification -or- `false` to deactivate -or- `null` to keep the original.
 * @returns A `StyleCollection` represents mildification definitions based on the given `toggle`.
 */
export const mildOf = (toggle: (boolean|null) = true) => composition([
    vars({
        // *toggle on/off* the mildification props:
        [mildDecls.foregTg] : toggle ? mildRefs.foregFn : ((toggle !== null) ? 'initial' : null),
        [mildDecls.backgTg] : toggle ? mildRefs.backgFn : ((toggle !== null) ? 'initial' : null),
    }),
]);

export interface MildVariant {
    mild?: boolean
}
export const useMildVariant = (props: MildVariant) => {
    return {
        class: props.mild ? 'mild' : null,
    };
};
//#endregion mild


//#region foreg
export interface ForegVars {
    /**
     * functional foreground color.
     */
    foregFn     : any
    /**
     * final foreground color.
     */
    foreg       : any
}
const [foregRefs, foregDecls] = createCssVar<ForegVars>();

/**
 * Uses foreground color (text color).
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents foreground color definitions.
 */
export const usesForeg = () => {
    // dependencies:
    const [, themeRefs   ] = usesThemeVariant();
    const [, outlinedRefs] = usesOutlinedVariant();
    const [, mildRefs    ] = usesMildVariant();
    
    
    
    return [
        () => composition([
            vars({
                [foregDecls.foregFn] : fallbacks(
                    themeRefs.foregImpt,  // first  priority
                    themeRefs.foreg,      // second priority
                    themeRefs.foregCond,  // third  priority
                    
                    cssProps.foreg,       // default => uses config's foreground
                ),
                [foregDecls.foreg]   : fallbacks(
                    outlinedRefs.foregTg, // toggle outlined (if `usesOutlinedVariant()` applied)
                    mildRefs.foregTg,     // toggle mild     (if `usesMildVariant()` applied)
                    
                    foregRefs.foregFn,    // default => uses our `foregFn`
                ),
            }),
        ]),
        foregRefs,
        foregDecls,
    ] as const;
};
//#endregion foreg

//#region backg
export interface BackgVars {
    /**
     * none background.
     */
    backgNone   : any
    
    /**
     * functional background color.
     */
    backgFn     : any
    /**
     * final background color.
     */
    backgCol    : any
    /**
     * final background layers.
     */
    backg       : any
}
const [backgRefs, backgDecls] = createCssVar<BackgVars>();

/**
 * Uses background layer(s).
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents background layer(s) definitions.
 */
export const usesBackg = () => {
    // dependencies:
    const [, themeRefs   ] = usesThemeVariant();
    const [, gradientRefs] = usesGradientVariant();
    const [, outlinedRefs] = usesOutlinedVariant();
    const [, mildRefs    ] = usesMildVariant();
    
    
    
    return [
        () => composition([
            vars({
                [backgDecls.backgNone] : solidBackg('transparent'),
                
                [backgDecls.backgFn]   : fallbacks(
                    themeRefs.backgImpt,  // first  priority
                    themeRefs.backg,      // second priority
                    themeRefs.backgCond,  // third  priority
                    
                    cssProps.backg,       // default => uses config's background
                ),
                [backgDecls.backgCol]  : fallbacks(
                    outlinedRefs.backgTg, // toggle outlined (if `usesOutlinedVariant()` applied)
                    mildRefs.backgTg,     // toggle mild     (if `usesMildVariant()` applied)
                    
                    backgRefs.backgFn,    // default => uses our `backgFn`
                ),
                [backgDecls.backg]     : [ // single array => makes the JSS treat as comma separated values
                    // layering: backg1 | backg2 | backg3 ...
                    
                    // top layer:
                    fallbacks(
                        gradientRefs.backgGradTg, // toggle gradient (if `usesGradientVariant()` applied)
                        
                        backgRefs.backgNone,      // default => no top layer
                    ),
                    
                    // bottom layer:
                    backgRefs.backgCol,
                ],
            }),
        ]),
        backgRefs,
        backgDecls,
    ] as const;
};
//#endregion backg

//#region border
export interface BorderVars {
    /**
     * functional border color.
     */
    borderFn    : any
    /**
     * final border color.
     */
    borderCol   : any
}
const [borderRefs, borderDecls] = createCssVar<BorderVars>();

/**
 * Uses border color.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents border color definitions.
 */
export const usesBorder = () => {
    // dependencies:
    const [, themeRefs   ] = usesThemeVariant();
    const [, outlinedRefs] = usesOutlinedVariant();
    
    
    
    return [
        () => composition([
            vars({
                [borderDecls.borderFn]  : fallbacks(
                    themeRefs.borderImpt,  // first  priority
                    themeRefs.border,      // second priority
                    themeRefs.borderCond,  // third  priority
                    
                    cssProps.borderColor,  // default => uses config's border color
                ),
                [borderDecls.borderCol] : fallbacks(
                    outlinedRefs.foregTg,  // toggle outlined (if `usesOutlinedVariant()` applied)
                    
                    borderRefs.borderFn,   // default => uses our `borderFn`
                ),
            }),
        ]),
        borderRefs,
        borderDecls,
    ] as const;
};


export interface BorderStrokeVars {
    /**
     * final border mix (style, width, color, etc).
     */
    border      : any
    /**
     * final border width.
     */
    borderWidth : any
}
const [borderStrokeRefs, borderStrokeDecls] = createCssVar<BorderStrokeVars>();

/**
 * Uses border stroke.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents border stroke definitions.
 */
export const usesBorderStroke = () => {
    return [
        () => composition([
            vars({
                [borderStrokeDecls.border]      : cssProps.border,      // default => uses config's border
                [borderStrokeDecls.borderWidth] : cssProps.borderWidth, // default => uses config's border width
            }),
        ]),
        borderStrokeRefs,
        borderStrokeDecls,
    ] as const;
};
export const expandBorderStroke = (cssProps?: { border: Cust.Ref, borderWidth: Cust.Ref }): PropList => {
    // dependencies:
    
    // colors:
    const [, borderRefs                         ] = usesBorder();
    
    // borders:
    const [, borderStrokeRefs, borderStrokeDecls] = usesBorderStroke();
    
    
    
    return vars({
        // borders:
        // cssProps.borderStroke** => ref.borderStroke**
        ...(cssProps ? {
            [borderStrokeDecls.border     ] : cssProps.border,
            [borderStrokeDecls.borderWidth] : cssProps.borderWidth,
        } : null),
        border      : borderStrokeRefs.border,      // all border properties
        borderColor : borderRefs.borderCol,         // overwrite color prop
        borderWidth : borderStrokeRefs.borderWidth, // overwrite width prop
    }) as PropList;
};


export interface BorderRadiusVars {
    borderStartStartRadius : any
    borderStartEndRadius   : any
    borderEndStartRadius   : any
    borderEndEndRadius     : any
}
const [borderRadiusRefs, borderRadiusDecls] = createCssVar<BorderRadiusVars>();

/**
 * Uses border radius.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents border radius definitions.
 */
export const usesBorderRadius = () => {
    return [
        () => composition([
            vars({
                [borderRadiusDecls.borderStartStartRadius] : cssProps.borderRadius, // default => uses config's border radius
                [borderRadiusDecls.borderStartEndRadius]   : cssProps.borderRadius, // default => uses config's border radius
                [borderRadiusDecls.borderEndStartRadius]   : cssProps.borderRadius, // default => uses config's border radius
                [borderRadiusDecls.borderEndEndRadius]     : cssProps.borderRadius, // default => uses config's border radius
            }),
        ]),
        borderRadiusRefs,
        borderRadiusDecls,
    ] as const;
};
export const expandBorderRadius = (cssProps?: { borderRadius: Cust.Ref }): PropList => {
    // dependencies:
    
    // borders:
    const [, borderRadiusRefs, borderRadiusDecls] = usesBorderRadius();
    
    
    
    return vars({
        // borders:
        // cssProps.borderRadius** => ref.borderRadius**
        ...(cssProps ? {
            [borderRadiusDecls.borderStartStartRadius] : cssProps.borderRadius,
            [borderRadiusDecls.borderStartEndRadius  ] : cssProps.borderRadius,
            [borderRadiusDecls.borderEndStartRadius  ] : cssProps.borderRadius,
            [borderRadiusDecls.borderEndEndRadius    ] : cssProps.borderRadius,
        } : null),
        borderRadius           : undefined as unknown as null,            // delete short prop
        borderStartStartRadius : borderRadiusRefs.borderStartStartRadius, // overwrite radius prop
        borderStartEndRadius   : borderRadiusRefs.borderStartEndRadius,   // overwrite radius prop
        borderEndStartRadius   : borderRadiusRefs.borderEndStartRadius,   // overwrite radius prop
        borderEndEndRadius     : borderRadiusRefs.borderEndEndRadius,     // overwrite radius prop
    }) as PropList;
};
//#endregion border


// spacings:

//#region paddings
export interface PaddingVars {
    paddingInline : any
    paddingBlock  : any
}
const [paddingRefs, paddingDecls] = createCssVar<PaddingVars>();

/**
 * Uses paddings.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents paddings definitions.
 */
export const usesPadding = () => {
    return [
        () => composition([
            vars({
                [paddingDecls.paddingInline] : cssProps.paddingInline, // default => uses config's padding inline
                [paddingDecls.paddingBlock]  : cssProps.paddingBlock,  // default => uses config's padding block
            }),
        ]),
        paddingRefs,
        paddingDecls,
    ] as const;
};
export const expandPadding = (cssProps?: { paddingInline: Cust.Ref, paddingBlock: Cust.Ref }): PropList => {
    // dependencies:
    
    // spacings:
    const [, paddingRefs, paddingDecls] = usesPadding();
    
    
    
    return vars({
        // spacings:
        // cssProps.padding** => ref.padding**
        ...(cssProps ? {
            [paddingDecls.paddingInline] : cssProps.paddingInline,
            [paddingDecls.paddingBlock ] : cssProps.paddingBlock,
        } : null),
        padding       : undefined as unknown as null, // delete short prop
        paddingInline : paddingRefs.paddingInline,    // overwrite padding prop
        paddingBlock  : paddingRefs.paddingBlock,     // overwrite padding prop
    }) as PropList;
};
//#endregion paddings


// animations:

//#region animations
export interface AnimVars {
    /**
     * none boxShadow.
     */
    boxShadowNone : any
    /**
     * final boxShadow layers.
     */
    boxShadow     : any
    
    /**
     * none filter.
     */
    filterNone    : any
    /**
     * final filter.
     */
    filter        : any
    
    /**
     * none transform.
     */
    transfNone    : any
    
    /**
     * none animation.
     */
    animNone      : any
    /**
     * final animation.
     */
    anim          : any
}
const [animRefs, animDecls] = createCssVar<AnimVars>();

const setsBoxShadow = new Set<Cust.Ref|Cust.General>(['0 0 transparent'  as Cust.General]);
const setsFilter    = new Set<Cust.Ref|Cust.General>(['brightness(100%)' as Cust.General]);
const setsAnim      = new Set<Cust.Ref|Cust.General>(['0'                as Cust.General]);
const propsManager  = {
    boxShadows          : () => Array.from(setsBoxShadow),
    registerBoxShadow   : (item: Cust.Ref) => setsBoxShadow.add(item),
    unregisterBoxShadow : (item: Cust.Ref) => setsBoxShadow.delete(item),
    
    filters             : () => Array.from(setsFilter),
    registerFilter      : (item: Cust.Ref) => setsFilter.add(item),
    unregisterFilter    : (item: Cust.Ref) => setsFilter.delete(item),
    
    anims               : () => Array.from(setsAnim),
    registerAnim        : (item: Cust.Ref) => setsAnim.add(item),
    unregisterAnim      : (item: Cust.Ref) => setsAnim.delete(item),
} as const;

export const convertRefToDecl = (ref: Cust.Ref): Cust.Decl => (ref.match(/(?<=var\(\s*)--[\w-]+(?=\s*(?:,[^)]*)?\))/)?.[0] ?? null) as Cust.Decl;
export const usesAnim = () => {
    return [
        () => composition([
            vars({
                [animDecls.boxShadowNone] : [[0, 0, 'transparent']],
                [animDecls.boxShadow    ] : [ // single array => makes the JSS treat as comma separated values
                    // layering: boxShadow1 | boxShadow2 | boxShadow3 ...
                    
                    // layers:
                    ...propsManager.boxShadows().map(fallbackNoneBoxShadow),
                ],
                
                [animDecls.filterNone   ] : 'brightness(100%)',
                [animDecls.filter       ] : [[ // double array => makes the JSS treat as space separated values
                    // combining: filter1 * filter2 * filter3 ...
                    
                    // layers:
                    ...propsManager.filters().map(fallbackNoneFilter),
                ]],
                
                [animDecls.transfNone   ] : 'translate(0)',
                
                [animDecls.animNone     ] : 'none',
                [animDecls.anim         ] : [ // single array => makes the JSS treat as comma separated values
                    // layering: anim1 | anim2 | anim3 ...
                    
                    // layers:
                    ...propsManager.anims().map(fallbackNoneAnim),
                ],
            }),
            vars(Object.fromEntries([
                ...propsManager.boxShadows().filter(filterRef).map(convertRefToDecl).map((decl) => [ decl, animRefs.boxShadowNone ]),
                ...propsManager.filters().filter(filterRef).map(convertRefToDecl).map((decl) => [ decl, animRefs.filterNone ]),
                ...propsManager.anims().filter(filterRef).map(convertRefToDecl).map((decl) => [ decl, animRefs.animNone ]),
            ])),
        ]),
        animRefs,
        animDecls,
        propsManager,
    ] as const;
};

export const isRef     = (expr: Cust.Expr): expr is Cust.Ref => (typeof(expr) === 'string') && expr.startsWith('var(--');
export const filterRef = (expr: Cust.Ref|Cust.General): expr is Cust.Ref => isRef(expr);

export const fallbackNoneBoxShadow = (boxShadow : Cust.Ref|Cust.General) => isRef(boxShadow) ? fallbacks(boxShadow, animRefs.boxShadowNone) : boxShadow;
export const fallbackNoneFilter    = (filter    : Cust.Ref|Cust.General) => isRef(filter)    ? fallbacks(filter   , animRefs.filterNone)    : filter;
export const fallbackNoneTransf    = (transf    : Cust.Ref|Cust.General) => isRef(transf)    ? fallbacks(transf   , animRefs.transfNone)    : transf;
export const fallbackNoneAnim      = (anim      : Cust.Ref|Cust.General) => isRef(anim)      ? fallbacks(anim     , animRefs.animNone)      : anim;
//#endregion animations

//#region excited
export interface ExcitedVars {
    filter : any
    anim   : any
}
const [excitedRefs, excitedDecls] = createCssVar<ExcitedVars>();

{
    const [, , , propsManager] = usesAnim();
    propsManager.registerFilter(excitedRefs.filter);
    propsManager.registerAnim(excitedRefs.anim);
}

const selectorIsExcited  = '.excited'
const selectorNotExcited = ':not(.excited)'

export const isExcited  = (styles: StyleCollection) => rule(selectorIsExcited,  styles);
export const notExcited = (styles: StyleCollection) => rule(selectorNotExcited, styles);

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
                        [excitedDecls.filter] : cssProps.filterExcited,
                        [excitedDecls.anim  ] : cssProps.animExcited,
                    }),
                ]),
            ]),
        ]),
        excitedRefs,
        excitedDecls,
    ] as const;
};

export const useExcitedState = (props: TogglerExcitedProps) => {
    // states:
    const [excited,     setExcited    ] = useState<boolean>(props.excited ?? false); // true => excited, false => normal
    const [needRestart, setNeedRestart] = useState<boolean>(false);
    
    
    
    /*
     * state is excited/normal based on [controllable excited]
     */
    const excitedFn: boolean = !needRestart && (props.excited /*controllable*/ ?? false);
    
    if (excited !== excitedFn) { // change detected => apply the change & start animating
        setExcited(excitedFn);   // remember the last change
        
        if (needRestart) {
            // wait until DOM rendered the removed `.excited` then reset the `setNeedRestart(false)` then re-render again
            setTimeout(() => {
                setNeedRestart(false);
            }, 0);
        } // if
    }
    
    
    
    const handleIdle = () => {
        // clean up finished animation
        
        props.onExcitedChange?.(false);      // request to stop. If not changed => the next render => `setExcited(true)`
        if (excitedFn) setNeedRestart(true); // need animation restart on next render
    }
    return {
        excited : excited,
        
        class   : ((): string|null => {
            // fully excited:
            if (excited) return 'excited';
            
            // fully normal:
            return null;
        })(),
        
        handleAnimationEnd : (e: React.AnimationEvent<HTMLElement>) => {
            if (e.target !== e.currentTarget) return; // no bubbling
            if (/((?<![a-z])(excited)|(?<=[a-z])(Excited))(?![a-z])/.test(e.animationName)) {
                handleIdle();
            }
        },
    };
};

export interface TogglerExcitedProps
{
    // accessibilities:
    excited?         : boolean
    onExcitedChange? : (newExcited: boolean) => void
}
//#endregion excited



// styles:
export const usesBasicLayout = () => {
    // dependencies:
    
    // colors:
    const [foreg , foregRefs] = usesForeg();
    const [backg , backgRefs] = usesBackg();
    const [border           ] = usesBorder();
    
    // borders:
    const [borderStroke     ] = usesBorderStroke();
    const [borderRadius     ] = usesBorderRadius();
    const [padding          ] = usesPadding();
    
    // animations:
    const [anim  , animRefs ] = usesAnim();
    
    
    
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
            display   : 'block',
            
            
            
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
            
            
            
            // foregrounds:
            foreg     : foregRefs.foreg,
            
            
            
            // backgrounds:
            backg     : backgRefs.backg,
            
            
            
            // borders:
            ...expandBorderStroke(cssProps), // expand borderStroke css vars
            ...expandBorderRadius(cssProps), // expand borderRadius css vars
            
            
            
            // spacings:
            ...expandPadding(cssProps), // expand padding css vars
            
            
            
            // animations:
            boxShadow : animRefs.boxShadow,
            filter    : animRefs.filter,
            anim      : animRefs.anim,
        }),
    ]);
};
export const usesBasicVariants = () => {
    // dependencies:
    
    // layouts:
    const [sizes]              = usesSizeVariant();
    
    // colors:
    const [themes]             = usesThemeVariant();
    const [gradient]           = usesGradientVariant();
    const [outlined]           = usesOutlinedVariant();
    const [mild]               = usesMildVariant();
    
    
    
    return composition([
        imports([
            // layouts:
            sizes(),
            
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
]);



// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    // dependencies:
    const [, , , propsManager] = usesAnim();
    const filters = propsManager.filters();
    
    const [, {filter: filterExcited} ] = usesExcitedState();
    
    
    
    //#region keyframes
    const keyframesExcited  : PropEx.Keyframes = {
        from : {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...filters.filter((f) => (f !== filterExcited)),

             // filterExcited, // missing the last => let's the browser interpolated it
            ].map(fallbackNoneFilter)],
        },
        to   : {
            filter: [[ // double array => makes the JSS treat as space separated values
                ...filters.filter((f) => (f !== filterExcited)),

                filterExcited, // existing the last => let's the browser interpolated it
            ].map(fallbackNoneFilter)],
        },
    };
    //#endregion keyframes
    
    
    
    const keyframesNone : PropEx.Keyframes = { };

    
    const transDuration = '300ms';
    
    return {
        //#region foreg, backg, borders
        foreg                : 'currentColor',
        
        backg                : 'transparent',
        backgGrad            : [['linear-gradient(180deg, rgba(255,255,255, 0.2), rgba(0,0,0, 0.2))', 'border-box']],
        
        border               : [[borders.style, borders.defaultWidth, borders.color]],
        borderWidth          : borders.defaultWidth,
        borderColor          : borders.color,
        
        borderRadius         : borderRadiuses.md,
        borderRadiusSm       : borderRadiuses.sm,
        borderRadiusLg       : borderRadiuses.lg,
        //#endregion foreg, backg, borders

        
        
        //#region spacings
        paddingInline        : [['calc((', spacers.sm, '+', spacers.md, ')/2)']],
        paddingBlock         : [['calc((', spacers.xs, '+', spacers.sm, ')/2)']],
        paddingInlineSm      : spacers.sm,
        paddingBlockSm       : spacers.xs,
        paddingInlineLg      : spacers.md,
        paddingBlockLg       : spacers.sm,
        //#endregion spacings

        
        
        // appearances:
        opacity              : 1,
        
        
        
        //#region typos
        fontSize             : typos.fontSizeNm,
        fontSizeSm           : [['calc((', typos.fontSizeSm, '+', typos.fontSizeNm, ')/2)']],
        fontSizeLg           : typos.fontSizeMd,
        fontFamily           : 'inherit',
        fontWeight           : 'inherit',
        fontStyle            : 'inherit',
        textDecoration       : 'inherit',
        lineHeight           : 'inherit',
        //#endregion typos
        
        
        
        //#region animations
        transDuration        : transDuration,
        transition           : [
            // foreg, backg, borders:
            ['color'      , transDuration, 'ease-out'],
            ['background' , transDuration, 'ease-out'],
            ['border'     , transDuration, 'ease-out'],
            
            // sizes:
            ['inline-size', transDuration, 'ease-out'],
            ['block-size' , transDuration, 'ease-out'],
            
            // spacings:
            // ['padding'    , transDuration, 'ease-out'], // beautiful but uncomfortable
            
            // appearances:
            ['opacity'    , transDuration, 'ease-out'],
            
            // typos:
            ['font-size'  , transDuration, 'ease-out'],
        ],

        // boxShadow            : [[0, 0, 'transparent']],
        // filter               : 'brightness(100%)',
        // transf               : 'translate(0)',

        '@keyframes none'    : keyframesNone,
        // anim                 : [[keyframesNone]],
        
        
        
        filterExcited        : [['invert(80%)']],
        
        '@keyframes excited' : keyframesExcited,
        animExcited          : [['150ms', 'ease', 'both', 'alternate-reverse', 5, keyframesExcited]],
        //#endregion animations
    };
}, { prefix: 'bsc' });



// react components:

export interface BasicProps<TElement extends HTMLElement = HTMLElement>
    extends
        ElementProps<TElement>,
        
        // layouts:
        SizeVariant,
        // OrientationVariant,
        // NudeVariant,
        
        // colors:
        ThemeVariant,
        GradientVariant,
        OutlinedVariant,
        MildVariant
{
}
export function Basic<TElement extends HTMLElement = HTMLElement>(props: BasicProps<TElement>) {
    // styles:
    const sheet           = useBasicSheet();
    
    
    
    // variants:
    const sizeVariant     = useSizeVariant(props);
    
    const themeVariant    = useThemeVariant(props);
    const gradientVariant = useGradientVariant(props);
    const outlinedVariant = useOutlinedVariant(props);
    const mildVariant     = useMildVariant(props);
    
    
    
    // jsx:
    return (
        <Element<TElement>
            // other props:
            {...props}
            
            
            
            // classes:
            mainClass={props.mainClass ?? sheet.main}
            variantClasses={[...(props.variantClasses ?? []),
                sizeVariant.class,

                themeVariant.class,
                gradientVariant.class,
                outlinedVariant.class,
                mildVariant.class,
            ]}
        />
    );
}
export { Basic as default }
