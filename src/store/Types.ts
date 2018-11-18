import { RouterState as RS } from 'connected-react-router';

export type RouterState = RS;

/**
 * Enum for representing API status
 */
export enum APIStatus {
  IDLE = 'IDLE',
  PROGRESS = 'PROGRESS',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export interface BaseContent {
  readonly keyid: string;
  readonly value: unknown;
}
export interface Game extends BaseContent {
  readonly value: {
    code: string;
    name: string;
    description: string;
    updated_at: number;
    created_at: number;
  };
}

export interface GameState {
  readonly games: {
    readonly [id: number]: Game;
  };
  readonly allIds: Game['keyid'][];
  readonly getGamesStatus: APIStatus;
}

export interface State {
  readonly Game: GameState;

  readonly router: RouterState;
}
