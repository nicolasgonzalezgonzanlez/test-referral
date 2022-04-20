type TEnv = string | number | boolean | undefined | [];

type TServer = {
  port: TEnv;
  killTimeout: TEnv;
};

type TMicroservices = {
  ms_client: TEnv;
  ms_home: TEnv;
};

type TSqlDB = {
  username: TEnv;
  host: TEnv;
  port: TEnv;
  password: TEnv;
  database: TEnv;
  type: TEnv;
};

type THeaders = {
  grant_type: string;
  client_id: string;
  client_secret: string;
};

type TAxios = {
  timeout: number;
  baseUrl: string;
  secret: string;
  headers: THeaders;
  expiresIn: string;
  scopes: string;
};
type TBhub = {
  baseUrl: string;
  applicationId: string;
  deviceId: string;
  user: string;
  password: string;
  applicationIdActivities: string;
  beginDate: string;
  deviceIdActivities: string;
};
type TCPersonal = {
  baseUrl: string;
  accessToken: string;
};

type TPService = {
  baseUrl: string;
};

type TClientService = {
  baseUrl: string;
};

type TCRedisCache = {
  redisEnable: TEnv;
  cache: TCCache;
};
type TCCache = {
  host: TEnv;
  port: TEnv;
  pass: TEnv;
  tls: TEnv;
  ttl: TEnv;
};
type TConfig = {
  server: TServer;
  sqlDb: TSqlDB;
  axiosTuID: TAxios;
  axiosBhub: TBhub;
  axiosClubPersonal: TCPersonal;
  axiosPaymentService: TPService;
  axiosClient: TClientService;
  corsUrls: TEnv;
  internalApiUrl: TEnv;
  promotionsQuantity: TEnv;
  runSubscribeCashback: TEnv;
  secretPasswordKey: TEnv;
  onlyPromotionsThatHaveBanner: TEnv;
  redis: TCRedisCache;
  firstPaymentCard: TEnv;
};

export { TConfig, TEnv };
