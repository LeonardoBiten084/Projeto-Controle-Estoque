using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;

namespace RegistrosEstoque.Models
{
    [Table("Registros")]
    public class RegistroModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Digite o código de barras")]
        [MaxLength(100)]
        public string CodigoBarras { get; set; } = string.Empty;

        [Required(ErrorMessage = "Digite o nome do produto")]
        [MaxLength(200)]
        public string NomeProduto { get; set; } = string.Empty;

        [Required(ErrorMessage = "Digite a quantidade")]
        [Range(0, int.MaxValue, ErrorMessage = "A quantidade deve ser um valor positivo")]
        public int Quantidade { get; set; } = 0;

        [Required(ErrorMessage = "Digite o valor unitário")]
        [Column(TypeName = "decimal(18,2)")]
        [Range(0.01, 99999.99, ErrorMessage = "O preço deve ser maior que zero")]
        public decimal ValorUnitario { get; set; } = decimal.Zero;

        public DateTimeOffset DataRegistro { get; set; } = DateTimeOffset.UtcNow;
    }
}
