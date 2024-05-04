import "reflect-metadata"

import Count from "./Count";
import "../globals.css";

export default function Page() {
  return (
    <div>
      <h1>Page</h1>
      <Count />
    </div>
  );
}
