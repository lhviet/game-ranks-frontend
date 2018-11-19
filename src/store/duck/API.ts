import config, {BuildLevel} from "^/config";

export const exhaustiveCheck: (x: never) => never = (x) => {
  throw new Error(`Unexpected object : ${x}`);
};

export const protocol: string = 'http';
export let serverHostname: string;
if (!config.isBrowser || config.isNotProduction) {
  serverHostname = 'ec2-13-125-251-167.ap-northeast-2.compute.amazonaws.com:3008';
} else {
  switch (config.buildLevel) {
    case BuildLevel.DEVELOPMENT:
      serverHostname = 'ec2-13-125-251-167.ap-northeast-2.compute.amazonaws.com:3008';
      break;
    case BuildLevel.PRODUCTION:
      serverHostname = 'ec2-13-125-251-167.ap-northeast-2.compute.amazonaws.com:3008';
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
