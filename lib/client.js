window.__ModuleLoader__.load({id:"dsh-pg-grid",factory:(require)=>{var module={exports:{}};var exports=module.exports;
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));
var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

// src/client/index.jsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(index_exports);
var import_react3 = __toESM(require("react"), 1);

// src/client/app.jsx
var import_react2 = __toESM(require("react"), 1);

// src/client/rules.jsx
var import_react = __toESM(require("react"), 1);
var import_jsx_runtime = require("react/jsx-runtime");
function Field({ fields, value, onChange, label = "\u5B57\u6BB5" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { "aria-label": label, value: value ?? "", onChange: (e) => onChange(e.target.value), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: "\u9009\u62E9\u5B57\u6BB5" }),
    fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: f.id, children: f.name }, f.id))
  ] });
}
function Expression({ value, onChange, fields, depth = 0 }) {
  const kind = typeof value === "string" ? "field" : value?.op ?? "literal";
  const ops = { field: "\u5B57\u6BB5", literal: "\u5E38\u91CF", add: "\u52A0", sub: "\u51CF", mul: "\u4E58", div: "\u9664", round: "\u820D\u5165", if: "\u6761\u4EF6\u5224\u65AD", coalesce: "\u7A7A\u503C\u66FF\u4EE3", concat: "\u62FC\u63A5", year: "\u5E74\u4EFD", month: "\u6708\u4EFD", day: "\u65E5\u671F", eq: "\u7B49\u4E8E", ne: "\u4E0D\u7B49\u4E8E", gt: "\u5927\u4E8E", gte: "\u5927\u4E8E\u7B49\u4E8E", lt: "\u5C0F\u4E8E", lte: "\u5C0F\u4E8E\u7B49\u4E8E", and: "\u5E76\u4E14", or: "\u6216\u8005" };
  function change(kind2) {
    if (kind2 === "field") return onChange(fields[0]?.id ?? "");
    if (kind2 === "literal") return onChange({ literal: "0", type: "number" });
    const n = ["year", "month", "day"].includes(kind2) ? 1 : kind2 === "if" ? 3 : 2;
    onChange({ op: kind2, args: Array.from({ length: n }, (_, i) => i === 0 ? fields[0]?.id ?? { literal: 0, type: "number" } : { literal: 0, type: "number" }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "pg-expression", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", { "aria-label": "\u8BA1\u7B97\u8FD0\u7B97", value: kind, onChange: (e) => change(e.target.value), children: Object.entries(ops).filter(([k]) => depth < 6 || ["field", "literal"].includes(k)).map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: k, children: l }, k)) }),
    kind === "field" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { fields, value, onChange }) : kind === "literal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { "aria-label": "\u5E38\u91CF\u7C7B\u578B", value: value?.type ?? "text", onChange: (e) => onChange({ ...value, type: e.target.value, literal: e.target.value === "boolean" ? true : String(value?.literal ?? "") }), children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "number", children: "\u6570\u5B57" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "text", children: "\u6587\u672C" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "boolean", children: "\u5E03\u5C14" })
      ] }),
      value?.type === "boolean" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { "aria-label": "\u5E38\u91CF\u503C", value: String(value.literal), onChange: (e) => onChange({ ...value, literal: e.target.value === "true" }), children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "true", children: "true" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "false", children: "false" })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { "aria-label": "\u5E38\u91CF\u503C", value: value?.literal ?? "", onChange: (e) => onChange({ ...value, literal: e.target.value }) })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pg-args", children: value.args.map((arg, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Expression, { value: arg, fields, depth: depth + 1, onChange: (v) => onChange({ ...value, args: value.args.map((a, j) => j === i ? v : a) }) }, i)) })
  ] });
}
function Filters({ group, onChange, fields, depth = 0 }) {
  const rules = group?.rules ?? [];
  const update = (i, v) => onChange({ ...group, rules: rules.map((r, j) => j === i ? v : r) });
  const add2 = () => onChange({ ...group, rules: [...rules, { field: fields[0]?.id ?? "", op: "eq", value: "" }] });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "pg-filter-group", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "pg-line", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { "aria-label": "\u7B5B\u9009\u7EC4\u5408", value: group?.mode ?? "and", onChange: (e) => onChange({ ...group, mode: e.target.value }), children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "and", children: "\u6EE1\u8DB3\u5168\u90E8\u6761\u4EF6 AND" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "or", children: "\u6EE1\u8DB3\u4EFB\u610F\u6761\u4EF6 OR" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: add2, children: "\u6DFB\u52A0\u6761\u4EF6" }),
      depth < 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => onChange({ ...group, rules: [...rules, { mode: "or", rules: [] }] }), children: "\u6DFB\u52A0\u6761\u4EF6\u7EC4" })
    ] }),
    rules.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "pg-rule", children: [
      r.rules ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Filters, { group: r, fields, depth: depth + 1, onChange: (v) => update(i, v) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { fields, value: r.field, onChange: (field) => update(i, { ...r, field }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", { "aria-label": "\u7B5B\u9009\u8FD0\u7B97", value: r.op, onChange: (e) => update(i, { ...r, op: e.target.value, value: e.target.value === "in" ? [] : "" }), children: Object.entries({ eq: "\u7B49\u4E8E", ne: "\u4E0D\u7B49\u4E8E", gt: "\u5927\u4E8E", gte: "\u5927\u4E8E\u7B49\u4E8E", lt: "\u5C0F\u4E8E", lte: "\u5C0F\u4E8E\u7B49\u4E8E", contains: "\u5305\u542B", starts: "\u5F00\u5934\u662F", ends: "\u7ED3\u5C3E\u662F", isNull: "\u4E3A\u7A7A NULL", notNull: "\u975E\u7A7A", in: "\u5C5E\u4E8E\u5217\u8868" }).map(([v, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: v, children: l }, v)) }),
        !["isNull", "notNull"].includes(r.op) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { "aria-label": "\u7B5B\u9009\u503C", placeholder: r.op === "in" ? "\u9017\u53F7\u5206\u9694\u591A\u4E2A\u503C" : "\u6761\u4EF6\u503C", value: Array.isArray(r.value) ? r.value.join(",") : String(r.value ?? ""), onChange: (e) => update(i, { ...r, value: r.op === "in" ? e.target.value.split(",") : e.target.value }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { "aria-label": "\u5220\u9664\u6761\u4EF6", onClick: () => onChange({ ...group, rules: rules.filter((_, j) => j !== i) }), children: "\u5220\u9664" })
    ] }, i))
  ] });
}
function RuleEditor({ plan, onChange, catalog, fields }) {
  const patch = (v) => onChange({ ...plan, ...v });
  const baseFields = fields.filter((f) => !f.id.startsWith("calc."));
  const measureFields = plan.measures?.length ? [...(plan.groupBy ?? []).map((id) => fields.find((f) => f.id === id)).filter(Boolean), ...plan.measures.map((m) => ({ id: m.name, name: m.name }))] : fields;
  const tableValue = (t) => t ? JSON.stringify([t.schema, t.name ?? t.table]) : "";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "pg-editor", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { open: true, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "\u7B5B\u9009\u6761\u4EF6" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Filters, { group: plan.filters ?? { mode: "and", rules: [] }, fields, onChange: (filters) => patch({ filters }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [
        "\u540C\u5E93\u5173\u8054 \xB7 ",
        (plan.joins ?? []).length,
        " \u5F20\u8868"
      ] }),
      (plan.joins ?? []).map((j, i) => {
        const prior = /* @__PURE__ */ new Set([plan.source.alias, ...plan.joins.slice(0, i).map((t) => t.alias)]);
        const left = baseFields.filter((f) => prior.has(f.id.split(".")[0])), right = baseFields.filter((f) => f.id.startsWith(j.alias + "."));
        const change = (v) => patch({ joins: plan.joins.map((x, k) => i === k ? { ...j, ...v } : x) });
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "pg-block", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "pg-line", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: j.alias }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", { "aria-label": "\u5173\u8054\u8868", value: tableValue(j), onChange: (e) => {
              const [schema, table] = JSON.parse(e.target.value);
              change({ schema, table, on: [{ left: left[0]?.id ?? "", right: "" }] });
            }, children: catalog.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", { value: tableValue(t), children: [
              t.schema,
              ".",
              t.name
            ] }, tableValue(t))) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { "aria-label": "\u8FDE\u63A5\u65B9\u5F0F", value: j.type, onChange: (e) => change({ type: e.target.value }), children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "left", children: "\u5DE6\u8FDE\u63A5 \xB7 \u4FDD\u7559\u672A\u5339\u914D\u884C" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "inner", children: "\u5185\u8FDE\u63A5 \xB7 \u4EC5\u5339\u914D\u884C" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => patch({ joins: plan.joins.filter((_, k) => k !== i) }), children: "\u79FB\u9664\u5173\u8054" })
          ] }),
          j.on.map((pair, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "pg-line", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: "\u5173\u8054\u5DE6\u5B57\u6BB5", fields: left, value: pair.left, onChange: (v) => change({ on: j.on.map((p, n) => n === k ? { ...p, left: v } : p) }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "\u7B49\u4E8E" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { label: "\u5173\u8054\u53F3\u5B57\u6BB5", fields: right, value: pair.right, onChange: (v) => change({ on: j.on.map((p, n) => n === k ? { ...p, right: v } : p) }) }),
            j.on.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => change({ on: j.on.filter((_, n) => n !== k) }), children: "\u5220\u9664" })
          ] }, k)),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => change({ on: [...j.on, { left: left[0]?.id ?? "", right: right[0]?.id ?? "" }] }), children: "\u6DFB\u52A0\u5173\u8054\u5B57\u6BB5" })
        ] }, j.alias);
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { disabled: (plan.joins ?? []).length >= 7, onClick: () => {
        const used = /* @__PURE__ */ new Set([plan.source.alias, ...plan.joins.map((j) => j.alias)]);
        const alias = Array.from({ length: 8 }, (_, i) => "t" + i).find((a) => !used.has(a));
        const t = catalog[0];
        if (t) patch({ joins: [...plan.joins, { schema: t.schema, table: t.name, alias, type: "left", on: [{ left: baseFields[0]?.id ?? "", right: `${alias}.${t.columns[0]?.name ?? ""}` }] }] });
      }, children: "\u6DFB\u52A0\u5173\u8054\u8868" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "pg-muted", children: "\u4E00\u5BF9\u591A\u5173\u8054\u4F1A\u4EA7\u751F\u591A\u884C\uFF0C\u4E0D\u81EA\u52A8\u53BB\u91CD\u3002" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [
        "\u8BA1\u7B97\u5217 \xB7 ",
        (plan.computed ?? []).length
      ] }),
      (plan.computed ?? []).map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "pg-block", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "pg-line", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { "aria-label": "\u8BA1\u7B97\u5217\u540D\u79F0", placeholder: "\u8BA1\u7B97\u5217\u540D\u79F0", value: c.name, onChange: (e) => patch({ computed: plan.computed.map((x, j) => j === i ? { ...x, name: e.target.value } : x) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => patch({ computed: plan.computed.filter((_, j) => j !== i) }), children: "\u5220\u9664\u8BA1\u7B97\u5217" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Expression, { value: c.expr, fields: baseFields, onChange: (expr) => patch({ computed: plan.computed.map((x, j) => j === i ? { ...x, expr } : x) }) })
      ] }, i)),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => patch({ computed: [...plan.computed, { name: "\u8BA1\u7B97" + (plan.computed.length + 1), expr: { op: "mul", args: [baseFields[0]?.id ?? "", { literal: "1", type: "number" }] } }] }), children: "\u6DFB\u52A0\u8BA1\u7B97\u5217" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "\u5206\u7EC4\u3001\u7EDF\u8BA1\u4E0E\u900F\u89C6" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "\u884C\u7EF4\u5EA6\uFF08\u53EF\u591A\u9009\uFF09" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pg-checks", children: fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "checkbox", checked: plan.groupBy.includes(f.id), onChange: (e) => patch({ groupBy: e.target.checked ? [...plan.groupBy, f.id] : plan.groupBy.filter((id) => id !== f.id) }) }),
        f.name
      ] }, f.id)) }),
      plan.measures.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "pg-rule", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { "aria-label": "\u7EDF\u8BA1\u540D\u79F0", value: m.name, onChange: (e) => patch({ measures: plan.measures.map((x, j) => j === i ? { ...x, name: e.target.value } : x) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", { "aria-label": "\u7EDF\u8BA1\u65B9\u5F0F", value: m.fn, onChange: (e) => patch({ measures: plan.measures.map((x, j) => j === i ? { ...x, fn: e.target.value } : x) }), children: Object.entries({ rows: "\u884C\u6570", count: "\u975E\u7A7A\u6570\u91CF", sum: "\u6C42\u548C", avg: "\u5E73\u5747\u503C", min: "\u6700\u5C0F\u503C", max: "\u6700\u5927\u503C" }).map(([v, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: v, children: l }, v)) }),
        m.fn !== "rows" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { fields, value: m.field, onChange: (field) => patch({ measures: plan.measures.map((x, j) => j === i ? { ...x, field } : x) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => patch({ measures: plan.measures.filter((_, j) => j !== i) }), children: "\u5220\u9664" })
      ] }, i)),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => patch({ measures: [...plan.measures, { name: "\u7EDF\u8BA1" + (plan.measures.length + 1), fn: "rows", field: fields[0]?.id ?? "" }] }), children: "\u6DFB\u52A0\u7EDF\u8BA1\u6307\u6807" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "pg-line", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "\u900F\u89C6\u5217\u7EF4\u5EA6" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { "aria-label": "\u900F\u89C6\u5217\u7EF4\u5EA6", value: plan.pivot?.column ?? "", onChange: (e) => {
          const next = { ...plan };
          if (e.target.value) next.pivot = { column: e.target.value };
          else delete next.pivot;
          onChange(next);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "", children: "\u4E0D\u900F\u89C6" }),
          fields.filter((f) => !plan.groupBy.includes(f.id)).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: f.id, children: f.name }, f.id))
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "pg-muted", children: "\u7EDF\u8BA1\u9488\u5BF9\u5168\u90E8\u7B5B\u9009\u7ED3\u679C\uFF1B\u900F\u89C6\u5408\u8BA1\u6309\u539F\u59CB\u6570\u636E\u8BA1\u7B97\u3002" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [
        "\u591A\u5217\u6392\u5E8F \xB7 ",
        plan.sort.length
      ] }),
      plan.sort.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "pg-rule", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { fields: measureFields, value: s.field, onChange: (field) => patch({ sort: plan.sort.map((x, j) => i === j ? { ...x, field } : x) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { "aria-label": "\u6392\u5E8F\u65B9\u5411", value: s.direction, onChange: (e) => patch({ sort: plan.sort.map((x, j) => i === j ? { ...x, direction: e.target.value } : x) }), children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "asc", children: "\u5347\u5E8F" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "desc", children: "\u964D\u5E8F" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => patch({ sort: plan.sort.filter((_, j) => j !== i) }), children: "\u5220\u9664" })
      ] }, i)),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { onClick: () => patch({ sort: [...plan.sort, { field: measureFields[0]?.id ?? "", direction: "asc" }] }), children: "\u6DFB\u52A0\u6392\u5E8F" })
    ] })
  ] });
}

// node_modules/.pnpm/decimal.js@10.6.0/node_modules/decimal.js/decimal.mjs
var EXP_LIMIT = 9e15;
var MAX_DIGITS = 1e9;
var NUMERALS = "0123456789abcdef";
var LN10 = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058";
var PI = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789";
var DEFAULTS = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed at run-time using the `Decimal.config` method.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used when rounding to `precision`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The modulo mode used when calculating the modulus: a mod n.
  // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
  // The remainder (r) is calculated as: r = a - n * q.
  //
  // UP         0 The remainder is positive if the dividend is negative, else is negative.
  // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
  // FLOOR      3 The remainder has the same sign as the divisor (Python %).
  // HALF_EVEN  6 The IEEE 754 remainder function.
  // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
  //
  // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
  // division (9) are commonly used for the modulus operation. The other rounding modes can also
  // be used, but they may not give useful results.
  modulo: 1,
  // 0 to 9
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -EXP_LIMIT
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to EXP_LIMIT
  // The minimum exponent value, beneath which underflow to zero occurs.
  // JavaScript numbers: -324  (5e-324)
  minE: -EXP_LIMIT,
  // -1 to -EXP_LIMIT
  // The maximum exponent value, above which overflow to Infinity occurs.
  // JavaScript numbers: 308  (1.7976931348623157e+308)
  maxE: EXP_LIMIT,
  // 1 to EXP_LIMIT
  // Whether to use cryptographically-secure random number generation, if available.
  crypto: false
  // true/false
};
var inexact;
var quadrant;
var external = true;
var decimalError = "[DecimalError] ";
var invalidArgument = decimalError + "Invalid argument: ";
var precisionLimitExceeded = decimalError + "Precision limit exceeded";
var cryptoUnavailable = decimalError + "crypto unavailable";
var tag = "[object Decimal]";
var mathfloor = Math.floor;
var mathpow = Math.pow;
var isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i;
var isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i;
var isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i;
var isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
var BASE = 1e7;
var LOG_BASE = 7;
var MAX_SAFE_INTEGER = 9007199254740991;
var LN10_PRECISION = LN10.length - 1;
var PI_PRECISION = PI.length - 1;
var P = { toStringTag: tag };
P.absoluteValue = P.abs = function() {
  var x = new this.constructor(this);
  if (x.s < 0) x.s = 1;
  return finalise(x);
};
P.ceil = function() {
  return finalise(new this.constructor(this), this.e + 1, 2);
};
P.clampedTo = P.clamp = function(min2, max2) {
  var k, x = this, Ctor = x.constructor;
  min2 = new Ctor(min2);
  max2 = new Ctor(max2);
  if (!min2.s || !max2.s) return new Ctor(NaN);
  if (min2.gt(max2)) throw Error(invalidArgument + max2);
  k = x.cmp(min2);
  return k < 0 ? min2 : x.cmp(max2) > 0 ? max2 : new Ctor(x);
};
P.comparedTo = P.cmp = function(y) {
  var i, j, xdL, ydL, x = this, xd = x.d, yd = (y = new x.constructor(y)).d, xs = x.s, ys = y.s;
  if (!xd || !yd) {
    return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
  }
  if (!xd[0] || !yd[0]) return xd[0] ? xs : yd[0] ? -ys : 0;
  if (xs !== ys) return xs;
  if (x.e !== y.e) return x.e > y.e ^ xs < 0 ? 1 : -1;
  xdL = xd.length;
  ydL = yd.length;
  for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
    if (xd[i] !== yd[i]) return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
  }
  return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
};
P.cosine = P.cos = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.d) return new Ctor(NaN);
  if (!x.d[0]) return new Ctor(1);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
  Ctor.rounding = 1;
  x = cosine(Ctor, toLessThanHalfPi(Ctor, x));
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
};
P.cubeRoot = P.cbrt = function() {
  var e, m, n, r, rep, s, sd, t, t3, t3plusx, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero()) return new Ctor(x);
  external = false;
  s = x.s * mathpow(x.s * x, 1 / 3);
  if (!s || Math.abs(s) == 1 / 0) {
    n = digitsToString(x.d);
    e = x.e;
    if (s = (e - n.length + 1) % 3) n += s == 1 || s == -2 ? "0" : "00";
    s = mathpow(n, 1 / 3);
    e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));
    if (s == 1 / 0) {
      n = "5e" + e;
    } else {
      n = s.toExponential();
      n = n.slice(0, n.indexOf("e") + 1) + e;
    }
    r = new Ctor(n);
    r.s = x.s;
  } else {
    r = new Ctor(s.toString());
  }
  sd = (e = Ctor.precision) + 3;
  for (; ; ) {
    t = r;
    t3 = t.times(t).times(t);
    t3plusx = t3.plus(x);
    r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);
    if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
      n = n.slice(sd - 3, sd + 1);
      if (n == "9999" || !rep && n == "4999") {
        if (!rep) {
          finalise(t, e + 1, 0);
          if (t.times(t).times(t).eq(x)) {
            r = t;
            break;
          }
        }
        sd += 4;
        rep = 1;
      } else {
        if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
          finalise(r, e + 1, 1);
          m = !r.times(r).times(r).eq(x);
        }
        break;
      }
    }
  }
  external = true;
  return finalise(r, e, Ctor.rounding, m);
};
P.decimalPlaces = P.dp = function() {
  var w, d = this.d, n = NaN;
  if (d) {
    w = d.length - 1;
    n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;
    w = d[w];
    if (w) for (; w % 10 == 0; w /= 10) n--;
    if (n < 0) n = 0;
  }
  return n;
};
P.dividedBy = P.div = function(y) {
  return divide(this, new this.constructor(y));
};
P.dividedToIntegerBy = P.divToInt = function(y) {
  var x = this, Ctor = x.constructor;
  return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
};
P.equals = P.eq = function(y) {
  return this.cmp(y) === 0;
};
P.floor = function() {
  return finalise(new this.constructor(this), this.e + 1, 3);
};
P.greaterThan = P.gt = function(y) {
  return this.cmp(y) > 0;
};
P.greaterThanOrEqualTo = P.gte = function(y) {
  var k = this.cmp(y);
  return k == 1 || k === 0;
};
P.hyperbolicCosine = P.cosh = function() {
  var k, n, pr, rm, len, x = this, Ctor = x.constructor, one = new Ctor(1);
  if (!x.isFinite()) return new Ctor(x.s ? 1 / 0 : NaN);
  if (x.isZero()) return one;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
  Ctor.rounding = 1;
  len = x.d.length;
  if (len < 32) {
    k = Math.ceil(len / 3);
    n = (1 / tinyPow(4, k)).toString();
  } else {
    k = 16;
    n = "2.3283064365386962890625e-10";
  }
  x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), true);
  var cosh2_x, i = k, d8 = new Ctor(8);
  for (; i--; ) {
    cosh2_x = x.times(x);
    x = one.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
  }
  return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
};
P.hyperbolicSine = P.sinh = function() {
  var k, pr, rm, len, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero()) return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
  Ctor.rounding = 1;
  len = x.d.length;
  if (len < 3) {
    x = taylorSeries(Ctor, 2, x, x, true);
  } else {
    k = 1.4 * Math.sqrt(len);
    k = k > 16 ? 16 : k | 0;
    x = x.times(1 / tinyPow(5, k));
    x = taylorSeries(Ctor, 2, x, x, true);
    var sinh2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
    for (; k--; ) {
      sinh2_x = x.times(x);
      x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
    }
  }
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(x, pr, rm, true);
};
P.hyperbolicTangent = P.tanh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite()) return new Ctor(x.s);
  if (x.isZero()) return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 7;
  Ctor.rounding = 1;
  return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
};
P.inverseCosine = P.acos = function() {
  var x = this, Ctor = x.constructor, k = x.abs().cmp(1), pr = Ctor.precision, rm = Ctor.rounding;
  if (k !== -1) {
    return k === 0 ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0) : new Ctor(NaN);
  }
  if (x.isZero()) return getPi(Ctor, pr + 4, rm).times(0.5);
  Ctor.precision = pr + 6;
  Ctor.rounding = 1;
  x = new Ctor(1).minus(x).div(x.plus(1)).sqrt().atan();
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.times(2);
};
P.inverseHyperbolicCosine = P.acosh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (x.lte(1)) return new Ctor(x.eq(1) ? 0 : NaN);
  if (!x.isFinite()) return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
  Ctor.rounding = 1;
  external = false;
  x = x.times(x).minus(1).sqrt().plus(x);
  external = true;
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.ln();
};
P.inverseHyperbolicSine = P.asinh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero()) return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
  Ctor.rounding = 1;
  external = false;
  x = x.times(x).plus(1).sqrt().plus(x);
  external = true;
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.ln();
};
P.inverseHyperbolicTangent = P.atanh = function() {
  var pr, rm, wpr, xsd, x = this, Ctor = x.constructor;
  if (!x.isFinite()) return new Ctor(NaN);
  if (x.e >= 0) return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  xsd = x.sd();
  if (Math.max(xsd, pr) < 2 * -x.e - 1) return finalise(new Ctor(x), pr, rm, true);
  Ctor.precision = wpr = xsd - x.e;
  x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);
  Ctor.precision = pr + 4;
  Ctor.rounding = 1;
  x = x.ln();
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.times(0.5);
};
P.inverseSine = P.asin = function() {
  var halfPi, k, pr, rm, x = this, Ctor = x.constructor;
  if (x.isZero()) return new Ctor(x);
  k = x.abs().cmp(1);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (k !== -1) {
    if (k === 0) {
      halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
      halfPi.s = x.s;
      return halfPi;
    }
    return new Ctor(NaN);
  }
  Ctor.precision = pr + 6;
  Ctor.rounding = 1;
  x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.times(2);
};
P.inverseTangent = P.atan = function() {
  var i, j, k, n, px, t, r, wpr, x2, x = this, Ctor = x.constructor, pr = Ctor.precision, rm = Ctor.rounding;
  if (!x.isFinite()) {
    if (!x.s) return new Ctor(NaN);
    if (pr + 4 <= PI_PRECISION) {
      r = getPi(Ctor, pr + 4, rm).times(0.5);
      r.s = x.s;
      return r;
    }
  } else if (x.isZero()) {
    return new Ctor(x);
  } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
    r = getPi(Ctor, pr + 4, rm).times(0.25);
    r.s = x.s;
    return r;
  }
  Ctor.precision = wpr = pr + 10;
  Ctor.rounding = 1;
  k = Math.min(28, wpr / LOG_BASE + 2 | 0);
  for (i = k; i; --i) x = x.div(x.times(x).plus(1).sqrt().plus(1));
  external = false;
  j = Math.ceil(wpr / LOG_BASE);
  n = 1;
  x2 = x.times(x);
  r = new Ctor(x);
  px = x;
  for (; i !== -1; ) {
    px = px.times(x2);
    t = r.minus(px.div(n += 2));
    px = px.times(x2);
    r = t.plus(px.div(n += 2));
    if (r.d[j] !== void 0) for (i = j; r.d[i] === t.d[i] && i--; ) ;
  }
  if (k) r = r.times(2 << k - 1);
  external = true;
  return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
};
P.isFinite = function() {
  return !!this.d;
};
P.isInteger = P.isInt = function() {
  return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
};
P.isNaN = function() {
  return !this.s;
};
P.isNegative = P.isNeg = function() {
  return this.s < 0;
};
P.isPositive = P.isPos = function() {
  return this.s > 0;
};
P.isZero = function() {
  return !!this.d && this.d[0] === 0;
};
P.lessThan = P.lt = function(y) {
  return this.cmp(y) < 0;
};
P.lessThanOrEqualTo = P.lte = function(y) {
  return this.cmp(y) < 1;
};
P.logarithm = P.log = function(base) {
  var isBase10, d, denominator, k, inf, num, sd, r, arg = this, Ctor = arg.constructor, pr = Ctor.precision, rm = Ctor.rounding, guard = 5;
  if (base == null) {
    base = new Ctor(10);
    isBase10 = true;
  } else {
    base = new Ctor(base);
    d = base.d;
    if (base.s < 0 || !d || !d[0] || base.eq(1)) return new Ctor(NaN);
    isBase10 = base.eq(10);
  }
  d = arg.d;
  if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
    return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
  }
  if (isBase10) {
    if (d.length > 1) {
      inf = true;
    } else {
      for (k = d[0]; k % 10 === 0; ) k /= 10;
      inf = k !== 1;
    }
  }
  external = false;
  sd = pr + guard;
  num = naturalLogarithm(arg, sd);
  denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
  r = divide(num, denominator, sd, 1);
  if (checkRoundingDigits(r.d, k = pr, rm)) {
    do {
      sd += 10;
      num = naturalLogarithm(arg, sd);
      denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
      r = divide(num, denominator, sd, 1);
      if (!inf) {
        if (+digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
          r = finalise(r, pr + 1, 0);
        }
        break;
      }
    } while (checkRoundingDigits(r.d, k += 10, rm));
  }
  external = true;
  return finalise(r, pr, rm);
};
P.minus = P.sub = function(y) {
  var d, e, i, j, k, len, pr, rm, xd, xe, xLTy, yd, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.d) {
    if (!x.s || !y.s) y = new Ctor(NaN);
    else if (x.d) y.s = -y.s;
    else y = new Ctor(y.d || x.s !== y.s ? x : NaN);
    return y;
  }
  if (x.s != y.s) {
    y.s = -y.s;
    return x.plus(y);
  }
  xd = x.d;
  yd = y.d;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (!xd[0] || !yd[0]) {
    if (yd[0]) y.s = -y.s;
    else if (xd[0]) y = new Ctor(x);
    else return new Ctor(rm === 3 ? -0 : 0);
    return external ? finalise(y, pr, rm) : y;
  }
  e = mathfloor(y.e / LOG_BASE);
  xe = mathfloor(x.e / LOG_BASE);
  xd = xd.slice();
  k = xe - e;
  if (k) {
    xLTy = k < 0;
    if (xLTy) {
      d = xd;
      k = -k;
      len = yd.length;
    } else {
      d = yd;
      e = xe;
      len = xd.length;
    }
    i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;
    if (k > i) {
      k = i;
      d.length = 1;
    }
    d.reverse();
    for (i = k; i--; ) d.push(0);
    d.reverse();
  } else {
    i = xd.length;
    len = yd.length;
    xLTy = i < len;
    if (xLTy) len = i;
    for (i = 0; i < len; i++) {
      if (xd[i] != yd[i]) {
        xLTy = xd[i] < yd[i];
        break;
      }
    }
    k = 0;
  }
  if (xLTy) {
    d = xd;
    xd = yd;
    yd = d;
    y.s = -y.s;
  }
  len = xd.length;
  for (i = yd.length - len; i > 0; --i) xd[len++] = 0;
  for (i = yd.length; i > k; ) {
    if (xd[--i] < yd[i]) {
      for (j = i; j && xd[--j] === 0; ) xd[j] = BASE - 1;
      --xd[j];
      xd[i] += BASE;
    }
    xd[i] -= yd[i];
  }
  for (; xd[--len] === 0; ) xd.pop();
  for (; xd[0] === 0; xd.shift()) --e;
  if (!xd[0]) return new Ctor(rm === 3 ? -0 : 0);
  y.d = xd;
  y.e = getBase10Exponent(xd, e);
  return external ? finalise(y, pr, rm) : y;
};
P.modulo = P.mod = function(y) {
  var q, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.s || y.d && !y.d[0]) return new Ctor(NaN);
  if (!y.d || x.d && !x.d[0]) {
    return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
  }
  external = false;
  if (Ctor.modulo == 9) {
    q = divide(x, y.abs(), 0, 3, 1);
    q.s *= y.s;
  } else {
    q = divide(x, y, 0, Ctor.modulo, 1);
  }
  q = q.times(y);
  external = true;
  return x.minus(q);
};
P.naturalExponential = P.exp = function() {
  return naturalExponential(this);
};
P.naturalLogarithm = P.ln = function() {
  return naturalLogarithm(this);
};
P.negated = P.neg = function() {
  var x = new this.constructor(this);
  x.s = -x.s;
  return finalise(x);
};
P.plus = P.add = function(y) {
  var carry, d, e, i, k, len, pr, rm, xd, yd, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.d) {
    if (!x.s || !y.s) y = new Ctor(NaN);
    else if (!x.d) y = new Ctor(y.d || x.s === y.s ? x : NaN);
    return y;
  }
  if (x.s != y.s) {
    y.s = -y.s;
    return x.minus(y);
  }
  xd = x.d;
  yd = y.d;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (!xd[0] || !yd[0]) {
    if (!yd[0]) y = new Ctor(x);
    return external ? finalise(y, pr, rm) : y;
  }
  k = mathfloor(x.e / LOG_BASE);
  e = mathfloor(y.e / LOG_BASE);
  xd = xd.slice();
  i = k - e;
  if (i) {
    if (i < 0) {
      d = xd;
      i = -i;
      len = yd.length;
    } else {
      d = yd;
      e = k;
      len = xd.length;
    }
    k = Math.ceil(pr / LOG_BASE);
    len = k > len ? k + 1 : len + 1;
    if (i > len) {
      i = len;
      d.length = 1;
    }
    d.reverse();
    for (; i--; ) d.push(0);
    d.reverse();
  }
  len = xd.length;
  i = yd.length;
  if (len - i < 0) {
    i = len;
    d = yd;
    yd = xd;
    xd = d;
  }
  for (carry = 0; i; ) {
    carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
    xd[i] %= BASE;
  }
  if (carry) {
    xd.unshift(carry);
    ++e;
  }
  for (len = xd.length; xd[--len] == 0; ) xd.pop();
  y.d = xd;
  y.e = getBase10Exponent(xd, e);
  return external ? finalise(y, pr, rm) : y;
};
P.precision = P.sd = function(z) {
  var k, x = this;
  if (z !== void 0 && z !== !!z && z !== 1 && z !== 0) throw Error(invalidArgument + z);
  if (x.d) {
    k = getPrecision(x.d);
    if (z && x.e + 1 > k) k = x.e + 1;
  } else {
    k = NaN;
  }
  return k;
};
P.round = function() {
  var x = this, Ctor = x.constructor;
  return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
};
P.sine = P.sin = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite()) return new Ctor(NaN);
  if (x.isZero()) return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
  Ctor.rounding = 1;
  x = sine(Ctor, toLessThanHalfPi(Ctor, x));
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
};
P.squareRoot = P.sqrt = function() {
  var m, n, sd, r, rep, t, x = this, d = x.d, e = x.e, s = x.s, Ctor = x.constructor;
  if (s !== 1 || !d || !d[0]) {
    return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
  }
  external = false;
  s = Math.sqrt(+x);
  if (s == 0 || s == 1 / 0) {
    n = digitsToString(d);
    if ((n.length + e) % 2 == 0) n += "0";
    s = Math.sqrt(n);
    e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);
    if (s == 1 / 0) {
      n = "5e" + e;
    } else {
      n = s.toExponential();
      n = n.slice(0, n.indexOf("e") + 1) + e;
    }
    r = new Ctor(n);
  } else {
    r = new Ctor(s.toString());
  }
  sd = (e = Ctor.precision) + 3;
  for (; ; ) {
    t = r;
    r = t.plus(divide(x, t, sd + 2, 1)).times(0.5);
    if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
      n = n.slice(sd - 3, sd + 1);
      if (n == "9999" || !rep && n == "4999") {
        if (!rep) {
          finalise(t, e + 1, 0);
          if (t.times(t).eq(x)) {
            r = t;
            break;
          }
        }
        sd += 4;
        rep = 1;
      } else {
        if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
          finalise(r, e + 1, 1);
          m = !r.times(r).eq(x);
        }
        break;
      }
    }
  }
  external = true;
  return finalise(r, e, Ctor.rounding, m);
};
P.tangent = P.tan = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite()) return new Ctor(NaN);
  if (x.isZero()) return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 10;
  Ctor.rounding = 1;
  x = x.sin();
  x.s = 1;
  x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
};
P.times = P.mul = function(y) {
  var carry, e, i, k, r, rL, t, xdL, ydL, x = this, Ctor = x.constructor, xd = x.d, yd = (y = new Ctor(y)).d;
  y.s *= x.s;
  if (!xd || !xd[0] || !yd || !yd[0]) {
    return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd ? NaN : !xd || !yd ? y.s / 0 : y.s * 0);
  }
  e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
  xdL = xd.length;
  ydL = yd.length;
  if (xdL < ydL) {
    r = xd;
    xd = yd;
    yd = r;
    rL = xdL;
    xdL = ydL;
    ydL = rL;
  }
  r = [];
  rL = xdL + ydL;
  for (i = rL; i--; ) r.push(0);
  for (i = ydL; --i >= 0; ) {
    carry = 0;
    for (k = xdL + i; k > i; ) {
      t = r[k] + yd[i] * xd[k - i - 1] + carry;
      r[k--] = t % BASE | 0;
      carry = t / BASE | 0;
    }
    r[k] = (r[k] + carry) % BASE | 0;
  }
  for (; !r[--rL]; ) r.pop();
  if (carry) ++e;
  else r.shift();
  y.d = r;
  y.e = getBase10Exponent(r, e);
  return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
};
P.toBinary = function(sd, rm) {
  return toStringBinary(this, 2, sd, rm);
};
P.toDecimalPlaces = P.toDP = function(dp, rm) {
  var x = this, Ctor = x.constructor;
  x = new Ctor(x);
  if (dp === void 0) return x;
  checkInt32(dp, 0, MAX_DIGITS);
  if (rm === void 0) rm = Ctor.rounding;
  else checkInt32(rm, 0, 8);
  return finalise(x, dp + x.e + 1, rm);
};
P.toExponential = function(dp, rm) {
  var str, x = this, Ctor = x.constructor;
  if (dp === void 0) {
    str = finiteToString(x, true);
  } else {
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);
    x = finalise(new Ctor(x), dp + 1, rm);
    str = finiteToString(x, true, dp + 1);
  }
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.toFixed = function(dp, rm) {
  var str, y, x = this, Ctor = x.constructor;
  if (dp === void 0) {
    str = finiteToString(x);
  } else {
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);
    y = finalise(new Ctor(x), dp + x.e + 1, rm);
    str = finiteToString(y, false, dp + y.e + 1);
  }
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.toFraction = function(maxD) {
  var d, d0, d1, d2, e, k, n, n0, n1, pr, q, r, x = this, xd = x.d, Ctor = x.constructor;
  if (!xd) return new Ctor(x);
  n1 = d0 = new Ctor(1);
  d1 = n0 = new Ctor(0);
  d = new Ctor(d1);
  e = d.e = getPrecision(xd) - x.e - 1;
  k = e % LOG_BASE;
  d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);
  if (maxD == null) {
    maxD = e > 0 ? d : n1;
  } else {
    n = new Ctor(maxD);
    if (!n.isInt() || n.lt(n1)) throw Error(invalidArgument + n);
    maxD = n.gt(d) ? e > 0 ? d : n1 : n;
  }
  external = false;
  n = new Ctor(digitsToString(xd));
  pr = Ctor.precision;
  Ctor.precision = e = xd.length * LOG_BASE * 2;
  for (; ; ) {
    q = divide(n, d, 0, 1, 1);
    d2 = d0.plus(q.times(d1));
    if (d2.cmp(maxD) == 1) break;
    d0 = d1;
    d1 = d2;
    d2 = n1;
    n1 = n0.plus(q.times(d2));
    n0 = d2;
    d2 = d;
    d = n.minus(q.times(d2));
    n = d2;
  }
  d2 = divide(maxD.minus(d0), d1, 0, 1, 1);
  n0 = n0.plus(d2.times(n1));
  d0 = d0.plus(d2.times(d1));
  n0.s = n1.s = x.s;
  r = divide(n1, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];
  Ctor.precision = pr;
  external = true;
  return r;
};
P.toHexadecimal = P.toHex = function(sd, rm) {
  return toStringBinary(this, 16, sd, rm);
};
P.toNearest = function(y, rm) {
  var x = this, Ctor = x.constructor;
  x = new Ctor(x);
  if (y == null) {
    if (!x.d) return x;
    y = new Ctor(1);
    rm = Ctor.rounding;
  } else {
    y = new Ctor(y);
    if (rm === void 0) {
      rm = Ctor.rounding;
    } else {
      checkInt32(rm, 0, 8);
    }
    if (!x.d) return y.s ? x : y;
    if (!y.d) {
      if (y.s) y.s = x.s;
      return y;
    }
  }
  if (y.d[0]) {
    external = false;
    x = divide(x, y, 0, rm, 1).times(y);
    external = true;
    finalise(x);
  } else {
    y.s = x.s;
    x = y;
  }
  return x;
};
P.toNumber = function() {
  return +this;
};
P.toOctal = function(sd, rm) {
  return toStringBinary(this, 8, sd, rm);
};
P.toPower = P.pow = function(y) {
  var e, k, pr, r, rm, s, x = this, Ctor = x.constructor, yn = +(y = new Ctor(y));
  if (!x.d || !y.d || !x.d[0] || !y.d[0]) return new Ctor(mathpow(+x, yn));
  x = new Ctor(x);
  if (x.eq(1)) return x;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (y.eq(1)) return finalise(x, pr, rm);
  e = mathfloor(y.e / LOG_BASE);
  if (e >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
    r = intPow(Ctor, x, k, pr);
    return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
  }
  s = x.s;
  if (s < 0) {
    if (e < y.d.length - 1) return new Ctor(NaN);
    if ((y.d[e] & 1) == 0) s = 1;
    if (x.e == 0 && x.d[0] == 1 && x.d.length == 1) {
      x.s = s;
      return x;
    }
  }
  k = mathpow(+x, yn);
  e = k == 0 || !isFinite(k) ? mathfloor(yn * (Math.log("0." + digitsToString(x.d)) / Math.LN10 + x.e + 1)) : new Ctor(k + "").e;
  if (e > Ctor.maxE + 1 || e < Ctor.minE - 1) return new Ctor(e > 0 ? s / 0 : 0);
  external = false;
  Ctor.rounding = x.s = 1;
  k = Math.min(12, (e + "").length);
  r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);
  if (r.d) {
    r = finalise(r, pr + 5, 1);
    if (checkRoundingDigits(r.d, pr, rm)) {
      e = pr + 10;
      r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1);
      if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
        r = finalise(r, pr + 1, 0);
      }
    }
  }
  r.s = s;
  external = true;
  Ctor.rounding = rm;
  return finalise(r, pr, rm);
};
P.toPrecision = function(sd, rm) {
  var str, x = this, Ctor = x.constructor;
  if (sd === void 0) {
    str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  } else {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);
    x = finalise(new Ctor(x), sd, rm);
    str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
  }
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.toSignificantDigits = P.toSD = function(sd, rm) {
  var x = this, Ctor = x.constructor;
  if (sd === void 0) {
    sd = Ctor.precision;
    rm = Ctor.rounding;
  } else {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);
  }
  return finalise(new Ctor(x), sd, rm);
};
P.toString = function() {
  var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.truncated = P.trunc = function() {
  return finalise(new this.constructor(this), this.e + 1, 1);
};
P.valueOf = P.toJSON = function() {
  var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  return x.isNeg() ? "-" + str : str;
};
function digitsToString(d) {
  var i, k, ws, indexOfLastWord = d.length - 1, str = "", w = d[0];
  if (indexOfLastWord > 0) {
    str += w;
    for (i = 1; i < indexOfLastWord; i++) {
      ws = d[i] + "";
      k = LOG_BASE - ws.length;
      if (k) str += getZeroString(k);
      str += ws;
    }
    w = d[i];
    ws = w + "";
    k = LOG_BASE - ws.length;
    if (k) str += getZeroString(k);
  } else if (w === 0) {
    return "0";
  }
  for (; w % 10 === 0; ) w /= 10;
  return str + w;
}
function checkInt32(i, min2, max2) {
  if (i !== ~~i || i < min2 || i > max2) {
    throw Error(invalidArgument + i);
  }
}
function checkRoundingDigits(d, i, rm, repeating) {
  var di, k, r, rd;
  for (k = d[0]; k >= 10; k /= 10) --i;
  if (--i < 0) {
    i += LOG_BASE;
    di = 0;
  } else {
    di = Math.ceil((i + 1) / LOG_BASE);
    i %= LOG_BASE;
  }
  k = mathpow(10, LOG_BASE - i);
  rd = d[di] % k | 0;
  if (repeating == null) {
    if (i < 3) {
      if (i == 0) rd = rd / 100 | 0;
      else if (i == 1) rd = rd / 10 | 0;
      r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 5e4 || rd == 0;
    } else {
      r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 100 | 0) == mathpow(10, i - 2) - 1 || (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
    }
  } else {
    if (i < 4) {
      if (i == 0) rd = rd / 1e3 | 0;
      else if (i == 1) rd = rd / 100 | 0;
      else if (i == 2) rd = rd / 10 | 0;
      r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
    } else {
      r = ((repeating || rm < 4) && rd + 1 == k || !repeating && rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 1e3 | 0) == mathpow(10, i - 3) - 1;
    }
  }
  return r;
}
function convertBase(str, baseIn, baseOut) {
  var j, arr = [0], arrL, i = 0, strL = str.length;
  for (; i < strL; ) {
    for (arrL = arr.length; arrL--; ) arr[arrL] *= baseIn;
    arr[0] += NUMERALS.indexOf(str.charAt(i++));
    for (j = 0; j < arr.length; j++) {
      if (arr[j] > baseOut - 1) {
        if (arr[j + 1] === void 0) arr[j + 1] = 0;
        arr[j + 1] += arr[j] / baseOut | 0;
        arr[j] %= baseOut;
      }
    }
  }
  return arr.reverse();
}
function cosine(Ctor, x) {
  var k, len, y;
  if (x.isZero()) return x;
  len = x.d.length;
  if (len < 32) {
    k = Math.ceil(len / 3);
    y = (1 / tinyPow(4, k)).toString();
  } else {
    k = 16;
    y = "2.3283064365386962890625e-10";
  }
  Ctor.precision += k;
  x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));
  for (var i = k; i--; ) {
    var cos2x = x.times(x);
    x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
  }
  Ctor.precision -= k;
  return x;
}
var divide = /* @__PURE__ */ (function() {
  function multiplyInteger(x, k, base) {
    var temp, carry = 0, i = x.length;
    for (x = x.slice(); i--; ) {
      temp = x[i] * k + carry;
      x[i] = temp % base | 0;
      carry = temp / base | 0;
    }
    if (carry) x.unshift(carry);
    return x;
  }
  function compare(a, b, aL, bL) {
    var i, r;
    if (aL != bL) {
      r = aL > bL ? 1 : -1;
    } else {
      for (i = r = 0; i < aL; i++) {
        if (a[i] != b[i]) {
          r = a[i] > b[i] ? 1 : -1;
          break;
        }
      }
    }
    return r;
  }
  function subtract(a, b, aL, base) {
    var i = 0;
    for (; aL--; ) {
      a[aL] -= i;
      i = a[aL] < b[aL] ? 1 : 0;
      a[aL] = i * base + a[aL] - b[aL];
    }
    for (; !a[0] && a.length > 1; ) a.shift();
  }
  return function(x, y, pr, rm, dp, base) {
    var cmp, e, i, k, logBase, more, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0, yL, yz, Ctor = x.constructor, sign2 = x.s == y.s ? 1 : -1, xd = x.d, yd = y.d;
    if (!xd || !xd[0] || !yd || !yd[0]) {
      return new Ctor(
        // Return NaN if either NaN, or both Infinity or 0.
        !x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN : (
          // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
          xd && xd[0] == 0 || !yd ? sign2 * 0 : sign2 / 0
        )
      );
    }
    if (base) {
      logBase = 1;
      e = x.e - y.e;
    } else {
      base = BASE;
      logBase = LOG_BASE;
      e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
    }
    yL = yd.length;
    xL = xd.length;
    q = new Ctor(sign2);
    qd = q.d = [];
    for (i = 0; yd[i] == (xd[i] || 0); i++) ;
    if (yd[i] > (xd[i] || 0)) e--;
    if (pr == null) {
      sd = pr = Ctor.precision;
      rm = Ctor.rounding;
    } else if (dp) {
      sd = pr + (x.e - y.e) + 1;
    } else {
      sd = pr;
    }
    if (sd < 0) {
      qd.push(1);
      more = true;
    } else {
      sd = sd / logBase + 2 | 0;
      i = 0;
      if (yL == 1) {
        k = 0;
        yd = yd[0];
        sd++;
        for (; (i < xL || k) && sd--; i++) {
          t = k * base + (xd[i] || 0);
          qd[i] = t / yd | 0;
          k = t % yd | 0;
        }
        more = k || i < xL;
      } else {
        k = base / (yd[0] + 1) | 0;
        if (k > 1) {
          yd = multiplyInteger(yd, k, base);
          xd = multiplyInteger(xd, k, base);
          yL = yd.length;
          xL = xd.length;
        }
        xi = yL;
        rem = xd.slice(0, yL);
        remL = rem.length;
        for (; remL < yL; ) rem[remL++] = 0;
        yz = yd.slice();
        yz.unshift(0);
        yd0 = yd[0];
        if (yd[1] >= base / 2) ++yd0;
        do {
          k = 0;
          cmp = compare(yd, rem, yL, remL);
          if (cmp < 0) {
            rem0 = rem[0];
            if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);
            k = rem0 / yd0 | 0;
            if (k > 1) {
              if (k >= base) k = base - 1;
              prod = multiplyInteger(yd, k, base);
              prodL = prod.length;
              remL = rem.length;
              cmp = compare(prod, rem, prodL, remL);
              if (cmp == 1) {
                k--;
                subtract(prod, yL < prodL ? yz : yd, prodL, base);
              }
            } else {
              if (k == 0) cmp = k = 1;
              prod = yd.slice();
            }
            prodL = prod.length;
            if (prodL < remL) prod.unshift(0);
            subtract(rem, prod, remL, base);
            if (cmp == -1) {
              remL = rem.length;
              cmp = compare(yd, rem, yL, remL);
              if (cmp < 1) {
                k++;
                subtract(rem, yL < remL ? yz : yd, remL, base);
              }
            }
            remL = rem.length;
          } else if (cmp === 0) {
            k++;
            rem = [0];
          }
          qd[i++] = k;
          if (cmp && rem[0]) {
            rem[remL++] = xd[xi] || 0;
          } else {
            rem = [xd[xi]];
            remL = 1;
          }
        } while ((xi++ < xL || rem[0] !== void 0) && sd--);
        more = rem[0] !== void 0;
      }
      if (!qd[0]) qd.shift();
    }
    if (logBase == 1) {
      q.e = e;
      inexact = more;
    } else {
      for (i = 1, k = qd[0]; k >= 10; k /= 10) i++;
      q.e = i + e * logBase - 1;
      finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
    }
    return q;
  };
})();
function finalise(x, sd, rm, isTruncated) {
  var digits, i, j, k, rd, roundUp, w, xd, xdi, Ctor = x.constructor;
  out: if (sd != null) {
    xd = x.d;
    if (!xd) return x;
    for (digits = 1, k = xd[0]; k >= 10; k /= 10) digits++;
    i = sd - digits;
    if (i < 0) {
      i += LOG_BASE;
      j = sd;
      w = xd[xdi = 0];
      rd = w / mathpow(10, digits - j - 1) % 10 | 0;
    } else {
      xdi = Math.ceil((i + 1) / LOG_BASE);
      k = xd.length;
      if (xdi >= k) {
        if (isTruncated) {
          for (; k++ <= xdi; ) xd.push(0);
          w = rd = 0;
          digits = 1;
          i %= LOG_BASE;
          j = i - LOG_BASE + 1;
        } else {
          break out;
        }
      } else {
        w = k = xd[xdi];
        for (digits = 1; k >= 10; k /= 10) digits++;
        i %= LOG_BASE;
        j = i - LOG_BASE + digits;
        rd = j < 0 ? 0 : w / mathpow(10, digits - j - 1) % 10 | 0;
      }
    }
    isTruncated = isTruncated || sd < 0 || xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits - j - 1));
    roundUp = rm < 4 ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
    (i > 0 ? j > 0 ? w / mathpow(10, digits - j) : 0 : xd[xdi - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
    if (sd < 1 || !xd[0]) {
      xd.length = 0;
      if (roundUp) {
        sd -= x.e + 1;
        xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
        x.e = -sd || 0;
      } else {
        xd[0] = x.e = 0;
      }
      return x;
    }
    if (i == 0) {
      xd.length = xdi;
      k = 1;
      xdi--;
    } else {
      xd.length = xdi + 1;
      k = mathpow(10, LOG_BASE - i);
      xd[xdi] = j > 0 ? (w / mathpow(10, digits - j) % mathpow(10, j) | 0) * k : 0;
    }
    if (roundUp) {
      for (; ; ) {
        if (xdi == 0) {
          for (i = 1, j = xd[0]; j >= 10; j /= 10) i++;
          j = xd[0] += k;
          for (k = 1; j >= 10; j /= 10) k++;
          if (i != k) {
            x.e++;
            if (xd[0] == BASE) xd[0] = 1;
          }
          break;
        } else {
          xd[xdi] += k;
          if (xd[xdi] != BASE) break;
          xd[xdi--] = 0;
          k = 1;
        }
      }
    }
    for (i = xd.length; xd[--i] === 0; ) xd.pop();
  }
  if (external) {
    if (x.e > Ctor.maxE) {
      x.d = null;
      x.e = NaN;
    } else if (x.e < Ctor.minE) {
      x.e = 0;
      x.d = [0];
    }
  }
  return x;
}
function finiteToString(x, isExp, sd) {
  if (!x.isFinite()) return nonFiniteToString(x);
  var k, e = x.e, str = digitsToString(x.d), len = str.length;
  if (isExp) {
    if (sd && (k = sd - len) > 0) {
      str = str.charAt(0) + "." + str.slice(1) + getZeroString(k);
    } else if (len > 1) {
      str = str.charAt(0) + "." + str.slice(1);
    }
    str = str + (x.e < 0 ? "e" : "e+") + x.e;
  } else if (e < 0) {
    str = "0." + getZeroString(-e - 1) + str;
    if (sd && (k = sd - len) > 0) str += getZeroString(k);
  } else if (e >= len) {
    str += getZeroString(e + 1 - len);
    if (sd && (k = sd - e - 1) > 0) str = str + "." + getZeroString(k);
  } else {
    if ((k = e + 1) < len) str = str.slice(0, k) + "." + str.slice(k);
    if (sd && (k = sd - len) > 0) {
      if (e + 1 === len) str += ".";
      str += getZeroString(k);
    }
  }
  return str;
}
function getBase10Exponent(digits, e) {
  var w = digits[0];
  for (e *= LOG_BASE; w >= 10; w /= 10) e++;
  return e;
}
function getLn10(Ctor, sd, pr) {
  if (sd > LN10_PRECISION) {
    external = true;
    if (pr) Ctor.precision = pr;
    throw Error(precisionLimitExceeded);
  }
  return finalise(new Ctor(LN10), sd, 1, true);
}
function getPi(Ctor, sd, rm) {
  if (sd > PI_PRECISION) throw Error(precisionLimitExceeded);
  return finalise(new Ctor(PI), sd, rm, true);
}
function getPrecision(digits) {
  var w = digits.length - 1, len = w * LOG_BASE + 1;
  w = digits[w];
  if (w) {
    for (; w % 10 == 0; w /= 10) len--;
    for (w = digits[0]; w >= 10; w /= 10) len++;
  }
  return len;
}
function getZeroString(k) {
  var zs = "";
  for (; k--; ) zs += "0";
  return zs;
}
function intPow(Ctor, x, n, pr) {
  var isTruncated, r = new Ctor(1), k = Math.ceil(pr / LOG_BASE + 4);
  external = false;
  for (; ; ) {
    if (n % 2) {
      r = r.times(x);
      if (truncate(r.d, k)) isTruncated = true;
    }
    n = mathfloor(n / 2);
    if (n === 0) {
      n = r.d.length - 1;
      if (isTruncated && r.d[n] === 0) ++r.d[n];
      break;
    }
    x = x.times(x);
    truncate(x.d, k);
  }
  external = true;
  return r;
}
function isOdd(n) {
  return n.d[n.d.length - 1] & 1;
}
function maxOrMin(Ctor, args, n) {
  var k, y, x = new Ctor(args[0]), i = 0;
  for (; ++i < args.length; ) {
    y = new Ctor(args[i]);
    if (!y.s) {
      x = y;
      break;
    }
    k = x.cmp(y);
    if (k === n || k === 0 && x.s === n) {
      x = y;
    }
  }
  return x;
}
function naturalExponential(x, sd) {
  var denominator, guard, j, pow2, sum2, t, wpr, rep = 0, i = 0, k = 0, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
  if (!x.d || !x.d[0] || x.e > 17) {
    return new Ctor(x.d ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0 : x.s ? x.s < 0 ? 0 : x : 0 / 0);
  }
  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }
  t = new Ctor(0.03125);
  while (x.e > -2) {
    x = x.times(t);
    k += 5;
  }
  guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
  wpr += guard;
  denominator = pow2 = sum2 = new Ctor(1);
  Ctor.precision = wpr;
  for (; ; ) {
    pow2 = finalise(pow2.times(x), wpr, 1);
    denominator = denominator.times(++i);
    t = sum2.plus(divide(pow2, denominator, wpr, 1));
    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
      j = k;
      while (j--) sum2 = finalise(sum2.times(sum2), wpr, 1);
      if (sd == null) {
        if (rep < 3 && checkRoundingDigits(sum2.d, wpr - guard, rm, rep)) {
          Ctor.precision = wpr += 10;
          denominator = pow2 = t = new Ctor(1);
          i = 0;
          rep++;
        } else {
          return finalise(sum2, Ctor.precision = pr, rm, external = true);
        }
      } else {
        Ctor.precision = pr;
        return sum2;
      }
    }
    sum2 = t;
  }
}
function naturalLogarithm(y, sd) {
  var c, c0, denominator, e, numerator, rep, sum2, t, wpr, x1, x2, n = 1, guard = 10, x = y, xd = x.d, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
  if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
    return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
  }
  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }
  Ctor.precision = wpr += guard;
  c = digitsToString(xd);
  c0 = c.charAt(0);
  if (Math.abs(e = x.e) < 15e14) {
    while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
      x = x.times(y);
      c = digitsToString(x.d);
      c0 = c.charAt(0);
      n++;
    }
    e = x.e;
    if (c0 > 1) {
      x = new Ctor("0." + c);
      e++;
    } else {
      x = new Ctor(c0 + "." + c.slice(1));
    }
  } else {
    t = getLn10(Ctor, wpr + 2, pr).times(e + "");
    x = naturalLogarithm(new Ctor(c0 + "." + c.slice(1)), wpr - guard).plus(t);
    Ctor.precision = pr;
    return sd == null ? finalise(x, pr, rm, external = true) : x;
  }
  x1 = x;
  sum2 = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
  x2 = finalise(x.times(x), wpr, 1);
  denominator = 3;
  for (; ; ) {
    numerator = finalise(numerator.times(x2), wpr, 1);
    t = sum2.plus(divide(numerator, new Ctor(denominator), wpr, 1));
    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum2.d).slice(0, wpr)) {
      sum2 = sum2.times(2);
      if (e !== 0) sum2 = sum2.plus(getLn10(Ctor, wpr + 2, pr).times(e + ""));
      sum2 = divide(sum2, new Ctor(n), wpr, 1);
      if (sd == null) {
        if (checkRoundingDigits(sum2.d, wpr - guard, rm, rep)) {
          Ctor.precision = wpr += guard;
          t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1);
          x2 = finalise(x.times(x), wpr, 1);
          denominator = rep = 1;
        } else {
          return finalise(sum2, Ctor.precision = pr, rm, external = true);
        }
      } else {
        Ctor.precision = pr;
        return sum2;
      }
    }
    sum2 = t;
    denominator += 2;
  }
}
function nonFiniteToString(x) {
  return String(x.s * x.s / 0);
}
function parseDecimal(x, str) {
  var e, i, len;
  if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");
  if ((i = str.search(/e/i)) > 0) {
    if (e < 0) e = i;
    e += +str.slice(i + 1);
    str = str.substring(0, i);
  } else if (e < 0) {
    e = str.length;
  }
  for (i = 0; str.charCodeAt(i) === 48; i++) ;
  for (len = str.length; str.charCodeAt(len - 1) === 48; --len) ;
  str = str.slice(i, len);
  if (str) {
    len -= i;
    x.e = e = e - i - 1;
    x.d = [];
    i = (e + 1) % LOG_BASE;
    if (e < 0) i += LOG_BASE;
    if (i < len) {
      if (i) x.d.push(+str.slice(0, i));
      for (len -= LOG_BASE; i < len; ) x.d.push(+str.slice(i, i += LOG_BASE));
      str = str.slice(i);
      i = LOG_BASE - str.length;
    } else {
      i -= len;
    }
    for (; i--; ) str += "0";
    x.d.push(+str);
    if (external) {
      if (x.e > x.constructor.maxE) {
        x.d = null;
        x.e = NaN;
      } else if (x.e < x.constructor.minE) {
        x.e = 0;
        x.d = [0];
      }
    }
  } else {
    x.e = 0;
    x.d = [0];
  }
  return x;
}
function parseOther(x, str) {
  var base, Ctor, divisor, i, isFloat, len, p, xd, xe;
  if (str.indexOf("_") > -1) {
    str = str.replace(/(\d)_(?=\d)/g, "$1");
    if (isDecimal.test(str)) return parseDecimal(x, str);
  } else if (str === "Infinity" || str === "NaN") {
    if (!+str) x.s = NaN;
    x.e = NaN;
    x.d = null;
    return x;
  }
  if (isHex.test(str)) {
    base = 16;
    str = str.toLowerCase();
  } else if (isBinary.test(str)) {
    base = 2;
  } else if (isOctal.test(str)) {
    base = 8;
  } else {
    throw Error(invalidArgument + str);
  }
  i = str.search(/p/i);
  if (i > 0) {
    p = +str.slice(i + 1);
    str = str.substring(2, i);
  } else {
    str = str.slice(2);
  }
  i = str.indexOf(".");
  isFloat = i >= 0;
  Ctor = x.constructor;
  if (isFloat) {
    str = str.replace(".", "");
    len = str.length;
    i = len - i;
    divisor = intPow(Ctor, new Ctor(base), i, i * 2);
  }
  xd = convertBase(str, base, BASE);
  xe = xd.length - 1;
  for (i = xe; xd[i] === 0; --i) xd.pop();
  if (i < 0) return new Ctor(x.s * 0);
  x.e = getBase10Exponent(xd, xe);
  x.d = xd;
  external = false;
  if (isFloat) x = divide(x, divisor, len * 4);
  if (p) x = x.times(Math.abs(p) < 54 ? mathpow(2, p) : Decimal.pow(2, p));
  external = true;
  return x;
}
function sine(Ctor, x) {
  var k, len = x.d.length;
  if (len < 3) {
    return x.isZero() ? x : taylorSeries(Ctor, 2, x, x);
  }
  k = 1.4 * Math.sqrt(len);
  k = k > 16 ? 16 : k | 0;
  x = x.times(1 / tinyPow(5, k));
  x = taylorSeries(Ctor, 2, x, x);
  var sin2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
  for (; k--; ) {
    sin2_x = x.times(x);
    x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
  }
  return x;
}
function taylorSeries(Ctor, n, x, y, isHyperbolic) {
  var j, t, u, x2, i = 1, pr = Ctor.precision, k = Math.ceil(pr / LOG_BASE);
  external = false;
  x2 = x.times(x);
  u = new Ctor(y);
  for (; ; ) {
    t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
    u = isHyperbolic ? y.plus(t) : y.minus(t);
    y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
    t = u.plus(y);
    if (t.d[k] !== void 0) {
      for (j = k; t.d[j] === u.d[j] && j--; ) ;
      if (j == -1) break;
    }
    j = u;
    u = y;
    y = t;
    t = j;
    i++;
  }
  external = true;
  t.d.length = k + 1;
  return t;
}
function tinyPow(b, e) {
  var n = b;
  while (--e) n *= b;
  return n;
}
function toLessThanHalfPi(Ctor, x) {
  var t, isNeg = x.s < 0, pi = getPi(Ctor, Ctor.precision, 1), halfPi = pi.times(0.5);
  x = x.abs();
  if (x.lte(halfPi)) {
    quadrant = isNeg ? 4 : 1;
    return x;
  }
  t = x.divToInt(pi);
  if (t.isZero()) {
    quadrant = isNeg ? 3 : 2;
  } else {
    x = x.minus(t.times(pi));
    if (x.lte(halfPi)) {
      quadrant = isOdd(t) ? isNeg ? 2 : 3 : isNeg ? 4 : 1;
      return x;
    }
    quadrant = isOdd(t) ? isNeg ? 1 : 4 : isNeg ? 3 : 2;
  }
  return x.minus(pi).abs();
}
function toStringBinary(x, baseOut, sd, rm) {
  var base, e, i, k, len, roundUp, str, xd, y, Ctor = x.constructor, isExp = sd !== void 0;
  if (isExp) {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);
  } else {
    sd = Ctor.precision;
    rm = Ctor.rounding;
  }
  if (!x.isFinite()) {
    str = nonFiniteToString(x);
  } else {
    str = finiteToString(x);
    i = str.indexOf(".");
    if (isExp) {
      base = 2;
      if (baseOut == 16) {
        sd = sd * 4 - 3;
      } else if (baseOut == 8) {
        sd = sd * 3 - 2;
      }
    } else {
      base = baseOut;
    }
    if (i >= 0) {
      str = str.replace(".", "");
      y = new Ctor(1);
      y.e = str.length - i;
      y.d = convertBase(finiteToString(y), 10, base);
      y.e = y.d.length;
    }
    xd = convertBase(str, 10, base);
    e = len = xd.length;
    for (; xd[--len] == 0; ) xd.pop();
    if (!xd[0]) {
      str = isExp ? "0p+0" : "0";
    } else {
      if (i < 0) {
        e--;
      } else {
        x = new Ctor(x);
        x.d = xd;
        x.e = e;
        x = divide(x, y, sd, rm, 0, base);
        xd = x.d;
        e = x.e;
        roundUp = inexact;
      }
      i = xd[sd];
      k = base / 2;
      roundUp = roundUp || xd[sd + 1] !== void 0;
      roundUp = rm < 4 ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2)) : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 || rm === (x.s < 0 ? 8 : 7));
      xd.length = sd;
      if (roundUp) {
        for (; ++xd[--sd] > base - 1; ) {
          xd[sd] = 0;
          if (!sd) {
            ++e;
            xd.unshift(1);
          }
        }
      }
      for (len = xd.length; !xd[len - 1]; --len) ;
      for (i = 0, str = ""; i < len; i++) str += NUMERALS.charAt(xd[i]);
      if (isExp) {
        if (len > 1) {
          if (baseOut == 16 || baseOut == 8) {
            i = baseOut == 16 ? 4 : 3;
            for (--len; len % i; len++) str += "0";
            xd = convertBase(str, base, baseOut);
            for (len = xd.length; !xd[len - 1]; --len) ;
            for (i = 1, str = "1."; i < len; i++) str += NUMERALS.charAt(xd[i]);
          } else {
            str = str.charAt(0) + "." + str.slice(1);
          }
        }
        str = str + (e < 0 ? "p" : "p+") + e;
      } else if (e < 0) {
        for (; ++e; ) str = "0" + str;
        str = "0." + str;
      } else {
        if (++e > len) for (e -= len; e--; ) str += "0";
        else if (e < len) str = str.slice(0, e) + "." + str.slice(e);
      }
    }
    str = (baseOut == 16 ? "0x" : baseOut == 2 ? "0b" : baseOut == 8 ? "0o" : "") + str;
  }
  return x.s < 0 ? "-" + str : str;
}
function truncate(arr, len) {
  if (arr.length > len) {
    arr.length = len;
    return true;
  }
}
function abs(x) {
  return new this(x).abs();
}
function acos(x) {
  return new this(x).acos();
}
function acosh(x) {
  return new this(x).acosh();
}
function add(x, y) {
  return new this(x).plus(y);
}
function asin(x) {
  return new this(x).asin();
}
function asinh(x) {
  return new this(x).asinh();
}
function atan(x) {
  return new this(x).atan();
}
function atanh(x) {
  return new this(x).atanh();
}
function atan2(y, x) {
  y = new this(y);
  x = new this(x);
  var r, pr = this.precision, rm = this.rounding, wpr = pr + 4;
  if (!y.s || !x.s) {
    r = new this(NaN);
  } else if (!y.d && !x.d) {
    r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
    r.s = y.s;
  } else if (!x.d || y.isZero()) {
    r = x.s < 0 ? getPi(this, pr, rm) : new this(0);
    r.s = y.s;
  } else if (!y.d || x.isZero()) {
    r = getPi(this, wpr, 1).times(0.5);
    r.s = y.s;
  } else if (x.s < 0) {
    this.precision = wpr;
    this.rounding = 1;
    r = this.atan(divide(y, x, wpr, 1));
    x = getPi(this, wpr, 1);
    this.precision = pr;
    this.rounding = rm;
    r = y.s < 0 ? r.minus(x) : r.plus(x);
  } else {
    r = this.atan(divide(y, x, wpr, 1));
  }
  return r;
}
function cbrt(x) {
  return new this(x).cbrt();
}
function ceil(x) {
  return finalise(x = new this(x), x.e + 1, 2);
}
function clamp(x, min2, max2) {
  return new this(x).clamp(min2, max2);
}
function config(obj) {
  if (!obj || typeof obj !== "object") throw Error(decimalError + "Object expected");
  var i, p, v, useDefaults = obj.defaults === true, ps = [
    "precision",
    1,
    MAX_DIGITS,
    "rounding",
    0,
    8,
    "toExpNeg",
    -EXP_LIMIT,
    0,
    "toExpPos",
    0,
    EXP_LIMIT,
    "maxE",
    0,
    EXP_LIMIT,
    "minE",
    -EXP_LIMIT,
    0,
    "modulo",
    0,
    9
  ];
  for (i = 0; i < ps.length; i += 3) {
    if (p = ps[i], useDefaults) this[p] = DEFAULTS[p];
    if ((v = obj[p]) !== void 0) {
      if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;
      else throw Error(invalidArgument + p + ": " + v);
    }
  }
  if (p = "crypto", useDefaults) this[p] = DEFAULTS[p];
  if ((v = obj[p]) !== void 0) {
    if (v === true || v === false || v === 0 || v === 1) {
      if (v) {
        if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
          this[p] = true;
        } else {
          throw Error(cryptoUnavailable);
        }
      } else {
        this[p] = false;
      }
    } else {
      throw Error(invalidArgument + p + ": " + v);
    }
  }
  return this;
}
function cos(x) {
  return new this(x).cos();
}
function cosh(x) {
  return new this(x).cosh();
}
function clone(obj) {
  var i, p, ps;
  function Decimal2(v) {
    var e, i2, t, x = this;
    if (!(x instanceof Decimal2)) return new Decimal2(v);
    x.constructor = Decimal2;
    if (isDecimalInstance(v)) {
      x.s = v.s;
      if (external) {
        if (!v.d || v.e > Decimal2.maxE) {
          x.e = NaN;
          x.d = null;
        } else if (v.e < Decimal2.minE) {
          x.e = 0;
          x.d = [0];
        } else {
          x.e = v.e;
          x.d = v.d.slice();
        }
      } else {
        x.e = v.e;
        x.d = v.d ? v.d.slice() : v.d;
      }
      return;
    }
    t = typeof v;
    if (t === "number") {
      if (v === 0) {
        x.s = 1 / v < 0 ? -1 : 1;
        x.e = 0;
        x.d = [0];
        return;
      }
      if (v < 0) {
        v = -v;
        x.s = -1;
      } else {
        x.s = 1;
      }
      if (v === ~~v && v < 1e7) {
        for (e = 0, i2 = v; i2 >= 10; i2 /= 10) e++;
        if (external) {
          if (e > Decimal2.maxE) {
            x.e = NaN;
            x.d = null;
          } else if (e < Decimal2.minE) {
            x.e = 0;
            x.d = [0];
          } else {
            x.e = e;
            x.d = [v];
          }
        } else {
          x.e = e;
          x.d = [v];
        }
        return;
      }
      if (v * 0 !== 0) {
        if (!v) x.s = NaN;
        x.e = NaN;
        x.d = null;
        return;
      }
      return parseDecimal(x, v.toString());
    }
    if (t === "string") {
      if ((i2 = v.charCodeAt(0)) === 45) {
        v = v.slice(1);
        x.s = -1;
      } else {
        if (i2 === 43) v = v.slice(1);
        x.s = 1;
      }
      return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
    }
    if (t === "bigint") {
      if (v < 0) {
        v = -v;
        x.s = -1;
      } else {
        x.s = 1;
      }
      return parseDecimal(x, v.toString());
    }
    throw Error(invalidArgument + v);
  }
  Decimal2.prototype = P;
  Decimal2.ROUND_UP = 0;
  Decimal2.ROUND_DOWN = 1;
  Decimal2.ROUND_CEIL = 2;
  Decimal2.ROUND_FLOOR = 3;
  Decimal2.ROUND_HALF_UP = 4;
  Decimal2.ROUND_HALF_DOWN = 5;
  Decimal2.ROUND_HALF_EVEN = 6;
  Decimal2.ROUND_HALF_CEIL = 7;
  Decimal2.ROUND_HALF_FLOOR = 8;
  Decimal2.EUCLID = 9;
  Decimal2.config = Decimal2.set = config;
  Decimal2.clone = clone;
  Decimal2.isDecimal = isDecimalInstance;
  Decimal2.abs = abs;
  Decimal2.acos = acos;
  Decimal2.acosh = acosh;
  Decimal2.add = add;
  Decimal2.asin = asin;
  Decimal2.asinh = asinh;
  Decimal2.atan = atan;
  Decimal2.atanh = atanh;
  Decimal2.atan2 = atan2;
  Decimal2.cbrt = cbrt;
  Decimal2.ceil = ceil;
  Decimal2.clamp = clamp;
  Decimal2.cos = cos;
  Decimal2.cosh = cosh;
  Decimal2.div = div;
  Decimal2.exp = exp;
  Decimal2.floor = floor;
  Decimal2.hypot = hypot;
  Decimal2.ln = ln;
  Decimal2.log = log;
  Decimal2.log10 = log10;
  Decimal2.log2 = log2;
  Decimal2.max = max;
  Decimal2.min = min;
  Decimal2.mod = mod;
  Decimal2.mul = mul;
  Decimal2.pow = pow;
  Decimal2.random = random;
  Decimal2.round = round;
  Decimal2.sign = sign;
  Decimal2.sin = sin;
  Decimal2.sinh = sinh;
  Decimal2.sqrt = sqrt;
  Decimal2.sub = sub;
  Decimal2.sum = sum;
  Decimal2.tan = tan;
  Decimal2.tanh = tanh;
  Decimal2.trunc = trunc;
  if (obj === void 0) obj = {};
  if (obj) {
    if (obj.defaults !== true) {
      ps = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"];
      for (i = 0; i < ps.length; ) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
    }
  }
  Decimal2.config(obj);
  return Decimal2;
}
function div(x, y) {
  return new this(x).div(y);
}
function exp(x) {
  return new this(x).exp();
}
function floor(x) {
  return finalise(x = new this(x), x.e + 1, 3);
}
function hypot() {
  var i, n, t = new this(0);
  external = false;
  for (i = 0; i < arguments.length; ) {
    n = new this(arguments[i++]);
    if (!n.d) {
      if (n.s) {
        external = true;
        return new this(1 / 0);
      }
      t = n;
    } else if (t.d) {
      t = t.plus(n.times(n));
    }
  }
  external = true;
  return t.sqrt();
}
function isDecimalInstance(obj) {
  return obj instanceof Decimal || obj && obj.toStringTag === tag || false;
}
function ln(x) {
  return new this(x).ln();
}
function log(x, y) {
  return new this(x).log(y);
}
function log2(x) {
  return new this(x).log(2);
}
function log10(x) {
  return new this(x).log(10);
}
function max() {
  return maxOrMin(this, arguments, -1);
}
function min() {
  return maxOrMin(this, arguments, 1);
}
function mod(x, y) {
  return new this(x).mod(y);
}
function mul(x, y) {
  return new this(x).mul(y);
}
function pow(x, y) {
  return new this(x).pow(y);
}
function random(sd) {
  var d, e, k, n, i = 0, r = new this(1), rd = [];
  if (sd === void 0) sd = this.precision;
  else checkInt32(sd, 1, MAX_DIGITS);
  k = Math.ceil(sd / LOG_BASE);
  if (!this.crypto) {
    for (; i < k; ) rd[i++] = Math.random() * 1e7 | 0;
  } else if (crypto.getRandomValues) {
    d = crypto.getRandomValues(new Uint32Array(k));
    for (; i < k; ) {
      n = d[i];
      if (n >= 429e7) {
        d[i] = crypto.getRandomValues(new Uint32Array(1))[0];
      } else {
        rd[i++] = n % 1e7;
      }
    }
  } else if (crypto.randomBytes) {
    d = crypto.randomBytes(k *= 4);
    for (; i < k; ) {
      n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 127) << 24);
      if (n >= 214e7) {
        crypto.randomBytes(4).copy(d, i);
      } else {
        rd.push(n % 1e7);
        i += 4;
      }
    }
    i = k / 4;
  } else {
    throw Error(cryptoUnavailable);
  }
  k = rd[--i];
  sd %= LOG_BASE;
  if (k && sd) {
    n = mathpow(10, LOG_BASE - sd);
    rd[i] = (k / n | 0) * n;
  }
  for (; rd[i] === 0; i--) rd.pop();
  if (i < 0) {
    e = 0;
    rd = [0];
  } else {
    e = -1;
    for (; rd[0] === 0; e -= LOG_BASE) rd.shift();
    for (k = 1, n = rd[0]; n >= 10; n /= 10) k++;
    if (k < LOG_BASE) e -= LOG_BASE - k;
  }
  r.e = e;
  r.d = rd;
  return r;
}
function round(x) {
  return finalise(x = new this(x), x.e + 1, this.rounding);
}
function sign(x) {
  x = new this(x);
  return x.d ? x.d[0] ? x.s : 0 * x.s : x.s || NaN;
}
function sin(x) {
  return new this(x).sin();
}
function sinh(x) {
  return new this(x).sinh();
}
function sqrt(x) {
  return new this(x).sqrt();
}
function sub(x, y) {
  return new this(x).sub(y);
}
function sum() {
  var i = 0, args = arguments, x = new this(args[i]);
  external = false;
  for (; x.s && ++i < args.length; ) x = x.plus(args[i]);
  external = true;
  return finalise(x, this.precision, this.rounding);
}
function tan(x) {
  return new this(x).tan();
}
function tanh(x) {
  return new this(x).tanh();
}
function trunc(x) {
  return finalise(x = new this(x), x.e + 1, 1);
}
P[Symbol.for("nodejs.util.inspect.custom")] = P.toString;
P[Symbol.toStringTag] = "Decimal";
var Decimal = P.constructor = clone(DEFAULTS);
LN10 = new Decimal(LN10);
PI = new Decimal(PI);
var decimal_default = Decimal;

// src/client/helpers.js
decimal_default.set({ precision: 100 });
var text = (v) => v === null || v === void 0 ? "\\N" : typeof v === "object" ? JSON.stringify(v) : String(v);
var fieldOptions = (plan, catalog) => [...[plan?.source, ...plan?.joins ?? []].filter(Boolean).flatMap((s) => (catalog.find((t) => t.schema === s.schema && t.name === s.table)?.columns ?? []).map((c) => ({ id: `${s.alias}.${c.name}`, name: `${s.alias} \xB7 ${c.name}`, type: c.type }))), ...(plan?.computed ?? []).map((c) => ({ id: `calc.${c.name}`, name: c.name, type: "computed" }))];
var basePlan = (t) => ({ source: { schema: t.schema, table: t.name, alias: "t0" }, joins: [], filters: { mode: "and", rules: [] }, computed: [], groupBy: [], measures: [], sort: [] });
function selectionBounds(selection) {
  return selection ? { r0: Math.min(selection[0], selection[2]), r1: Math.max(selection[0], selection[2]), c0: Math.min(selection[1], selection[3]), c1: Math.max(selection[1], selection[3]) } : null;
}
function rangeValues(rows, fields, selection) {
  const b = selectionBounds(selection);
  return b ? rows.slice(b.r0, b.r1 + 1).map((r) => fields.slice(b.c0, b.c1 + 1).map((f) => r[f.id])) : [];
}
function selectionStats(values) {
  const vals = values.flat();
  let sum2 = new decimal_default(0), count = 0;
  for (const v of vals) {
    if (v !== null && v !== void 0 && /^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(String(v))) {
      sum2 = sum2.plus(String(v));
      count++;
    }
  }
  return { cells: vals.length, count, sum: sum2.toString(), avg: count ? sum2.div(count).toString() : "" };
}
function clipboard(values) {
  return values.map((r) => r.map((v) => {
    const s = text(v);
    return /[\t\n\r"]/.test(s) ? '"' + s.replaceAll('"', '""') + '"' : s;
  }).join("	")).join("\n");
}
function editablePlan(plan) {
  return { joins: [], computed: [], groupBy: [], measures: [], sort: [], ...plan, filters: plan.filters?.field ? { mode: "and", rules: [plan.filters] } : plan.filters ?? { mode: "and", rules: [] } };
}

// src/client/app.jsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var initialLayout = () => ({ hidden: [], widths: {}, order: [], frozen: 0 });
var blankConnection = () => ({ name: "", port: 5433, database: "postgres", user: "postgres", password: "", rememberPassword: true });
async function request(body, signal) {
  const response = await fetch("/api/pg-grid", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body), signal });
  const value = await response.json();
  if (!response.ok) throw Error(value.error || "\u8BF7\u6C42\u5931\u8D25");
  return value;
}
function download(content, name2) {
  const url = URL.createObjectURL(new Blob([content], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name2;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
function Grid({ result, layout, setLayout, selection, setSelection, onCopy }) {
  const dragging = (0, import_react2.useRef)(false), root = (0, import_react2.useRef)(null);
  (0, import_react2.useEffect)(() => {
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("pointerup", up);
    return () => window.removeEventListener("pointerup", up);
  }, []);
  const fields = orderedFields(result?.fields ?? [], layout), bounds = selectionBounds(selection);
  function choose(r, c, extend = false) {
    setSelection((s) => extend && s ? [s[0], s[1], r, c] : [r, c, r, c]);
  }
  function key(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "c") {
      e.preventDefault();
      onCopy();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "a") {
      e.preventDefault();
      if (result.rows.length && fields.length) setSelection([0, 0, result.rows.length - 1, fields.length - 1]);
      return;
    }
    const delta = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1], Tab: [0, e.shiftKey ? -1 : 1] };
    if (!delta[e.key] || !fields.length || !result.rows.length) return;
    e.preventDefault();
    const [dr, dc] = delta[e.key], r = Math.max(0, Math.min(result.rows.length - 1, (selection?.[2] ?? 0) + dr)), c = Math.max(0, Math.min(fields.length - 1, (selection?.[3] ?? 0) + dc));
    choose(r, c, e.shiftKey && e.key !== "Tab");
    root.current?.querySelector(`[data-cell="${r}-${c}"]`)?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
  const width = (f) => Math.max(80, Math.min(600, Number(layout.widths[f.id]) || 170));
  const style = (f, i) => ({ width: width(f), minWidth: width(f), maxWidth: width(f), ...i < layout.frozen ? { position: "sticky", left: 48 + fields.slice(0, i).reduce((sum2, f2) => sum2 + width(f2), 0), zIndex: 2 } : {} });
  if (!result) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "pg-table-scroll", ref: root, tabIndex: 0, role: "region", "aria-label": "\u53EA\u8BFB\u6570\u636E\u8868\u683C\uFF0C\u65B9\u5411\u952E\u79FB\u52A8\uFF0CShift \u6269\u9009\uFF0CCtrl C \u590D\u5236", onKeyDown: key, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("table", { role: "grid", "aria-rowcount": result.total, "aria-colcount": fields.length, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { className: "pg-rownum", children: "\u884C" }),
        fields.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("th", { style: { ...style(f, i), zIndex: i < layout.frozen ? 5 : 3 }, title: `${f.id} \xB7 ${f.type ?? ""}`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: f.name }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("small", { children: f.type ?? "" })
        ] }, f.id))
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("tbody", { children: result.rows.map((row, r) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { className: "pg-rownum", children: result.page * result.pageSize + r + 1 }),
        fields.map((f, c) => {
          const selected = bounds && r >= bounds.r0 && r <= bounds.r1 && c >= bounds.c0 && c <= bounds.c1;
          const v = row[f.id];
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { "data-cell": `${r}-${c}`, style: style(f, c), "aria-selected": !!selected, className: selected ? "pg-selected" : "", title: text(v), onPointerDown: (e) => {
            if (e.button !== 0) return;
            root.current.focus({ preventScroll: true });
            dragging.current = true;
            choose(r, c, e.shiftKey);
            e.preventDefault();
          }, onPointerEnter: () => {
            if (dragging.current) choose(r, c, true);
          }, children: v === null || v === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "pg-null", children: "NULL" }) : v === "" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "pg-null", children: "\u7A7A\u5B57\u7B26\u4E32" }) : text(v) }, f.id);
        })
      ] }, r)) }),
      result.totals && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("tfoot", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { className: "pg-rownum", children: "\u5408\u8BA1" }),
        fields.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { style: style(f, i), children: text(result.totals[f.id]) }, f.id))
      ] }) })
    ] }),
    !result.rows.length && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "pg-empty", children: "\u6CA1\u6709\u7B26\u5408\u6761\u4EF6\u7684\u8BB0\u5F55\u3002\u53EF\u4FEE\u6539\u7B5B\u9009\u6761\u4EF6\u540E\u91CD\u8BD5\u3002" })
  ] });
}
function orderedFields(fields, layout) {
  const rank = new Map(layout.order.map((id, i) => [id, i]));
  return fields.filter((f) => !layout.hidden.includes(f.id)).sort((a, b) => (rank.get(a.id) ?? 1e4) - (rank.get(b.id) ?? 1e4));
}
function App({ active = true, sessionId = "" }) {
  const [state, setState] = (0, import_react2.useState)({ connections: [], views: [], aiEnabled: false }), [connection, setConnection] = (0, import_react2.useState)(null), [catalog, setCatalog] = (0, import_react2.useState)([]), [databases, setDatabases] = (0, import_react2.useState)([]), [timezone, setTimezone] = (0, import_react2.useState)("");
  const [form, setForm] = (0, import_react2.useState)(blankConnection), [connecting, setConnecting] = (0, import_react2.useState)(false), [showConnect, setShowConnect] = (0, import_react2.useState)(false);
  const [plan, setPlan] = (0, import_react2.useState)(null), [result, setResult] = (0, import_react2.useState)(null), [applied, setApplied] = (0, import_react2.useState)(""), [page, setPage] = (0, import_react2.useState)(0), [pageSize, setPageSize] = (0, import_react2.useState)(100);
  const [layout, setLayout] = (0, import_react2.useState)(initialLayout), [selection, setSelection] = (0, import_react2.useState)(null), [busy, setBusy] = (0, import_react2.useState)(false), [error, setError] = (0, import_react2.useState)(""), [notice, setNotice] = (0, import_react2.useState)(""), [paused, setPaused] = (0, import_react2.useState)(false), [visible, setVisible] = (0, import_react2.useState)(!document.hidden);
  const [panel, setPanel] = (0, import_react2.useState)("rules"), [viewName, setViewName] = (0, import_react2.useState)(""), [viewId, setViewId] = (0, import_react2.useState)(null), [tableSearch, setTableSearch] = (0, import_react2.useState)("");
  const [prompt, setPrompt] = (0, import_react2.useState)(""), [allowed, setAllowed] = (0, import_react2.useState)([]), [shareRows, setShareRows] = (0, import_react2.useState)(false), [aiExplanation, setAiExplanation] = (0, import_react2.useState)("");
  const seq = (0, import_react2.useRef)(0), controller = (0, import_react2.useRef)(null), live = (0, import_react2.useRef)({});
  const serialized = JSON.stringify(plan), dirty = !!plan && serialized !== applied;
  live.current = { connection, plan, page, pageSize, active, dirty, busy };
  (0, import_react2.useEffect)(() => setSelection(null), [layout.hidden, layout.order]);
  const fields = (0, import_react2.useMemo)(() => fieldOptions(plan, catalog), [plan, catalog]);
  const displayed = orderedFields(result?.fields ?? [], layout), values = rangeValues(result?.rows ?? [], displayed, selection), stats = selectionStats(values);
  const reloadState = async () => setState(await request({ action: "state" }));
  (0, import_react2.useEffect)(() => {
    reloadState().catch((e) => setError(e.message));
    return () => {
      seq.current++;
      controller.current?.abort();
    };
  }, []);
  (0, import_react2.useEffect)(() => {
    const handler = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);
  (0, import_react2.useEffect)(() => {
    if (!active) {
      seq.current++;
      controller.current?.abort();
      setBusy(false);
    }
  }, [active]);
  const invalidate = () => {
    seq.current++;
    controller.current?.abort();
    setBusy(false);
    setSelection(null);
  };
  const editPlan = (next) => {
    invalidate();
    setPlan(next);
    setAiExplanation("");
  };
  async function run(nextPlan = live.current.plan, nextPage = live.current.page, size = live.current.pageSize) {
    const conn = live.current.connection;
    if (!conn || !nextPlan) return;
    controller.current?.abort();
    const c = new AbortController();
    controller.current = c;
    const id = ++seq.current;
    setBusy(true);
    setError("");
    try {
      const data = await request({ action: "query", connectionId: conn.id, plan: nextPlan, page: nextPage, pageSize: size }, c.signal);
      if (id !== seq.current) return;
      setResult(data);
      setApplied(JSON.stringify(nextPlan));
      setPage(nextPage);
      setPageSize(size);
      setSelection(null);
    } catch (e) {
      if (id === seq.current && e.name !== "AbortError") setError(e.message);
    } finally {
      if (id === seq.current) setBusy(false);
    }
  }
  (0, import_react2.useEffect)(() => {
    if (!active || !visible || paused || dirty || !connection || !plan) return;
    const timer = setInterval(() => {
      if (!live.current.busy) run();
    }, 3e4);
    return () => clearInterval(timer);
  }, [active, visible, paused, dirty, connection, plan]);
  async function selectConnection(c) {
    invalidate();
    setConnection(c);
    setCatalog([]);
    setPlan(null);
    setResult(null);
    setApplied("");
    setError("");
    setAllowed([]);
    setLayout(initialLayout());
    setViewId(null);
    setViewName("");
    const id = seq.current;
    try {
      const info = await request({ action: "catalog", connectionId: c.id });
      if (id !== seq.current) return;
      setCatalog(info.tables);
      setDatabases(info.databases);
      setTimezone(info.timezone);
      await reloadState();
    } catch (e) {
      if (id !== seq.current) return;
      setError(e.message);
      setForm({ ...c, password: "" });
      setShowConnect(true);
    }
  }
  async function connect(e) {
    e.preventDefault();
    invalidate();
    const token = seq.current;
    setConnecting(true);
    setError("");
    try {
      const data = await request({ action: "connect", connection: { ...form, rememberPassword: form.rememberPassword ?? !!form.hasSavedPassword } });
      if (token !== seq.current) return;
      setConnection(data.connection);
      setCatalog(data.tables);
      setDatabases(data.databases);
      setTimezone(data.timezone);
      setPlan(null);
      setResult(null);
      setAllowed([]);
      setLayout(initialLayout());
      setViewId(null);
      setShowConnect(false);
      setForm(blankConnection());
      await reloadState();
    } catch (e2) {
      setError(e2.message);
    } finally {
      setConnecting(false);
    }
  }
  function chooseTable(t) {
    invalidate();
    const next = basePlan(t);
    setPlan(next);
    setResult(null);
    setApplied("");
    setPage(0);
    setLayout(initialLayout());
    setViewId(null);
    setViewName(t.name);
    setAllowed([JSON.stringify([t.schema, t.name])]);
    setAiExplanation("");
    live.current = { ...live.current, plan: next };
    run(next, 0);
  }
  async function loadView(record) {
    const v = { ...record, plan: editablePlan(record.plan) };
    invalidate();
    const c = state.connections.find((c2) => c2.id === v.connectionId);
    if (!c) return setError("\u8BE5\u89C6\u56FE\u7684\u8FDE\u63A5\u5DF2\u5220\u9664");
    setConnection(c);
    setPlan(v.plan);
    setResult(null);
    setLayout({ ...initialLayout(), ...v.layout });
    setViewId(v.id);
    setViewName(v.name);
    setPage(0);
    setApplied("");
    setAllowed([v.plan.source, ...v.plan.joins].map((t) => JSON.stringify([t.schema, t.table])));
    const id = seq.current;
    try {
      const info = await request({ action: "catalog", connectionId: c.id });
      if (id !== seq.current) return;
      setCatalog(info.tables);
      setDatabases(info.databases);
      setTimezone(info.timezone);
      await reloadState();
      live.current = { ...live.current, connection: c, plan: v.plan };
      run(v.plan, 0);
    } catch (e) {
      if (id === seq.current) {
        setError(e.message);
        setForm({ ...c, password: "" });
        setShowConnect(true);
      }
    }
  }
  async function saveView() {
    try {
      const v = await request({ action: "saveView", view: { id: viewId, name: viewName, connectionId: connection.id, plan, layout } });
      setViewId(v.id);
      await reloadState();
      setNotice("\u5DF2\u4FDD\u5B58\u5206\u6790\u89C4\u5219\uFF0C\u91CD\u5F00\u65F6\u8BFB\u53D6\u6700\u65B0\u6570\u636E");
    } catch (e) {
      setError(e.message);
    }
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(clipboard(values));
      setNotice(`\u5DF2\u590D\u5236 ${stats.cells} \u4E2A\u5355\u5143\u683C\uFF1BNULL \u4F7F\u7528 \\N`);
    } catch {
      setError("\u526A\u8D34\u677F\u8BBF\u95EE\u5931\u8D25\uFF0C\u53EF\u4ECE\u4E0B\u65B9\u5355\u5143\u683C\u5185\u5BB9\u624B\u52A8\u590D\u5236");
    }
  }
  async function exportRows() {
    setError("");
    try {
      const snapshot = { ...live.current };
      const data = await request({ action: "export", connectionId: snapshot.connection.id, plan: snapshot.plan });
      download(data.csv, `${snapshot.connection.database}-${snapshot.plan.source.table}.csv`);
      setNotice(`\u5DF2\u5BFC\u51FA ${data.total} \u884C\u5B8C\u6574\u7B5B\u9009\u7ED3\u679C`);
    } catch (e) {
      setError(e.message);
    }
  }
  function exportSelected() {
    const content = "\uFEFF" + values.map((row) => row.map((v) => {
      if (v === null || v === void 0) return "\\N";
      let s = text(v);
      if (/^[=+@\t\r]/.test(s) || /^-/.test(s) && !/^-[\d.]+$/.test(s)) s = "'" + s;
      return '"' + s.replaceAll('"', '""') + '"';
    }).join(",")).join("\r\n");
    download(content, "selection.csv");
  }
  async function ask() {
    controller.current?.abort();
    const c = new AbortController();
    controller.current = c;
    const id = ++seq.current;
    setBusy(true);
    setError("");
    try {
      const data = await request({ action: "ai", connectionId: connection.id, plan, prompt, allowedTables: allowed.map((k) => {
        const [schema, name2] = JSON.parse(k);
        return { schema, name: name2 };
      }), shareRows, page, sessionId }, c.signal);
      if (id !== seq.current) return;
      if (data.clarification) {
        setAiExplanation("\u8BF7\u8865\u5145\uFF1A" + data.clarification);
        return;
      }
      const nextPlan = editablePlan(data.plan);
      setPlan(nextPlan);
      setResult(data.result);
      setApplied(JSON.stringify(nextPlan));
      setPage(0);
      setPageSize(100);
      setSelection(null);
      setAiExplanation(data.explanation);
      setPanel("rules");
    } catch (e) {
      if (id === seq.current && e.name !== "AbortError") setError(e.message);
    } finally {
      if (id === seq.current) setBusy(false);
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "pg-app", "aria-label": "PostgreSQL \u6570\u636E\u5DE5\u4F5C\u533A", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("header", { className: "pg-header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("h1", { children: [
        "PostgreSQL ",
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "\u6570\u636E\u5DE5\u4F5C\u533A" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "pg-line", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: () => {
        setForm(blankConnection());
        setShowConnect(!showConnect);
      }, children: "\u65B0\u5EFA\u8FDE\u63A5" }) })
    ] }),
    error && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { role: "alert", className: "pg-alert", children: [
      error,
      result && " \xB7 \u4FDD\u7559\u4E0A\u6B21\u7ED3\u679C\uFF0C\u5F53\u524D\u663E\u793A\u4E0D\u662F\u672C\u6B21\u67E5\u8BE2\u7684\u6210\u529F\u7ED3\u679C\u3002",
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: () => setError(""), children: "\u5173\u95ED\u63D0\u793A" })
    ] }),
    notice && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { role: "status", className: "pg-notice", children: [
      notice,
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: () => setNotice(""), children: "\u5173\u95ED" })
    ] }),
    showConnect && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("form", { className: "pg-connect", onSubmit: connect, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { children: "\u8FDE\u63A5\u672C\u673A PostgreSQL" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "pg-line", children: [
        [["name", "\u540D\u79F0"], ["port", "\u7AEF\u53E3"], ["database", "\u6570\u636E\u5E93"], ["user", "\u7528\u6237\u540D"], ["password", "\u5BC6\u7801"]].map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { children: [
          l,
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { "aria-label": l, autoComplete: k === "password" ? "new-password" : "off", type: k === "password" ? "password" : k === "port" ? "number" : "text", required: ["port", "database", "user"].includes(k), min: k === "port" ? 1 : void 0, max: k === "port" ? 65535 : void 0, placeholder: k === "password" && form.hasSavedPassword ? "\u5DF2\u4FDD\u5B58\uFF0C\u7559\u7A7A\u7EE7\u7EED\u4F7F\u7528" : void 0, value: form[k] ?? "", onChange: (e) => setForm({ ...form, [k]: e.target.value }) })
        ] }, k)),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "pg-primary", disabled: connecting, children: connecting ? "\u6B63\u5728\u8FDE\u63A5\u2026" : "\u8FDE\u63A5" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", onClick: () => setShowConnect(false), children: "\u53D6\u6D88" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "checkbox", checked: form.rememberPassword ?? !!form.hasSavedPassword, onChange: (e) => setForm({ ...form, rememberPassword: e.target.checked }) }),
        "\u8BB0\u4F4F\u5BC6\u7801\uFF08\u4EC5\u4FDD\u5B58\u5728\u672C\u673A\uFF09"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "pg-body", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("aside", { className: "pg-sidebar", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { children: "\u8FDE\u63A5" }),
        state.connections.map((c) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "pg-connection", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { className: connection?.id === c.id ? "pg-active" : "", onClick: () => selectConnection(c), children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: c.name }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("small", { children: [
              c.host,
              ":",
              c.port,
              " / ",
              c.database
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { "aria-label": `\u7F16\u8F91\u8FDE\u63A5 ${c.name}`, title: "\u91CD\u65B0\u8F93\u5165\u5BC6\u7801", onClick: () => {
            setForm({ ...c, password: "" });
            setShowConnect(true);
          }, children: "\u8FDE\u63A5\u8BBE\u7F6E" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { "aria-label": `\u65AD\u5F00\u8FDE\u63A5 ${c.name}`, disabled: !c.connected, onClick: async () => {
            try {
              await request({ action: "disconnect", connectionId: c.id });
              if (connection?.id === c.id) {
                invalidate();
                setResult(null);
                setPlan(null);
              }
              await reloadState();
            } catch (e) {
              setError(e.message);
            }
          }, children: "\u65AD\u5F00" })
        ] }, c.id)),
        connection && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { children: "\u8868\u4E0E\u89C6\u56FE" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { "aria-label": "\u67E5\u627E\u8868", placeholder: "\u67E5\u627E\u8868\u6216 Schema", value: tableSearch, onChange: (e) => setTableSearch(e.target.value) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "pg-tables", children: catalog.filter((t) => (t.schema + "." + t.name).toLowerCase().includes(tableSearch.toLowerCase())).map((t) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { className: plan?.source.schema === t.schema && plan?.source.table === t.name ? "pg-active" : "", onClick: () => chooseTable(t), children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: t.name }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("small", { children: [
              t.schema,
              " \xB7 ",
              t.columns.length,
              " \u5217",
              t.kind === "v" ? " \xB7 \u89C6\u56FE" : ""
            ] })
          ] }, t.schema + "." + t.name)) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("details", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("summary", { children: [
              "\u53EF\u8FDE\u63A5\u6570\u636E\u5E93 \xB7 ",
              databases.length
            ] }),
            databases.map((d) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: () => {
              setForm({ ...connection, id: void 0, database: d.name, password: "" });
              setShowConnect(true);
            }, children: d.name }, d.name))
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { children: "\u5DF2\u4FDD\u5B58\u89C6\u56FE" }),
        state.views.map((v) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "pg-line", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: viewId === v.id ? "pg-active" : "", onClick: () => loadView(v), children: v.name }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { "aria-label": `\u5220\u9664\u89C6\u56FE ${v.name}`, onClick: async () => {
            try {
              await request({ action: "deleteView", viewId: v.id });
              await reloadState();
            } catch (e) {
              setError(e.message);
            }
          }, children: "\u5220\u9664" })
        ] }, v.id))
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("main", { className: "pg-main", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "pg-toolbar", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: plan ? `${plan.source.schema}.${plan.source.table}` : "\u5C1A\u672A\u9009\u62E9\u6570\u636E\u8868" }),
            connection && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("small", { children: [
              " ",
              connection.name,
              " \xB7 ",
              connection.database,
              " \xB7 ",
              timezone
            ] })
          ] }),
          plan && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "pg-line", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "pg-primary", disabled: busy, onClick: () => run(plan, 0), children: busy ? "\u67E5\u8BE2\u4E2D\u2026" : dirty ? "\u5E94\u7528\u67E5\u8BE2\u89C4\u5219" : "\u7ACB\u5373\u5237\u65B0" }),
            busy && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: () => {
              invalidate();
              setNotice("\u5DF2\u53D6\u6D88\u8BF7\u6C42");
            }, children: "\u53D6\u6D88" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { "aria-pressed": paused, onClick: () => setPaused(!paused), children: paused ? "\u6062\u590D\u81EA\u52A8\u5237\u65B0" : "\u6682\u505C\u81EA\u52A8\u5237\u65B0" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { disabled: !selection, onClick: copy, children: "\u590D\u5236\u9009\u533A" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { disabled: !selection, onClick: exportSelected, children: "\u5BFC\u51FA\u9009\u533A" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { disabled: dirty || !result, onClick: exportRows, children: "\u5BFC\u51FA\u5168\u90E8\u7ED3\u679C" })
          ] })
        ] }),
        plan && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "pg-viewbar", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { "aria-label": "\u89C6\u56FE\u540D\u79F0", value: viewName, onChange: (e) => setViewName(e.target.value), placeholder: "\u5206\u6790\u89C6\u56FE\u540D\u79F0" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: saveView, children: "\u4FDD\u5B58\u89C6\u56FE" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "pg-tabs", role: "tablist", children: [["rules", "\u67E5\u8BE2\u89C4\u5219"], ["columns", "\u5217\u8BBE\u7F6E"], ["ai", "AI \u67E5\u8BE2"]].map(([id, l]) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { role: "tab", "aria-selected": panel === id, onClick: () => setPanel(panel === id ? "" : id), children: l }, id)) })
        ] }),
        dirty && result && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "pg-banner", children: "\u89C4\u5219\u5DF2\u4FEE\u6539\uFF0C\u8868\u683C\u4ECD\u662F\u4E0A\u6B21\u7ED3\u679C\u3002\u5E94\u7528\u540E\u6062\u590D\u81EA\u52A8\u5237\u65B0\u3002" }),
        result?.warnings.map((w) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "pg-banner", children: w }, w)),
        aiExplanation && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "pg-banner", children: aiExplanation }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "pg-workarea", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "pg-grid-area", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Grid, { result, layout, setLayout, selection, setSelection, onCopy: copy }),
            selection && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "pg-inspect", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
                "\u9009\u533A ",
                stats.cells,
                " \u683C \xB7 \u6570\u503C ",
                stats.count,
                " \xB7 \u6C42\u548C ",
                stats.sum,
                stats.count > 0 && ` \xB7 \u5E73\u5747 ${stats.avg}`
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("textarea", { "aria-label": "\u5F53\u524D\u5355\u5143\u683C\u5B8C\u6574\u5185\u5BB9", readOnly: true, value: text(result?.rows[selection[2]]?.[displayed[selection[3]]?.id]), rows: 2 })
            ] })
          ] }),
          plan && panel && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("aside", { className: "pg-rule-panel", "aria-label": "\u5206\u6790\u8BBE\u7F6E", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "pg-panel-heading", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: "\u5206\u6790\u8BBE\u7F6E" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { "aria-label": "\u6536\u8D77\u5206\u6790\u8BBE\u7F6E", onClick: () => setPanel(""), children: "\u6536\u8D77 \u203A" })
            ] }),
            panel === "rules" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(RuleEditor, { plan, onChange: editPlan, catalog, fields }),
            panel === "columns" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { children: "\u5217\u8BBE\u7F6E" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { children: [
                "\u51BB\u7ED3\u524D\u51E0\u5217",
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { "aria-label": "\u51BB\u7ED3\u5217\u6570", type: "number", min: "0", max: displayed.length, value: layout.frozen, onChange: (e) => setLayout({ ...layout, frozen: Math.max(0, Math.min(displayed.length, Number(e.target.value))) }) })
              ] }),
              (result?.fields ?? []).slice().sort((a, b) => (layout.order.indexOf(a.id) < 0 ? 1e4 : layout.order.indexOf(a.id)) - (layout.order.indexOf(b.id) < 0 ? 1e4 : layout.order.indexOf(b.id))).map((f) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "pg-rule", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "checkbox", checked: !layout.hidden.includes(f.id), onChange: (e) => setLayout({ ...layout, hidden: e.target.checked ? layout.hidden.filter((id) => id !== f.id) : [...layout.hidden, f.id] }) }),
                  f.name
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { "aria-label": `\u524D\u79FB ${f.name}`, onClick: () => {
                  const order = [...layout.order, ...result.fields.map((x) => x.id).filter((id) => !layout.order.includes(id))];
                  const i = order.indexOf(f.id);
                  if (i > 0) [order[i - 1], order[i]] = [order[i], order[i - 1]];
                  setLayout({ ...layout, order });
                }, children: "\u524D\u79FB" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { "aria-label": `${f.name} \u5217\u5BBD`, type: "number", min: "80", max: "600", value: layout.widths[f.id] ?? 170, onChange: (e) => setLayout({ ...layout, widths: { ...layout.widths, [f.id]: Number(e.target.value) } }) })
              ] }, f.id))
            ] }),
            panel === "ai" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { children: "\u7528\u81EA\u7136\u8BED\u8A00\u67E5\u8BE2" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "pg-muted", children: "\u53EA\u6709\u70B9\u51FB\u8FD0\u884C\u624D\u8C03\u7528\u6A21\u578B\u3002\u4EE5\u4E0B\u9009\u4E2D\u7684\u8868\u7ED3\u6784\uFF0C\u4EE5\u53CA\u52FE\u9009\u5171\u4EAB\u7684\u7ED3\u679C\uFF0C\u4F1A\u53D1\u7ED9 DSH \u5F53\u524D\u6A21\u578B\u4F9B\u5E94\u5546\u3002" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "pg-checks", children: catalog.map((t) => {
                const key = JSON.stringify([t.schema, t.name]);
                return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "checkbox", checked: allowed.includes(key), onChange: (e) => setAllowed(e.target.checked ? [...allowed, key] : allowed.filter((x) => x !== key)) }),
                  t.schema,
                  ".",
                  t.name
                ] }, key);
              }) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "checkbox", checked: shareRows, onChange: (e) => setShareRows(e.target.checked) }),
                "\u5171\u4EAB\u5F53\u524D\u9875\u524D 20 \u884C\uFF08\u6700\u591A\uFF09"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("textarea", { "aria-label": "\u81EA\u7136\u8BED\u8A00\u67E5\u8BE2", rows: 5, placeholder: "\u4F8B\u5982\uFF1A\u6309\u7C7B\u522B\u6C47\u603B\u91D1\u989D\uFF0C\u53EA\u4FDD\u7559\u672C\u6708\u8BB0\u5F55", value: prompt, onChange: (e) => setPrompt(e.target.value) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "pg-primary", disabled: !state.aiEnabled || busy || !prompt.trim() || !allowed.length, onClick: ask, children: "\u8FD0\u884C\u53EA\u8BFB AI \u67E5\u8BE2" }),
              !state.aiEnabled && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { role: "status", children: "\u5C1A\u672A\u542F\u7528\u771F\u5B9E\u6A21\u578B\u3002\u9884\u7B97\u786E\u8BA4\u524D\uFF0C\u4E0D\u4F1A\u53D1\u8D77\u8C03\u7528\u3002" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("footer", { className: "pg-footer", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
            result ? `\u5171 ${result.total.toLocaleString()} \u884C \xB7 \u672C\u9875 ${result.rows.length} \u884C \xB7 ${result.elapsedMs} ms` : "\u5C1A\u672A\u6267\u884C\u67E5\u8BE2",
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: result && ` \xB7 \u66F4\u65B0\u4E8E ${new Date(result.updatedAt).toLocaleTimeString()}` }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("small", { children: [
              " ",
              paused ? "\u5237\u65B0\u5DF2\u6682\u505C" : !active || !visible ? "\u540E\u53F0\u6682\u505C" : dirty ? "\u4FEE\u6539\u89C4\u5219\u4E2D" : "\u6BCF 30 \u79D2\u81EA\u52A8\u5237\u65B0"
            ] })
          ] }),
          result && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "pg-line", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { disabled: busy || dirty || page === 0, onClick: () => run(plan, page - 1), children: "\u4E0A\u4E00\u9875" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
              page + 1,
              " / ",
              Math.max(1, Math.ceil(result.total / pageSize))
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { disabled: busy || dirty || (page + 1) * pageSize >= result.total, onClick: () => run(plan, page + 1), children: "\u4E0B\u4E00\u9875" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("select", { "aria-label": "\u6BCF\u9875\u884C\u6570", value: pageSize, onChange: (e) => run(plan, 0, Number(e.target.value)), children: [25, 50, 100, 250, 500].map((n) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("option", { value: n, children: [
              n,
              " \u884C/\u9875"
            ] }, n)) })
          ] })
        ] })
      ] })
    ] })
  ] });
}

// src/client/styles.css
var styles_default = '.pg-app{--pg-fallback-bg:#f8f9fb;--pg-fallback-surface:#fff;--pg-fallback-text:#202735;--pg-fallback-muted:#576275;--pg-fallback-line:#d4dbe4;--pg-fallback-accent:#245edb;--pg-fallback-selected:#e5efff;--pg-bg:var(--dsw-alias-bg-base,var(--pg-fallback-bg));--pg-surface:var(--dsw-alias-bg-layer-1,var(--pg-fallback-surface));--pg-text:var(--dsw-alias-label-primary,var(--pg-fallback-text));--pg-muted:var(--dsw-alias-label-secondary,var(--pg-fallback-muted));--pg-line:var(--dsw-alias-border-l2,var(--pg-fallback-line));--pg-accent:var(--dsw-alias-brand-text,var(--pg-fallback-accent));--pg-selected:var(--dsw-alias-bg-multi-select,var(--pg-fallback-selected));display:flex;flex-direction:column;height:100%;min-height:560px;min-width:0;background:var(--pg-bg);color:var(--pg-text);font:13px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans CJK SC",sans-serif;color-scheme:inherit;overflow:hidden}\n@media(prefers-color-scheme:dark){.pg-app{--pg-fallback-bg:#171b23;--pg-fallback-surface:#202631;--pg-fallback-text:#e6ebf3;--pg-fallback-muted:#b2bece;--pg-fallback-line:#3c485a;--pg-fallback-accent:#8fb4ff;--pg-fallback-selected:#283f65;}}\n.pg-app *{box-sizing:border-box}.pg-app ::selection{background:var(--pg-selected);color:var(--pg-text)}.pg-app :focus-visible{outline:2px solid var(--pg-accent);outline-offset:2px}.pg-app button,.pg-app input,.pg-app select,.pg-app textarea{font:inherit;color:inherit;border:1px solid var(--pg-line);border-radius:5px;background:var(--pg-surface);padding:6px 8px;min-width:0;caret-color:var(--pg-accent)}.pg-app button{cursor:pointer;white-space:nowrap}.pg-app button:hover{background:var(--pg-selected)}.pg-app button:disabled{opacity:.5;cursor:not-allowed}.pg-app button.pg-primary{background:var(--dsw-alias-button-primary-fill,#245edb);border-color:var(--dsw-alias-button-primary-fill,#245edb);color:var(--dsw-alias-label-primary-foreground,#fff)}.pg-app button.pg-active{background:var(--pg-selected);color:var(--pg-accent);border-color:var(--pg-accent)}.pg-app input[type="checkbox"]{accent-color:var(--pg-accent);width:15px;height:15px;vertical-align:middle;margin-right:6px}.pg-app h1,.pg-app h2,.pg-app p{margin:0}.pg-app h1{font-size:19px;font-weight:650;letter-spacing:-.02em}.pg-app h1 span{font-weight:400;color:var(--pg-muted);font-size:15px;margin-left:10px}.pg-app h2{font-size:13px;font-weight:650;margin:18px 0 8px}.pg-app small,.pg-muted{color:var(--pg-muted);font-size:12px}.pg-app .pg-muted{margin:8px 0}.pg-header{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid var(--pg-line);gap:16px}.pg-header p{font-size:12px;color:var(--pg-muted);margin-top:3px}.pg-line{display:flex;align-items:center;gap:7px;flex-wrap:wrap}.pg-status{color:var(--pg-muted);font-size:12px}.pg-body{display:flex;flex:1;min-height:0;overflow:hidden}.pg-sidebar{width:225px;flex:none;padding:0 12px 16px;border-right:1px solid var(--pg-line);overflow:auto}.pg-sidebar input{width:100%}.pg-sidebar button{white-space:normal;text-align:left}.pg-sidebar .pg-connection{margin-bottom:10px}.pg-connection>button:first-child,.pg-tables>button{width:100%;display:flex;flex-direction:column;gap:2px;margin-bottom:4px;padding:9px}.pg-tables{margin-top:7px;max-height:45vh;overflow:auto}.pg-connection>button:last-child{font-size:11px;padding:2px 5px}.pg-main{display:flex;flex-direction:column;flex:1;min-width:0;min-height:0}.pg-toolbar{padding:12px 16px;display:flex;gap:10px;flex-wrap:wrap;justify-content:space-between;border-bottom:1px solid var(--pg-line)}.pg-toolbar small{display:block;margin-top:4px}.pg-viewbar{padding:9px 16px;display:flex;gap:8px;flex-wrap:wrap;border-bottom:1px solid var(--pg-line)}.pg-viewbar>input{width:180px}.pg-tabs{display:flex;gap:5px;margin-left:auto}.pg-tabs [aria-selected="true"]{background:var(--pg-selected);color:var(--pg-accent);border-color:var(--pg-accent)}.pg-workarea{display:flex;min-height:0;flex:1}.pg-grid-area{display:flex;flex-direction:column;flex:1;min-width:0;min-height:0}.pg-table-scroll{overflow:auto;flex:1;min-height:120px;scrollbar-color:var(--pg-line) var(--pg-bg)}.pg-table-scroll table{border-collapse:separate;border-spacing:0;table-layout:fixed;font-variant-numeric:tabular-nums;min-width:100%;font-size:12px}.pg-table-scroll th,.pg-table-scroll td{padding:7px 10px;border-right:1px solid var(--pg-line);border-bottom:1px solid var(--pg-line);text-align:left;background:var(--pg-surface);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:33px;user-select:none}.pg-table-scroll thead th{position:sticky;top:0;z-index:3;font-weight:600;background:var(--pg-bg);height:52px}.pg-table-scroll thead small{display:block;font-weight:400;font-size:10px;max-width:140px;overflow:hidden;text-overflow:ellipsis}.pg-table-scroll .pg-rownum{position:sticky;left:0;z-index:2;min-width:48px;max-width:48px;width:48px;color:var(--pg-muted);text-align:right;font-weight:400;background:var(--pg-bg);font-size:11px}.pg-table-scroll thead .pg-rownum{z-index:6}.pg-table-scroll td.pg-selected{background:var(--pg-selected);box-shadow:inset 0 0 0 1px var(--pg-accent)}.pg-null{color:var(--pg-muted);font-size:11px;font-style:italic}.pg-table-scroll tfoot td{font-weight:650;background:var(--pg-bg)}.pg-rule-panel{width:370px;flex:none;border-left:1px solid var(--pg-line);padding:12px;overflow:auto}.pg-rule-panel h2:first-child{margin-top:0}.pg-rule-panel textarea{width:100%;margin:12px 0;resize:vertical}.pg-editor details{border-bottom:1px solid var(--pg-line);padding:10px 0}.pg-app summary{cursor:pointer;font-weight:600;padding:4px 0}.pg-editor summary{margin-bottom:8px}.pg-rule{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:8px 0}.pg-rule input:not([type="checkbox"]),.pg-rule select{flex:1;min-width:85px;max-width:100%}.pg-rule label{flex:1}.pg-rule input[type="number"]{max-width:76px}.pg-expression{display:flex;flex-wrap:wrap;gap:5px;margin-top:5px}.pg-expression>select,.pg-expression>input{max-width:100%;flex:1;min-width:80px}.pg-args{width:100%;padding:4px 0 4px 10px;border-left:1px solid var(--pg-line)}.pg-filter-group .pg-filter-group{width:100%;padding-left:8px;border-left:1px solid var(--pg-line)}.pg-block{margin:12px 0;padding:8px 0;border-bottom:1px solid var(--pg-line)}.pg-checks{display:flex;flex-direction:column;max-height:180px;overflow:auto;margin:8px 0;gap:5px}.pg-footer{border-top:1px solid var(--pg-line);padding:8px 12px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;font-size:12px}.pg-footer small{display:block}.pg-empty{padding:40px 24px;color:var(--pg-muted)}.pg-empty h2{font-size:18px;color:var(--pg-text);margin-bottom:10px}.pg-connect{padding:12px 20px;border-bottom:1px solid var(--pg-line);background:var(--pg-surface)}.pg-connect h2{margin-top:0}.pg-connect label{display:flex;flex-direction:column;gap:4px;flex:1;min-width:110px;max-width:220px}.pg-connect .pg-line{align-items:end}.pg-alert,.pg-notice,.pg-banner{padding:9px 16px;border-bottom:1px solid var(--pg-line);font-size:12px}.pg-alert{background:#fff0ee;color:#8d261c}.pg-alert button,.pg-notice button{float:right;padding:1px 7px}.pg-banner{color:var(--pg-muted);background:var(--pg-bg)}.pg-inspect{padding:8px 12px;border-top:1px solid var(--pg-line);font-size:11px}.pg-inspect textarea{display:block;width:100%;margin-top:5px;resize:vertical;font-size:12px}\n@media(max-width:1100px){.pg-rule-panel{width:310px}.pg-sidebar{width:185px}.pg-toolbar .pg-line{gap:5px}.pg-toolbar button{font-size:12px}}\n@media(max-width:760px){.pg-header{padding:10px}.pg-header h1 span{display:block;margin:0}.pg-sidebar{width:145px;padding:0 7px}.pg-workarea{flex-direction:column}.pg-rule-panel{width:100%;max-height:40vh;border-left:0;border-top:1px solid var(--pg-line)}.pg-toolbar{padding:8px}.pg-viewbar{padding:8px}.pg-tabs{margin-left:0}.pg-app{min-height:100vh}.pg-header .pg-line{max-width:130px}.pg-footer{padding:7px}}\n\n/* Sticky cells need an opaque backing even when a wallpaper makes host tokens transparent. */\n.pg-app{--pg-sticky-bg:light-dark(#f8f9fb,#151517);--pg-scroll-thumb:var(--pg-muted)}\n.pg-app .pg-table-scroll thead th,.pg-app .pg-table-scroll .pg-rownum{background-color:var(--pg-sticky-bg)}\n.pg-app .pg-table-scroll td[style*="sticky"]{background-color:var(--pg-sticky-bg)}\n.pg-app .pg-table-scroll td.pg-selected{background-color:var(--pg-selected)}\n.pg-app :is(.pg-table-scroll,.pg-sidebar,.pg-tables,.pg-rule-panel){scrollbar-width:auto;scrollbar-color:var(--pg-scroll-thumb) var(--pg-sticky-bg)}\n.pg-app :is(.pg-table-scroll,.pg-sidebar,.pg-tables,.pg-rule-panel)::-webkit-scrollbar{width:16px;height:16px}\n.pg-app :is(.pg-table-scroll,.pg-sidebar,.pg-tables,.pg-rule-panel)::-webkit-scrollbar-track{background:var(--pg-sticky-bg)}\n.pg-app :is(.pg-table-scroll,.pg-sidebar,.pg-tables,.pg-rule-panel)::-webkit-scrollbar-thumb{background:var(--pg-scroll-thumb);border:3px solid var(--pg-sticky-bg);border-radius:8px;min-height:40px}\n.pg-app :is(.pg-table-scroll,.pg-sidebar,.pg-tables,.pg-rule-panel)::-webkit-scrollbar-thumb:hover{background:var(--pg-text)}\n.pg-panel-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}\n';

// src/client/index.jsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var name = "pg-grid";
var inject = ["slots", "layout", "sessions"];
function Icon({ size = 20 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M3 9h18M3 14h18M9 4v16M15 9v11" })
  ] });
}
function apply(ctx) {
  const slots = ctx.get("slots"), layout = ctx.get("layout"), sessions = ctx.get("sessions");
  ctx.effect(() => {
    const style = document.createElement("style");
    style.dataset.pgGrid = "true";
    style.textContent = styles_default;
    document.head.append(style);
    return () => style.remove();
  }, "pg-grid: styles");
  function Panel() {
    const selected = (0, import_react3.useSyncExternalStore)((cb) => layout.panelInfo.subscribe(cb), () => layout.panelInfo.getSnapshot().activePanelId);
    const sessionId = (0, import_react3.useSyncExternalStore)((cb) => sessions.list.subscribe(cb), () => Object.values(sessions.list.getSnapshot().byId).find((s) => (s.retainedBy.mainView ?? 0) > 0)?.id ?? "");
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(App, { active: selected === "pg-grid", sessionId });
  }
  slots.inject("main", () => slots.register({ name: "main", key: "pg-grid" }, Panel));
  slots.inject("sidebar.panellist", () => slots.register({ name: "sidebar.panellist", id: "pg-grid", order: 10, label: () => "\u6570\u636E\u8868" }, Icon));
}
/*! Bundled license information:

decimal.js/decimal.mjs:
  (*!
   *  decimal.js v10.6.0
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js
   *  Copyright (c) 2025 Michael Mclaughlin <M8ch88l@gmail.com>
   *  MIT Licence
   *)
*/

return module.exports;}});
