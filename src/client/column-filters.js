export function valueRule(field, values, exclude=false) {
  const nonNull=values.filter(v=>v!==null),hasNull=values.includes(null);
  const clause={field,op:exclude?'notIn':'in',value:nonNull};
  if (!exclude) return hasNull ? {mode:'or',rules:[clause,{field,op:'isNull'}]} : clause;
  return {mode:hasNull?'and':'or',rules:[clause,{field,op:hasNull?'notNull':'isNull'}]};
}
