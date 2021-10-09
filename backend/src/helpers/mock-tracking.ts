import { TrackingType } from "../model/progress";
import { CourseType } from "../model/course";
import _ from "underscore";

let timeElapsed: number;

let kitchenState: { [key: string]: number };

let ingredientsState: string[];

let burgerState: string[];

// const ingredients = ['Bacon', 'Beetroot', 'BottomBun', 'BunButtom', 'BunTop', 'Cheese', 'CheeseBlock', 'CheeseS', 'Egg', 'Egg2', 'EggOpen',]
const ingredients: string[] = [
  "beetroot",
  "bottom_bun",
  "cheese",
  "lettuce",
  "patty",
  "square_plate",
  "top_bun",
];

const randomTimeInterval = () => Math.floor(Math.random() * 300000);
const randomNumber = () => 10 + Math.floor(Math.random() * 20);



const currentTime = () => {
  timeElapsed = timeElapsed + randomTimeInterval();
  return new Date(timeElapsed);
};

const updateKitchenState = (key: string) => {
  kitchenState[key] = kitchenState[key] === 0 ? 1 : 0;
  return kitchenState[key];
};

const getIngredient = (): string => {
  const i = _.sample(ingredients) ?? '';
  ingredientsState.push(i);
  return i;
};

const updateIngredients = (): string => {
  const i = _.sample(ingredientsState) ?? '';
  let index = ingredientsState.indexOf(i);
  if (index > -1) {
    ingredientsState.splice(index, 1);
  }
  return i;
};

const randomEvent = (): TrackingType | undefined => {
  let e: any = (
    _.sample([
      {
        event: "GRILL",
        value: updateKitchenState,
      },
      {
        event: "MICROWAVE",
        value: updateKitchenState,
      },
      {
        event: "KNIFE",
        value: updateKitchenState,
      },
      {
        event: "FRIDGE",
        value: getIngredient,
      },
      {
        event: "DROPPED",
        value: updateIngredients,
      },
      {
        "event": "PATTY_COOKED",
        "value": randomNumber,
      },
      {
        "event": "ITEM_STACKED",
        "value": updateIngredients,
      },
    ]) ?? {
      event: "ERROR",
      value: 0,
    }
  );

  if (e.event === "ERROR")
    return;

  e.date = currentTime();
  e.value = e.value(e.event);

  if (['DROPPED', 'ITEM_STACKED'].includes(e.event) && e.value === '')
    return;

  if (e.event === 'ITEM_STACKED') {
    burgerState.push(e.value);
    e.data = burgerState;
  }
  return e;
};
export const generateModuleTracking = (module: CourseType) => {
  timeElapsed = 0;

  const log: TrackingType[] = [];
  log.push({
    event: "MODULE",
    value: 1,
    date: currentTime(),
  });

  for (const task of module.tasks) {
    kitchenState = {
      GRILL: 0,
      MICROWAVE: 0,
      KNIFE: 0
    };
    ingredientsState = [];
    burgerState = [];

    log.push({
      event: "TASK",
      value: 1,
      date: currentTime(),
    });

    let count = randomNumber();
    while (count--) {
      const e = randomEvent();
      if (e)
        log.push(e);
    }

    log.push({
      event: "SUBMISSION",
      value: 0,
      data: burgerState,
      date: currentTime(),
    });

    log.push({
      event: "TASK",
      value: 0,
      date: currentTime(),
    });
  }

  log.push({
    event: "MODULE",
    value: 0,
    date: currentTime(),
  });

  return log;
};

const r = generateModuleTracking({
  tasks: [{}],
  assignedEmployees: [],
  name: "A Few Burgers",
  description: "Learn a few new burgers.",
});

console.log(r);