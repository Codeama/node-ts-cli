import { promisify } from 'util';
import { exec } from 'child_process';
import { green, red } from 'chalk';

const { log } = console;
const install = promisify(exec);

/**
 * Installs dependencies
 * @param command - command to execute
 * @param endMsg - message to log on completion
 */
export async function execInstall(command: string, endMsg?: string) {
  try {
    const { stderr } = await install(command);
    if (endMsg) {
      log(green(`${endMsg}`));
    }
    log(`${stderr}`);
  } catch (err) {
    log(
      red(
        `Uh oh! Something went wrong.\n Please check your package.json to ensure you have basic dependencies.`,
      ),
    );
  }
}
