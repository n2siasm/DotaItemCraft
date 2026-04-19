using System.Runtime.InteropServices;
using Microsoft.EntityFrameworkCore;

public class AppDbContext: DbContext
{
	public AppDbContext(DbContextOptions<AppDbContext> options): base(options) { }
	public DbSet<Item> Items {get; set;}
	public DbSet<ItemComponent> ItemComponents {get; set;}

	protected override void OnConfiguring(DbContextOptionsBuilder options) => options.UseSqlite("Data Source=Untitled");
	protected override void OnModelCreating(ModelBuilder modelBuilder) {}



}
