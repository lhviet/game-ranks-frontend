import { RouterState as RS } from 'connected-react-router';

export type RouterState = RS;

/**
 * Enum for Win-Loss status
 */
export enum WinLossStatus {
  WIN = 1,
  LOSS = 0,
}

/**
 * Enum for representing API status
 */
export enum APIStatus {
  IDLE = 'IDLE',
  PROGRESS = 'PROGRESS',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export const HEADER_JSON: object = { 'Content-Type': 'application/json' };

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
export interface User extends BaseContent {
  readonly value: {
    username: string;
    display_name: string;
    updated_at: number;
    created_at: number;
  };
}

export interface GameState {
  readonly games: Game[];
  readonly getGamesStatus: APIStatus;
  readonly addMatchStatus: APIStatus;
}
export interface UserState {
  readonly user: {
    [user_keyid: string]: User;
  };
  readonly userIds: number[];
  readonly getUsersStatus: APIStatus;
  readonly addUsersStatus: APIStatus;
}

export interface State {
  readonly Game: GameState;
  readonly User: UserState;

  readonly router: RouterState;
}
