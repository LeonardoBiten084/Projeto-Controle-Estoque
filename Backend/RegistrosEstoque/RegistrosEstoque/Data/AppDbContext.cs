using Microsoft.EntityFrameworkCore;
using RegistrosEstoque.Models;

namespace RegistrosEstoque.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<RegistroModel> Registros { get; set; }
    }
}
