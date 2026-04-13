using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("items")]
public class Item
{
	[Key, Column("guid"), Required]
	public string Guid { get; set; } = string.Empty;
	[Column("name")]
	public string? Name {get; set;}
	[Column("cost")]
	public int? Cost {get; set;}
	[Column("img")]
	public string? Img {get; set;}
	
}
