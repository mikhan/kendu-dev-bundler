import type { Compiler } from 'webpack'
import path from 'path'
import { promises as fs, existsSync as exists } from 'fs'

type Link = {
    origin: string
    link: string
}

async function createSymlink(outputDir: string, link: string, origin: string) {

    link = path.resolve(outputDir, link)
    const linkExists = exists(link)
    if (linkExists) return

    origin = path.resolve(outputDir, origin)
    const originExists = exists(origin)
    if (!originExists) return

    const stat = await fs.lstat(origin)

    if (stat.isDirectory()) {
        await fs.symlink(origin, link, 'junction')
    } else {
        await fs.link(origin, link)
    }
}

export class CreateSymlinkPlugin {
    constructor(private options: Link[]) { }

    apply(compiler: Compiler) {
        compiler.hooks.done.tapAsync('CreateSymlinkPlugin', (_stats, callback) => {
            const outputDir = path.resolve(compiler.options.output?.path ?? '')

            for (let { link, origin } of this.options) {
                createSymlink(outputDir, link, origin)
            }

            callback()
        })
    }
}