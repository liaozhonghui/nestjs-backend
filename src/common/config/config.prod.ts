import * as path from 'path';

export default () => {
  return {
    port: 7001,
    appKey: 'xxxxxx-prod',
    jwt: {
      secret: 'xxxxxxx-prod',
      signOptions: { expiresIn: '1d' },
    },
    database: {
      type: 'postgres',
      host: '192.168.160.120',
      port: 5433,
      username: 'postgres',
      password: '123456',
      database: 'ai-db',
      synchronize: false,
      logging: true,
      // 修改 entities 路径
      entities: [path.join(__dirname, '../../**/*.entity{.ts,.js}')],
    },
    bull: {
      redis: {
        host: '192.168.160.120',
        port: 6379,
        password: '123456',
        db: 11,
      },
    },
  };
};
