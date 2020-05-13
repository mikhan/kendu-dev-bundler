const parseValue = (value: any) => {
    switch (typeof value) {
        case 'string':
            return value

        case 'function':
            return String(value())

        case 'object':
            return Object.entries(value)
                .filter(([_name, value]) => !(value === false))
                .map(([name, value]) => (typeof value === 'boolean') ? name : `${name}="${value}"`)
                .join(' ')

        default:
            return ''
    }
}

const html = (parts: TemplateStringsArray, ...attrs: Array<any>) => parts.reduce((html, string, i) => html + string + parseValue(attrs[i]), '')

export default (templateParameters: { [key: string]: any }) => {
    const meta: object[] = templateParameters.meta
    const link: object[] = templateParameters.link
    const script: object[] = templateParameters.script
    const all = [
        html`<title>${templateParameters.title}</title>`,
        html`<base ${{href: templateParameters.base}}/>`,
        ...meta.map((props) => html`<meta ${props}/>`),
        ...link.map((props) => html`<link ${props}/>`),
        ...script.map((props) => html`<script ${props}></script>`),
    ].map((s) => '    ' + s).join('\n')


    return html`<!DOCTYPE html>
<html ${{lang: templateParameters.lang}}>
  <head>
${all}
  </head>
  <body class="kd-blackboard">
    <app-ui></ui-view>
  </body>
</html>
`
}
