using EstoqueProdutos.Data;
using EstoqueProdutos.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EstoqueProdutos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {

        private readonly AppDbContext _context;
        public ProdutoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<ProdutoModel>> BuscarProdutos()
        {
            var produtos = _context.Produtos.ToList();
            return Ok(produtos);
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<ProdutoModel> GetById(int id)
        {
            var produto = _context.Produtos.Find(id);

            if (produto == null)
                return NotFound("Produto não foi encontrado!");

            return Ok(produto);
        }

        [HttpGet]
        [Route("codigo/{codigobarras}")]
        public ActionResult<ProdutoModel> BuscarProdutosPorCodigoBarras(string codigobarras)
        {
            var produtos = _context.Produtos.FirstOrDefault(p => p.CodigoBarras == codigobarras);

            if (produtos == null)
            {
                return NotFound("Produto não foi encontrado!");
            }

            return Ok(produtos);
        }

        [HttpPost]
        public ActionResult<ProdutoModel> CriarProduto(ProdutoModel produtoModel)
        {
            _context.Produtos.Add(produtoModel);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = produtoModel.Id }, produtoModel);
        }

        [HttpPut]
        [Route("{id}")]
        public ActionResult<List<ProdutoModel>> EditarProduto(ProdutoModel produtoModel, int id)
        {
            var produto = _context.Produtos.Find(id);

            if (produto == null)
            {
                return NotFound("Produto não foi encontrado!");
            }

            produto.Nome = produtoModel.Nome;
            produto.Quantidade = produtoModel.Quantidade;
            produto.Preco = produtoModel.Preco;
            produto.CodigoBarras = produtoModel.CodigoBarras;
            produto.Marca = produtoModel.Marca;

            _context.Produtos.Update(produto);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete]
        [Route("{id}")]
        public ActionResult<List<ProdutoModel>> ExcluirProduto(int id)
        {
            var produto = _context.Produtos.Find(id);
            if (produto == null)
            {
                return NotFound("Produto não foi encontrado!");
            }

            _context.Produtos.Remove(produto);
            _context.SaveChanges();

            return NoContent();
        }

    }
}
