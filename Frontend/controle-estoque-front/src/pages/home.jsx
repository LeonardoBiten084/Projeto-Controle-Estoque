export default function Home() {
  return (
    <main style={styles.wrapper}>
      <div style={styles.container}>
        <h2>Bem-vinda ao sistema 👋</h2>
        <p>Escolha uma das opções abaixo:</p>

        <div style={styles.cards}>
          <div style={styles.card}>📦 Ver Produtos</div>
          <div style={styles.card}>➕ Cadastrar Produto</div>
          <div style={styles.card}>📊 Controle de Estoque</div>
        </div>
      </div>
    </main>
  );
}

const styles = {
  wrapper: {
    width: "100%",
  },
  container: {
    maxWidth: "1200px",
    margin: "40px auto",
    padding: "0 15px",
  },
  cards: {
    display: "flex",
    gap: "50px",
    marginTop: "30px",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "#f2f2f2",
    padding: "25px",
    borderRadius: "8px",
    cursor: "pointer",
    minWidth: "220px",
    textAlign: "center",
    fontWeight: "bold",
  },
};
