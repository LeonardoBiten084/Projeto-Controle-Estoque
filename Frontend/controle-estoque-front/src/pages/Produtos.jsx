import { useEffect, useState } from "react";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://localhost:7216/api/produto")
      .then(res => res.json())
      .then(data => {
        setProdutos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h2>📦 Produtos</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Preço de Compra</th>
              <th>Preço de Venda</th>
              <th>Código de Barras</th>
              <th>Validade</th>
              <th>Marca</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map(p => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.quantidade}</td>
                <td>R$ {p.precoCompra.toFixed(2)}</td>
                <td>R$ {p.precoVenda.toFixed(2)}</td>
                <td>{p.codigoBarras}</td>
                <td>{p.validade}</td>
                <td>{p.marca}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px"
  }
};
