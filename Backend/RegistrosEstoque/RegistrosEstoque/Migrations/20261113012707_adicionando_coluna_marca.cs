using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegistrosEstoque.Migrations
{
    /// <inheritdoc />
    public partial class adicionando_coluna_marca : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Marca",
                table: "Registros",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Marca",
                table: "Registros");
        }
    }
}
