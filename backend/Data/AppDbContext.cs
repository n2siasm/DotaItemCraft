using System.Runtime.InteropServices;
using Microsoft.EntityFrameworkCore;

public class AppDbContext: DbContext
{
	public AppDbContext(DbContextOptions<AppDbContext> options): base(options) { }
	public DbSet<Item> Items {get; set;}
	public DbSet<ItemComponent> ItemComponents {get; set;}

	protected override void OnConfiguring(DbContextOptionsBuilder options) => options.UseSqlite("Data Source=Untitled");
	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.Entity<ItemComponent>()
			.HasOne(ic => ic.Parent)
			.WithMany(i => i.ParentComponents)
			.HasForeignKey(ic => ic.ParentGuid)
			.OnDelete(DeleteBehavior.Cascade);

		modelBuilder.Entity<ItemComponent>()
			.HasOne(ic => ic.Component)
			.WithMany(i => i.ChildComponents)
			.HasForeignKey(ic => ic.ComponentGuid)
			.OnDelete(DeleteBehavior.Cascade);
	}



}
