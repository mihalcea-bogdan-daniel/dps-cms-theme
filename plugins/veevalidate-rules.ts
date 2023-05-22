import { defineRule, configure } from "vee-validate";
import { required, min, one_of, email } from "@vee-validate/rules";
// import * as rules from "@vee-validate/rules";

export default defineNuxtPlugin((nuxtApp) => {
  defineRule('required', required);
  defineRule('email', email);
  defineRule('min', min);
  defineRule('one_of', one_of);
  // Object.keys(rules)

  //   .filter((k) => k !== "default")
  //   .forEach((rule) => {
  //     console.log(rule);
  //     //@ts-ignore
  //     defineRule(rule, rules[rule]);
  //     //   console.log(rule);
  //   });
});
