import l10n from "../helpers/l10n";

export const id = "EVENT_VARIABLE_MATH";

export const fields = [
  {
    key: "vectorX",
    type: "variable",
    defaultValue: "LAST_VARIABLE"
  },
  {
    key: "operation",
    type: "select",
    options: [
      ["set", l10n("FIELD_SET_TO")],
      ["add", l10n("FIELD_ADD_VALUE")],
      ["sub", l10n("FIELD_SUB_VALUE")],
      ["mul", l10n("FIELD_MUL_VARIABLE")],
      ["div", l10n("FIELD_DIV_VARIABLE")],
      ["mod", l10n("FIELD_MOD_VARIABLE")]
    ],
    defaultValue: "set",
    width: "50%"
  },
  {
    key: "other",
    type: "select",
    options: [
      ["true", l10n("FIELD_TRUE")],
      ["false", l10n("FIELD_FALSE")],
      ["var", l10n("FIELD_VARIABLE")],
      ["val", l10n("FIELD_VALUE")],
      ["rnd", l10n("FIELD_RANDOM")]
    ],
    defaultValue: "true",
    width: "50%"
  },
  {
    key: "vectorY",
    type: "variable",
    showIfKey: "other",
    showIfValue: "var",
    defaultValue: "LAST_VARIABLE"
  },
  {
    key: "value",
    type: "number",
    showIfKey: "other",
    showIfValue: "val",
    min: 0,
    max: 255,
    defaultValue: "1"
  },
  {
    key: "minValue",
    type: "number",
    showIfKey: "other",
    showIfValue: "rnd",
    min: 0,
    max: 255,
    label: l10n("FIELD_MIN_VALUE"),
    defaultValue: "0",
    width: "50%"
  },
  {
    key: "maxValue",
    type: "number",
    showIfKey: "other",
    showIfValue: "rnd",
    min: 0,
    max: 255,
    label: l10n("FIELD_MAX_VALUE"),
    defaultValue: "255",
    width: "50%"
  },
  {
    label: l10n("FIELD_MATH_NOTE")
  }
];

export const compile = (input, helpers) => {
  const {
    setVariableToValue,
    copyVariable,
    setVariableToRandom,
    variablesAdd,
    variablesSub,
    variablesMul,
    variablesDiv,
    variablesMod
  } = helpers;
  const tmp1 = "tmp1";
  switch (input.other) {
    case "true":
      setVariableToValue(tmp1, 1);
      break;
    case "false":
      setVariableToValue(tmp1, 0);
      break;
    case "var": {
      copyVariable(tmp1, input.vectorY);
      break;
    }
    case "rnd": {
      const min = input.minValue || 0;
      const range = Math.min(254, Math.max(0, (input.maxValue || 0) - min));
      setVariableToRandom(tmp1, min, range);
      break;
    }
    case "val":
    default:
      setVariableToValue(tmp1, input.value || 0);
      break;
  }
  switch (input.operation) {
    case "add":
      variablesAdd(input.vectorX, tmp1);
      break;
    case "sub":
      variablesSub(input.vectorX, tmp1);
      break;
    case "mul":
      variablesMul(input.vectorX, tmp1);
      break;
    case "div":
      variablesDiv(input.vectorX, tmp1);
      break;
    case "mod":
      variablesMod(input.vectorX, tmp1);
      break;
    case "set":
    default:
      copyVariable(input.vectorX, tmp1);
      break;
  }
};