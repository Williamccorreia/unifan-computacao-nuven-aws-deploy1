const { Router } = require('express');
const multer = require('multer');
const s3 = require('../config/s3');

const router = Router();

// Armazena o arquivo em memória temporariamente antes de enviar ao S3.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Apenas arquivos de imagem sao permitidos'));
    }
    cb(null, true);
  },
});

// POST /upload - recebe um arquivo (campo "imagem") e envia para o S3.
router.post('/', upload.single('imagem'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ mensagem: 'Nenhum arquivo enviado.' });
  }

  const file = req.file;
  const fileName = `${Date.now()}_${file.originalname}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const result = await s3.upload(params).promise();

    res.status(200).json({
      mensagem: 'Upload realizado com sucesso!',
      url: result.Location,
      key: result.Key,
    });
  } catch (error) {
    console.error('Erro no upload para o S3:', error);
    res.status(500).json({ mensagem: 'Erro interno no servidor', erro: error.message });
  }
});

module.exports = router;
