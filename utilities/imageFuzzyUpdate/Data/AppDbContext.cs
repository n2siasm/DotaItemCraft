using System.Runtime.InteropServices;
using Microsoft.EntityFrameworkCore;

public class AppDbContext: DbContext
{
	public DbSet<Item> Items {get; set;}

	protected override void OnConfiguring(DbContextOptionsBuilder options) => options.UseSqlite("Data Source=Untitled");
	protected override void OnModelCreating(ModelBuilder modelBuilder) => modelBuilder.Entity<Item>().ToTable("items");
}
