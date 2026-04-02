import { useEffect, useState } from "react";
import { AppShell, resolvePageForRoute } from "./AppShell";
import { applySeo } from "./seo";
import { getRouteFromLocation } from "./docs/navigation";

function App() {
  const [query, setQuery] = useState("");
  const route = getRouteFromLocation();
  const page = resolvePageForRoute(route);

  useEffect(() => {
    applySeo(route, page);
  }, [page, route]);

  return <AppShell route={route} query={query} onQueryChange={setQuery} />;
}

export default App;
