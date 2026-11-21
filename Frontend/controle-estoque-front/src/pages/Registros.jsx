import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* estados que serão usados */
export default function Registros() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [codigoDigitado, setCodigoDigitado] = useState("")
  const [codigoBusca, setCodigoBusca] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [produtoEditando, setProdutoEditando] = useState({});

  /* estados das funções referenciadas acima */
  useEffect(() => {
    async function carregarRegistros() {
      try {
        const response = await fetch("https://localhost:7020/api/Registros");

        if (response.status === 404) {
          setProdutos([]);
          return;
        }

        if (!response.ok) {
          throw new Error("Não foi possível carregar os registros.");
        }

        setProdutos(await response.json());
      } catch (error) {
        console.error(error);
        alert("Erro ao carregar registros.");
      } finally {
        setLoading(false);
      }
    }

    carregarRegistros();
  }, []);

  function pesquisarProduto() {
    const codigo = codigoDigitado.trim();

    if(codigo === ""){
      alert("O campo não pode estar vazio.");
      setCodigoDigitado("");
      setCodigoBusca("");
      return;
    }

    if (!/^\d+$/.test(codigo)) {
    alert("Digite apenas números.");
    setCodigoDigitado("");
    setCodigoBusca("");
    return;
  }
    setCodigoBusca(codigoDigitado);
  }

  function limparPesquisa() {
    setCodigoDigitado("");
    setCodigoBusca("");
  }

  function iniciarEdicao(produto) {
    setEditandoId(produto.id);
    setProdutoEditando({ ...produto})
  }

  function handleEditChange(e) {
    setProdutoEditando({
      ...produtoEditando,
      [e.target.name]: e.target.value
    });
  }

  async function salvarEdicao(id) {
    try {
      const response = await fetch("https://localhost:7020/api/Registros", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...produtoEditando,
          id,
          quantidade: Number(produtoEditando.quantidade),
          valorUnitario: Number(produtoEditando.valorUnitario)
        })
      });

      if (!response.ok) {
        throw new Error("Ocorreu um erro ao atualizar");
      }

      const registroAtualizado = await response.json();
      setProdutos(registrosAtuais =>
        registrosAtuais.map(registro =>
          registro.id === id ? registroAtualizado : registro
        )
      );
      setEditandoId(null);

    } catch (error) {
      console.error(error);
      alert("Erro ao salvar edição");
    }
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setProdutoEditando({});
  }

  async function excluirProduto(id) {
      const confirmar = window.confirm("Tem certeza que deseja excluir este registro?");

        if (!confirmar) return;

        try {
          const response = await fetch(`https://localhost:7020/api/Registros/${id}`, {
            method: "DELETE"
          });

        if (!response.ok) {
          throw new Error("Erro ao excluir registro");
        }

        setProdutos(registrosAtuais =>
          registrosAtuais.filter(registro => registro.id !== id)
        );

    } catch (error) {
      console.error(error);
      alert("Erro ao excluir registro");
    }
  }

  const produtosFiltrados = codigoBusca
    ? produtos.filter(p =>
      p.codigoBarras.toString().includes(codigoBusca)
    )
    : produtos;

  if (loading) return <p>Carregando registros...</p>;

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h2>📦 Registros</h2>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Buscar código de barras"
            value={codigoDigitado}
            onChange={(e) => setCodigoDigitado(e.target.value)}
            style={styles.input}
            />

            <button onClick={pesquisarProduto}>
              Pesquisar
            </button>

            <button onClick={limparPesquisa}>
              Limpar
            </button>

            <button>
              <Link to="/novo-registro">Novo Registro</Link>
            </button>
          </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Código de Barras</th>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Preço de Venda</th>
              <th>Data de Registro</th>
              <th>Marca</th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.map(p => (
              <tr key={p.id}>

                {editandoId === p.id ? (
                  <>
                    <td>
                      <input name="codigoBarras" value={produtoEditando.codigoBarras} onChange={handleEditChange} />
                    </td>

                    <td>
                      <input name="nomeProduto" value={produtoEditando.nomeProduto} onChange={handleEditChange} />
                    </td>

                    <td>
                      <input name="quantidade" value={produtoEditando.quantidade} onChange={handleEditChange} />
                    </td>

                    <td>
                      <input name="valorUnitario" value={produtoEditando.valorUnitario} onChange={handleEditChange} />
                    </td>

                    <td>
                      {p.dataRegistro}
                    </td>

                    <td>
                      <input name="marca" value={produtoEditando.marca} onChange={handleEditChange} />
                    </td>

                    <td>
                      <button onClick={() => salvarEdicao(p.id)}>Salvar</button>
                      <button onClick={cancelarEdicao}>Cancelar</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{p.codigoBarras}</td>
                    <td>{p.nomeProduto}</td>
                    <td>{p.quantidade}</td>
                    <td>{p.valorUnitario}</td>
                    <td>{p.dataRegistro}</td>
                    <td>{p.marca}</td>

                    <td>
                      <button onClick={() => iniciarEdicao(p)}>
                        Editar
                      </button>

                      <button onClick={() => excluirProduto(p.id)}>
                        Excluir
                      </button>
                    </td>
                  </>
                )}

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
  },
};
