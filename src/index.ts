import app from './config/express';

async function main(): Promise<void> {
    try {
      
      app.listen(app.get('port'));
      console.log(`Servidor ${app.get('port')}`);
      console.log('Connection stablished');
    } catch (error) {
     
      console.log(error);
    }
  }
  main();