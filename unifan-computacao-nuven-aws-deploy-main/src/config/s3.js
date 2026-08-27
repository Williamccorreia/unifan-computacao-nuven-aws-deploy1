const AWS = require('aws-sdk');

// Configura o AWS SDK usando variáveis de ambiente.
// Em produção (EC2), prefira uma IAM Role anexada à instância em vez de
// AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY — nesse caso deixe essas duas em branco
// que o SDK usa as credenciais da role automaticamente.
AWS.config.update({
  region: process.env.AWS_REGION,
  ...(process.env.AWS_ACCESS_KEY_ID && {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }),
});

const s3 = new AWS.S3();

module.exports = s3;
