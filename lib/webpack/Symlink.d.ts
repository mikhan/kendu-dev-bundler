import type { Compiler } from 'webpack';
declare type Link = {
    origin: string;
    link: string;
};
export declare class CreateSymlinkPlugin {
    private options;
    constructor(options: Link[]);
    apply(compiler: Compiler): void;
}
export {};
//# sourceMappingURL=Symlink.d.ts.map