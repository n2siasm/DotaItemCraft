using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]
public class CraftController: ControllerBase
{
	private readonly AppDbContext dbContext;
	public CraftController(AppDbContext dbContext) => this.dbContext = dbContext;

	[HttpGet("random-compound")]
	public async Task<IActionResult> GetRandomCompound()
	{
		var compoundItems = await dbContext.Items
			.Where(i => dbContext.ItemComponents.Any(ic => ic.ParentGuid == i.Guid))
			.ToListAsync();

		if (!compoundItems.Any())
			return NotFound(new {error = "No compound items found"});

		var random = new Random();
		var selected = compoundItems[random.Next(compoundItems.Count)];

		var componentGuids = await dbContext.ItemComponents
			.Where(ic => ic.ParentGuid == selected.Guid)
			.Select(ic => new {ic.ComponentGuid})
			.ToListAsync();

		return Ok(new
		{
			guid = selected.Guid,
			name = selected.Name,
			components = componentGuids
		});

	}

}
