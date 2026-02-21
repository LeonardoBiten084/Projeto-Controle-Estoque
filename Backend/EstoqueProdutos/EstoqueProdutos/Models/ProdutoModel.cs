using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EstoqueProdutos.Models
{
    public class ProdutoModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Insira obrigatoriamente o nome do produto.")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "Insira quantas unidades tem o produto")]
        [Range(0, int.MaxValue, ErrorMessage = "A quantidade não pode ser negativa")]
        public int Quantidade { get; set; }

        [Required(ErrorMessage = "Insira obrigatoriamente o preço")]
        [Column(TypeName = "decimal(18,2)")]
        [Range(0.01, 99999.99, ErrorMessage = "O preço deve ser maior que zero")]
        public decimal PrecoCompra { get; set; }

        [Required(ErrorMessage = "Insira obrigatoriamente o preço")]
        [Column(TypeName = "decimal(18,2)")]
        [Range(0.01, 99999.99, ErrorMessage = "O preço deve ser maior que zero")]
        public decimal PrecoVenda { get; set; }

        [Required(ErrorMessage = "Preencha obrigatoriamente o código de barras.")]
        public string CodigoBarras { get; set; } = string.Empty;

        [Required(ErrorMessage = "Preencha obrigatoriamente a data de validade do produto.")]
        public DateOnly Validade { get; set; }

        [Required(ErrorMessage = "Preencha obrigatoriamente a marca do produto.")]
        public string Marca { get; set; } = string.Empty;


    }
}
