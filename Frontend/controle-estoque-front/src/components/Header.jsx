import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1>Controle de Estoque</h1>

        <nav style={styles.nav}>
          <Link to="/">Home</Link>
          <Link to="/produtos">Produtos</Link>
          <Link to="/cadastrar">Cadastrar</Link>
        </nav>
      </div>
    </header>
  );
}

const styles = {
  header: {
    width: "100%",
    backgroundColor: "#8e44ad"
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white"
  },
  nav: {
    display: "flex",
    gap: "10px"
  }
};
