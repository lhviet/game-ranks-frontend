// DEBUG: console.log(process.env);

/**
 * enum representing build level
 */
export enum BuildLevel {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

interface Config {
  env: string;
  buildLevel: BuildLevel;
  isNotProduction: boolean;
  isBrowser: boolean;
}


const rootConfig: { all: Config } = {
  all: {
    //tslint:disable: strict-type-predicates strict-boolean-expressions
    env: process.env.NODE_ENV || 'development' as string,
    buildLevel: process.env.BUILD_LEVEL as (BuildLevel | undefined) || BuildLevel.PRODUCTION,
    /**
     * @fixme
     * `isNotProduciton` is not a valid explanation.
     * `isNotLocal` or `isDeployed` is better term for this property.
     * Please fix this.
     */
    isNotProduction: process.env.NODE_ENV !== 'production',
    isBrowser: window !== undefined,
    //tslint:enable: strict-type-predicates strict-boolean-expressions
  },
};

const config: Config = rootConfig.all;

export default config;
