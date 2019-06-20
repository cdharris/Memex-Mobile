const scriptsToString = (srcs: string[]): string => {
    const str = srcs.reduce((str, src) => `${str}'${src}',`, '[')
    return str.slice(0, str.length - 1) + ']'
}

export const injectScripts = (
    { doc = 'window.document', srcs } : { doc?: string, srcs: string[] }
): string => `
    for (const path of ${scriptsToString(srcs)}) {
        const script = ${doc}.createElement('script');
        script.src = path;

        ${doc}.head.appendChild(script);
    }
    true;
`
