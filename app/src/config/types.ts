type TEnv = string | number | boolean | undefined | [];

type TServer = {
  port?: string;
  killTimeout?: string;
}
type TSqlDB = {
  type?: string;
  host?: string;
  port?: string;
  username?: string;
  password?: string;
  database?: string;
  logging?: boolean;
  synchronize?: boolean;
}
type TConfig = {
  server: TServer;
  sqlDb: TSqlDB;
  internalApiUrl?: string

};

export { TConfig, TEnv };
