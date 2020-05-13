export declare type KenduApplicationTheme = {
    canvasBackground: string;
    canvasText: string;
    primaryBackground: string;
    primaryText: string;
};
export declare type KenduApplicationIcon = {
    src: string;
    sizes?: number[];
};
export declare type KenduApplicationSymlink = {
    link: string;
    origin: string;
};
export declare type KenduApplication = {
    name: string;
    shorName: string;
    description: string;
    favicon?: string;
    theme: KenduApplicationTheme;
    lang: string;
    icons: KenduApplicationIcon[];
    rootDir: string;
    sourceDir: string;
    outputDir: string;
    modulesDir: string;
    entries: {
        [name: string]: string;
    };
    symlinks: KenduApplicationSymlink[];
    compilerOptions: {};
};
export declare type KenduDevBundlerConfig = {
    production: boolean;
    rootDir: string;
    watch: boolean;
};
//# sourceMappingURL=declarations.d.ts.map