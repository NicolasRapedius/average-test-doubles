import { Average } from "./average.ts";
import { FileAccess } from "./file_access.ts";
import { NumberSource } from "./NumberSource.ts";

function die() {
  console.log(`usage: deno demo.ts mean|median|mode FILE`);
  Deno.exit(1);
}

if (Deno.args.length < 2) {
  die();
}

const stat = Deno.args[0];
const file = Deno.args[1];

const fileAccess: NumberSource = new FileAccess(file);
const average: Average = new Average(fileAccess);

switch (stat) {
  case "mean":
    console.log(await average.computeMeanOfFile());
    break;
  case "median":
    console.log(await average.computeMedianOfFile());
    break;
  case "mode":
    for (const m of await average.computeModeOfFile()) {
      console.log(m);
    }
    break;
  default:
    die();
}
