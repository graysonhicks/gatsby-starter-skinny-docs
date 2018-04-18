import { injectGlobal } from 'styled-components';

injectGlobal`

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    table {
        border-collapse: collapse;
    }
    table,
    th,
    td {
        border: 1px solid black;
        padding: 5px;
    }

    html {
        font-size: 10px;
    }

    body {
        font-family: 'Avenir', 'Helvetica Neue', sans-serif;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    ul,
    ol,
    dl {
        margin: 30px 0;
    }

    li,
    li > *,
    dt,
    dd {
        margin: 10px 0;
    }

    pre,
    code {
        font-family: 'Space Mono', monospace;
    }

    h1 {
        font-size: 4rem;
    }
    h2 {
        font-size: 3.5rem;
    }
    h3 {
        font-size: 3rem;
    }
    h4 {
        font-size: 2.4rem;
    }
    h5 {
        font-size: 2rem;
    }
    h6 {
        font-size: 1.6rem;
    }

    p,
    a,
    li,
    dt,
    dd,
    tr,
    th {
        font-size: 1.8rem;
    }

    a {
        text-decoration: none;
    }
    a:hover {
        border-bottom: 1px solid white;
    }

`;
