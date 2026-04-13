using System;
using System.Linq;

class Program
{

	static void Main(string[] args)
	{
		string imageFolderPath = "/mnt/hdd500-linux/stor/dota/Images/";
		var dbContext = new AppDbContext();

		var imageMatcher = new FuzzyImageMatcher(imageFolderPath);
		var itemService = new ItemService(dbContext, imageMatcher);
		itemService.UpdateImages();
	}
}
