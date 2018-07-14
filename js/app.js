import { Main } from "./main.js";
import { Form } from "./form.js";
import { Comments } from "./comments.js";

(function () {
    window.addEventListener('load', () => {
        // Variables
        const main = new Main();
        const form = new Form();
        const comments = new Comments();
    });
})();
