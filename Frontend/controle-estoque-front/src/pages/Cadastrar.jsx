import { useState } from "react";

export default function CadastroProduto() {
  const [produto, setProduto] = useState({
    nome: "",
    quantidade: "",
    precoCompra: "",
    precoVenda: "",
    codigoBarras: "",
    validade: "",
    marca: ""
  
  });

  const [mensagem, setMensagem] = useState("");

  function handleChange(e) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:7216/api/produto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...produto,
          preco: Number(produto.preco),
          quantidade: Number(produto.quantidade)
        })
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar produto");
      }

      setMensagem("✅ Produto cadastrado com sucesso!");
      setProduto({
        nome: "",
        quantidade: "",
        precoCompra: "",
        precoVenda: "",
        codigoBarras: "",
        validade: "",
        marca: ""
      });

    } catch (error) {
      console.error(error);
      setMensagem("❌ Erro ao cadastrar produto");
    }
  }

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h2>➕ Cadastro de Produto</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="nome"
            placeholder="Nome do produto"
            value={produto.nome}
            onChange={handleChange}
            required
          />

          <input
            name="quantidade"
            type="number"
            placeholder="Quantidade"
            value={produto.quantidade}
            onChange={handleChange}
            required
          />

          <input
            name="precoCompra"
            type="number"
            step="0.01"
            placeholder="Preço de Compra"
            value={produto.precoCompra}
            onChange={handleChange}
            required
          />

          <input
            name="precoVenda"
            type="number"
            step="0.01"
            placeholder="Preço de Venda"
            value={produto.precoVenda}
            onChange={handleChange}
            required
          />

          <input
            name="codigoBarras"
            placeholder="Código de barras"
            value={produto.codigoBarras}
            onChange={handleChange}
            required
          />

          <input
            name="validade"
            placeholder="Validade"
            value={produto.preco}
            onChange={handleChange}
            required
          />

          <input
            name="marca"
            placeholder="Marca"
            value={produto.marca}
            onChange={handleChange}
            required
          />

          <button type="submit">Cadastrar</button>
        </form>

        {mensagem && <p>{mensagem}</p>}
      </div>
    </main>
  );
}

const styles = {
  main: {
    width: "100%",
    minHeight: "calc(100vh - 80px)",
    paddingTop: "40px"
  },
  container: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px"
  }
};
