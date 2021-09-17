using System;

namespace Interactions.Cooking
{
    public class CookableSide
    {
        private readonly CookSide side;
        private readonly Func<float> perfectCookDuration;
        private readonly Func<float> maxCookDuration;

        public bool IsCooked => CookTime >= perfectCookDuration();
        public float CookPercentage => CookTime / perfectCookDuration();
        public float MaxCookPercentage => CookTime / maxCookDuration();
        public CookSide CookSide => side;
        public float CookTime { get; set; }

        public CookableSide(CookSide side, Func<float> perfectCookDuration, Func<float> maxCookDuration)
        {
            this.side = side;
            this.perfectCookDuration = perfectCookDuration;
            this.maxCookDuration = maxCookDuration;
        }
    }
}