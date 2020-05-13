"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseValue = (value) => {
    switch (typeof value) {
        case 'string':
            return value;
        case 'function':
            return String(value());
        case 'object':
            return Object.entries(value)
                .filter(([_name, value]) => !(value === false))
                .map(([name, value]) => (typeof value === 'boolean') ? name : `${name}="${value}"`)
                .join(' ');
        default:
            return '';
    }
};
const html = (parts, ...attrs) => parts.reduce((html, string, i) => html + string + parseValue(attrs[i]), '');
exports.default = (templateParameters) => {
    const meta = templateParameters.meta;
    const link = templateParameters.link;
    const script = templateParameters.script;
    const all = [
        html `<title>${templateParameters.title}</title>`,
        html `<base ${{ href: templateParameters.base }}/>`,
        ...meta.map((props) => html `<meta ${props}/>`),
        ...link.map((props) => html `<link ${props}/>`),
        ...script.map((props) => html `<script ${props}></script>`),
    ].map((s) => '    ' + s).join('\n');
    return html `<!DOCTYPE html>
<html ${{ lang: templateParameters.lang }}>
  <head>
${all}
  </head>
  <body class="kd-blackboard">
    <app-ui></ui-view>
  </body>
</html>
`;
};
