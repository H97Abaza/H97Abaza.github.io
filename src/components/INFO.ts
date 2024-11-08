import RAW_INFO from "./my-info.json";
type RawInfo = typeof RAW_INFO;
export interface Info extends RawInfo {
  steps: string[];
}
const steps: string[] = ["#welcome"];
RAW_INFO.sections.forEach(({ content: { dataPath } }) => {
  steps.push("#" + dataPath);
  return RAW_INFO[dataPath as keyof typeof RAW_INFO].forEach(
    ({ text }:{text?:string}) => steps.push(dataPath + ":" + text)
  );
});
// console.log("steps:\n", steps, "\n");

const INFO: Info = { ...RAW_INFO, steps };
export default INFO;
