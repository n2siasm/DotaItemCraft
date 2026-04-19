using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("/Craft")]
public class CraftController : ControllerBase
{
	private readonly AppDbContext dbContext;
	public CraftController(AppDbContext dbContext)
	{
		this.dbContext = dbContext;
		items = dbContext.Items.ToList();
		itemComponents = dbContext.ItemComponents.ToList();
	}
	public List<Item> items;
	public List<ItemComponent> itemComponents;


	[HttpGet("random-compound")]
	public IActionResult GetRandomCompound()
	{
		var compoundItems = items
			.Where(i => itemComponents.Any(ic => ic.ParentGuid == i.Guid))
			.ToList();

		if (!compoundItems.Any())
			return NotFound(new { error = "No compound items found" });

		var random = new Random();
		var selectedParent = compoundItems[random.Next(compoundItems.Count)];

		var selectedComponents = itemComponents
			.Where(ic => ic.ParentGuid == selectedParent.Guid)
			.ToList();

		return Ok(new
		{
			Guid = selectedParent.Guid,
			Name = selectedParent.Name,
			Img = selectedParent.Img,
			Components = selectedComponents
				.Select(i => new
				{
					Guid = i.ComponentGuid,

				})
				.ToList(),
		});

	}

	[HttpGet("all-items")]
	public IActionResult GetAllItems()
	{
		return Ok(items);

	}

	[HttpPost("check")]
	public ActionResult<CraftCheckResponse> Check([FromBody] CraftCheckRequest request)
	{

		var componentEntries = itemComponents.Where(i => i.ParentGuid == request.TargetGuid).ToList();
		Console.WriteLine("СУКААААААА"+componentEntries.Count);

		var componentItems = new List<Item>();
		foreach (var component in componentEntries)
		{
			componentItems.Add(items.Where(i => i.Guid == component.ComponentGuid).First());
		}
		var isValid = CompareItems(componentItems, request.Items);

		return Ok(new CraftCheckResponse
		{
			Success = isValid
		});
	}

	private bool CompareItems(
    List<Item> required,
    List<CraftItemDto> provided)
	{
		if(required.Count != provided.Count)
		{
			return false;
		}
		foreach (var requiredItem in required)
		{
			bool found = false;
			foreach (var providedItem in provided)
			{
				Console.WriteLine(requiredItem.Guid + "===" + providedItem.Guid);
				if (requiredItem.Guid == providedItem.Guid)
				{
					found = true;
					break;
				}
			}

			if (!found)
			{
				return false;
			}
		}
		return true;
	}

}
