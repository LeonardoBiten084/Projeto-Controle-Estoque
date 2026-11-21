import { useState } from "react";

export default function NovoRegistro() {
  const [registro, setRegistro] = useState({
    codigoBarras: "",
    nomeProduto: "",
    quantidade: "",
    valorUnitario: "",
    marca: ""
  });
  const [mensagem, setMensagem] = useState("");

  function handleChange(e) {
    setRegistro({
      ...registro,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:7020/api/Registros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...registro,
          quantidade: Number(registro.quantidade),
          valorUnitario: Number(registro.valorUnitario)
        })
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar registro");
      }

      setMensagem("✅ Registro cadastrado com sucesso!");
      setRegistro({
        codigoBarras: "",
        nomeProduto: "",
        quantidade: "",
        valorUnitario: "",
        marca: ""
      });
    } catch (error) {
      console.error(error);
      setMensagem("❌ Erro ao cadastrar registro");
    }
  }

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h2>➕ Novo Registro</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="codigoBarras"
            placeholder="Código de barras"
            value={registro.codigoBarras}
            onChange={handleChange}
            required
          />

          <input
            name="nomeProduto"
            placeholder="Nome do produto"
            value={registro.nomeProduto}
            onChange={handleChange}
            required
          />

          <input
            name="quantidade"
            type="number"
            min="0"
            step="1"
            placeholder="Quantidade"
            value={registro.quantidade}
            onChange={handleChange}
            required
          />

          <input
            name="valorUnitario"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Valor unitário"
            value={registro.valorUnitario}
            onChange={handleChange}
            required
          />

          <input
            name="marca"
            placeholder="Marca"
            value={registro.marca}
            onChange={handleChange}
            required
          />

          <button type="submit">Cadastrar registro</button>
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