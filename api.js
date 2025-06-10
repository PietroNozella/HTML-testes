// api.js - API Estática em Node.js com Express
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Permite requisições do frontend

const faturas = [
  {
    telefone: "11999999999",
    status: "PENDENTE",
    descricao: "Fatura vencida em 05/06/2025 no valor de R$ 120,00."
  },
  {
    telefone: "11988888888", 
    status: "PAGA",
    descricao: "Fatura paga em 01/06/2025."
  },
  {
    telefone: "11977777777",
    status: "EM ABERTO",
    descricao: "Fatura vence em 15/06/2025."
  },
  {
    telefone: "11666666666",
    status: "CANCELADA",
    descricao: "Serviço cancelado - Última fatura: R$ 99,90"
  },
  {
    telefone: "21987654321",
    status: "EM ABERTO", 
    descricao: "Fatura atual - Vencimento: 20/06/2025 - Valor: R$ 159,90"
  }
];

// Endpoint para consulta de fatura
app.post('/consulta-fatura', (req, res) => {
  const telefone = req.body.telefone;
  
  // Simula delay de API real
  setTimeout(() => {
    const fatura = faturas.find(f => f.telefone === telefone);
    
    if (fatura) {
      res.json({
        success: true,
        data: {
          numero_telefone: fatura.telefone,
          status: fatura.status.toLowerCase().replace(' ', '_'),
          descricao: fatura.descricao
        }
      });
    } else {
      res.status(404).json({
        success: false,
        error: "Telefone não encontrado na base de dados"
      });
    }
  }, 800); // Simula 800ms de delay
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API funcionando na porta ${PORT}`);
});