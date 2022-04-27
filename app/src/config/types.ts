type TEnv = string | number | boolean | undefined | [];

type TServer = {
  port?: string;
  killTimeout?: string;
}
type TSqlDB = {
  type?: TEnv;
  host?: TEnv;
  port?: TEnv;
  username?: TEnv;
  password?: TEnv;
  database?: TEnv;
  logging?: TEnv;
  synchronize?: TEnv;
  migrationTableName: TEnv
}
type TConfig = {
  server: TServer;
  sqlDb: TSqlDB;
  internalApiUrl?: string
};

export { TConfig, TEnv };
