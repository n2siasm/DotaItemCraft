using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("itemComponents")]
public class ItemComponent
{
	[Key, Column("guid"), Required]
	public string Guid { get; set; } = string.Empty;
	[Column("parentGuid"), Required]
	public string? ParentGuid {get; set;}
	[Column("componentGuid"), Required]
	public string? ComponentGuid {get; set;}
}
