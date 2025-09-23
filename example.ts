import { loadAndIndexData } from './src/core/index';
import { queryData } from './src/core/query';
import { getConfig, initializeSettings } from './src/utils/config';
import yoctoSpinner from 'yocto-spinner';

async function main() {
    const config = getConfig();
    initializeSettings(config);

    const index = await loadAndIndexData(config, { shouldIndex: false });

    let query = "What is the first verse of al-fatiha?";
    let spinner = yoctoSpinner({text: query}).start();
    let answer = await queryData(index, query);
    spinner.success(answer);

    query = "Which path do we seek according to al-fatiha?"
    spinner = yoctoSpinner({text: query}).start();
    answer = await queryData(index, query);
    spinner.success(answer);
}


main().catch(console.error);