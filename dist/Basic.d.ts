import { default as React } from 'react';
import type { Cust, PropEx } from '@cssfn/css-types';
import { StyleCollection, SelectorCollection } from '@cssfn/cssfn';
import { themes as colorThemes } from '@nodestrap/colors';
import { ElementProps } from '@nodestrap/element';
export declare type SizeName = 'sm' | 'lg' | (string & {});
export interface SizeVars {
}
export declare const isSize: (sizeName: SizeName, styles: StyleCollection) => import("@cssfn/cssfn").Rule;
/**
 * Uses basic sizes.
 * For example: `sm`, `lg`.
 * @param factory Customize the callback to create sizing definitions for each size in `options`.
 * @param options Customize the size options.
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents sizing definitions for each size in `options`.
 */
export declare const usesSizeVariant: (factory?: (sizeName: SizeName) => StyleCollection, options?: SizeName[]) => readonly [() => import("@cssfn/cssfn").Rule, import("@cssfn/css-var").ReadonlyRefs<SizeVars>, import("@cssfn/css-var").ReadonlyDecls<SizeVars>];
/**
 * Creates sizing definitions for the given `sizeName`.
 * @param sizeName The given size name written in camel case.
 * @returns A `Rule` represents sizing definitions for the given `sizeName`.
 */
export declare const sizeOf: (sizeName: SizeName) => import("@cssfn/cssfn").Rule;
/**
 * Gets the all available size options.
 * @returns A `SizeName[]` represents the all available size options.
 */
export declare const sizeOptions: () => SizeName[];
export interface SizeVariant {
    size?: SizeName;
}
export declare const useSizeVariant: (props: SizeVariant) => {
    class: string | null;
};
export declare type OrientationName = 'block' | 'inline';
export interface OrientationRuleOptions {
    defaultOrientation?: OrientationName;
    orientationBlockSelector?: SelectorCollection;
    orientationInlineSelector?: SelectorCollection;
}
export declare const defaultBlockOrientationRuleOptions: OrientationRuleOptions;
export declare const defaultInlineOrientationRuleOptions: OrientationRuleOptions;
export declare const normalizeOrientationRule: (options: OrientationRuleOptions | undefined, defaultOptions: OrientationRuleOptions) => Required<OrientationRuleOptions>;
export declare const usesOrientationRule: (options?: OrientationRuleOptions | undefined) => readonly [false | import("@cssfn/cssfn").Selector | import("@cssfn/types").DeepArray<import("@cssfn/types").OptionalOrFalse<import("@cssfn/cssfn").Selector>> | null, false | import("@cssfn/cssfn").Selector | import("@cssfn/types").DeepArray<import("@cssfn/types").OptionalOrFalse<import("@cssfn/cssfn").Selector>> | null];
export interface OrientationVariant {
    orientation?: OrientationName;
}
export declare const useOrientationVariant: (props: OrientationVariant) => {
    class: OrientationName | null;
};
export declare const notNude: (styles: StyleCollection) => import("@cssfn/cssfn").Rule;
export declare const isNude: (styles: StyleCollection) => import("@cssfn/cssfn").Rule;
export declare const usesNudeVariant: () => import("@cssfn/cssfn").Rule;
export interface NudeVariant {
    nude?: boolean;
}
export declare const useNudeVariant: (props: NudeVariant) => {
    class: string | null;
};
export declare type ThemeName = (keyof typeof colorThemes) | (string & {});
export interface ThemeVars {
    /**
     * themed foreground color.
     */
    foreg: any;
    /**
     * themed background color.
     */
    backg: any;
    /**
     * themed border color.
     */
    border: any;
    /**
     * themed foreground color - at outlined variant.
     */
    foregOutlined: any;
    /**
     * themed foreground color - at mild variant.
     */
    foregMild: any;
    /**
     * themed background color - at mild variant.
     */
    backgMild: any;
    /**
     * themed focus color - at focused state.
     */
    focus: any;
    /**
     * conditional unthemed foreground color.
     */
    foregCond: any;
    /**
     * conditional unthemed background color.
     */
    backgCond: any;
    /**
     * conditional unthemed border color.
     */
    borderCond: any;
    /**
     * conditional unthemed foreground color - at outlined variant.
     */
    foregOutlinedCond: any;
    /**
     * conditional unthemed foreground color - at mild variant.
     */
    foregMildCond: any;
    /**
     * conditional unthemed background color - at mild variant.
     */
    backgMildCond: any;
    /**
     * conditional unthemed focus color - at focused state.
     */
    focusCond: any;
    /**
     * important conditional unthemed foreground color.
     */
    foregImpt: any;
    /**
     * important conditional unthemed background color.
     */
    backgImpt: any;
    /**
     * important conditional unthemed border color.
     */
    borderImpt: any;
    /**
     * important conditional unthemed foreground color - at outlined variant.
     */
    foregOutlinedImpt: any;
    /**
     * important conditional unthemed foreground color - at mild variant.
     */
    foregMildImpt: any;
    /**
     * important conditional unthemed background color - at mild variant.
     */
    backgMildImpt: any;
    /**
     * important conditional unthemed focus color - at focused state.
     */
    focusImpt: any;
}
export declare const isTheme: (themeName: ThemeName, styles: StyleCollection) => import("@cssfn/cssfn").Rule;
/**
 * Uses theme colors.
 * For example: `primary`, `secondary`, `danger`, `success`, etc.
 * @param factory Customize the callback to create color definitions for each color in `options`.
 * @param options Customize the color options.
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents color definitions for each color in `options`.
 */
export declare const usesThemeVariant: (factory?: (themeName: ThemeName) => StyleCollection, options?: ThemeName[]) => readonly [() => import("@cssfn/cssfn").Rule, import("@cssfn/css-var").ReadonlyRefs<ThemeVars>, import("@cssfn/css-var").ReadonlyDecls<ThemeVars>];
/**
 * Creates color definitions for the given `themeName`.
 * @param themeName The given theme name written in camel case.
 * @returns A `Rule` represents color definitions for the given `themeName`.
 */
export declare const themeOf: (themeName: ThemeName) => import("@cssfn/cssfn").Rule;
/**
 * Gets the all available theme options.
 * @returns A `ThemeName[]` represents the all available theme options.
 */
export declare const themeOptions: () => ThemeName[];
/**
 * Creates the default color definitions for unspecified `themeName`.
 * @param themeName The theme name as the default, written in camel case -or- `null`.
 * @returns A `Rule` represents color definitions for the default `themeName`.
 */
export declare const usesThemeDefault: (themeName?: ThemeName | null) => import("@cssfn/cssfn").Rule;
/**
 * Creates a conditional color definitions for the given `themeName`.
 * @param themeName The given theme name written in camel case -or- `null` to keep the current theme.
 * @returns A `Rule` represents the conditional color definitions for the given `themeName`.
 */
export declare const usesThemeCond: (themeName: ThemeName | null) => import("@cssfn/cssfn").Rule;
/**
 * Creates an important conditional color definitions for the given `themeName`.
 * @param themeName The given theme name written in camel case -or- `null` to keep the current theme.
 * @returns A `Rule` represents the important conditional color definitions for the given `themeName`.
 */
export declare const usesThemeImpt: (themeName: ThemeName | null) => import("@cssfn/cssfn").Rule;
export interface ThemeVariant {
    theme?: ThemeName;
}
export declare const useThemeVariant: (props: ThemeVariant, themeDefault?: ThemeName | undefined) => {
    class: string | null;
};
export interface GradientVars {
    /**
     * toggles on background gradient - at gradient variant.
     */
    backgGradTg: any;
}
export declare const notGradient: (styles: StyleCollection) => import("@cssfn/cssfn").Rule;
export declare const isGradient: (styles: StyleCollection) => import("@cssfn/cssfn").Rule;
/**
 * Uses toggleable gradient.
 * @param factory Customize the callback to create gradient definitions for each toggle state.
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents toggleable gradient definitions.
 */
export declare const usesGradientVariant: (factory?: (toggle?: boolean | null | undefined) => StyleCollection) => readonly [() => import("@cssfn/cssfn").Rule, import("@cssfn/css-var").ReadonlyRefs<GradientVars>, import("@cssfn/css-var").ReadonlyDecls<GradientVars>];
/**
 * Creates gradient definitions based on the given `toggle`.
 * @param toggle `true` to activate the gradient -or- `false` to deactivate -or- `null` to keep the original.
 * @returns A `Rule` represents gradient definitions based on the given `toggle`.
 */
export declare const gradientOf: (toggle?: (boolean | null)) => import("@cssfn/cssfn").Rule;
export interface GradientVariant {
    gradient?: boolean;
}
export declare const useGradientVariant: (props: GradientVariant) => {
    class: string | null;
};
export interface OutlinedVars {
    /**
     * functional foreground color - at outlined variant.
     */
    foregFn: any;
    /**
     * toggles on foreground color - at outlined variant.
     */
    foregTg: any;
    /**
     * functional background color - at outlined variant.
     */
    backgFn: any;
    /**
     * toggles on background color - at outlined variant.
     */
    backgTg: any;
}
export declare const notOutlined: (styles: StyleCollection) => import("@cssfn/cssfn").Rule;
export declare const isOutlined: (styles: StyleCollection) => import("@cssfn/cssfn").Rule;
/**
 * Uses toggleable outlining.
 * @param factory Customize the callback to create outlining definitions for each toggle state.
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents toggleable outlining definitions.
 */
export declare const usesOutlinedVariant: (factory?: (toggle?: boolean | null | undefined) => StyleCollection) => readonly [() => import("@cssfn/cssfn").Rule, import("@cssfn/css-var").ReadonlyRefs<OutlinedVars>, import("@cssfn/css-var").ReadonlyDecls<OutlinedVars>];
/**
 * Creates outlining definitions based on the given `toggle`.
 * @param toggle `true` to activate the outlining -or- `false` to deactivate -or- `null` to keep the original.
 * @returns A `Rule` represents outlining definitions based on the given `toggle`.
 */
export declare const outlinedOf: (toggle?: (boolean | null)) => import("@cssfn/cssfn").Rule;
export interface OutlinedVariant {
    outlined?: boolean;
}
export declare const useOutlinedVariant: (props: OutlinedVariant) => {
    class: string | null;
};
export interface MildVars {
    /**
     * functional foreground color - at mild variant.
     */
    foregFn: any;
    /**
     * toggles on foreground color - at mild variant.
     */
    foregTg: any;
    /**
     * functional background color - at mild variant.
     */
    backgFn: any;
    /**
     * toggles on background color - at mild variant.
     */
    backgTg: any;
}
export declare const notMild: (styles: StyleCollection) => import("@cssfn/cssfn").Rule;
export declare const isMild: (styles: StyleCollection) => import("@cssfn/cssfn").Rule;
/**
 * Uses toggleable mildification.
 * @param factory Customize the callback to create mildification definitions for each toggle state.
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents toggleable mildification definitions.
 */
export declare const usesMildVariant: (factory?: (toggle?: boolean | null | undefined) => StyleCollection) => readonly [() => import("@cssfn/cssfn").Rule, import("@cssfn/css-var").ReadonlyRefs<MildVars>, import("@cssfn/css-var").ReadonlyDecls<MildVars>];
/**
 * Creates mildification definitions based on the given `toggle`.
 * @param toggle `true` to activate the mildification -or- `false` to deactivate -or- `null` to keep the original.
 * @returns A `Rule` represents mildification definitions based on the given `toggle`.
 */
export declare const mildOf: (toggle?: (boolean | null)) => import("@cssfn/cssfn").Rule;
export interface MildVariant {
    mild?: boolean;
}
export declare const useMildVariant: (props: MildVariant) => {
    class: string | null;
};
export interface ForegVars {
    /**
     * functional foreground color.
     */
    foregFn: any;
    /**
     * final foreground color.
     */
    foreg: any;
}
/**
 * Uses foreground color (text color).
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents foreground color definitions.
 */
export declare const usesForeg: () => readonly [() => import("@cssfn/cssfn").Rule, import("@cssfn/css-var").ReadonlyRefs<ForegVars>, import("@cssfn/css-var").ReadonlyDecls<ForegVars>];
export interface BackgVars {
    /**
     * none background.
     */
    backgNone: any;
    /**
     * functional background color.
     */
    backgFn: any;
    /**
     * final background color.
     */
    backgCol: any;
    /**
     * final background layers.
     */
    backg: any;
}
/**
 * Uses background layer(s).
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents background layer(s) definitions.
 */
export declare const usesBackg: () => readonly [() => import("@cssfn/cssfn").Rule, import("@cssfn/css-var").ReadonlyRefs<BackgVars>, import("@cssfn/css-var").ReadonlyDecls<BackgVars>];
export interface BorderVars {
    /**
     * functional border color.
     */
    borderFn: any;
    /**
     * final border color.
     */
    borderCol: any;
}
/**
 * Uses border color.
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents border color definitions.
 */
export declare const usesBorder: () => readonly [() => import("@cssfn/cssfn").Rule, import("@cssfn/css-var").ReadonlyRefs<BorderVars>, import("@cssfn/css-var").ReadonlyDecls<BorderVars>];
export interface BorderStrokeVars {
    /**
     * final border mix (style, width, color, etc).
     */
    border: any;
    /**
     * final border width.
     */
    borderWidth: any;
}
/**
 * Uses border stroke.
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents border stroke definitions.
 */
export declare const usesBorderStroke: () => readonly [() => import("@cssfn/cssfn").Rule, import("@cssfn/css-var").ReadonlyRefs<BorderStrokeVars>, import("@cssfn/css-var").ReadonlyDecls<BorderStrokeVars>];
export declare const expandBorderStroke: (cssProps?: {
    border: Cust.Ref;
    borderWidth: Cust.Ref;
} | undefined) => import("@cssfn/cssfn").Rule;
export interface BorderRadiusVars {
    borderStartStartRadius: any;
    borderStartEndRadius: any;
    borderEndStartRadius: any;
    borderEndEndRadius: any;
}
/**
 * Uses border radius.
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents border radius definitions.
 */
export declare const usesBorderRadius: () => readonly [() => import("@cssfn/cssfn").Rule, import("@cssfn/css-var").ReadonlyRefs<BorderRadiusVars>, import("@cssfn/css-var").ReadonlyDecls<BorderRadiusVars>];
export declare const expandBorderRadius: (cssProps?: {
    borderRadius: Cust.Ref;
} | undefined) => import("@cssfn/cssfn").Rule;
export interface PaddingVars {
    paddingInline: any;
    paddingBlock: any;
}
/**
 * Uses paddings.
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents paddings definitions.
 */
export declare const usesPadding: () => readonly [() => import("@cssfn/cssfn").Rule, import("@cssfn/css-var").ReadonlyRefs<PaddingVars>, import("@cssfn/css-var").ReadonlyDecls<PaddingVars>];
export declare const expandPadding: (cssProps?: {
    paddingInline: Cust.Ref;
    paddingBlock: Cust.Ref;
} | undefined) => import("@cssfn/cssfn").Rule;
export interface AnimVars {
    /**
     * none boxShadow.
     */
    boxShadowNone: any;
    /**
     * final boxShadow layers.
     */
    boxShadow: any;
    /**
     * none filter.
     */
    filterNone: any;
    /**
     * final filter.
     */
    filter: any;
    /**
     * none transform.
     */
    transfNone: any;
    /**
     * none animation.
     */
    animNone: any;
    /**
     * final animation.
     */
    anim: any;
}
export declare const convertRefToDecl: (ref: Cust.Ref) => Cust.Decl;
export declare const usesAnim: () => readonly [() => import("@cssfn/cssfn").Rule, import("@cssfn/css-var").ReadonlyRefs<AnimVars>, import("@cssfn/css-var").ReadonlyDecls<AnimVars>, {
    readonly boxShadows: () => (Cust.Ref | Cust.General)[];
    readonly registerBoxShadow: (item: Cust.Ref) => Set<Cust.Ref | Cust.General>;
    readonly unregisterBoxShadow: (item: Cust.Ref) => boolean;
    readonly filters: () => (Cust.Ref | Cust.General)[];
    readonly registerFilter: (item: Cust.Ref) => Set<Cust.Ref | Cust.General>;
    readonly unregisterFilter: (item: Cust.Ref) => boolean;
    readonly anims: () => (Cust.Ref | Cust.General)[];
    readonly registerAnim: (item: Cust.Ref) => Set<Cust.Ref | Cust.General>;
    readonly unregisterAnim: (item: Cust.Ref) => boolean;
}];
export declare const isRef: (expr: Cust.Expr) => expr is Cust.Ref;
export declare const filterRef: (expr: Cust.Ref | Cust.General) => expr is Cust.Ref;
export declare const fallbackNoneBoxShadow: (boxShadow: Cust.Ref | Cust.General) => (string & {}) | (number & {});
export declare const fallbackNoneFilter: (filter: Cust.Ref | Cust.General) => (string & {}) | (number & {});
export declare const fallbackNoneTransf: (transf: Cust.Ref | Cust.General) => (string & {}) | (number & {});
export declare const fallbackNoneAnim: (anim: Cust.Ref | Cust.General) => (string & {}) | (number & {});
export interface ExcitedVars {
    filter: any;
    anim: any;
}
export declare const isExcited: (styles: StyleCollection) => import("@cssfn/cssfn").Rule;
export declare const notExcited: (styles: StyleCollection) => import("@cssfn/cssfn").Rule;
/**
 * Uses excited states.
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents excited state definitions.
 */
export declare const usesExcitedState: () => readonly [() => import("@cssfn/cssfn").Rule, import("@cssfn/css-var").ReadonlyRefs<ExcitedVars>, import("@cssfn/css-var").ReadonlyDecls<ExcitedVars>];
export declare const useExcitedState: (props: TogglerExcitedProps) => {
    excited: boolean;
    class: string | null;
    handleAnimationEnd: (e: React.AnimationEvent<HTMLElement>) => void;
};
export interface TogglerExcitedProps {
    excited?: boolean;
    onExcitedChange?: (newExcited: boolean) => void;
}
export declare const usesBasicLayout: () => import("@cssfn/cssfn").Rule;
export declare const usesBasicVariants: () => import("@cssfn/cssfn").Rule;
export declare const useBasicSheet: import("@cssfn/types").Factory<import("jss").Classes<"main">>;
export declare const cssProps: import("@cssfn/css-config").Refs<{
    foreg: string;
    backg: string;
    backgGrad: string[][];
    border: Cust.Ref[][];
    borderWidth: Cust.Ref;
    borderColor: Cust.Ref;
    borderRadius: Cust.Ref;
    borderRadiusSm: Cust.Ref;
    borderRadiusLg: Cust.Ref;
    paddingInline: string[][];
    paddingBlock: string[][];
    paddingInlineSm: Cust.Ref;
    paddingBlockSm: Cust.Ref;
    paddingInlineLg: Cust.Ref;
    paddingBlockLg: Cust.Ref;
    opacity: number;
    fontSize: Cust.Ref;
    fontSizeSm: string[][];
    fontSizeLg: Cust.Ref;
    fontFamily: string;
    fontWeight: string;
    fontStyle: string;
    textDecoration: string;
    lineHeight: string;
    transDuration: string;
    transition: string[][];
    '@keyframes none': PropEx.Keyframes;
    filterExcited: string[][];
    '@keyframes excited': PropEx.Keyframes;
    animExcited: (string | number | PropEx.Keyframes)[][];
}>, cssDecls: import("@cssfn/css-config").Decls<{
    foreg: string;
    backg: string;
    backgGrad: string[][];
    border: Cust.Ref[][];
    borderWidth: Cust.Ref;
    borderColor: Cust.Ref;
    borderRadius: Cust.Ref;
    borderRadiusSm: Cust.Ref;
    borderRadiusLg: Cust.Ref;
    paddingInline: string[][];
    paddingBlock: string[][];
    paddingInlineSm: Cust.Ref;
    paddingBlockSm: Cust.Ref;
    paddingInlineLg: Cust.Ref;
    paddingBlockLg: Cust.Ref;
    opacity: number;
    fontSize: Cust.Ref;
    fontSizeSm: string[][];
    fontSizeLg: Cust.Ref;
    fontFamily: string;
    fontWeight: string;
    fontStyle: string;
    textDecoration: string;
    lineHeight: string;
    transDuration: string;
    transition: string[][];
    '@keyframes none': PropEx.Keyframes;
    filterExcited: string[][];
    '@keyframes excited': PropEx.Keyframes;
    animExcited: (string | number | PropEx.Keyframes)[][];
}>, cssVals: import("@cssfn/css-config").Vals<{
    foreg: string;
    backg: string;
    backgGrad: string[][];
    border: Cust.Ref[][];
    borderWidth: Cust.Ref;
    borderColor: Cust.Ref;
    borderRadius: Cust.Ref;
    borderRadiusSm: Cust.Ref;
    borderRadiusLg: Cust.Ref;
    paddingInline: string[][];
    paddingBlock: string[][];
    paddingInlineSm: Cust.Ref;
    paddingBlockSm: Cust.Ref;
    paddingInlineLg: Cust.Ref;
    paddingBlockLg: Cust.Ref;
    opacity: number;
    fontSize: Cust.Ref;
    fontSizeSm: string[][];
    fontSizeLg: Cust.Ref;
    fontFamily: string;
    fontWeight: string;
    fontStyle: string;
    textDecoration: string;
    lineHeight: string;
    transDuration: string;
    transition: string[][];
    '@keyframes none': PropEx.Keyframes;
    filterExcited: string[][];
    '@keyframes excited': PropEx.Keyframes;
    animExcited: (string | number | PropEx.Keyframes)[][];
}>, cssConfig: import("@cssfn/css-config").CssConfigSettings;
export interface BasicProps<TElement extends HTMLElement = HTMLElement> extends ElementProps<TElement>, SizeVariant, NudeVariant, ThemeVariant, GradientVariant, OutlinedVariant, MildVariant {
}
export declare function Basic<TElement extends HTMLElement = HTMLElement>(props: BasicProps<TElement>): JSX.Element;
export { Basic as default };
