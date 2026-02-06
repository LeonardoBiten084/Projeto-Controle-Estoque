import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h2>Controle de Estoque</h2>

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
    backgroundColor: "#8e44ad",
  },
  container: {
    maxWidth: "2000px",
    margin: "0 auto",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  },
  nav: {
    display: "flex",
    gap: "10px",
  },
};
