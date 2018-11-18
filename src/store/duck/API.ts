import config, {BuildLevel} from "^/config";

export const exhaustiveCheck: (x: never) => never = (x) => {
  throw new Error(`Unexpected object : ${x}`);
};

export const protocol: string = 'http';
export let serverHostname: string;
if (!config.isBrowser || config.isNotProduction) {
  serverHostname = 'localhost:3001';
} else {
  switch (config.buildLevel) {
    case BuildLevel.DEVELOPMENT:
      serverHostname = 'localhost:3001';
      break;
    case BuildLevel.PRODUCTION:
      serverHostname = 'localhost:3001';
      break;
    default:
      exhaustiveCheck(config.buildLevel);
  }
}

export const makeAPIURL: (
  ...path: Array<string>
) => string = (
  ...path
) => `${protocol}://${serverHostname}/${path.join('/')}`;
