import { useEffect, useState } from "react";

/* estados que serão usados */
export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [codigoDigitado, setCodigoDigitado] = useState("")
  const [codigoBusca, setCodigoBusca] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [produtoEditando, setProdutoEditando] = useState({});

  /* estados das funções referenciadas acima */
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
      const response = await fetch(`https://localhost:7216/api/produto/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...produtoEditando,
          precoCompra: Number(produtoEditando.precoCompra),
          precoVenda: Number(produtoEditando.precoVenda),
          quantidade: Number(produtoEditando.quantidade)
        })
      });

      if (!response.ok) {
        throw new Error("Ocorreu um erro ao atualizar");
      }

      //Atualiza lista local
      const listaAtualizada = produtos.map(p =>
        p.id === id ? produtoEditando : p 
      );

      setProdutos(listaAtualizada);
      setEditandoId(null);

    } catch (error) {
      console.error(error);
      alert("Erro ao salvar edição");
    }
  }

  async function excluirProduto(id) {
      const confirmar = window.confirm("Tem certeza que deseja excluir este produto?");

        if (!confirmar) return;

        try {
          const response = await fetch(`https://localhost:7216/api/produto/${id}`, {
            method: "DELETE"
          });

        if (!response.ok) {
          throw new Error("Erro ao excluir produto");
        }

        // Remove da lista local
        const novaLista = produtos.filter(p => p.id !== id);
        setProdutos(novaLista);

    } catch (error) {
      console.error(error);
      alert("Erro ao excluir produto");
    }
  }

  const produtosFiltrados = codigoBusca
    ? produtos.filter(p =>
      p.codigoBarras.toString().includes(codigoBusca)
    )
    : produtos;

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <h2>📦 Produtos</h2>
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
          </div>

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
            {produtosFiltrados.map(p => (
              <tr key={p.id}>
                
                {editandoId === p.id ? (
                  <>
                    <td>
                      <input name="nome" value={produtoEditando.nome} onChange={handleEditChange} />
                    </td>

                    <td>
                      <input name="quantidade" value={produtoEditando.quantidade} onChange={handleEditChange} />
                    </td>

                    <td>
                      <input name="precoCompra" value={produtoEditando.precoCompra} onChange={handleEditChange} />
                    </td>

                    <td>
                      <input name="precoVenda" value={produtoEditando.precoVenda} onChange={handleEditChange} />
                    </td>

                    <td>
                      <input name="codigoBarras" value={produtoEditando.codigoBarras} onChange={handleEditChange} />
                    </td>

                    <td>
                      <input name="validade" value={produtoEditando.validade} onChange={handleEditChange} />
                    </td>

                    <td>
                      <input name="marca" value={produtoEditando.marca} onChange={handleEditChange} />
                    </td>

                    <td>
                      <button onClick={() => salvarEdicao(p.id)}>Salvar</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{p.nome}</td>
                    <td>{p.quantidade}</td>
                    <td>R$ {p.precoCompra.toFixed(2)}</td>
                    <td>R$ {p.precoVenda.toFixed(2)}</td>
                    <td>{p.codigoBarras}</td>
                    <td>{p.validade}</td>
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
