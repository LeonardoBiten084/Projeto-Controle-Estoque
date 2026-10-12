using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RegistrosEstoque.Data;
using RegistrosEstoque.Models;

namespace RegistrosEstoque.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrosController : ControllerBase
    {

        private readonly AppDbContext _context;
        public RegistrosController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult GetRegistros()
        {
            var registros = _context.Registros.ToList();
            if(registros == null || !registros.Any())
            {
                return NotFound("Nenhum registro encontrado.");
            }
            return Ok(registros);
        }

        [HttpGet]
        [Route("codigo/{codigobarras}")]
        public ActionResult<RegistroModel> BuscarProdutosPorCodigoBarras(string codigobarras)
        {
            var registros = _context.Registros.FirstOrDefault(p => p.CodigoBarras == codigobarras);

            if (registros == null)
            {
                return NotFound("Registro não foi encontrado!");
            }

            return Ok(registros);
        }

        [HttpPost]
        public ActionResult<RegistroModel> CriarRegistro(RegistroModel registroModel)
        {
            _context.Registros.Add(registroModel);
            _context.SaveChanges();

            return CreatedAtAction(nameof(CriarRegistro), new { id = registroModel.Id }, registroModel);
        }

        [HttpPut]
        public ActionResult<RegistroModel> EditarRegistro(RegistroModel registroModel)
        {
            var registroExistente = _context.Registros.FirstOrDefault(r => r.Id == registroModel.Id);
            if (registroExistente == null)
            {
                return NotFound("Registro não encontrado.");
            }
            registroExistente.CodigoBarras = registroModel.CodigoBarras;
            registroExistente.NomeProduto = registroModel.NomeProduto;
            registroExistente.Quantidade = registroModel.Quantidade;
            registroExistente.ValorUnitario = registroModel.ValorUnitario;
            _context.SaveChanges();
            return Ok(registroExistente);
        }
    }
}
