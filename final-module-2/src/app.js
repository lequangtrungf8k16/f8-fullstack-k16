import header from "./components/header";
import sidebar from "./components/sidebar";

function app() {
    return `
${header()}

${sidebar()}

`;
}

export default app;
