import { app } from './app';

app.listen(process.env.APP_API_PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running at port: ', process.env.APP_API_PORT);
});
