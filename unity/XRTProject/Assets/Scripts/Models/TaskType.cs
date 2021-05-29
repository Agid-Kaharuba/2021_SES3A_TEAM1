using System;
using System.Runtime.Serialization;


public enum TaskType
{
    [EnumMember(Value = "Practice")]
    Recipe, 
    Testing, 
    Performance
}

[Flags]
public enum TaskTypeMask
{
    None, Recipe, Testing, Performance
}