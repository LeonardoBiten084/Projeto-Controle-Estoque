export default function Home() {
  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h2>Bem-vindo(a) ao sistema 👋</h2>
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
  main: {
    width: "100%",
    minHeight: "calc(100vh - 80px)", // altura menos o header
    paddingTop: "40px"
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px"
  },
  cards: {
    display: "flex",
    gap: "20px",
    marginTop: "30px",
    flexWrap: "wrap"
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "8px",
    cursor: "pointer",
    minWidth: "240px",
    textAlign: "center",
    fontWeight: "bold",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  }
};
