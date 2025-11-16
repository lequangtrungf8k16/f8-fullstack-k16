import header from "./components/header";
import sidebar from "./components/sidebar";

function app() {
    return `
${sidebar()}

${header()}

`;
}

export default app;
