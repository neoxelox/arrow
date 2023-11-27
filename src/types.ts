export enum ToastType {
  SUCCESS = 0,
  INFO,
  WARNING,
  ERROR,
}

export type Toast = {
  id: number;
  type: ToastType;
  message: string;
  dismissible: boolean;
  timeout?: number;
};

export enum DeviceType {
  SENSOR = 0,
  ACTUATOR,
}

export enum DeviceSubtype {
  BUTTON = 0,
  BISTATE,
}

export type DeviceContextButton = {
  command: string;
  emoji: string;
};

export type DeviceContextBistate = {
  identifier_1: string;
  emoji_1: string;
  identifier_2: string;
  emoji_2: string;
  state: number;
};

export type DeviceContext = DeviceContextButton | DeviceContextBistate;

export type Device = {
  name: string;
  type: DeviceType;
  subtype: DeviceSubtype;
  protocol: number;
  context: DeviceContext;
  emoji: string;
  creator: string;
  created_at: Date;
};

export type Trigger = {
  name: string;
  actuator: string;
  schedule: string;
  emoji: string;
  creator: string;
  created_at: Date;
};

export type User = {
  name: string;
  role: string;
  emoji: string;
  created_at: Date;
};

export type Role = {
  name: string;
  devices: string[];
  emoji: string;
  creator: string;
  created_at: Date;
};

export type NetworkIP = {
  address: string;
  netmask: string;
  gateway: string;
};

export type NetworkDNS = {
  main: string;
  backup: string;
};

export type Network = {
  name: string;
  strength: number;
  security: string;
  ip?: NetworkIP;
  mac?: string;
  dns?: NetworkDNS;
};

export enum ApiErrorCode {
  ERR_INVALID_REQUEST = 0,
  ERR_UNAUTHORIZED,
  ERR_NO_PERMISSION,
  ERR_NOT_FOUND,
  ERR_SERVER_GENERIC,
}

export class ApiError extends Error {
  public code: ApiErrorCode;
  public status: number;

  public constructor(code: ApiErrorCode, message: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export type PostLoginRequest = {
  name: string;
  password: string;
};

export type PostLoginResponse = {
  name: string;
  token: string;
  role: string;
  emoji: string;
  created_at: number;
};

export type PostLogoutRequest = Record<PropertyKey, never>;

export type PostLogoutResponse = Record<PropertyKey, never>;

export type GetDevicesRequest = Record<PropertyKey, never>;

export enum GetDevicesResponseDeviceType {
  SENSOR = 0,
  ACTUATOR,
}

export enum GetDevicesResponseDeviceSubtype {
  BUTTON = 0,
  BISTATE,
}

export type GetDevicesResponseDeviceContextButton = {
  command: string;
  emoji: string;
};

export type GetDevicesResponseDeviceContextBistate = {
  identifier_1: string;
  emoji_1: string;
  identifier_2: string;
  emoji_2: string;
  state: number;
};

export type GetDevicesResponseDeviceContext =
  | GetDevicesResponseDeviceContextButton
  | GetDevicesResponseDeviceContextBistate;

export type GetDevicesResponseDevice = {
  name: string;
  type: GetDevicesResponseDeviceType;
  subtype: GetDevicesResponseDeviceSubtype;
  protocol: number;
  context: GetDevicesResponseDeviceContext;
  emoji: string;
  creator: string;
  created_at: number;
};

export type GetDevicesResponse = {
  devices: GetDevicesResponseDevice[];
};

export type PostDeviceActuateRequest = Record<PropertyKey, never>;

export type PostDeviceActuateResponse = Record<PropertyKey, never>;

export type GetTriggersRequest = Record<PropertyKey, never>;

export type GetTriggersResponseTrigger = {
  name: string;
  actuator: string;
  schedule: string;
  emoji: string;
  creator: string;
  created_at: number;
};

export type GetTriggersResponse = {
  triggers: GetTriggersResponseTrigger[];
};

export type GetUsersRequest = Record<PropertyKey, never>;

export type GetUsersResponseUser = {
  name: string;
  role: string;
  emoji: string;
  created_at: number;
};

export type GetUsersResponse = {
  users: GetUsersResponseUser[];
};

export type GetRolesRequest = Record<PropertyKey, never>;

export type GetRolesResponseRole = {
  name: string;
  devices: string[];
  emoji: string;
  creator: string;
  created_at: number;
};

export type GetRolesResponse = {
  roles: GetRolesResponseRole[];
};

export type GetSystemInfoRequest = Record<PropertyKey, never>;

export type GetSystemInfoResponse = Record<PropertyKey, string>;

export type GetSystemTimeRequest = Record<PropertyKey, never>;

export type GetSystemTimeResponse = {
  time: number;
  zone: string;
};

export type GetSystemWiFiRequest = Record<PropertyKey, never>;

export type GetSystemWiFiResponseCurrentNetworkIP = {
  address: string;
  netmask: string;
  gateway: string;
};

export type GetSystemWiFiResponseCurrentNetworkDNS = {
  main: string;
  backup: string;
};

export type GetSystemWiFiResponseCurrentNetwork = {
  name: string;
  strength: number;
  security: string;
  ip: GetSystemWiFiResponseCurrentNetworkIP;
  mac: string;
  dns: GetSystemWiFiResponseCurrentNetworkDNS;
};

export type GetSystemWiFiResponseAvailableNetwork = {
  name: string;
  strength: number;
  security: string;
};

export type GetSystemWiFiResponse = {
  current?: GetSystemWiFiResponseCurrentNetwork;
  available: GetSystemWiFiResponseAvailableNetwork[];
};
