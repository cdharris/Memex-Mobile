export const injectScript = ({
    doc = 'window.document',
    // NOTE: This path to this file doesn't work...
    scriptPath = 'ContentScript.bundle/index.js',
}) => `
    const script = ${doc}.createElement('script');
    script.src = '${scriptPath}';

    ${doc}.head.appendChild(script);
    true;
`
