using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegistrosEstoque.Migrations
{
    /// <inheritdoc />
    public partial class ModelUpdate08102026 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "DataRegistro",
                table: "Registros",
                type: "datetimeoffset",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<string>(
                name: "NomeProduto",
                table: "Registros",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NomeProduto",
                table: "Registros");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DataRegistro",
                table: "Registros",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTimeOffset),
                oldType: "datetimeoffset");
        }
    }
}
