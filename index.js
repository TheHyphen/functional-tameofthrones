import goldencrown from "./src/goldencrown";
import breakerofchains from "./src/breakerofchains";

const getArgs = (args, allowed) => {
  const sliced = args.slice(2);
  const firstArg = sliced[0];
  if (allowed.indexOf(firstArg) === -1) {
    console.log(`only allowed ${allowed.join(", ")}`);
    process.exit(0);
  }
  return firstArg;
};
const program = getArgs(process.argv, ["goldencrown", "breakerofchains"]);

switch (program) {
  case "goldencrown": {
    console.log(goldencrown());
    break;
  }
  case "breakerofchains": {
    console.log(breakerofchains());
    break;
  }
}
