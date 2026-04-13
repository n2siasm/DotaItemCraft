using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

public class FuzzyImageMatcher
{
	private readonly string imageFolderPath;

	public FuzzyImageMatcher(string imageFolderPath)
	{
		this.imageFolderPath = imageFolderPath;
	}

	public string? FindBestMatch(string itemName)
	{
		if (!Directory.Exists(this.imageFolderPath))
			throw new DirectoryNotFoundException($"Folder {this.imageFolderPath} not found.");

		var images = Directory.GetFiles(this.imageFolderPath, "*.png")
			.Select(Path.GetFileNameWithoutExtension)
			.ToArray();

		if (images.Length == 0) return null;

		string normalizedItemName = NormalizeName(itemName);
		int bestDistance = int.MaxValue;
		string? bestMatch = null;

		foreach (var image in images)
		{
			string normalizedImage = NormalizeName(image);
			int distance = LevenshteinDistance(normalizedItemName, normalizedImage);
			if (distance < bestDistance)
			{
				bestDistance = distance;
				bestMatch = image;
			}
		}
		return bestMatch;

	}

	private static string NormalizeName(string name)
	{
		if (string.IsNullOrEmpty(name)) return "";
		return name
			.ToLower()
			.Replace(" ", "_")
			.Replace("'", string.Empty);
	}

	private static int LevenshteinDistance(string source, string target)
	{
		int n = source.Length;
		int m = target.Length;
		int[,] d = new int[n + 1, m + 1];

		if (n == 0) return m;
		if (m == 0) return n;

		for (int i = 0; i <= n; d[i, 0] = i++);
		for (int j = 0; j <= m; d[0, j] = j++);

		for (int i = 1; i <= n; i++)
		{
			for (int j = 1; j <= m; j++)
			{
				int cost = (target[j - 1] == source[i - 1]) ? 0 : 1;
				d[i, j] = Math.Min(Math.Min(d[i - 1, j] + 1, d[i, j - 1] + 1), d[i - 1, j - 1] + cost);
			}
		}
		return d[n, m];
	}

}
