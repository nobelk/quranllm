import { loadIndex, queryData, getConfig, initializeSettings } from './src/index.js';
import yoctoSpinner from 'yocto-spinner';

async function main() {
    const config = getConfig();
    initializeSettings(config);

    const index = await loadIndex(config);

    let query = "What is the first verse of al-fatiha?";
    console.log("Question: " + query)
    let spinner = yoctoSpinner({text: "Answer: "}).start();
    let answer = await queryData(index, query);
    spinner.success(answer);

    query = "Which path do we seek according to al-fatiha?"
    console.log("Question: " + query)
    spinner = yoctoSpinner({text: "Answer: "}).start();
    answer = await queryData(index, query);
    spinner.success(answer);

    query = "What is the ruling about debt?"
    console.log("Question: " + query)
    spinner = yoctoSpinner({text: "Answer: "}).start();
    answer = await queryData(index, query);
    spinner.success(answer);
}


main().catch(console.error);