export const injectScript = ({
    doc = window.document,
    scriptPath = 'ContentScript.bundle/index.js'
}) => {
return `
    const script = ${doc}.createElement('script');
    script.src = ${scriptPath};

    ${doc}.head.appendChild(script);
    true
`}
