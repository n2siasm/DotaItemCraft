public class CraftCheckRequest
{
    public string TargetGuid { get; set; }
    public List<CraftItemDto> Items { get; set; }
}

public class CraftItemDto
{
    public string Guid { get; set; } // -1 = recipe
}

public class CraftCheckResponse
{
    public bool Success { get; set; }
}
