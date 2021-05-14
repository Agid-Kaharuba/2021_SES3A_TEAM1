using System;


public enum TaskType
{
    Recipe, Testing, Performance
}

[Flags]
public enum TaskTypeMask
{
    None, Recipe, Testing, Performance
}