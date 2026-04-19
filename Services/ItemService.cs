using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

public class ItemService
{
	private readonly AppDbContext dbContext;
	private readonly FuzzyImageMatcher imageMatcher;

	public ItemService(AppDbContext dbContext, FuzzyImageMatcher imageMatcher)
	{
		this.dbContext = dbContext;
		this.imageMatcher = imageMatcher;
	}

	public void UpdateImages()
	{
		var items = this.dbContext.Items.ToList();
		int updated = 0;

		foreach (var item in items)
		{
			string? bestMatch = this.imageMatcher.FindBestMatch(item.Name);
			if (bestMatch != null)
			{
				item.Img = bestMatch;
				updated++;
				Console.WriteLine($"Updated {item.Img}.");
			}
		}
		this.dbContext.SaveChanges();
		Console.WriteLine($"Updated {updated} items.");
	}

}
