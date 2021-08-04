module.exports = {
  apps: [
    {
      name: 'server',
      script: 'src/server.ts',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      instances: 0,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'deveolopment',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      wait_ready: true,
      listen_timeout: 50000,
      kill_timeout: 5000,
    },
  ],
};
